import { format, formatDistanceToNow, isValid, parseISO } from 'date-fns';

/**
 * Format a date to a readable string
 * @param {Date|string} date 
 * @param {string} formatStr 
 * @returns {string}
 */
export const formatDate = (date, formatStr = 'PPpp') => {
  if (!date) return '-';
  
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  
  if (!isValid(dateObj)) return '-';
  
  try {
    return format(dateObj, formatStr);
  } catch (error) {
    console.error('Date formatting error:', error);
    return '-';
  }
};

/**
 * Format a date to relative time (e.g., "2 hours ago")
 * @param {Date|string} date 
 * @returns {string}
 */
export const formatRelativeTime = (date) => {
  if (!date) return '-';
  
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  
  if (!isValid(dateObj)) return '-';
  
  try {
    return formatDistanceToNow(dateObj, { addSuffix: true });
  } catch (error) {
    console.error('Relative time formatting error:', error);
    return '-';
  }
};

/**
 * Format bytes to human-readable format
 * @param {number} bytes 
 * @param {number} decimals 
 * @returns {string}
 */
export const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';
  if (!bytes || isNaN(bytes)) return '-';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};

/**
 * Format a number with commas
 * @param {number} num 
 * @returns {string}
 */
export const formatNumber = (num) => {
  if (num === 0) return '0';
  if (!num || isNaN(num)) return '-';
  
  return num.toLocaleString();
};

/**
 * Truncate text to specified length
 * @param {string} text 
 * @param {number} length 
 * @returns {string}
 */
export const truncate = (text, length = 50) => {
  if (!text) return '';
  if (text.length <= length) return text;
  
  return `${text.substring(0, length)}...`;
};

/**
 * Format IP:Port
 * @param {string} ip 
 * @param {number} port 
 * @returns {string}
 */
export const formatIpPort = (ip, port) => {
  if (!ip) return '-';
  return port ? `${ip}:${port}` : ip;
};

/**
 * Capitalize first letter
 * @param {string} str 
 * @returns {string}
 */
export const capitalize = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

/**
 * Get initials from name
 * @param {string} name 
 * @returns {string}
 */
export const getInitials = (name) => {
  if (!name) return '?';
  
  const parts = name.split(' ');
  if (parts.length === 1) {
    return parts[0].substring(0, 2).toUpperCase();
  }
  
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

/**
 * Format percentage
 * @param {number} value 
 * @param {number} total 
 * @param {number} decimals 
 * @returns {string}
 */
export const formatPercentage = (value, total, decimals = 1) => {
  if (!total || total === 0) return '0%';
  if (!value) return '0%';
  
  const percentage = (value / total) * 100;
  return `${percentage.toFixed(decimals)}%`;
};
