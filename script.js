// Nav scroll behavior
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// Mobile menu
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');
let menuOpen = false;

burger.addEventListener('click', () => {
  menuOpen = !menuOpen;
  mobileMenu.classList.toggle('open', menuOpen);
  document.body.style.overflow = menuOpen ? 'hidden' : '';

  const spans = burger.querySelectorAll('span');
  if (menuOpen) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  }
});

mobileMenu.querySelectorAll('.mobile-menu__link').forEach(link => {
  link.addEventListener('click', () => {
    menuOpen = false;
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
    const spans = burger.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  });
});

// Fade-up intersection observer
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// Contact form
const form = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');

if (form) {
  form.addEventListener('submit', async function(e) {
    e.preventDefault();

    const btnSpan = submitBtn.querySelector('span');
    submitBtn.disabled = true;
    btnSpan.textContent = 'Sending...';

    const formData = new FormData(form);
    const action = form.getAttribute('action');

    // If form action is the placeholder, use mailto fallback
    if (action.includes('YOUR_FORM_ID')) {
      const name = formData.get('name') || '';
      const email = formData.get('email') || '';
      const message = formData.get('message') || '';

      const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
      const mailtoUrl = `mailto:hello@theodyssey.one?subject=${encodeURIComponent('Inquiry from theodyssey.one')}&body=${encodeURIComponent(body)}`;

      window.location.href = mailtoUrl;
      btnSpan.textContent = 'Send message';
      submitBtn.disabled = false;
      return;
    }

    try {
      const response = await fetch(action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        btnSpan.textContent = 'Message sent!';
        submitBtn.style.background = 'linear-gradient(135deg, #10B981, #059669)';
        submitBtn.querySelector('svg').style.display = 'none';
        form.reset();
        setTimeout(() => {
          btnSpan.textContent = 'Send message';
          submitBtn.style.background = '';
          submitBtn.querySelector('svg').style.display = '';
          submitBtn.disabled = false;
        }, 4000);
      } else {
        throw new Error('Form submission failed');
      }
    } catch {
      btnSpan.textContent = 'Something went wrong — try email';
      submitBtn.style.background = 'linear-gradient(135deg, #EF4444, #DC2626)';
      setTimeout(() => {
        btnSpan.textContent = 'Send message';
        submitBtn.style.background = '';
        submitBtn.disabled = false;
      }, 3000);
    }
  });
}

// Smooth active nav highlight on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav__links a[href^="#"]');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.style.color = link.getAttribute('href') === `#${id}` ? 'var(--text)' : '';
        });
      }
    });
  },
  { rootMargin: '-40% 0px -40% 0px' }
);

sections.forEach(section => sectionObserver.observe(section));

// Cookie banner
const cookieBanner = document.getElementById('cookieBanner');
const COOKIE_KEY = 'odyssey_cookie_consent';

if (!localStorage.getItem(COOKIE_KEY)) {
  cookieBanner.classList.remove('hidden');
} else {
  cookieBanner.classList.add('hidden');
}

document.getElementById('cookieAccept').addEventListener('click', () => {
  localStorage.setItem(COOKIE_KEY, 'accepted');
  cookieBanner.classList.add('hidden');
});

document.getElementById('cookieDecline').addEventListener('click', () => {
  localStorage.setItem(COOKIE_KEY, 'declined');
  cookieBanner.classList.add('hidden');
});
