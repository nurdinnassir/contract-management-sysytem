// Utility functions for CSV download
function downloadCSV(filename, rows) {
    const csvContent = "data:text/csv;charset=utf-8," 
        + rows.map(e => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Utility functions for category and activity management
function getCategories() {
    return JSON.parse(localStorage.getItem('categories') || '[]');
}

function setCategories(categories) {
    localStorage.setItem('categories', JSON.stringify(categories));
}

function logActivity(message) {
    const logs = JSON.parse(localStorage.getItem('activityLog') || '[]');
    logs.push({ date: new Date().toLocaleDateString(), message });
    localStorage.setItem('activityLog', JSON.stringify(logs));
}
