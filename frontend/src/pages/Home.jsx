import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaBriefcase, FaGraduationCap, FaClipboardList, FaRocket } from 'react-icons/fa';
import Hero from '../components/Hero.jsx';
import OpportunityCard from '../components/OpportunityCard.jsx';
import ExamCard from '../components/ExamCard.jsx';
import LoadingSkeleton from '../components/LoadingSkeleton.jsx';
import { opportunityService } from '../services/opportunityService.js';
import { examService } from '../services/examService.js';

const Home = () => {
    const [featuredOpportunities, setFeaturedOpportunities] = useState([]);
    const [recentExams, setRecentExams] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHomeData = async () => {
            try {
                setLoading(true);
                const [oppRes, examRes] = await Promise.all([
                    opportunityService.getHighlighted(),
                    examService.getExams({ limit: 6 }),
                ]);
                setFeaturedOpportunities(oppRes?.data || []);
                setRecentExams(examRes?.data || []);
            } catch (error) {
                console.error('Error fetching home data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchHomeData();
    }, []);

    const categoryCards = [
        {
            icon: FaBriefcase,
            title: 'Internships',
            description: 'Gain hands-on experience with top companies and startups.',
            to: '/internships',
            color: 'bg-blue-500',
        },
        {
            icon: FaGraduationCap,
            title: 'Jobs',
            description: 'Full-time and part-time positions across various industries.',
            to: '/jobs',
            color: 'bg-green-500',
        },
        {
            icon: FaClipboardList,
            title: 'Courses',
            description: 'Online courses to upskill and advance your career.',
            to: '/courses',
            color: 'bg-purple-500',
        },
        {
            icon: FaRocket,
            title: 'Exams',
            description: 'Government and competitive exam notifications and updates.',
            to: '/exams',
            color: 'bg-orange-500',
        },
    ];

    return (
        <div className="fade-in">
            <Hero />

            {/* Categories Section */}
            <section className="py-16 bg-gray-50 dark:bg-gray-900">
                <div className="container-custom">
                    <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
                        Explore Opportunities
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {categoryCards.map((card) => {
                            const Icon = card.icon;
                            return (
                                <Link
                                    key={card.title}
                                    to={card.to}
                                    className="group bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 text-center"
                                >
                                    <div className={`w-14 h-14 ${card.color} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                                        <Icon className="text-white text-2xl" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                        {card.title}
                                    </h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        {card.description}
                                    </p>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Featured Opportunities */}
            <section className="py-16 bg-white dark:bg-gray-800">
                <div className="container-custom">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                                Featured Opportunities
                            </h2>
                            <p className="text-gray-500 dark:text-gray-400">
                                Hand-picked opportunities just for you
                            </p>
                        </div>
                        <Link
                            to="/jobs"
                            className="hidden sm:flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium hover:text-blue-700 transition-colors"
                        >
                            View All
                            <FaArrowRight />
                        </Link>
                    </div>

                    {loading ? (
                        <LoadingSkeleton count={3} />
                    ) : featuredOpportunities.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {featuredOpportunities.slice(0, 3).map((opp) => (
                                <OpportunityCard key={opp._id} opportunity={opp} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                            No featured opportunities at the moment. Check back soon!
                        </div>
                    )}

                    <div className="sm:hidden mt-6 text-center">
                        <Link
                            to="/jobs"
                            className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium"
                        >
                            View All
                            <FaArrowRight />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Recent Exams */}
            <section className="py-16 bg-gray-50 dark:bg-gray-900">
                <div className="container-custom">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                                Recent Exams
                            </h2>
                            <p className="text-gray-500 dark:text-gray-400">
                                Latest exam notifications and updates
                            </p>
                        </div>
                        <Link
                            to="/exams"
                            className="hidden sm:flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium hover:text-blue-700 transition-colors"
                        >
                            View All
                            <FaArrowRight />
                        </Link>
                    </div>

                    {loading ? (
                        <LoadingSkeleton count={3} />
                    ) : recentExams.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {recentExams.slice(0, 3).map((exam) => (
                                <ExamCard key={exam._id} exam={exam} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                            No recent exams at the moment. Check back soon!
                        </div>
                    )}

                    <div className="sm:hidden mt-6 text-center">
                        <Link
                            to="/exams"
                            className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium"
                        >
                            View All
                            <FaArrowRight />
                        </Link>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <div className="container-custom text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Ready to Start Your Career?
                    </h2>
                    <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
                        Join thousands of students and job seekers who have found their dream opportunities through Career Links.
                    </p>
                    <Link
                        to="/register"
                        className="inline-flex items-center gap-2 px-8 py-3 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-100 transition-colors"
                    >
                        Get Started Now
                        <FaArrowRight />
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Home;
