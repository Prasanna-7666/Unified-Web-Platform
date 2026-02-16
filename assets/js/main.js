/*
* Main JavaScript
* Handles global functionality
*/

document.addEventListener('DOMContentLoaded', function () {
    console.log('Unified Platform Loaded');

    // Add active class to current nav item
    const currentLocation = location.href;
    const menuItem = document.querySelectorAll('.nav-link');
    const menuLength = menuItem.length;
    for (let i = 0; i < menuLength; i++) {
        if (menuItem[i].href === currentLocation) {
            menuItem[i].className += " active";
        }
    }

    // Scroll to interaction (if needed)

    // Dark Mode Toggle Logic
    const toggleSwitches = document.querySelectorAll('.theme-switch input[type="checkbox"]');
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        if (currentTheme === 'dark') {
            toggleSwitches.forEach(sw => sw.checked = true);
        }
    }

    toggleSwitches.forEach(sw => {
        sw.addEventListener('change', function (e) {
            if (e.target.checked) {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
                // Sync other switches if any
                toggleSwitches.forEach(s => s.checked = true);
            } else {
                document.documentElement.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
                // Sync other switches if any
                toggleSwitches.forEach(s => s.checked = false);
            }
        });
    });

    // Simple "Add to Cart" simulation
    const addToCartButtons = document.querySelectorAll('.btn-add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            alert('Item added to cart! (Simulation)');
        });
    });

    // Booking simulation
    const bookButtons = document.querySelectorAll('.btn-book-now');
    bookButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            // Redirect to service details or show modal
            const serviceName = this.getAttribute('data-service') || 'Service';
            const confirmBooking = confirm(`Do you want to book ${serviceName}?`);

            if (confirmBooking) {
                alert(`Booking confirmed for ${serviceName}! Check your dashboard.`);
                window.location.href = 'dashboard.html';
            }
        });
    });

    // Pricing Toggle Logic
    const btnMonthly = document.getElementById('btnMonthly');
    const btnYearly = document.getElementById('btnYearly');
    const priceTexts = document.querySelectorAll('.price-text');

    if (btnMonthly && btnYearly) {
        btnMonthly.addEventListener('click', () => {
            priceTexts.forEach(price => {
                price.innerHTML = price.getAttribute('data-monthly') + '<span class="fs-6 text-muted fw-normal">/mo</span>';
            });
        });

        btnYearly.addEventListener('click', () => {
            priceTexts.forEach(price => {
                price.innerHTML = price.getAttribute('data-yearly') + '<span class="fs-6 text-muted fw-normal">/yr</span>';
            });
        });
    }
});
