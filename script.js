// script.js - Interactive Features

// Live Coin Price Calculator
function initCalculator() {
    const slider = document.getElementById('coinSlider');
    const priceDisplay = document.getElementById('coinPrice');
    const usdDisplay = document.getElementById('usdPrice');
    
    if (!slider) return;
    
    // Price mapping: coins -> USD (new reduced prices)
    const prices = {
        1000: 8,    // was 9
        2130: 16,   // was 17
        3250: 24,   // was 25
        5700: 40,   // was 41
        12800: 83,  // was 84
        25600: 161  // was 162
    };
    
    function updatePrice() {
        let coins = parseInt(slider.value);
        // snap to nearest preset
        let closest = Object.keys(prices).reduce((a, b) => {
            return Math.abs(b - coins) < Math.abs(a - coins) ? b : a;
        });
        let usd = prices[closest];
        let inr = usd * 85; // approximate conversion
        priceDisplay.innerText = `${closest.toLocaleString()} 🪙`;
        usdDisplay.innerText = `$${usd} / ₹${Math.round(inr)}`;
    }
    
    slider.addEventListener('input', updatePrice);
    updatePrice();
}

// Mobile menu toggle
function initMobileMenu() {
    const toggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (toggle && navLinks) {
        toggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }
}

// Smooth scroll for anchor links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// Animate stats counter (simple)
function animateStats() {
    const counters = document.querySelectorAll('.stat-number[data-target]');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        let current = 0;
        const increment = target / 50;
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.innerText = Math.floor(current).toLocaleString();
                requestAnimationFrame(updateCounter);
            } else {
                counter.innerText = target.toLocaleString();
            }
        };
        updateCounter();
    });
}

// Run on load
document.addEventListener('DOMContentLoaded', () => {
    initCalculator();
    initMobileMenu();
    initSmoothScroll();
    animateStats();
});