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
      if (navLinks.classList.contains('show')) navLinks.classList.remove('show');
    }
  });
});

// Copy email
const copyBtn = document.getElementById('copyEmailBtn');
if (copyBtn) {
  copyBtn.addEventListener('click', () => {
    const email = 'bestverdict@gmail.com';
    navigator.clipboard.writeText(email).then(() => {
      const original = copyBtn.textContent;
      copyBtn.textContent = 'Copied!';
      setTimeout(() => copyBtn.textContent = original, 2000);
    }).catch(() => alert('Could not copy.'));
  });
}

// Contact form
const contactForm = document.getElementById('contactForm');
const formFeedback = document.getElementById('formFeedback');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    if (!name || !email || !message) {
      formFeedback.textContent = 'Please fill all fields.';
      formFeedback.style.color = '#f97316';
      return;
    }
    if (!email.includes('@') || !email.includes('.')) {
      formFeedback.textContent = 'Enter a valid email address.';
      formFeedback.style.color = '#f97316';
      return;
    }
    formFeedback.innerHTML = `Thanks ${name}! We'll reply from <strong>bestverdict@gmail.com</strong>.`;
    formFeedback.style.color = '#d4af37';
    contactForm.reset();
    setTimeout(() => formFeedback.innerHTML = '', 5000);
  });
}

// ---------- Product addition logic ----------
function createProductCard(name, verdict, link, section) {
  const card = document.createElement('div');
  card.className = 'project-card';
  let buttonText = 'Check price →';
  if (section === 'amazon') buttonText = 'Check price on Amazon →';
  if (section === 'tiktok') buttonText = 'Shop on TikTok →';
  if (section === 'ai') buttonText = 'Try for free →';
  
  card.innerHTML = `
    <h3>${escapeHtml(name)}</h3>
    <p>${escapeHtml(verdict)}</p>
    <a href="${escapeHtml(link)}" target="_blank" rel="nofollow noopener" class="affiliate-link">${buttonText}</a>
  `;
  return card;
}

function escapeHtml(str) {
  return str.replace(/[&<>]/g, (m) => {
    if (m === '&') return '&amp;';
    if (m === '<') return '&lt;';
    if (m === '>') return '&gt;';
    return m;
  });
}

function hideComingSoon(sectionId) {
  const el = document.getElementById(`${sectionId}ComingSoon`);
  if (el) el.style.display = 'none';
}

const addButtons = document.querySelectorAll('.add-product-btn');
addButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const section = btn.getAttribute('data-section');
    const gridId = `${section}ProductGrid`;
    const productGrid = document.getElementById(gridId);
    if (!productGrid) return;
    
    let productType = '';
    if (section === 'tiktok') productType = 'TikTok Shop product';
    else if (section === 'amazon') productType = 'Amazon product';
    else if (section === 'ai') productType = 'AI writing tool';
    
    const productName = prompt(`Enter ${productType} name:`);
    if (!productName) return;
    const verdict = prompt(`Enter your verdict (e.g., "Excellent value, 9.5/10"):`);
    if (!verdict) return;
    const link = prompt(`Enter affiliate link (URL):`);
    if (!link) return;
    
    const newCard = createProductCard(productName, verdict, link, section);
    productGrid.appendChild(newCard);
    hideComingSoon(section);
  });
});