// Function to update local time every second
function updateLocalTime() {
  const timeElements = document.querySelectorAll(
    "#local-time, #mobile-local-time",
  );
  timeElements.forEach((element) => {
    if (element) {
      const now = new Date();
      const timeString = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: is12HourFormat,
      });
      element.textContent = timeString;
    }
  });
}
// Set initial time and start interval
updateLocalTime();
setInterval(updateLocalTime, 1000);

// Event listener to close dropdowns
function closeAllDropdowns() {
  document
    .querySelectorAll(".menu-dropdown, .language-dropdown")
    .forEach((dropdown) => {
      dropdown.classList.add("hidden");
    });
  document
    .querySelectorAll(".menu-toggle, .language-switcher-btn")
    .forEach((button) => {
      button.setAttribute("aria-expanded", "false");
    });
}

// Function to setup dropdown functionality
function setupDropdown(buttonSelector, containerSelector, dropdownSelector) {
  const buttons = document.querySelectorAll(buttonSelector);
  buttons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      const container = button.closest(containerSelector);
      const dropdown = container
        ? container.querySelector(dropdownSelector)
        : null;
      if (!dropdown) return;
      const isHidden = dropdown.classList.contains("hidden");
      closeAllDropdowns();
      if (isHidden) {
        dropdown.classList.remove("hidden");
        button.setAttribute("aria-expanded", "true");
      }
    });
  });
}

// Setup dropdowns for both desktop and mobile
setupDropdown(".menu-toggle", ".menu-group", ".menu-dropdown");
setupDropdown(
  ".language-switcher-btn",
  ".language-switcher",
  ".language-dropdown",
);
document.addEventListener("click", () => {
  closeAllDropdowns();
});

// Theme toggle functionality
const themeToggleBtnDesktop = document.getElementById(
  "theme-toggle-button-desktop",
);
const themeToggleDarkIconDesktop = document.getElementById(
  "theme-toggle-dark-icon-desktop",
);
const themeToggleLightIconDesktop = document.getElementById(
  "theme-toggle-light-icon-desktop",
);
const themeToggleBtnMobile = document.getElementById(
  "theme-toggle-button-mobile",
);
const themeToggleDarkIconMobile = document.getElementById(
  "theme-toggle-dark-icon-mobile",
);
const themeToggleLightIconMobile = document.getElementById(
  "theme-toggle-light-icon-mobile",
);

// Function to update icons based on theme
function updateIcons(isDarkMode) {
  if (themeToggleDarkIconDesktop && themeToggleLightIconDesktop) {
    if (isDarkMode) {
      themeToggleLightIconDesktop.classList.remove("hidden");
      themeToggleDarkIconDesktop.classList.add("hidden");
    } else {
      themeToggleLightIconDesktop.classList.add("hidden");
      themeToggleDarkIconDesktop.classList.remove("hidden");
    }
  }
  if (themeToggleDarkIconMobile && themeToggleLightIconMobile) {
    if (isDarkMode) {
      themeToggleLightIconMobile.classList.remove("hidden");
      themeToggleDarkIconMobile.classList.add("hidden");
    } else {
      themeToggleLightIconMobile.classList.add("hidden");
      themeToggleDarkIconMobile.classList.remove("hidden");
    }
  }
}

// Function to set the theme
function applyTheme(isDarkMode) {
  if (isDarkMode) {
    document.documentElement.classList.add("dark");
    localStorage.setItem("color-theme", "dark");
  } else {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("color-theme", "light");
  }
  updateIcons(isDarkMode);
}

// Event listener for theme toggle buttons
function themeToggleClickHandler() {
  const isCurrentlyDark = document.documentElement.classList.contains("dark");
  applyTheme(!isCurrentlyDark);
}

// Add click event listeners to theme toggle buttons
if (themeToggleBtnDesktop) {
  themeToggleBtnDesktop.addEventListener("click", themeToggleClickHandler);
}
if (themeToggleBtnMobile) {
  themeToggleBtnMobile.addEventListener("click", themeToggleClickHandler);
}

// Mobile menu functionality
const mobileMenuButton = document.getElementById("mobile-menu-button");
const mobileMenuClose = document.getElementById("mobile-menu-close");
const mobileMenu = document.getElementById("mobile-menu");
const menuLinks = document.querySelectorAll("[data-menu]");

// Event listeners for opening and closing the mobile menu
function openMobileMenu() {
  mobileMenu.classList.remove("hidden");
  document.body.classList.add("overflow-hidden");
}
function closeMobileMenu() {
  mobileMenu.classList.add("hidden");
  document.body.classList.remove("overflow-hidden");
}

// Add event listeners for mobile menu buttons and links
mobileMenuButton.addEventListener("click", openMobileMenu);
menuLinks.forEach((link) => {
  link.addEventListener("click", closeMobileMenu);
});

// Handle escape key to close the menu
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape" && !mobileMenu.classList.contains("hidden")) {
    closeMobileMenu();
  }
});

// Sync theme on page load
document.addEventListener("DOMContentLoaded", () => {
  const isDark = document.documentElement.classList.contains("dark");
  updateIcons(isDark);
});