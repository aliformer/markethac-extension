
  export function jsonToCsv(json) {
    // Extract headers
    const headers = Object.keys(json[0]);
  
    // Create CSV rows
    const rows = json.map(obj => {
      return headers.map(header => {
        return JSON.stringify(obj[header], replacer);
      }).join(',');
    });
  
    // Join headers and rows
    return [headers.join(','), ...rows].join('\n');
  }
  
  export function replacer(key, value) {
    return value;
  }
  
  
  export function downloadCsv(csv, filename) {
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    if (link.download !== undefined) { // feature detection
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", filename);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }

  