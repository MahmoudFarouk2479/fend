/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
 */

/**
 * Define Global Variables
 * 
 */

// Array Variable to get all sections item
const sections = document.querySelectorAll('section');
// Variable to get navigation bar list item
const navBarList = document.getElementById('navbar__list');
// Variable to get number of array of sections item
let numberOfItem = sections.length;
// Variable to check if user scrolling or not
let userScrolling;

/**
 * End Global Variables
 * Start Helper Functions
 * 
 */

// Function Determine the secion in view
function sectionInView(elment) {
    let detrmineSection = elment.getBoundingClientRect();
    return detrmineSection.top >= 0 && detrmineSection.top <= 250;
}

// Hide the navbar__list when not scrolling
function hideShowNavMenu() {
    // intialize the display style with block to show menu
    document.getElementById("navbar__list").style.display = "block"
        // clear the time set with the pervious setTimeout() method
    clearTimeout(userScrolling);
    // Set the navbar__list to hide after 2000 miliesecond if user note scrolling
    userScrolling = setTimeout(() => {
        document.getElementById("navbar__list").style.display = "none";
    }, 2000);
}
// Function to showToTopButton after scrolling 500 px
function showToTopButton() {
    let currentScrollPos = window.scrollY;
    currentScrollPos > 500 ? document.getElementById("to-top").style.display = "block" :
        document.getElementById("to-top").style.display = "none";
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
 */

// Function to add the click action listener to the h2 element in each section for collapse
function addH2ClickAction() {
    document.querySelectorAll('section').forEach(function(section) {
        section.getElementsByTagName("h2")[0].addEventListener("click", function() {
            let pargraphElments = section.getElementsByTagName("p");
            for (pargraphElment of pargraphElments) {
                if (pargraphElment.style.display === "none") {
                    pargraphElment.style.display = "block";
                } else {
                    pargraphElment.style.display = "none";
                }
            }
        });
    });
}
// build the nav
// function builds nav list
function createNewListItem() {
    for (section of sections) {

        // Get item name from section data-nav attribute
        const itemName = section.getAttribute('data-nav');
        // Get item id from section id attribute to use in navigation
        const itemId = section.getAttribute('id');
        // Create new li item in the navigation list
        let newItem = document.createElement('li');
        // use innerHTML to add content of new item
        newItem.innerHTML = `<a class='menu__link' name='${itemId}' href='#${itemId}'>${itemName}</a>`;
        // Add new item to the navigation list
        navBarList.appendChild(newItem);
    }
}
// Add class 'active' to section when near top of viewport
// Function to toggle a class view 
function toggleClassView() {
    for (section of sections) {
        // select the selected section link in navBar
        let selectedLink = navBarList.querySelector(`[name=${section.getAttribute('id')}]`);
        // Check secion in view
        if (sectionInView(section)) {
            // Check if the section contains the your-active-class
            if (!section.classList.contains('your-active-class')) {
                // add class your-active-class to the section
                section.classList.add('your-active-class');
            }
            if (!selectedLink.classList.contains('menu_active_link')) {
                // add class menu_active_link to the section
                selectedLink.classList.add('menu_active_link');
            }
        } else {
            // remove class your-active-class to the section
            section.classList.remove('your-active-class');
            // remove class menu_active_link from the navBar
            selectedLink.classList.remove('menu_active_link');
        }
    }

}
// Scroll to anchor ID using scrollTO event
document.getElementById("to-top").addEventListener("click", () => {
    document.documentElement.scrollTo({ top: 0 });
});

/**
 * End Main Functions
 * Begin Events
 * 
 */

// Build menu 
setTimeout(() => { createNewListItem() }, 0);
// Call the event to add the click action listener to the h2 element in each section for collapse
setTimeout(() => { addH2ClickAction() }, 0);
// Scroll to section on link click
// Set sections as active
setTimeout(() => { document.addEventListener('scroll', toggleClassView) }, 0);
// Call the event to hide navbar__list after 2000 miliesecond if user note scrolling
setTimeout(() => { document.addEventListener('scroll', hideShowNavMenu) }, 0);
// Call the event to showToTopButton
setTimeout(() => { showToTopButton() }, 0);
setTimeout(() => { document.addEventListener('scroll', showToTopButton) }, 0);
