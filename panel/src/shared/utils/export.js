/**
 * Export data to CSV
 * @param {Array} data 
 * @param {string} filename 
 * @param {Array} columns 
 */
export const exportToCSV = (data, filename = 'export.csv', columns = null) => {
  if (!data || data.length === 0) {
    console.warn('No data to export');
    return;
  }

  // If no columns specified, use all keys from first object
  const headers = columns || Object.keys(data[0]);
  
  // Create CSV header
  const csvHeader = headers.join(',');
  
  // Create CSV rows
  const csvRows = data.map((row) => {
    return headers.map((header) => {
      const value = row[header];
      
      // Handle special cases
      if (value === null || value === undefined) {
        return '';
      }
      
      // Convert objects/arrays to string
      if (typeof value === 'object') {
        return `"${JSON.stringify(value).replace(/"/g, '""')}"`;
      }
      
      // Escape commas and quotes
      const stringValue = String(value);
      if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
        return `"${stringValue.replace(/"/g, '""')}"`;
      }
      
      return stringValue;
    }).join(',');
  });
  
  // Combine header and rows
  const csvContent = [csvHeader, ...csvRows].join('\n');
  
  // Create blob and download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  downloadBlob(blob, filename);
};

/**
 * Export data to JSON
 * @param {*} data 
 * @param {string} filename 
 */
export const exportToJSON = (data, filename = 'export.json') => {
  if (!data) {
    console.warn('No data to export');
    return;
  }

  const jsonContent = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' });
  downloadBlob(blob, filename);
};

/**
 * Helper function to trigger download
 * @param {Blob} blob 
 * @param {string} filename 
 */
const downloadBlob = (blob, filename) => {
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};

/**
 * Import CSV file
 * @param {File} file 
 * @returns {Promise<Array>}
 */
export const importFromCSV = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const text = e.target.result;
        const lines = text.split('\n');
        
        if (lines.length === 0) {
          reject(new Error('Empty file'));
          return;
        }
        
        // Parse header
        const headers = lines[0].split(',').map(h => h.trim());
        
        // Parse rows
        const data = lines.slice(1)
          .filter(line => line.trim())
          .map(line => {
            const values = line.split(',').map(v => v.trim());
            const row = {};
            
            headers.forEach((header, index) => {
              row[header] = values[index] || '';
            });
            
            return row;
          });
        
        resolve(data);
      } catch (error) {
        reject(error);
      }
    };
    
    reader.onerror = () => reject(new Error('Failed to read file'));
    
    reader.readAsText(file);
  });
};

/**
 * Import JSON file
 * @param {File} file 
 * @returns {Promise<*>}
 */
export const importFromJSON = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        resolve(data);
      } catch (error) {
        reject(new Error('Invalid JSON file'));
      }
    };
    
    reader.onerror = () => reject(new Error('Failed to read file'));
    
    reader.readAsText(file);
  });
};
