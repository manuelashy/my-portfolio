const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      // Add visible class when entering viewport
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
      // Remove visible class when leaving viewport
      else {
        entry.target.classList.remove("visible");
      }
    });
  },
  {
    threshold: 0.1,
    rootMargin: "-100px 0px", // Adjust this to control when animations trigger
  }
);

document.querySelectorAll(".animate-on-scroll").forEach((element) => {
  observer.observe(element);
});

// typping text effect //
const textElement = document.getElementById("animated-text");

// Array of texts to rotate through
const texts = [
  "I'm into Web Development",
  "Welcome to my profile",
  "Check out my work",
  "Contact me for more info",
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeText() {
  const currentText = texts[textIndex];

  if (isDeleting) {
    // Deleting text
    textElement.textContent = currentText.substring(0, charIndex - 1);
    charIndex--;
    typingSpeed = 50; // Faster when deleting
  } else {
    // Typing text
    textElement.textContent = currentText.substring(0, charIndex + 1);
    charIndex++;
    typingSpeed = 100; // Normal typing speed
  }

  // Check if we've finished typing the current text
  if (!isDeleting && charIndex === currentText.length) {
    // Pause at the end of typing
    isDeleting = true;
    typingSpeed = 1000; // Wait before starting to delete
  }
  // Check if we've finished deleting
  else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    // Move to next text
    textIndex = (textIndex + 1) % texts.length;
    typingSpeed = 500; // Pause before typing next text
  }

  setTimeout(typeText, typingSpeed);
}

// Start the animation when the page loads
window.onload = function () {
  setTimeout(typeText, 1000);
};

// Scroll reveal animation
function revealOnScroll() {
  const cards = document.querySelectorAll(".project-card");

  cards.forEach((card) => {
    const cardTop = card.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (cardTop < windowHeight * 0.8) {
      card.classList.add("visible");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);
