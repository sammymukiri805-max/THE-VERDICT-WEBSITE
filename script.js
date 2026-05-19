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

// Contact form handling
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

// --- Add Product Buttons for all three sections ---
function createProductCard(name, verdict, link, isAmazon = false) {
  const card = document.createElement('div');
  card.className = 'project-card';
  
  let buttonText = 'Check price →';
  let linkClass = 'project-link affiliate-link';
  
  if (isAmazon) {
    buttonText = 'Check price on Amazon →';
  }
  
  card.innerHTML = `
    <h3>${escapeHtml(name)}</h3>
    <p>${escapeHtml(verdict)}</p>
    <a href="${escapeHtml(link)}" target="_blank" rel="nofollow noopener" class="${linkClass}">${buttonText}</a>
  `;
  return card;
}

function escapeHtml(str) {
  return str.replace(/[&<>]/g, function(m) {
    if (m === '&') return '&amp;';
    if (m === '<') return '&lt;';
    if (m === '>') return '&gt;';
    return m;
  });
}

// Helper to hide the "coming soon" message for a section
function hideComingSoon(sectionId) {
  const section = document.getElementById(sectionId);
  if (!section) return;
  const comingSoon = section.querySelector('.coming-soon');
  if (comingSoon) {
    comingSoon.style.display = 'none';
  }
}

// Get all add product buttons
const addButtons = document.querySelectorAll('.add-product-btn');
addButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const section = btn.getAttribute('data-section'); // 'tiktok', 'amazon', or 'ai'
    const gridId = `${section}ProductGrid`;
    const productGrid = document.getElementById(gridId);
    if (!productGrid) return;
    
    // Custom prompt messages based on section
    let productType = '';
    let isAmazon = false;
    if (section === 'tiktok') productType = 'TikTok tool';
    else if (section === 'amazon') {
      productType = 'Amazon product';
      isAmazon = true;
    }
    else if (section === 'ai') productType = 'AI writing tool';
    
    const productName = prompt(`Enter the ${productType} name:`);
    if (!productName) return;
    
    const verdict = prompt(`Enter your verdict (e.g., "Fast growth, 9.2/10"):`);
    if (!verdict) return;
    
    const affiliateLink = prompt(`Enter the affiliate link (URL):`);
    if (!affiliateLink) return;
    
    const newCard = createProductCard(productName, verdict, affiliateLink, isAmazon);
    productGrid.appendChild(newCard);
    
    // Hide the "coming soon" message for this section
    hideComingSoon(section);
  });
});