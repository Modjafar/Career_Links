/**
 * Career Links Database Seeder
 * 
 * This script seeds the database with all opportunity data from domain files.
 * It handles:
 * - Batch insertion (50 records at a time)
 * - Duplicate prevention (title + category + type)
 * - Progress logging
 * - Auto-seeding on server start
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { config } from '../config/env.js';
import Opportunity from '../models/Opportunity.js';

// Import all domain data files
import { generalData } from '../data/general.js';
import { itSoftwareData } from '../data/itSoftware.js';
import { financeData } from '../data/finance.js';
import { managementData } from '../data/management.js';
import { governmentData } from '../data/government.js';
import { ecommerceData } from '../data/ecommerce.js';
import { englishLearningData } from '../data/englishLearning.js';
import { examsData } from '../data/exams.js';

dotenv.config();

// Batch size for insertions
const BATCH_SIZE = 50;

// All domain data arrays
const allDataSources = [
    { name: 'General', data: generalData },
    { name: 'IT & Software', data: itSoftwareData },
    { name: 'Finance', data: financeData },
    { name: 'Management', data: managementData },
    { name: 'Government', data: governmentData },
    { name: 'E-Commerce', data: ecommerceData },
    { name: 'English Learning', data: englishLearningData },
    { name: 'Exams', data: examsData },
];

/**
 * Add default values to records
 */
const normalizeRecord = (record) => ({
    ...record,
    // Add deadline (90 days from now for all)
    deadline: record.deadline || new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    // Set isPaid based on stipend
    isPaid: record.stipend === 'Paid' || record.stipend === 'Free' ? true : record.stipend !== 'Unpaid',
    // Set default values for missing fields
    eligibility: record.eligibility || 'Open to all',
    duration: record.duration || 'Not Specified',
});

/**
 * Remove duplicate records based on title + category + type
 */
const removeDuplicates = (records) => {
    const seen = new Set();
    return records.filter((record) => {
        const key = `${record.title}-${record.category}-${record.type}`.toLowerCase();
        if (seen.has(key)) {
            return false;
        }
        seen.add(key);
        return true;
    });
};

/**
 * Seed the database with all data
 */
const seedDatabase = async () => {
    try {
        console.log('\n🗄️  Starting Career Links Database Seeding...\n');

        // Connect to MongoDB
        const mongoUri = config.MONGODB_URI || process.env.MONGODB_URI;
        if (!mongoUri) {
            throw new Error('MONGODB_URI not configured');
        }

        await mongoose.connect(mongoUri);
        console.log('✅ MongoDB Connected\n');

        // Check if data already exists
        const existingCount = await Opportunity.countDocuments();
        if (existingCount > 0) {
            console.log(`⚠️  Database already has ${existingCount} records.`);
            const response = process.argv.includes('--force');
            if (!response) {
                console.log('💡 Run with --force to re-seed\n');
                await mongoose.disconnect();
                return;
            }
            console.log('🔄 Force re-seeding enabled...\n');
        }

        // Merge all data sources
        console.log('📥 Merging data from all domains...');
        let allRecords = [];

        for (const { name, data } of allDataSources) {
            console.log(`   - ${name}: ${data.length} records`);
            const normalized = data.map(normalizeRecord);
            allRecords = [...allRecords, ...normalized];
        }

        // Remove duplicates
        const uniqueRecords = removeDuplicates(allRecords);
        console.log(`\n📊 Total records: ${allRecords.length}`);
        console.log(`📊 Unique records: ${uniqueRecords.length}`);
        console.log(`📊 Duplicates removed: ${allRecords.length - uniqueRecords.length}\n`);

        // Clear existing data
        if (existingCount > 0) {
            await Opportunity.deleteMany({});
            console.log('🗑️  Cleared existing records\n');
        }

        // Insert in batches
        console.log('📝 Inserting records in batches...\n');
        let insertedCount = 0;
        const totalBatches = Math.ceil(uniqueRecords.length / BATCH_SIZE);

        for (let i = 0; i < uniqueRecords.length; i += BATCH_SIZE) {
            const batch = uniqueRecords.slice(i, i + BATCH_SIZE);
            const batchNumber = Math.floor(i / BATCH_SIZE) + 1;

            try {
                await Opportunity.insertMany(batch, { ordered: false });
                insertedCount += batch.length;
                console.log(`   Batch ${batchNumber}/${totalBatches}: Inserted ${batch.length} records (${insertedCount}/${uniqueRecords.length})`);
            } catch (error) {
                console.error(`   ❌ Error in batch ${batchNumber}: ${error.message}`);
            }
        }

        // Final stats
        const finalCount = await Opportunity.countDocuments();
        console.log('\n✅ Seeding completed successfully!');
        console.log(`📈 Total records in database: ${finalCount}\n`);

        // Print summary by category
        console.log('📊 Summary by Category:');
        const categories = await Opportunity.aggregate([
            { $group: { _id: '$category', count: { $sum: 1 } } },
            { $sort: { count: -1 } },
        ]);

        for (const { _id, count } of categories) {
            console.log(`   - ${_id}: ${count}`);
        }

        console.log('\n🎉 Database seeding complete!\n');

        await mongoose.disconnect();
        process.exit(0);
    } catch (error) {
        console.error('\n❌ Seeding failed:', error.message);
        console.error(error.stack);
        process.exit(1);
    }
};

/**
 * Auto-seed function - called on server start
 */
export const autoSeed = async () => {
    try {
        const mongoUri = config.MONGODB_URI || process.env.MONGODB_URI;
        if (!mongoUri) {
            console.log('⚠️  MONGODB_URI not configured, skipping auto-seed');
            return;
        }

        await mongoose.connect(mongoUri);

        const count = await Opportunity.countDocuments();
        if (count === 0) {
            console.log('\n📦 Database is empty. Running auto-seed...\n');
            await seedDatabase();
        } else {
            console.log(`\n📦 Database already has ${count} records. Skipping auto-seed.\n`);
        }

        await mongoose.disconnect();
    } catch (error) {
        console.error('❌ Auto-seed failed:', error.message);
    }
};

// Export for use in server.js
export default seedDatabase;

// Run if executed directly
seedDatabase();
