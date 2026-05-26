// Навигация и кнопка
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const navLogoWord = document.querySelector('.nav-logo-word');
const navCtaBtn = document.getElementById('navCtaBtn');
// Проверяем, на внутренней ли мы странице
const isInnerPage = document.body.classList.contains('inner-page');

if (isInnerPage) { 
    navbar.classList.remove('bg-transparent');
    navbar.classList.add('bg-pages');
}

function updateNav() {
    const scrolled = window.scrollY > 40;
    navbar.classList.toggle('nav-scrolled', scrolled);
    
    /*if (navLogoWord) { navLogoWord.style.color = scrolled ? '#0F1A4A' : 'white'; }*/
    
    navLinks.forEach(link => {
        link.className = scrolled
            ? 'nav-link text-sm text-slate-300 hover:text-white transition-colors'
            : 'nav-link text-sm text-white/70 hover:text-white transition-colors';
    });

    /*if (navCtaBtn) {
        if (scrolled) {
            navCtaBtn.classList.remove('bg-white', 'text-white', 'hover:bg-blue-50');
            navCtaBtn.classList.add('bg-brand-600', 'text-white', 'hover:bg-brand-800');
        } else {
            navCtaBtn.classList.remove('bg-brand-900', 'text-white', 'hover:bg-brand-800');
            navCtaBtn.classList.add('bg-white', 'text-white', 'hover:bg-blue-50');
        }
    }*/
}
window.addEventListener('scroll', updateNav);
updateNav();

// Мобильное меню
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));
    mobileMenu.querySelectorAll('a').forEach(link => { link.addEventListener('click', () => mobileMenu.classList.add('hidden')); });
}

// Анимация появления
const fadeEls = document.querySelectorAll('.fade-up');
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) { setTimeout(() => entry.target.classList.add('visible'), i * 60); observer.unobserve(entry.target); }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
fadeEls.forEach(el => observer.observe(el));

// Cookie Banner
const cookieBanner = document.getElementById('cookieBanner');
const cookieAccept = document.getElementById('cookieAccept');
if (cookieBanner && cookieAccept) {
    if (!localStorage.getItem('cookieAccepted')) {
        setTimeout(() => { cookieBanner.classList.remove('opacity-0', 'translate-y-4', 'pointer-events-none'); cookieBanner.classList.add('opacity-100', 'translate-y-0', 'pointer-events-auto'); }, 2000);
    } else { cookieBanner.classList.add('hidden'); }

    cookieAccept.addEventListener('click', () => {
        localStorage.setItem('cookieAccepted', 'true');
        cookieBanner.classList.remove('opacity-100', 'translate-y-0', 'pointer-events-auto');
        cookieBanner.classList.add('opacity-0', 'translate-y-4', 'pointer-events-none');
        setTimeout(() => cookieBanner.classList.add('hidden'), 500);
    });
}