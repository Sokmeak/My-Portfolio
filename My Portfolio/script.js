// Typed.js initialization
const typed = new Typed(".multiple-text", {
  strings: [
    "Frontend Developer",
    "Mobile App Developer",
    "UI/UX Designer",
    "Full Stack Developer",
  ],
  typeSpeed: 100,
  backSpeed: 100,
  backDelay: 1000,
  loop: true,
});

// Theme toggle
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = themeToggle.querySelector("i");

// Check for saved theme preference
const currentTheme = localStorage.getItem("theme") || "light";
document.documentElement.setAttribute("data-theme", currentTheme);

if (currentTheme === "dark") {
  themeIcon.classList.replace("bx-moon", "bx-sun");
}

themeToggle.addEventListener("click", () => {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";

  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);

  if (newTheme === "dark") {
    themeIcon.classList.replace("bx-moon", "bx-sun");
  } else {
    themeIcon.classList.replace("bx-sun", "bx-moon");
  }
});

// Mobile menu toggle
const menuIcon = document.getElementById("menu-icon");
const navbar = document.getElementById("navbar");
const mediaQuery = window.matchMedia("(max-width: 786px)");

// Function to handle navbar and icon state
const updateNavbarState = () => {
  if (!mediaQuery.matches) {
    // Reset navbar to visible and remove bx-x icon when screen width > 786px
    navbar.style.display = "flex";
    menuIcon.classList.remove("bx-x");
  } else {
    navbar.style.display = "none";
  }
};

// Initial check on page load
updateNavbarState();

menuIcon.addEventListener("click", () => {
  console.log("toggling icon");

  // Only toggle navbar visibility if the screen width is 786px or less
  if (mediaQuery.matches) {
    if (navbar.style.display === "flex") {
      navbar.style.display = "none";
    } else {
      navbar.style.display = "flex";
    }
  }

  menuIcon.classList.toggle("bx-x");
});

// Listen for changes in media query state
mediaQuery.addEventListener("change", updateNavbarState);

//  Handle changes when the window is resized

// Close mobile menu when clicking on a link
document.querySelectorAll(".navbar a").forEach((link) => {
  link.addEventListener("click", () => {
    // Toggle navbar visibility

    if (mediaQuery.matches) {
      if (navbar.style.display === "flex") {
        navbar.style.display = "none";
      } else {
        navbar.style.display = "flex";
      }
      menuIcon.classList.toggle("bx-x");

      menuIcon.classList.remove("bx-x");
    }
  });
});

// Header scroll effect
const header = document.getElementById("header");
window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// Scroll reveal animation
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
    }
  });
}, observerOptions);

document.querySelectorAll(".reveal").forEach((el) => {
  observer.observe(el);
});

// Particles animation
function createParticles() {
  const particlesContainer = document.getElementById("particles");
  const particleCount = 50;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";
    particle.style.left = Math.random() * 100 + "%";
    particle.style.top = Math.random() * 100 + "%";
    particle.style.animationDelay = Math.random() * 6 + "s";
    particle.style.animationDuration = Math.random() * 3 + 3 + "s";
    particlesContainer.appendChild(particle);
  }
}

// Initialize particles
createParticles();

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Add active class to current section in navigation
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".navbar a");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.scrollY >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault();

  const serviceId = window.env.EMAIL_SERVICE_ID;

  const templateId = window.env.EMAIL_TEMPLATE_ID;

  const form = this;
  const submitBtn = form.querySelector('input[type="submit"]');
  const originalText = submitBtn.value;

  const formData = new FormData(form);
  const data = Object.fromEntries(formData);

  submitBtn.value = "Sending...";
  submitBtn.disabled = true;

  emailjs
    .send(serviceId, templateId, data)
    .then(() => {
      submitBtn.value = "Message Sent!";
      submitBtn.style.background = "#10b981";

      setTimeout(() => {
        submitBtn.value = originalText;
        submitBtn.disabled = false;
        submitBtn.style.background = "";
        form.reset();
      }, 2000);
    })
    .catch((error) => {
      console.error("EmailJS error:", error);
      alert("Failed to send message.");
      submitBtn.value = originalText;
      submitBtn.disabled = false;
    });
});
// Add hover effects to skill boxes
document.querySelectorAll(".skill-box").forEach((box) => {
  box.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-10px) scale(1.02)";
  });

  box.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)";
  });
});

// Parallax effect for hero section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const parallaxElements = document.querySelectorAll(".floating");

  parallaxElements.forEach((el) => {
    const speed = 0.5;
    el.style.transform = `translateY(${scrolled * speed}px)`;
  });
});

// Add loading animation
window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});

// Preloader
const preloader = document.createElement("div");
preloader.className = "preloader";
preloader.innerHTML = `
                      <div class="spinner"></div>
                      <p>Loading...</p>
                    `;

const preloaderStyles = `
                      .preloader {
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background: var(--bg-primary);
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        z-index: 9999;
                        transition: opacity 0.5s ease;
                      }

                      .spinner {
                        width: 50px;
                        height: 50px;
                        border: 3px solid var(--border-color);
                        border-top: 3px solid var(--primary-color);
                        border-radius: 50%;
                        animation: spin 1s linear infinite;
                        margin-bottom: 1rem;
                      }

                      @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                      }

                      .preloader p {
                        color: var(--text-secondary);
                        font-size: 1.1rem;
                      }

                      .preloader.fade-out {
                        opacity: 0;
                        pointer-events: none;
                      }
                    `;

const styleSheet = document.createElement("style");
styleSheet.textContent = preloaderStyles;
document.head.appendChild(styleSheet);
document.body.appendChild(preloader);

window.addEventListener("load", () => {
  setTimeout(() => {
    preloader.classList.add("fade-out");
    setTimeout(() => {
      preloader.remove();
    }, 500);
  }, 1000);
});
