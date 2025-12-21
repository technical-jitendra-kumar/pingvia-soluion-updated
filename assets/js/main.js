/* =====================================
   HELPERS
===================================== */
const qs = (selector) => document.querySelector(selector);
const qsa = (selectors) => document.querySelectorAll(selectors);

/* =====================================
   ELEMENTS
===================================== */
const header = qs("header");
const modal = qs("#contact-modal");
const modalClose = qs(".modal-close");
const demoButtons = qsa(".open-demo");
const form = qs("#contact-form");

const chatbotToggle = qs("#chatbot-toggle");
const chatbotWindow = qs("#chatbot-window");
const chatbotClose = qs("#chatbot-close");
const chatbotForm = qs("#chatbot-form");
const chatbotInput = qs("#chatbot-input");
const chatbotMessages = qs("#chatbot-messages");

// Hamburger & Mobile Menu
const hamburger = qs(".hamburger");
const mobileMenu = qs(".mobile-menu");

/* =====================================
   STICKY HEADER WITH SHADOW
===================================== */
window.addEventListener("scroll", () => {
  header.classList.toggle("header-scrolled", window.scrollY > 20);
});

/* =====================================
   SMOOTH SCROLL FOR INTERNAL LINKS
===================================== */
qsa('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    const href = link.getAttribute("href");

    if (href === "#") return;

    const target = qs(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });

      // Close mobile menu if open
      if (mobileMenu.classList.contains("active")) {
        mobileMenu.classList.remove("active");
        hamburger.classList.remove("active");
      }
    }
  });
});

/* =====================================
   ACTIVE NAVIGATION HIGHLIGHT
===================================== */
const sections = qsa("section[id]");
const navLinks = qsa(".nav a, .mobile-menu a"); // Both desktop & mobile

function updateActiveLink() {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 150;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
  });
}

window.addEventListener("scroll", updateActiveLink);
updateActiveLink(); // Initial check

/* =====================================
   MOBILE MENU TOGGLE (HAMBURGER)
===================================== */
hamburger?.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  mobileMenu.classList.toggle("active");
});

// Close mobile menu when clicking outside
document.addEventListener("click", (e) => {
  if (
    mobileMenu.classList.contains("active") &&
    !mobileMenu.contains(e.target) &&
    !hamburger.contains(e.target)
  ) {
    mobileMenu.classList.remove("active");
    hamburger.classList.remove("active");
  }
});

/* =====================================
   MODAL LOGIC (BOOK DEMO)
===================================== */
demoButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    modal.classList.add("active");
  });
});

modalClose?.addEventListener("click", () => {
  modal.classList.remove("active");
});

// Click outside modal to close
modal?.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.remove("active");
  }
});

// Escape key close
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    modal.classList.remove("active");
    if (mobileMenu.classList.contains("active")) {
      mobileMenu.classList.remove("active");
      hamburger.classList.remove("active");
    }
  }
});

/* =====================================
   CONTACT FORM SUBMISSION (DEMO ONLY)
===================================== */
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    // Basic validation
    if (!data.name?.trim() || !data.email?.trim()) {
      alert("Please fill in your Name and Email.");
      return;
    }

    // Success message
    alert("Thank you, " + data.name.split(" ")[0] + "! We’ll contact you soon.");

    // Reset form & close modal
    form.reset();
    modal.classList.remove("active");
  });
}

/* =====================================
   CHATBOT WIDGET
===================================== */
// Initial hidden state
if (chatbotWindow) chatbotWindow.style.display = "none";

chatbotToggle?.addEventListener("click", (e) => {
  e.stopPropagation();
  chatbotWindow.style.display = "flex";
});

chatbotClose?.addEventListener("click", () => {
  chatbotWindow.style.display = "none";
});

// Send message
chatbotForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = chatbotInput.value.trim();
  if (!message) return;

  addChatMessage(message, "user");
  chatbotInput.value = "";

  // Simulate bot response
  setTimeout(() => {
    const replies = [
      "Hi! Thanks for reaching out. How can I assist you today?",
      "Interested in WhatsApp Business API? I can guide you through onboarding!",
      "We also offer Google RCS, IVR, Bulk SMS, and custom web solutions.",
      "Want to book a free demo? Just fill the form and we'll contact you!",
      "Our team typically responds within 1-2 hours during business days."
    ];
    const randomReply = replies[Math.floor(Math.random() * replies.length)];
    addChatMessage(randomReply, "bot");
  }, 800);
});

function addChatMessage(text, sender) {
  const messageDiv = document.createElement("div");
  messageDiv.className = sender === "user" ? "user-message" : "bot-message";
  messageDiv.textContent = text;
  chatbotMessages.appendChild(messageDiv);
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

/* =====================================
   CONSOLE LOG
===================================== */
console.log("%cPingvia Solutions JS Loaded Successfully ✔", "color: #0ea5e9; font-size: 1.2rem; font-weight: bold;");