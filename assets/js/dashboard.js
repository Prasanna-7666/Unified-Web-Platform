/*
* Dashboard JavaScript
* Handles simulated backend data and charts
*/

document.addEventListener('DOMContentLoaded', function () {
    console.log('Dashboard Loaded');

    // Check if user is "logged in" (Simulation)
    const userRole = localStorage.getItem('userRole') || 'Client'; // Default to Client

    // Update dashboard based on role (Simple DOM manipulation)
    const roleDisplay = document.getElementById('user-role-display');
    if (roleDisplay) {
        roleDisplay.textContent = userRole;
    }

    // Initialize Charts (using Chart.js if available, or placeholder)
    // We will assume Chart.js is loaded from CDN in the HTML

    // Example: Revenue Chart
    const ctx = document.getElementById('revenueChart');
    if (ctx) {
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'Revenue ($)',
                    data: [1200, 1900, 3000, 5000, 2000, 3000],
                    borderColor: '#0d6efd',
                    tension: 0.1
                }]
            },
            options: {
                responsive: true
            }
        });
    }

});
