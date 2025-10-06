const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");
const closeBtn = document.getElementById("closeBtn");

hamburger.addEventListener("click", () => {
  mobileMenu.classList.toggle("active");
});

closeBtn.addEventListener("click", () => {
  mobileMenu.classList.remove("active");
});


//   const dots = document.querySelectorAll(".dot");

//   dots.forEach(dot => {
//     dot.addEventListener("click", () => {

//       dots.forEach(d => d.classList.remove("dot-active"));
      
//       dot.classList.add("dot-active");
//     });
//   });

//   const leftArrow = document.querySelector(".arrow-left");
// const rightArrow = document.querySelector(".arrow-right");

// function setActiveArrow(activeArrow) {

//   leftArrow.classList.remove("arrow-active");
//   rightArrow.classList.remove("arrow-active");

//   activeArrow.classList.add("arrow-active");
// }

// setActiveArrow(leftArrow);

// leftArrow.addEventListener("click", () => setActiveArrow(leftArrow));
// rightArrow.addEventListener("click", () => setActiveArrow(rightArrow));


const mainSection = document.querySelector(".main");
const pageInfo = document.querySelector(".page-info");
const dots = document.querySelectorAll(".dot");
const leftArrow = document.querySelector(".arrow-left");
const rightArrow = document.querySelector(".arrow-right");

// Background images
const images = [
  "./assets/main-bg.jpg",
  "./assets/main-bg2.avif",
  "./assets/main-bg3.avif"
];

let currentIndex = 0;

// Function to update slider
function updateSlider(index) {
  mainSection.style.background = `
    linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)),
    url('${images[index]}')
  `;
  mainSection.style.backgroundSize = "cover";
  mainSection.style.backgroundPosition = "center";

  pageInfo.textContent = `${index + 1}/${images.length}`;

  dots.forEach(dot => dot.classList.remove("dot-active"));
  dots[index].classList.add("dot-active");
}

// Arrows
rightArrow.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % images.length;
  updateSlider(currentIndex);
});

leftArrow.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  updateSlider(currentIndex);
});

// Dots
dots.forEach((dot, idx) => {
  dot.addEventListener("click", () => {
    currentIndex = idx;
    updateSlider(currentIndex);
  });
});

// Init
updateSlider(currentIndex);










document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".products-grid");
  const dots = document.querySelectorAll(".dot2");
  const prevBtn = document.querySelector(".prev2");
  const nextBtn = document.querySelector(".next2");
  const cards = document.querySelectorAll(".product-card");

  let currentIndex = 0;

  function getCardWidth() {
    const cardWidth = cards[0].getBoundingClientRect().width;
    const style = getComputedStyle(track);
    const gap = parseFloat(style.gap) || 20;
    return cardWidth + gap;
  }

  function getMaxIndex() {
    const wrapperWidth = track.parentElement.getBoundingClientRect().width;
    const cardWidth = getCardWidth();
    // calculate how many cards fully fit in the wrapper
    const visibleCards = Math.floor(wrapperWidth / cardWidth);
    return cards.length - visibleCards; // last index we can scroll to
  }

  function updateCarousel() {
    const cardWidth = getCardWidth();
    const maxIndex = getMaxIndex();
    if (currentIndex > maxIndex) currentIndex = maxIndex;

    track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;

    dots.forEach((dot, i) => dot.classList.toggle("active", i === currentIndex));
  }

  nextBtn.addEventListener("click", () => {
    const maxIndex = getMaxIndex();
    if (currentIndex < maxIndex) {
      currentIndex++;
      updateCarousel();
    }
  });

  prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateCarousel();
    }
  });

  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      const maxIndex = getMaxIndex();
      currentIndex = Math.min(i, maxIndex);
      updateCarousel();
    });
  });

  window.addEventListener("resize", updateCarousel);
  updateCarousel();
});
document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".products-grid");
  const originals = Array.from(document.querySelectorAll(".product-card"));
  const prevBtn = document.querySelector(".prev2");
  const nextBtn = document.querySelector(".next2");
  const dotsContainer = document.querySelector(".dot2s");
  const dots = Array.from(dotsContainer.querySelectorAll(".dot2"));

  if (!track || !originals.length || !prevBtn || !nextBtn || !dots.length) return;

  const N = originals.length;
  const gap = parseInt(getComputedStyle(track).gap) || 0;
  const cardWidth = originals[0].offsetWidth + gap;

  // How many cards are visible at once (e.g., 4)
  const visibleCount = Math.max(1, Math.floor(track.offsetWidth / originals[0].offsetWidth));

  // Clone leading & trailing groups
  for (let i = 0; i < visibleCount; i++) {
    track.appendChild(originals[i].cloneNode(true));                  // clone at end
    track.insertBefore(originals[N - 1 - i].cloneNode(true), track.firstChild); // clone at start
  }

  let allCards = Array.from(track.querySelectorAll(".product-card"));
  let index = visibleCount; // start at the first real card
  let isAnimating = false;

  // Dots index (0-based)
  let slideIndex = 0;

  // Position at first real card
  track.style.transition = "none";
  track.style.transform = `translateX(${-cardWidth * index}px)`;

  function updateDots() {
    dots.forEach(dot => dot.classList.remove("active"));
    dots[slideIndex % dots.length].classList.add("active");
  }

  function moveToSlide() {
    isAnimating = true;
    track.style.transition = "transform 0.5s ease";
    track.style.transform = `translateX(${-cardWidth * index}px)`;
  }

  function handleTransitionEnd() {
    // if moved past the real last card → jump to its clone’s twin
    if (index >= N + visibleCount) {
      track.style.transition = "none";
      index = visibleCount; // reset back to first real
      track.style.transform = `translateX(${-cardWidth * index}px)`;
    }

    // if moved past the real first card → jump to its twin at the end
    if (index < visibleCount) {
      track.style.transition = "none";
      index = N + visibleCount - 1; // reset to last real
      track.style.transform = `translateX(${-cardWidth * index}px)`;
    }

    isAnimating = false;
  }

  nextBtn.addEventListener("click", () => {
    if (isAnimating) return;
    index++;
    slideIndex = (slideIndex + 1) % dots.length;
    moveToSlide();
    updateDots();
  });

  prevBtn.addEventListener("click", () => {
    if (isAnimating) return;
    index--;
    slideIndex = (slideIndex - 1 + dots.length) % dots.length;
    moveToSlide();
    updateDots();
  });

  track.addEventListener("transitionend", handleTransitionEnd);
});









