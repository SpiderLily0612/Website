
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
const productsContainer = document.querySelector('.products');
let currentPosition = 0;

function slideProducts(direction) {
  const productElement = document.querySelector('.product');
  const productStyle = window.getComputedStyle(productElement);
  const productWidth = productElement.offsetWidth + parseInt(productStyle.marginRight); // width + gap
  const totalProducts = document.querySelectorAll('.product').length;
  const visibleProducts = 4;
  const maxPosition = -(totalProducts - visibleProducts) * productWidth;

  if (direction === 'next') {
    if (currentPosition > maxPosition) {
      currentPosition -= productWidth;
      productsContainer.style.transition = 'transform 0.5s ease-in-out';
    } else {
      
      productsContainer.style.transition = 'transform 0.5s ease-in-out';
      currentPosition = 0;
      productsContainer.style.transform = `translateX(${currentPosition}px)`;
      return;
    }
  } else if (direction === 'prev') {
    if (currentPosition < 0) {
      currentPosition += productWidth;
      productsContainer.style.transition = 'transform 0.5s ease-in-out';
    } else {
      
      productsContainer.style.transition = 'transform 0.5s ease-in-out';
      currentPosition = maxPosition;
      productsContainer.style.transform = `translateX(${currentPosition}px)`;
      return;
    }
  }

  productsContainer.style.transform = `translateX(${currentPosition}px)`;
}

prevButton.addEventListener('click', () => slideProducts('prev'));
nextButton.addEventListener('click', () => slideProducts('next'));


const cartCount = document.querySelector('.cart-count');
let count = 0;

function updateCart() {
  cartCount.textContent = count;
}

document.querySelectorAll('.cta-button, .shop-button').forEach(button => {
  button.addEventListener('click', () => {
    count++;
    updateCart();
  });
});


const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('nav a');

window.addEventListener('scroll', () => {
  let currentSectionId = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 60;
    const sectionHeight = section.offsetHeight;
    if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
      currentSectionId = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + currentSectionId) {
      link.classList.add('active');
    }
  });
});


navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      window.scrollTo({
        top: targetSection.offsetTop - 50,
        behavior: 'smooth'
      });
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const loginLink = document.querySelector(".login");
  const loginSpan = loginLink ? loginLink.querySelector("span") : null;
  if (isLoggedIn === "true") {
    const user = JSON.parse(localStorage.getItem("goldencrustUser"));
    if (user && user.fullName) {
      if (loginSpan) {
        loginSpan.textContent = `Hello! ${user.fullName}`;
      }
      if (loginLink) {
        loginLink.href = "dashboard.html";
      }
    }
  } else {
    if (loginSpan) {
      loginSpan.textContent = "Log In";
    }
    if (loginLink) {
      loginLink.href = "login.html";
    }
  }
});
