/*==================== NAV MENU TOGGLE ====================*/
const navMenu = document.getElementById("nav-menu"),
  navToggle = document.getElementById("nav-toggle"),
  navClose = document.getElementById("nav-close");

if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu");
  });
}

if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
  });
}

/*==================== CLOSE MENU ON LINK CLICK ====================*/
const navLink = document.querySelectorAll(".nav__link");
navLink.forEach((n) => n.addEventListener("click", () => {
  document.getElementById("nav-menu").classList.remove("show-menu");
}));

/*==================== SKILLS ACCORDION ====================*/
const skillsContent = document.getElementsByClassName("skills__content"),
  skillsHeader = document.querySelectorAll(".skills__header");

function toggleSkills() {
  let itemClass = this.parentNode.className;
  for (let i = 0; i < skillsContent.length; i++) {
    skillsContent[i].className = "skills__content skills__close";
  }
  if (itemClass === "skills__content skills__close") {
    this.parentNode.className = "skills__content skills__open";
  }
}

skillsHeader.forEach((el) => el.addEventListener("click", toggleSkills));

/*==================== QUALIFICATION TABS ====================*/
const tabs = document.querySelectorAll("[data-target]"),
  tabContents = document.querySelectorAll("[data-content]");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = document.querySelector(tab.dataset.target);

    tabContents.forEach((tc) => tc.classList.remove("qualification__active"));
    target.classList.add("qualification__active");

    tabs.forEach((t) => t.classList.remove("qualification__active"));
    tab.classList.add("qualification__active");
  });
});

/*==================== SERVICES MODAL ====================*/
const modalViews = document.querySelectorAll(".services__modal"),
  modalBtns = document.querySelectorAll(".services__button"),
  modalCloses = document.querySelectorAll(".services__modal-close");

// Each button opens only its own modal (others stay as they are)
modalBtns.forEach((btn, i) => {
  btn.addEventListener("click", () => {
    modalViews[i].classList.add("active-modal");
  });
});

// Each close button closes only its own modal
modalCloses.forEach((close, i) => {
  close.addEventListener("click", () => {
    modalViews[i].classList.remove("active-modal");
  });
});

// Clicking the backdrop also closes that specific modal
modalViews.forEach((modal) => {
  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.classList.remove("active-modal");
  });
});

/*==================== PORTFOLIO SWIPER ====================*/
let swiper = new Swiper(".portfolio__container", {
  cssMode: true,
  loop: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  mousewheel: true,
  keyboard: true,
});

/*==================== SCROLL ACTIVE LINK ====================*/
const sections = document.querySelectorAll("section[id]");

function scrollActive() {
  const scrollY = window.pageYOffset;
  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 58;
    const sectionId = current.getAttribute("id");
    const link = document.querySelector('.nav__menu a[href*="' + sectionId + '"]');
    if (!link) return;
    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      link.classList.add("active-link");
    } else {
      link.classList.remove("active-link");
    }
  });
}
window.addEventListener("scroll", scrollActive);

/*==================== HEADER SCROLL SHADOW ====================*/
function scrollHeader() {
  const nav = document.getElementById("header");
  if (this.scrollY >= 80) {
    nav.classList.add("scroll-header");
  } else {
    nav.classList.remove("scroll-header");
  }
}
window.addEventListener("scroll", scrollHeader);

/*==================== SCROLL UP BUTTON ====================*/
function scrollUp() {
  const scrollUpBtn = document.getElementById("scroll-up");
  if (this.scrollY >= 560) {
    scrollUpBtn.classList.add("show-scroll");
  } else {
    scrollUpBtn.classList.remove("show-scroll");
  }
}
window.addEventListener("scroll", scrollUp);

/*==================== THEME TOGGLE (dark default, light on toggle) ====================*/
const themeButton = document.getElementById("theme-button");
const LIGHT_CLASS = "light-theme";
const STORAGE_KEY = "portfolio-theme";

// Apply saved theme
const savedTheme = localStorage.getItem(STORAGE_KEY);
if (savedTheme === "light") {
  document.body.classList.add(LIGHT_CLASS);
}

// Sync icon to current state
function syncIcon() {
  const isLight = document.body.classList.contains(LIGHT_CLASS);
  // Show moon icon when in light mode (to switch to dark), sun when dark
  themeButton.className = isLight
    ? "uil uil-moon change-theme"
    : "uil uil-sun change-theme";
}
syncIcon();

themeButton.addEventListener("click", () => {
  document.body.classList.toggle(LIGHT_CLASS);
  localStorage.setItem(
    STORAGE_KEY,
    document.body.classList.contains(LIGHT_CLASS) ? "light" : "dark"
  );
  syncIcon();
});
