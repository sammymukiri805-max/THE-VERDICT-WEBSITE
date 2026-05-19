// Mobile menu toggle
const mobileBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.querySelector('.nav-links');

if (mobileBtn && navLinks) {
  mobileBtn.addEventListener('click', () => {
    navLinks.classList.toggle('show');
  });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');
    if (targetId === "#") return;
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      e.preventDefault();
      targetElement.scrollIntoView({ behavior: 'smooth' });
      if (navLinks.classList.contains('show')) {
        navLinks.classList.remove('show');
      }
    }
  });
});

// Copy email to clipboard
const copyBtn = document.getElementById('copyEmailBtn');
if (copyBtn) {
  copyBtn.addEventListener('click', () => {
    const email = 'bestverdict@gmail.com';
    navigator.clipboard.writeText(email).then(() => {
      const originalText = copyBtn.textContent;
      copyBtn.textContent = 'Copied!';
      setTimeout(() => {
        copyBtn.textContent = originalText;
      }, 2000);
    }).catch(() => {
      alert('Could not copy. Please select manually.');
    });
  });
}

// Contact form handling (demo)
const contactForm = document.getElementById('contactForm');
const formFeedback = document.getElementById('formFeedback');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
      formFeedback.textContent = 'Please fill in all fields.';
      formFeedback.style.color = '#dc2626';
      return;
    }

    if (!email.includes('@') || !email.includes('.')) {
      formFeedback.textContent = 'Enter a valid email address.';
      formFeedback.style.color = '#dc2626';
      return;
    }

    formFeedback.innerHTML = `Thanks ${name}! We'll review your request and reply from <strong>bestverdict@gmail.com</strong>.`;
    formFeedback.style.color = '#10b981';
    contactForm.reset();

    setTimeout(() => {
      formFeedback.innerHTML = '';
    }, 5000);
  });
}