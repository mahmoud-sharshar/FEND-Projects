const sections = document.getElementsByTagName('section');
const navList = document.getElementById('navbar__list');


// build the nav
buildNav = () => {
    const fragment = document.createDocumentFragment();
    for (const section of sections) {
        const anchorElem = document.createElement('a');
        anchorElem.innerText = section.getAttribute('data-nav');
        anchorElem.className = 'menu__link';
        anchorElem.id = `a-${section.id}`
        anchorElem.href = `#${section.id}`
        const liElem = document.createElement('li')
        liElem.appendChild(anchorElem);
        fragment.appendChild(liElem);
    }
    navList.appendChild(fragment);
};


// when clicking on a link in navigation bar
alterActiveSection = (event) => {
    if (event.target.nodeName === 'A') {
        const clickedLink = event.target;
        const nextActiveSection = document.getElementById(clickedLink.id.slice(2));
        const currentActiveSection = document.querySelector('.your-active-class');
        let currentActiveLink = undefined;
        if (currentActiveSection) {
            currentActiveSection.classList.remove('your-active-class');
            currentActiveLink = document.getElementById(`a-${currentActiveSection.id}`);
        }
        if (currentActiveLink) {
            currentActiveLink.classList.remove('active-link');
        }
        nextActiveSection.classList.add('your-active-class');
        clickedLink.classList.add('active-link');
    }
};

// Add class 'active' to section when near top of viewport
chooseActiveSection = (event) => {
    for (const section of sections) {
        const box = section.getBoundingClientRect();
        if (box.top <= 150 &&  box.bottom >= 150) {
            section.classList.add('your-active-class');
            document.getElementById(`a-${section.id}`).classList.add('active-link');
        } else {
            section.classList.remove('your-active-class');
            document.getElementById(`a-${section.id}`).classList.remove('active-link');
        }
    }
};

// Build menu
document.addEventListener('DOMContentLoaded', buildNav);
// Scroll to section on link click
navList.addEventListener('click', alterActiveSection);
// Set sections as active when scrolling the page
document.addEventListener('scroll', chooseActiveSection);


/* resources
* How to Link to a Specific Part of a Page: https://blog.hubspot.com/marketing/jump-link-same-page
* Access data attributes https://stackoverflow.com/questions/33760520/get-data-attributes-in-javascript-code
* Classlist attribute of Html element https://developer.mozilla.org/en-US/docs/Web/API/Element/classList#Methods
* HTML data-* Attribute https://www.w3schools.com/tags/att_data-.asp
* https://www.codeguage.com/courses/js/events-scroll-event
* Information regarding "Section active state" https://knowledge.udacity.com/questions/85408#96950%20.
* How to highlight the nav link when scrolling to this section? https://knowledge.udacity.com/questions/66312#66326
* */