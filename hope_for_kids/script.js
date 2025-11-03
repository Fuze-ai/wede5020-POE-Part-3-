// JavaScript for Hope for Kids Website

// Lightbox functionality
document.addEventListener('DOMContentLoaded', function() {
  // Initialize lightbox
  initLightbox();
  
  // Initialize form validation
  initFormValidation();
  
  // Initialize search functionality
  initSearch();
  
  // Add smooth scrolling for anchor links
  initSmoothScrolling();
});

// Lightbox functionality
function initLightbox() {
  const galleryImages = document.querySelectorAll('.gallery img');
  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.innerHTML = `
    <span class="lightbox-close">&times;</span>
    <img class="lightbox-content" src="" alt="">
  `;
  document.body.appendChild(lightbox);
  
  const lightboxImg = lightbox.querySelector('.lightbox-content');
  const closeBtn = lightbox.querySelector('.lightbox-close');
  
  galleryImages.forEach(img => {
    img.addEventListener('click', () => {
      lightbox.style.display = 'flex';
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
    });
  });
  
  closeBtn.addEventListener('click', () => {
    lightbox.style.display = 'none';
  });
  
  lightbox.addEventListener('click', (e) => {
    if (e.target !== lightboxImg) {
      lightbox.style.display = 'none';
    }
  });
}

// Form validation
function initFormValidation() {
  const forms = document.querySelectorAll('form');
  
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      if (validateForm(this)) {
        // Show success message
        const successMessage = this.querySelector('.success-message') || createSuccessMessage(this);
        successMessage.style.display = 'block';
        
        // Reset form
        this.reset();
        
        // Hide success message after 5 seconds
        setTimeout(() => {
          successMessage.style.display = 'none';
        }, 5000);
      }
    });
    
    // Real-time validation
    const inputs = form.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
      input.addEventListener('blur', () => {
        validateField(input);
      });
      
      input.addEventListener('input', () => {
        clearError(input);
      });
    });
  });
}

function validateForm(form) {
  let isValid = true;
  const inputs = form.querySelectorAll('input, textarea, select');
  
  inputs.forEach(input => {
    if (!validateField(input)) {
      isValid = false;
    }
  });
  
  return isValid;
}

function validateField(field) {
  const value = field.value.trim();
  let isValid = true;
  let errorMessage = '';
  
  // Clear previous error
  clearError(field);
  
  // Required field validation
  if (field.hasAttribute('required') && value === '') {
    isValid = false;
    errorMessage = 'This field is required';
  }
  
  // Email validation
  if (field.type === 'email' && value !== '') {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      isValid = false;
      errorMessage = 'Please enter a valid email address';
    }
  }
  
  // Phone validation
  if (field.name === 'phone' && value !== '') {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    if (!phoneRegex.test(value.replace(/[\s\-\(\)]/g, ''))) {
      isValid = false;
      errorMessage = 'Please enter a valid phone number';
    }
  }
  
  // Message length validation
  if (field.name === 'message' && value.length < 10) {
    isValid = false;
    errorMessage = 'Message must be at least 10 characters long';
  }
  
  if (!isValid) {
    showError(field, errorMessage);
  }
  
  return isValid;
}

function showError(field, message) {
  const errorElement = document.createElement('div');
  errorElement.className = 'error';
  errorElement.textContent = message;
  field.parentNode.appendChild(errorElement);
  field.style.borderColor = 'var(--error)';
}

function clearError(field) {
  const errorElement = field.parentNode.querySelector('.error');
  if (errorElement) {
    errorElement.remove();
  }
  field.style.borderColor = '#ccc';
}

function createSuccessMessage(form) {
  const successMessage = document.createElement('div');
  successMessage.className = 'success-message';
  successMessage.textContent = 'Thank you for your message! We will get back to you soon.';
  form.insertBefore(successMessage, form.firstChild);
  return successMessage;
}

// Search functionality
function initSearch() {
  const searchInput = document.getElementById('service-search');
  const searchButton = document.getElementById('search-button');
  
  if (searchInput && searchButton) {
    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keyup', function(e) {
      if (e.key === 'Enter') {
        performSearch();
      }
    });
  }
}

function performSearch() {
  const searchTerm = document.getElementById('service-search').value.toLowerCase();
  const serviceItems = document.querySelectorAll('.service-item');
  const noResults = document.getElementById('no-results');
  
  let hasResults = false;
  
  serviceItems.forEach(item => {
    const text = item.textContent.toLowerCase();
    if (text.includes(searchTerm)) {
      item.classList.remove('hidden');
      hasResults = true;
    } else {
      item.classList.add('hidden');
    }
  });
  
  if (noResults) {
    noResults.style.display = hasResults ? 'none' : 'block';
  }
}

// Smooth scrolling
function initSmoothScrolling() {
  const navLinks = document.querySelectorAll('nav a[href^="#"]');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}