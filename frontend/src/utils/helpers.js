import { format, formatDistanceToNow, differenceInDays } from 'date-fns';

// Format date
export const formatDate = (date) => {
    return format(new Date(date), 'MMM dd, yyyy');
};

// Format date and time
export const formatDateTime = (date) => {
    return format(new Date(date), 'MMM dd, yyyy HH:mm');
};

// Format date as relative time
export const formatRelativeTime = (date) => {
    return formatDistanceToNow(new Date(date), { addSuffix: true });
};

// Check if date is within X days
export const isWithinDays = (date, days) => {
    const diff = differenceInDays(new Date(date), new Date());
    return diff <= days && diff >= 0;
};

// Check if registration is closing soon (within 3 days)
export const isClosingSoon = (date) => {
    return isWithinDays(date, 3);
};

// Check if registration is closing today
export const isClosingToday = (date) => {
    const diff = differenceInDays(new Date(date), new Date());
    return diff === 0;
};

// Calculate days remaining
export const getDaysRemaining = (date) => {
    const diff = differenceInDays(new Date(date), new Date());
    return diff;
};

// Format currency
export const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
    }).format(amount);
};

// Truncate text
export const truncateText = (text, length = 100) => {
    if (!text) return '';
    return text.length > length ? text.substring(0, length) + '...' : text;
};

// Validate email
export const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// Validate password strength
export const getPasswordStrength = (password) => {
    if (!password) return 0;
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[!@#$%^&*]/.test(password)) strength++;
    return strength;
};

// Get password strength label
export const getPasswordStrengthLabel = (strength) => {
    const labels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong', 'Very Strong'];
    return labels[strength] || 'Unknown';
};

// Get initials from name
export const getInitials = (name) => {
    return name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
};

// Generate avatar color
export const getAvatarColor = (index) => {
    const colors = [
        'bg-red-500',
        'bg-yellow-500',
        'bg-green-500',
        'bg-blue-500',
        'bg-indigo-500',
        'bg-purple-500',
        'bg-pink-500',
        'bg-orange-500',
    ];
    return colors[index % colors.length];
};

// Deep clone object
export const deepClone = (obj) => {
    return JSON.parse(JSON.stringify(obj));
};

// Get query parameters from URL
export const getQueryParams = () => {
    const params = new URLSearchParams(window.location.search);
    const obj = {};
    for (let [key, value] of params) {
        obj[key] = value;
    }
    return obj;
};

// Set query parameters in URL
export const setQueryParams = (params) => {
    const query = new URLSearchParams(params);
    window.history.pushState({}, '', `?${query.toString()}`);
};

export default {
    formatDate,
    formatDateTime,
    formatRelativeTime,
    isWithinDays,
    isClosingSoon,
    isClosingToday,
    getDaysRemaining,
    formatCurrency,
    truncateText,
    isValidEmail,
    getPasswordStrength,
    getPasswordStrengthLabel,
    getInitials,
    getAvatarColor,
    deepClone,
    getQueryParams,
    setQueryParams,
};