document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".customers-reviews");
  const dots = Array.from(document.querySelectorAll(".slider-dot"));
  const cards = Array.from(track.children);
  const gap = parseInt(getComputedStyle(track).gap) || 0;
  const cardWidth = cards[0].offsetWidth + gap;
  let isAnimating = false;
  let currentIndex = 0; // Active dot index

  track.style.transform = 'translateX(0px)';

  function updateDots(index) {
    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');
  }

  // Slide left by n steps (positive n)
  function slideLeft(steps) {
  return new Promise(resolve => {
    track.style.transition = 'none';
    // Move first 'steps' cards to end instantly
    for (let i = 0; i < steps; i++) {
      track.appendChild(track.firstElementChild);
    }
    // Jump right to show the newly appended cards off-screen on right
    track.style.transform = `translateX(${cardWidth * steps}px)`;

    // Animate sliding left back to 0
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        track.style.transition = 'transform 0.5s ease';
        track.style.transform = 'translateX(0)';
      });
    });

    track.addEventListener('transitionend', function onTransitionEnd() {
      track.style.transition = 'none';
      track.removeEventListener('transitionend', onTransitionEnd);
      resolve();
    });
  });
}


  // Slide right by n steps (positive n)
  function slideRight(steps) {
    return new Promise(resolve => {
      track.style.transition = 'none';
      // Move last 'steps' cards to front instantly
      for (let i = 0; i < steps; i++) {
        track.insertBefore(track.lastElementChild, track.firstElementChild);
      }
      // Immediately jump left to show the "moved" cards off-screen on left
      track.style.transform = `translateX(${-cardWidth * steps}px)`;

      // Then animate sliding right back to 0
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          track.style.transition = 'transform 0.5s ease';
          track.style.transform = 'translateX(0)';
        });
      });

      track.addEventListener('transitionend', function onTransitionEnd() {
        track.style.transition = 'none';
        track.removeEventListener('transitionend', onTransitionEnd);
        resolve();
      });
    });
  }

  async function slideToIndex(targetIndex) {
    if (isAnimating || targetIndex === currentIndex) return;
    isAnimating = true;

    const totalCards = cards.length;
    // Calculate shortest direction and steps to move
    let diff = targetIndex - currentIndex;

    if (diff < 0) diff += totalCards; // normalize positive steps going right
    const stepsRight = (currentIndex - targetIndex + totalCards) % totalCards;
    const stepsLeft = diff;

    // Choose shorter path (left or right)
    if (stepsLeft <= stepsRight) {
      await slideLeft(stepsLeft);
      currentIndex = targetIndex;
    } else {
      await slideRight(stepsRight);
      currentIndex = targetIndex;
    }

    updateDots(currentIndex);
    isAnimating = false;
  }

  dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      slideToIndex(idx);
    });
  });

  updateDots(currentIndex);
});
