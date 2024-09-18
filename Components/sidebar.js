document.addEventListener("DOMContentLoaded", function() {
    fetch('../Components/sidebar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById("sidebar-container").innerHTML = data;
        })
        .catch(error => console.error('Error loading sidebar:', error));
});