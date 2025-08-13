// === CAMBIOS AQUÍ: NUEVO CÓDIGO PARA EL MENÚ DE HAMBURGUESA ===
const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('.menu');

hamburger.addEventListener('click', () => {
    menu.classList.toggle('open');
});

// Opcional: Cerrar el menú si se hace clic en un enlace
document.querySelectorAll('.menu a').forEach(link => {
    link.addEventListener('click', () => {
        menu.classList.remove('open');
    });
});
// =============================================================

let currentSlide = 0;
const backgrounds = ['img/background.jpg', 'img/background2.jpg'];
const hero = document.getElementById('hero');
let interval;

function startAutoSlide() {
    interval = setInterval(() => {
        changeSlide(1);
    }, 5000);
}

function stopAutoSlide() {
    clearInterval(interval);
}

function changeSlide(direction) {
    stopAutoSlide();
    currentSlide = (currentSlide + direction + backgrounds.length) % backgrounds.length;
    hero.style.backgroundImage = `url(${backgrounds[currentSlide]})`;
    startAutoSlide();
}

function showSection(targetSectionId) {
    // Remove 'active' class from all nav links
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));

    // Hide all main content sections with the 'd-none' class (used for navigation logic)
    document.querySelectorAll('#main-content > section').forEach(sec => sec.classList.add('d-none'));

    // Determine whether to show or hide the hero section
    if (targetSectionId === 'inicio') {
        hero.style.display = 'flex';
        document.getElementById('inicio').classList.remove('d-none');
    } else {
        hero.style.display = 'none';
        const targetSection = document.getElementById(targetSectionId);
        if (targetSection) {
            targetSection.classList.remove('d-none');
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    }

    // Update 'active' class in main navigation
    const navLinkToActivate = document.querySelector(`.nav-link[href="#${targetSectionId}"]`);
    if (navLinkToActivate) {
        navLinkToActivate.classList.add('active');
    }
}

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        showSection(targetId);
    });
});

const heroBtn = document.querySelector('.hero-btn');
if (heroBtn) {
    heroBtn.addEventListener('click', (e) => {
        e.preventDefault();
        showSection('servicios');
    });
}

const joinUsBtn = document.getElementById('joinUsBtn');
if (joinUsBtn) {
    joinUsBtn.addEventListener('click', (e) => {
        e.preventDefault();
        showSection('contacto');
    });
}

const messageTextarea = document.getElementById('mensaje');
const charCountSpan = document.getElementById('charCount');
if (messageTextarea && charCountSpan) {
    const maxLength = messageTextarea.getAttribute('maxlength');
    messageTextarea.addEventListener('input', () => {
        const currentLength = messageTextarea.value.length;
        charCountSpan.textContent = `${currentLength} / ${maxLength}`;
    });
}

const contactMessageTextarea = document.getElementById('contact-mensaje');
const contactCharCountSpan = document.getElementById('contactCharCount');
if (contactMessageTextarea && contactCharCountSpan) {
    const contactMaxLength = contactMessageTextarea.getAttribute('maxlength');
    contactMessageTextarea.addEventListener('input', () => {
        const currentLength = contactMessageTextarea.value.length;
        contactCharCountSpan.textContent = `${currentLength} / ${contactMaxLength}`;
    });
}

const servicioImgs = document.querySelectorAll('.servicio-img');
const lightboxOverlay = document.getElementById('lightboxOverlay');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');

servicioImgs.forEach(img => {
    img.addEventListener('click', function() {
        const fullSrc = this.getAttribute('data-fullsrc');
        if (fullSrc) {
            lightboxImg.src = fullSrc;
            lightboxImg.alt = this.alt; // Added this line for accessibility
            lightboxOverlay.classList.add('active');
        }
    });
});

lightboxClose.addEventListener('click', () => {
    lightboxOverlay.classList.remove('active');
});

lightboxOverlay.addEventListener('click', function(e) {
    if (e.target === this || e.target === lightboxClose) {
        lightboxOverlay.classList.remove('active');
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const initialSectionId = window.location.hash ? window.location.hash.substring(1) : 'inicio';
    showSection(initialSectionId);
    startAutoSlide();
});