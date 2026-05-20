// Mobile menu toggle
const mobileBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.querySelector('.nav-links');

if (mobileBtn && navLinks) {
  mobileBtn.addEventListener('click', () => {
    navLinks.classList.toggle('show');
  });
}

// Smooth scroll
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

// ---------- Product creation with image & video ----------
function createProductCard(name, verdict, link, section, imageUrl, videoUrl) {
  const card = document.createElement('div');
  card.className = 'project-card';
  
  let buttonText = 'Check price →';
  if (section === 'amazon') buttonText = 'Check price on Amazon →';
  else if (section === 'tiktok') buttonText = 'Shop on TikTok →';
  else if (section === 'ai') buttonText = 'Try for free →';
  
  let mediaHtml = '';
  
  // Prefer video if provided
  if (videoUrl && videoUrl.trim() !== '') {
    // Check if it's YouTube
    if (videoUrl.includes('youtube.com/watch') || videoUrl.includes('youtu.be')) {
      let embedUrl = videoUrl.replace('watch?v=', 'embed/').replace('youtu.be/', 'youtube.com/embed/');
      if (embedUrl.includes('&')) embedUrl = embedUrl.split('&')[0];
      mediaHtml = `<div class="video-container"><iframe src="${escapeHtml(embedUrl)}" frameborder="0" allowfullscreen></iframe></div>`;
    }
    // Check if it's Vimeo
    else if (videoUrl.includes('vimeo.com')) {
      let vimeoId = videoUrl.split('/').pop().split('?')[0];
      mediaHtml = `<div class="video-container"><iframe src="https://player.vimeo.com/video/${escapeHtml(vimeoId)}" frameborder="0" allowfullscreen></iframe></div>`;
    }
    // Otherwise treat as direct MP4 link
    else {
      mediaHtml = `<video class="product-video" controls playsinline><source src="${escapeHtml(videoUrl)}" type="video/mp4">Your browser does not support video.</video>`;
    }
  } 
  else if (imageUrl && imageUrl.trim() !== '') {
    mediaHtml = `<img src="${escapeHtml(imageUrl)}" alt="${escapeHtml(name)}" class="product-image">`;
  }
  
  card.innerHTML = `
    ${mediaHtml}
    <h3>${escapeHtml(name)}</h3>
    <p>${escapeHtml(verdict)}</p>
    <a href="${escapeHtml(link)}" target="_blank" rel="nofollow noopener" class="affiliate-link">${buttonText}</a>
  `;
  return card;
}

function escapeHtml(str) {
  if (!str) return '';
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

// Attach event listeners to all "Add Product" buttons
const addButtons = document.querySelectorAll('.add-product-btn');
console.log(`Found ${addButtons.length} add buttons`);

addButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const section = btn.getAttribute('data-section');
    const gridId = `${section}ProductGrid`;
    const productGrid = document.getElementById(gridId);
    
    if (!productGrid) {
      alert(`Error: Cannot find product grid with id "${gridId}". Please check your HTML.`);
      return;
    }
    
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
    
    const imageUrl = prompt(`Paste an IMAGE URL (optional – press Enter to skip):`);
    const videoUrl = prompt(`Paste a VIDEO URL (YouTube, Vimeo, or MP4 link) – optional:`);
    
    const newCard = createProductCard(productName, verdict, link, section, imageUrl, videoUrl);
    productGrid.appendChild(newCard);
    console.log(`Added new product to ${section} grid`);
    
    hideComingSoon(section);
  });
});