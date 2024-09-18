function renderActivityLog() {
    const categories = JSON.parse(localStorage.getItem('categories')) || [];
    const tbody = document.querySelector('#activity-table tbody');
    tbody.innerHTML = '';

    categories.forEach(category => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${category.categoryName}</td>
            <td>${category.signatoryName}</td>
            <td>${category.startDate}</td>
            <td>${category.expiryDate}</td>
            <td>${category.daysToExpiry} days</td>
        `;
        tbody.appendChild(row);
    });
}

document.getElementById('download-activity-btn').addEventListener('click', function() {
    const categories = JSON.parse(localStorage.getItem('categories')) || [];
    if (categories.length === 0) {
        alert('No data available for download');
        return;
    }

    let csvContent = "Category,Signatory,Signed Date,Expiry Date,Days to Expiry\n";
    categories.forEach(category => {
        csvContent += `${category.categoryName},${category.signatoryName},${category.startDate},${category.expiryDate},${category.daysToExpiry} days\n`;
    });

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', `contracts-${new Date().toLocaleDateString()}.csv`);
    a.click();
});

// Initial render
renderActivityLog();
