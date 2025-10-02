/**
 * Validate IPv4 address
 * @param {string} ip 
 * @returns {boolean}
 */
export const isValidIPv4 = (ip) => {
  const ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  return ipv4Regex.test(ip);
};

/**
 * Validate domain name
 * @param {string} domain 
 * @returns {boolean}
 */
export const isValidDomain = (domain) => {
  const domainRegex = /^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;
  return domainRegex.test(domain);
};

/**
 * Validate port number
 * @param {number} port 
 * @returns {boolean}
 */
export const isValidPort = (port) => {
  const portNum = parseInt(port, 10);
  return !isNaN(portNum) && portNum >= 1 && portNum <= 65535;
};

/**
 * Validate URL
 * @param {string} url 
 * @returns {boolean}
 */
export const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Sanitize string input
 * @param {string} str 
 * @returns {string}
 */
export const sanitizeString = (str) => {
  if (!str) return '';
  
  return str
    .replace(/[<>]/g, '') // Remove < and >
    .trim();
};

/**
 * Check if object is empty
 * @param {Object} obj 
 * @returns {boolean}
 */
export const isEmpty = (obj) => {
  if (!obj) return true;
  return Object.keys(obj).length === 0;
};

/**
 * Deep clone object
 * @param {*} obj 
 * @returns {*}
 */
export const deepClone = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};
