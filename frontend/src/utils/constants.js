// API Base URL
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Storage Keys
export const STORAGE_KEYS = {
    ACCESS_TOKEN: import.meta.env.VITE_TOKEN_STORAGE_KEY || 'careerlinks_token',
    REFRESH_TOKEN: import.meta.env.VITE_REFRESH_TOKEN_KEY || 'careerlinks_refresh_token',
    THEME: 'careerlinks_theme',
    USER: 'careerlinks_user',
};

// Categories
export const OPPORTUNITY_CATEGORIES = [
    { value: 'IT', label: 'IT & Technology' },
    { value: 'Management', label: 'Management' },
    { value: 'Finance', label: 'Finance' },
    { value: 'E-commerce', label: 'E-commerce' },
    { value: 'Government', label: 'Government' },
    { value: 'English Learning', label: 'English Learning' },
    { value: 'Other', label: 'Other' },
];

export const OPPORTUNITY_TYPES = [
    { value: 'Job', label: 'Full-time Job' },
    { value: 'Internship', label: 'Internship' },
    { value: 'Course', label: 'Course' },
];

export const EXAM_CATEGORIES = [
    { value: 'Government', label: 'Government Exams' },
    { value: 'SSC', label: 'SSC' },
    { value: 'UPSC', label: 'UPSC' },
    { value: 'Banking', label: 'Banking' },
    { value: 'Railways', label: 'Railways' },
    { value: 'State-PSC', label: 'State PSC' },
    { value: 'Defence', label: 'Defence' },
    { value: 'Teaching', label: 'Teaching' },
    { value: 'Entrance', label: 'Entrance Exams' },
    { value: 'Private', label: 'Private Company Tests' },
];

export const EXAM_STATUSES = [
    { value: 'Active', label: 'Active' },
    { value: 'Upcoming', label: 'Upcoming' },
    { value: 'Closed', label: 'Closed' },
    { value: 'Result Declared', label: 'Result Declared' },
];

export const EXAM_NOTIFICATIONS = [
    { value: 'Active-Form', label: 'Active Forms' },
    { value: 'Closing-Soon', label: 'Closing Soon' },
    { value: 'Upcoming', label: 'Upcoming Exams' },
    { value: 'New-Today', label: 'New Notifications Today' },
    { value: 'Result-Declared', label: 'Result Declared' },
];

// Pagination
export const ITEMS_PER_PAGE = 10;

// Sort Options
export const SORT_OPTIONS = [
    { value: '-createdAt', label: 'Newest First' },
    { value: 'createdAt', label: 'Oldest First' },
    { value: 'deadline', label: 'Deadline: Soonest' },
    { value: '-deadline', label: 'Deadline: Latest' },
];

// Filter Defaults
export const DEFAULT_FILTERS = {
    page: 1,
    limit: ITEMS_PER_PAGE,
    category: 'all',
    type: 'all',
    sort: '-createdAt',
    search: '',
};

// HTTP Status Codes
export const HTTP_STATUS = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    INTERNAL_ERROR: 500,
};

// Error Messages
export const ERROR_MESSAGES = {
    NETWORK_ERROR: 'Network error. Please check your connection.',
    SERVER_ERROR: 'Server error. Please try again later.',
    UNAUTHORIZED: 'Please login to continue.',
    FORBIDDEN: 'You do not have permission to perform this action.',
    NOT_FOUND: 'Requested resource not found.',
    INVALID_INPUT: 'Please provide valid input.',
};

export default {
    API_URL,
    STORAGE_KEYS,
    OPPORTUNITY_CATEGORIES,
    OPPORTUNITY_TYPES,
    EXAM_CATEGORIES,
    EXAM_STATUSES,
    EXAM_NOTIFICATIONS,
    ITEMS_PER_PAGE,
    SORT_OPTIONS,
    DEFAULT_FILTERS,
    HTTP_STATUS,
    ERROR_MESSAGES,
};
