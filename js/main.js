// Theme toggle
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;
const stored = localStorage.getItem('theme');
if (stored === 'dark' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  html.classList.add('dark');
}
themeToggle.addEventListener('click', () => {
  html.classList.toggle('dark');
  localStorage.setItem('theme', html.classList.contains('dark') ? 'dark' : 'light');
});

// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
if (mobileMenuBtn && mobileMenu) {
  mobileMenuBtn.addEventListener('click', () => {
    const isHidden = mobileMenu.classList.toggle('hidden');
    mobileMenuBtn.setAttribute('aria-expanded', (!isHidden).toString());
  });
}

// Close mobile menu on link click
document.querySelectorAll('#mobileMenu a').forEach(a => {
  a.addEventListener('click', () => {
    if (mobileMenu) {
      mobileMenu.classList.add('hidden');
      if (mobileMenuBtn) mobileMenuBtn.setAttribute('aria-expanded', 'false');
    }
  });
});

// Skill bars — animate when scrolled into view
const skillSection = document.getElementById('skillBars');
const bars = document.querySelectorAll('.skill-bar-fill');
let barsAnimated = false;

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !barsAnimated) {
      barsAnimated = true;
      bars.forEach(bar => {
        bar.style.width = bar.dataset.width;
      });
    }
  });
}, { threshold: 0.3 });

if (skillSection) observer.observe(skillSection);

// Nav active state tracking
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.id;
  });
  document.querySelectorAll('.nav-link').forEach(link => {
    const isActive = link.getAttribute('href') === '#' + current;
    link.classList.toggle('text-cyber-600', isActive);
    link.classList.toggle('dark:text-cyber-400', isActive);
    link.classList.toggle('text-slate-600', !isActive);
    link.classList.toggle('dark:text-slate-400', !isActive);
  });
});
