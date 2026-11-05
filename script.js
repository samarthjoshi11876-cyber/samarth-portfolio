
// ==============================
// MOBILE NAVIGATION
// ==============================

const menuButton = document.getElementById("menuButton");
const navLinks = document.getElementById("navLinks");
const navItems = document.querySelectorAll(".nav-link");

menuButton.addEventListener("click", () => {

    navLinks.classList.toggle("show");

    const isOpen = navLinks.classList.contains("show");

    menuButton.setAttribute("aria-expanded", isOpen);

    menuButton.innerHTML = isOpen
        ? '<i class="fa-solid fa-xmark"></i>'
        : '<i class="fa-solid fa-bars"></i>';

});


// Close mobile menu after clicking navigation link

navItems.forEach((link) => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("show");

        menuButton.setAttribute("aria-expanded", "false");

        menuButton.innerHTML =
            '<i class="fa-solid fa-bars"></i>';

    });

});


// ==============================
// TYPING ANIMATION
// ==============================

const typingText = document.getElementById("typingText");

const roles = [
    "Flutter Developer",
    "Mobile App Developer",
    "Java Learner",
    "Software Developer"
];

let roleIndex = 0;
let characterIndex = 0;
let deleting = false;

function typeAnimation() {

    const currentRole = roles[roleIndex];

    if (!deleting) {

        typingText.textContent =
            currentRole.substring(0, characterIndex + 1);

        characterIndex++;

        if (characterIndex === currentRole.length) {

            deleting = true;

            setTimeout(typeAnimation, 1400);

            return;
        }

    } else {

        typingText.textContent =
            currentRole.substring(0, characterIndex - 1);

        characterIndex--;

        if (characterIndex === 0) {

            deleting = false;

            roleIndex = (roleIndex + 1) % roles.length;
        }
    }

    setTimeout(typeAnimation, deleting ? 45 : 90);
}

typeAnimation();


// ==============================
// SCROLL REVEAL ANIMATION
// ==============================

const revealElements = document.querySelectorAll(".reveal");

const observerOptions = {
    threshold: 0.12
};

if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    revealObserver.unobserve(entry.target);
                }

            });

        },
        observerOptions
    );

    revealElements.forEach((element) => {
        revealObserver.observe(element);
    });

} else {

    // Fallback for older browsers

    revealElements.forEach((element) => {
        element.classList.add("visible");
    });

}


// ==============================
// ACTIVE NAVIGATION LINK
// ==============================

const sections = document.querySelectorAll("main section[id]");

function updateActiveLink() {

    let currentSection = "";

    sections.forEach((section) => {

        const sectionTop = section.offsetTop - 150;

        if (window.scrollY >= sectionTop) {

            currentSection = section.getAttribute("id");
        }

    });

    navItems.forEach((link) => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") === `#${currentSection}`
        ) {

            link.classList.add("active");
        }

    });

}


// ==============================
// BACK TO TOP BUTTON
// ==============================

const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {

    if (window.scrollY > 450) {

        backToTop.classList.add("show");

    } else {

        backToTop.classList.remove("show");
    }

    updateActiveLink();

});


backToTop.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


// ==============================
// CURRENT YEAR
// ==============================

document.getElementById("currentYear").textContent =
    new Date().getFullYear();


// ==============================
// INITIAL ACTIVE LINK
// ==============================

updateActiveLink();
