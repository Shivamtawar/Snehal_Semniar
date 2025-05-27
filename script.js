// Loading Screen
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loading-screen').style.display = 'none';
    }, 2500);
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('hidden');
    } else {
        navbar.classList.remove('hidden');
    }
});

// Mobile Menu Toggle
document.querySelector('.mobile-menu-toggle').addEventListener('click', () => {
    document.querySelector('.nav-links').classList.toggle('active');
});

// Smooth Scroll
document.querySelectorAll('.nav-link').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
    });
});

// Typewriter Effect
const typewriterText = document.querySelector('.typewriter-text');
const phrases = ['Dream Adventure', 'Exotic Getaways', 'Cultural Journeys', 'Epic Treks'];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const currentPhrase = phrases[phraseIndex];
    if (isDeleting) {
        typewriterText.textContent = currentPhrase.substring(0, charIndex--);
        if (charIndex < 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            setTimeout(type, 500);
        } else {
            setTimeout(type, 100);
        }
    } else {
        typewriterText.textContent = currentPhrase.substring(0, charIndex++);
        if (charIndex > currentPhrase.length) {
            isDeleting = true;
            setTimeout(type, 1000);
        } else {
            setTimeout(type, 150);
        }
    }
}
type();

// Parallax Effect
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const scrollPosition = window.scrollY;
    hero.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
});

// Tour Category Filter
document.querySelectorAll('.category-btn').forEach(button => {
    button.addEventListener('click', () => {
        document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        const category = button.getAttribute('data-category');
        document.querySelectorAll('.tour-item').forEach(item => {
            if (category === 'all' || item.getAttribute('data-category') === category) {
                item.style.display = 'block';
                item.style.animation = 'cardPop 0.5s ease-out';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Cart Functionality
let cart = [];
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const cartCount = document.getElementById('cart-count');
const cartSidebar = document.getElementById('cart-sidebar');
const cartIcon = document.getElementById('cart-icon');
const closeCart = document.getElementById('close-cart');
const checkoutBtn = document.getElementById('checkout-btn');
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toast-message');

function updateCart() {
    cartItems.innerHTML = cart.length === 0 ? '<p class="empty-cart">Your bookings are empty</p>' : '';
    let total = 0;
    cart.forEach((item, index) => {
        total += item.price;
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <span>${item.name}</span>
            <span>₹${item.price.toLocaleString()}</span>
        `;
        cartItems.appendChild(cartItem);
    });
    cartTotal.textContent = total.toLocaleString();
    cartCount.textContent = cart.length;
}

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const name = button.getAttribute('data-item');
        const price = parseFloat(button.getAttribute('data-price'));
        cart.push({ name, price });
        updateCart();
        toastMessage.textContent = `${name} added to bookings!`;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2000);
    });
});

cartIcon.addEventListener('click', () => {
    cartSidebar.classList.add('open');
});

closeCart.addEventListener('click', () => {
    cartSidebar.classList.remove('open');
});

checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
        toastMessage.textContent = 'Your bookings are empty!';
    } else {
        toastMessage.textContent = 'Booking confirmed!';
        cart = [];
        updateCart();
    }
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2000);
});

// Animate Tour Items on Scroll
const tourItems = document.querySelectorAll('.tour-item');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'cardPop 0.5s ease-out forwards';
        }
    });
}, { threshold: 0.2 });

tourItems.forEach(item => observer.observe(item));

// Button Hover Animation
document.querySelectorAll('.herobtn').forEach(btn => {
    btn.addEventListener('mouseover', () => {
        btn.style.transform = 'scale(1.2) rotate(5deg)';
    });
    btn.addEventListener('mouseout', () => {
        btn.style.transform = 'scale(1) rotate(0deg)';
    });
});

// Footer Link Animation
document.querySelectorAll('.footer-link').forEach(link => {
    link.addEventListener('click', () => {
        link.style.transform = 'scale(1.1)';
        setTimeout(() => link.style.transform = 'scale(1)', 300);
    });
});