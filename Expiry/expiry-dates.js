function renderExpiryDates() {
    const categories = JSON.parse(localStorage.getItem('categories')) || [];
    const tbody = document.querySelector('#expiry-table tbody');
    tbody.innerHTML = '';

    categories.forEach(category => {
        if (category.daysToExpiry < 45) {
            const row = document.createElement('tr');
            row.classList.add('near-expiry');
            row.innerHTML = `
                <td>${category.categoryName}</td>
                <td>${category.signatoryName}</td>
                <td>${category.startDate}</td>
                <td>${category.expiryDate}</td>
                <td>${category.daysToExpiry} days</td>
            `;
            tbody.appendChild(row);
        }
    });
}

// Initial render
renderExpiryDates();
