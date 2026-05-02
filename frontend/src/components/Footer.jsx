import { Link } from 'react-router-dom';
import { FaBriefcase, FaHeart, FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const footerLinks = {
        opportunities: [
            { to: '/internships', label: 'Internships' },
            { to: '/jobs', label: 'Jobs' },
            { to: '/courses', label: 'Courses' },
            { to: '/exams', label: 'Exams' },
        ],
        company: [
            { to: '/contact', label: 'Contact Us' },
            { to: '/about', label: 'About' },
        ],
        legal: [
            { to: '/privacy', label: 'Privacy Policy' },
            { to: '/terms', label: 'Terms of Service' },
        ],
    };

    return (
        <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 transition-colors duration-300">
            <div className="container-custom py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="lg:col-span-1">
                        <Link to="/" className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                                <FaBriefcase className="text-white text-sm" />
                            </div>
                            <span className="text-xl font-bold gradient-primary bg-clip-text text-transparent">
                                Career Links
                            </span>
                        </Link>
                        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                            Your one-stop platform for internships, jobs, courses, and competitive exams. Build your career with us.
                        </p>
                        <div className="flex items-center gap-4 mt-4">
                            <a
                                href="https://github.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                            >
                                <FaGithub className="text-xl" />
                            </a>
                            <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-blue-400 transition-colors"
                            >
                                <FaTwitter className="text-xl" />
                            </a>
                            <a
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-blue-600 transition-colors"
                            >
                                <FaLinkedin className="text-xl" />
                            </a>
                        </div>
                    </div>

                    {/* Opportunities Links */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
                            Opportunities
                        </h3>
                        <ul className="space-y-3">
                            {footerLinks.opportunities.map((link) => (
                                <li key={link.to}>
                                    <Link
                                        to={link.to}
                                        className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
                            Company
                        </h3>
                        <ul className="space-y-3">
                            {footerLinks.company.map((link) => (
                                <li key={link.to}>
                                    <Link
                                        to={link.to}
                                        className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal Links */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
                            Legal
                        </h3>
                        <ul className="space-y-3">
                            {footerLinks.legal.map((link) => (
                                <li key={link.to}>
                                    <Link
                                        to={link.to}
                                        className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-gray-500 dark:text-gray-400 text-sm text-center md:text-left">
                            &copy; {currentYear} Career Links. All rights reserved.
                        </p>
                        <p className="flex items-center gap-1 text-gray-500 dark:text-gray-400 text-sm">
                            Made with <FaHeart className="text-red-500" /> for students & job seekers
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
