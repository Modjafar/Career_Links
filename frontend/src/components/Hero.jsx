import { Link } from 'react-router-dom';
import { FaSearch, FaArrowRight, FaBriefcase, FaGraduationCap, FaClipboardList } from 'react-icons/fa';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/jobs?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const stats = [
    { icon: FaBriefcase, label: 'Jobs & Internships', value: '1,200+' },
    { icon: FaGraduationCap, label: 'Online Courses', value: '500+' },
    { icon: FaClipboardList, label: 'Competitive Exams', value: '300+' },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 dark:from-blue-900 dark:via-blue-800 dark:to-purple-900 text-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-300 rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm mb-6">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              New opportunities added daily
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Find Your Dream{' '}
              <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Career
              </span>
            </h1>

            <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-xl mx-auto lg:mx-0">
              Discover internships, jobs, online courses, and competitive exams all in one place. Your career journey starts here.
            </p>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto lg:mx-0 mb-8">
              <div className="relative flex-1">
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="What are you looking for?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-0 focus:ring-2 focus:ring-yellow-300 outline-none"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3 bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                Search
                <FaArrowRight />
              </button>
            </form>

            {/* Browse Categories */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-3">
              <Link
                to="/internships"
                className="px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg text-sm font-medium transition-colors"
              >
                Internships
              </Link>
              <Link
                to="/jobs"
                className="px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg text-sm font-medium transition-colors"
              >
                Full-time Jobs
              </Link>
              <Link
                to="/courses"
                className="px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg text-sm font-medium transition-colors"
              >
                Courses
              </Link>
              <Link
                to="/exams"
                className="px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg text-sm font-medium transition-colors"
              >
                Exams
              </Link>
            </div>
          </div>

          {/* Right Content - Stats Cards */}
          <div className="hidden lg:block">
            <div className="grid gap-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className="bg-white/10 backdrop-blur-sm rounded-xl p-6 flex items-center gap-4 hover:bg-white/20 transition-colors"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                      <Icon className="text-xl" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <p className="text-blue-100 text-sm">{stat.label}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Wave Divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" className="w-full h-auto">
          <path
            d="M0,60 C480,120 960,0 1440,60 L1440,120 L0,120 Z"
            className="fill-gray-50 dark:fill-gray-900"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
