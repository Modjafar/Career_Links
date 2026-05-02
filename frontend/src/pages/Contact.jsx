import { useState } from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane, FaCheckCircle } from 'react-icons/fa';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        setSubmitted(true);
        setLoading(false);
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    const contactInfo = [
        {
            icon: FaEnvelope,
            title: 'Email',
            value: 'support@careerlinks.com',
            href: 'mailto:support@careerlinks.com',
        },
        {
            icon: FaPhone,
            title: 'Phone',
            value: '+91 12345 67890',
            href: 'tel:+911234567890',
        },
        {
            icon: FaMapMarkerAlt,
            title: 'Address',
            value: 'Mumbai, Maharashtra, India',
            href: '#',
        },
    ];

    return (
        <div className="container-custom py-12 fade-in">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Contact Us</h1>
                <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
                    Have questions or feedback? We'd love to hear from you. Fill out the form below and we'll get back to you as soon as possible.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {/* Contact Info */}
                <div className="lg:col-span-1 space-y-6">
                    {contactInfo.map((info) => {
                        const Icon = info.icon;
                        return (
                            <a
                                key={info.title}
                                href={info.href}
                                className="flex items-start gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                            >
                                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Icon className="text-blue-600 dark:text-blue-400" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900 dark:text-white">{info.title}</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{info.value}</p>
                                </div>
                            </a>
                        );
                    })}
                </div>

                {/* Contact Form */}
                <div className="lg:col-span-2">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 md:p-8">
                        {submitted ? (
                            <div className="text-center py-12">
                                <FaCheckCircle className="text-5xl text-green-500 mx-auto mb-4" />
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Message Sent!</h3>
                                <p className="text-gray-500 dark:text-gray-400 mb-6">
                                    Thank you for reaching out. We'll respond within 24 hours.
                                </p>
                                <button
                                    onClick={() => setSubmitted(false)}
                                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    Send Another Message
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Your Name
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="input-field"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="input-field"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Subject
                                    </label>
                                    <input
                                        type="text"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                        className="input-field"
                                        placeholder="How can we help?"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Message
                                    </label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows={5}
                                        className="input-field resize-none"
                                        placeholder="Tell us more about your query..."
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50"
                                >
                                    {loading ? 'Sending...' : (
                                        <>
                                            <FaPaperPlane />
                                            Send Message
                                        </>
                                    )}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
