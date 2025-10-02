/**
 * Application-wide constants
 */

// API endpoints base
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
  },
  USERS: {
    LIST: '/auth/users',
    CREATE: '/auth/users',
    DETAIL: (id) => `/auth/users/${id}`,
    UPDATE: (id) => `/auth/users/${id}`,
    DELETE: (id) => `/auth/users/${id}`,
  },
  AGENTS: {
    LIST: '/admin/agents',
    CREATE: '/admin/agents',
    DETAIL: (id) => `/admin/agents/${id}`,
    UPDATE: (id) => `/admin/agents/${id}`,
    DELETE: (id) => `/admin/agents/${id}`,
    BULK_DELETE: '/admin/agents/bulk-delete',
  },
  RULES: {
    LIST: '/admin/rules',
    CREATE: '/admin/rules',
    DETAIL: (id) => `/admin/rules/${id}`,
    UPDATE: (id) => `/admin/rules/${id}`,
    DELETE: (id) => `/admin/rules/${id}`,
  },
  ROUTES: {
    LIST: '/admin/routes',
    CREATE: '/admin/routes',
    DETAIL: (id) => `/admin/routes/${id}`,
    UPDATE: (id) => `/admin/routes/${id}`,
    DELETE: (id) => `/admin/routes/${id}`,
  },
  GEODNS: {
    LIST: '/admin/geodns',
    CREATE: '/admin/geodns',
    DETAIL: (id) => `/admin/geodns/${id}`,
    UPDATE: (id) => `/admin/geodns/${id}`,
    DELETE: (id) => `/admin/geodns/${id}`,
  },
  AGENT: {
    REGISTER: '/agent',
    CONFIG: '/agent',
    HEARTBEAT: '/agent/heartbeat',
  },
};

// Query keys for TanStack Query
export const QUERY_KEYS = {
  AGENTS: 'agents',
  AGENT: 'agent',
  RULES: 'rules',
  RULE: 'rule',
  ROUTES: 'routes',
  ROUTE: 'route',
  GEODNS: 'geodns',
  GEODNS_ITEM: 'geodns-item',
  USERS: 'users',
  USER: 'user',
  DASHBOARD_STATS: 'dashboard-stats',
  RECENT_ACTIVITY: 'recent-activity',
};

// Status colors
export const STATUS_COLORS = {
  connected: 'success',
  disconnected: 'destructive',
  active: 'success',
  inactive: 'secondary',
  pending: 'warning',
  error: 'destructive',
};

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [10, 25, 50, 100],
};

// Refresh intervals (in milliseconds)
export const REFRESH_INTERVALS = {
  FAST: 10000,    // 10 seconds
  NORMAL: 30000,  // 30 seconds
  SLOW: 60000,    // 1 minute
};

// Local storage keys
export const STORAGE_KEYS = {
  TOKEN: 'token',
  USER: 'user',
  THEME: 'nimbus-theme',
  SIDEBAR: 'nimbus-sidebar',
  PREFERENCES: 'nimbus-preferences',
};

// Keyboard shortcuts
export const KEYBOARD_SHORTCUTS = {
  COMMAND_PALETTE: ['ctrl+k', 'cmd+k'],
  NEW_AGENT: ['ctrl+shift+a', 'cmd+shift+a'],
  NEW_RULE: ['ctrl+shift+r', 'cmd+shift+r'],
  SEARCH: ['ctrl+/', 'cmd+/'],
  SETTINGS: ['ctrl+,', 'cmd+,'],
};

// Date formats
export const DATE_FORMATS = {
  FULL: 'PPpp',                  // Jan 1, 2024, 10:30 AM
  DATE_ONLY: 'PP',               // Jan 1, 2024
  TIME_ONLY: 'p',                // 10:30 AM
  SHORT: 'Pp',                   // 01/01/2024, 10:30 AM
  ISO: "yyyy-MM-dd'T'HH:mm:ss",  // 2024-01-01T10:30:00
};

// Chart colors
export const CHART_COLORS = {
  PRIMARY: '#3b82f6',
  SUCCESS: '#10b981',
  WARNING: '#f59e0b',
  DANGER: '#ef4444',
  INFO: '#06b6d4',
  PURPLE: '#8b5cf6',
  PINK: '#ec4899',
  ORANGE: '#f97316',
};

// Table row actions
export const TABLE_ACTIONS = {
  VIEW: 'view',
  EDIT: 'edit',
  DELETE: 'delete',
  DUPLICATE: 'duplicate',
};
