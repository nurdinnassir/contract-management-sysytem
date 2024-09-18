document
  .getElementById("category-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const categoryName = document.getElementById("category-name").value;
    const signatoryName = document.getElementById("signatory-name").value;
    const startDate = document.getElementById("start-date").value;
    const durationType = document.getElementById("duration-type").value;
    const durationValue = document.getElementById("duration-value").value;

    // Calculate expiry date
    let expiryDate = new Date(startDate);
    if (durationType === "months") {
      expiryDate.setMonth(expiryDate.getMonth() + parseInt(durationValue));
    } else if (durationType === "years") {
      expiryDate.setFullYear(
        expiryDate.getFullYear() + parseInt(durationValue)
      );
    } else if (durationType === "days") {
      expiryDate.setDate(expiryDate.getDate() + parseInt(durationValue));
    } else if (durationType === "weeks") {
      expiryDate.setDate(expiryDate.getDate() + parseInt(durationValue) * 7);
    }

    // Days to expiry
    const daysToExpiry = Math.floor(
      (expiryDate - new Date()) / (1000 * 60 * 60 * 24)
    );

    // Add to local storage
    let categories = JSON.parse(localStorage.getItem("categories")) || [];
    categories.push({
      categoryName,
      signatoryName,
      startDate,
      expiryDate: expiryDate.toISOString().split("T")[0],
      daysToExpiry,
    });
    localStorage.setItem("categories", JSON.stringify(categories));

    // Update UI
    renderCategories();

    // Clear form
    document.getElementById("category-form").reset();
  });

document.getElementById("clear-table").addEventListener("click", function () {
  localStorage.removeItem("categories");
  document.getElementById("categories-table-body").innerHTML = ""; // Clear the table content
  alert("Categories have been cleared!");
});

function renderCategories() {
  const categories = JSON.parse(localStorage.getItem("categories")) || [];
  const tbody = document.getElementById("categories-table-body");
  tbody.innerHTML = "";
  categories.forEach((category) => {
    const row = document.createElement("tr");
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

renderCategories();
