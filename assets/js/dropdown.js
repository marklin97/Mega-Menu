// Select all elements with class "dropdown", "dropdown-arrow", and "dropdown-menu"
const dropdowns = document.querySelectorAll(".dropdown");
const dropdownMenus = document.querySelectorAll(".dropdown-menu");
const showClass = "show"; // CSS class used to display the dropdown menu

// Function to handle mouse enter event for dropdowns on large screens
function handleDropdownHover(event) {
  const targetDropdown = event.currentTarget;
  targetDropdown.classList.add(showClass); // Add "show" class to display the dropdown menu
  targetDropdown
    .querySelector(".dropdown-arrow")
    .setAttribute("aria-expanded", "true");
  targetDropdown.querySelector(".dropdown-menu").classList.add(showClass);
  adjustDropdownPosition();
}

// Function to handle click event for dropdowns on small screens
function handleDropdownClick(event) {
  const targetDropdown = event.currentTarget;
  const isActive = targetDropdown.classList.contains(showClass);

  // Toggle the "show" class for the dropdown and dropdown-menu elements
  targetDropdown.classList.toggle(showClass, !isActive);
  const menu = targetDropdown.querySelector(".dropdown-menu");
  if (menu) {
    menu.classList.toggle(showClass, !isActive);
  }
}

// Function to attach/detach event listeners based on window width
function handleWindowResize() {
  if (window.matchMedia("(min-width: 768px)").matches) {
    // On larger screens, show dropdowns on hover and remove click event listeners
    dropdowns.forEach(function (dropdown) {
      dropdown.removeEventListener("click", handleDropdownClick);
      dropdown.addEventListener("mouseenter", handleDropdownHover);
      dropdown.addEventListener("mouseleave", hideDropdown);
    });
    adjustDropdownPosition();
  } else {
    // On smaller screens, show dropdowns on click and remove hover event listeners
    dropdowns.forEach(function (dropdown) {
      dropdown.removeEventListener("mouseenter", handleDropdownHover);
      dropdown.removeEventListener("mouseleave", hideDropdown);
      dropdown.addEventListener("click", handleDropdownClick);
    });
  }
}

// Function to handle mouse leave event for dropdowns
function hideDropdown(event) {
  const targetDropdown = event.currentTarget;
  targetDropdown.classList.remove(showClass); // Remove "show" class to hide the dropdown menu
  targetDropdown
    .querySelector(".dropdown-arrow")
    .setAttribute("aria-expanded", "false");
  targetDropdown.querySelector(".dropdown-menu").classList.remove(showClass);
}

// Function to adjust the position of the dropdown menu relative to the navbar.
// Ensures the dropdown menu aligns properly and does not extend beyond the viewport.
function adjustDropdownPosition() {
  // Get the dropdown menu and navbar elements
  const dropdown = document.querySelector(".dropdown-menu");
  const navbar = document.querySelector(".navbar-expand-md");

  // Get the bounding rectangles and viewport width
  const dropdownRect = dropdown.getBoundingClientRect();
  const navbarRect = navbar.getBoundingClientRect();
  const viewportWidth = document.documentElement.clientWidth;

  // Calculate the right position for the dropdown menu
  const dropdownRight = viewportWidth - dropdownRect.right;
  const navbarRight = viewportWidth -navbarRect.right;

  // Adjust dropdown position if necessary to ensure proper alignment with the navbar
  if (dropdownRight - navbarRight < 0) {
    dropdown.style.right = navbarRight + "px";
  }
}


// Add event listeners for page load and window resize events
window.addEventListener("load", handleWindowResize);
window.addEventListener("resize", handleWindowResize);
