/* =========================================
   SHAAN × HANZALA
   Interactive Birthday Experience
========================================= */


/* -----------------------------------------
   AUDIO ENGINE
----------------------------------------- */

let audioContext = null;

function getAudioContext() {
  if (!audioContext) {
    audioContext = new (
      window.AudioContext ||
      window.webkitAudioContext
    )();
  }

  if (audioContext.state === "suspended") {
    audioContext.resume();
  }

  return audioContext;
}

function clickSound() {

  try {

    const ctx = getAudioContext();

    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();

    oscillator.type = "sine";

    oscillator.frequency.setValueAtTime(
      620,
      ctx.currentTime
    );

    oscillator.frequency.exponentialRampToValueAtTime(
      300,
      ctx.currentTime + 0.055
    );

    gain.gain.setValueAtTime(
      0.045,
      ctx.currentTime
    );

    gain.gain.exponentialRampToValueAtTime(
      0.001,
      ctx.currentTime + 0.07
    );

    oscillator.connect(gain);
    gain.connect(ctx.destination);

    oscillator.start();

    oscillator.stop(
      ctx.currentTime + 0.07
    );

  } catch (error) {
    console.log("Click sound unavailable.");
  }
}


function celebrationSound() {

  try {

    const ctx = getAudioContext();

    const notes = [
      { frequency: 523.25, time: 0 },
      { frequency: 659.25, time: .08 },
      { frequency: 783.99, time: .16 }
    ];

    notes.forEach(note => {

      const oscillator = ctx.createOscillator();
      const gain = ctx.createGain();

      oscillator.type = "sine";

      oscillator.frequency.value = note.frequency;

      gain.gain.setValueAtTime(
        0.06,
        ctx.currentTime + note.time
      );

      gain.gain.exponentialRampToValueAtTime(
        0.001,
        ctx.currentTime + note.time + .25
      );

      oscillator.connect(gain);
      gain.connect(ctx.destination);

      oscillator.start(ctx.currentTime + note.time);

      oscillator.stop(
        ctx.currentTime + note.time + .25
      );

    });

  } catch (error) {
    console.log("Celebration sound unavailable.");
  }
}


/* -----------------------------------------
   BUTTON CLICK SOUNDS
----------------------------------------- */

document.querySelectorAll("[data-click]").forEach(element => {

  element.addEventListener("click", () => {
    clickSound();
  });

});


/* -----------------------------------------
   PARTICLES
----------------------------------------- */

const particleContainer =
  document.getElementById("particles");

for (let i = 0; i < 45; i++) {

  const particle =
    document.createElement("span");

  particle.className = "particle";

  particle.style.left =
    Math.random() * 100 + "%";

  particle.style.animationDuration =
    (7 + Math.random() * 10) + "s";

  particle.style.animationDelay =
    Math.random() * 8 + "s";

  particle.style.opacity =
    (0.15 + Math.random() * .45).toFixed(2);

  particleContainer.appendChild(particle);
}


/* -----------------------------------------
   SCROLL
----------------------------------------- */

const exploreButton =
  document.getElementById("explore");

exploreButton.addEventListener("click", () => {

  document
    .getElementById("message")
    .scrollIntoView({
      behavior: "smooth"
    });

});


/* -----------------------------------------
   SURPRISE MODAL
----------------------------------------- */

const openSurprise =
  document.getElementById("openSurprise");

const modal =
  document.getElementById("surpriseModal");

const closeModal =
  document.getElementById("closeModal");

openSurprise.addEventListener("click", () => {

  modal.classList.add("active");

  celebrationSound();

  launchConfetti(55);

});


closeModal.addEventListener("click", () => {

  modal.classList.remove("active");

});


document
  .querySelector(".modal-backdrop")
  .addEventListener("click", () => {

    modal.classList.remove("active");

  });


/* -----------------------------------------
   CANDLE SYSTEM
----------------------------------------- */

const candles =
  document.querySelectorAll("[data-candle]");

const candleStatus =
  document.getElementById("candleStatus");

candles.forEach(candle => {

  candle.addEventListener("click", () => {

    candle.classList.toggle("off");

    const remaining =
      document.querySelectorAll(
        "[data-candle]:not(.off)"
      ).length;

    if (remaining === 0) {

      candleStatus.textContent =
        "✨ Wish made. Happy Birthday Shaan! ✨";

      celebrationSound();

      launchConfetti(130);

      showToast(
        "🎂 Birthday mode activated!"
      );

    } else {

      candleStatus.textContent =
        `${remaining} candle${remaining === 1 ? "" : "s"} left ✦`;

    }

  });

});


/* -----------------------------------------
   CONFETTI
----------------------------------------- */

function launchConfetti(amount = 70) {

  const symbols = [
    "✦",
    "•",
    "◆",
    "★"
  ];

  for (let i = 0; i < amount; i++) {

    const piece =
      document.createElement("div");

    piece.className = "confetti";

    piece.textContent =
      symbols[Math.floor(
        Math.random() * symbols.length
      )];

    piece.style.left =
      Math.random() * 100 + "vw";

    piece.style.color =
      Math.random() > .5
        ? "#ffe2a5"
        : "#ffffff";

    piece.style.fontSize =
      (7 + Math.random() * 10) + "px";

    piece.style.setProperty(
      "--x",
      (Math.random() * 300 - 150) + "px"
    );

    piece.style.animationDuration =
      (1.8 + Math.random() * 1.8) + "s";

    document.body.appendChild(piece);

    setTimeout(() => {
      piece.remove();
    }, 4000);

  }

}


/* -----------------------------------------
   TOP CELEBRATE
----------------------------------------- */

document
  .getElementById("celebrateTop")
  .addEventListener("click", () => {

    launchConfetti(80);

    celebrationSound();

    showToast(
      "✦ Let's celebrate Shaan!"
    );

  });


/* -----------------------------------------
   FINAL CELEBRATE
----------------------------------------- */

document
  .getElementById("finalCelebrate")
  .addEventListener("click", () => {

    launchConfetti(160);

    celebrationSound();

    showToast(
      "🎉 Happy Birthday, Mera Shaan!"
    );

  });


/* -----------------------------------------
   TOAST
----------------------------------------- */

let toastTimer;

function showToast(message) {

  const toast =
    document.getElementById("toast");

  toast.textContent = message;

  toast.classList.add("show");

  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {

    toast.classList.remove("show");

  }, 2600);

}


/* -----------------------------------------
   SCROLL REVEAL
----------------------------------------- */

const revealElements =
  document.querySelectorAll(".reveal");

const observer =
  new IntersectionObserver(
    entries => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          entry.target.classList.add(
            "visible"
          );

        }

      });

    },
    {
      threshold: 0.12
    }
  );


revealElements.forEach(element => {

  observer.observe(element);

});


/* -----------------------------------------
   EASTER EGG
----------------------------------------- */

let logoClicks = 0;

document
  .querySelector(".brand")
  .addEventListener("click", () => {

    logoClicks++;

    if (logoClicks >= 5) {

      launchConfetti(100);

      celebrationSound();

      showToast(
        "🥚 Secret unlocked — Hanzala × Shaan forever!"
      );

      logoClicks = 0;

    }

  });


/* -----------------------------------------
   KEYBOARD INTERACTION
----------------------------------------- */

document.addEventListener("keydown", event => {

  if (event.key === "Escape") {

    modal.classList.remove("active");

  }

});


/* -----------------------------------------
   PARALLAX PHOTO
----------------------------------------- */

const photoCard =
  document.querySelector(".photo-card");

window.addEventListener("mousemove", event => {

  if (window.innerWidth < 900) return;

  const x =
    (event.clientX / window.innerWidth - .5) * 8;

  const y =
    (event.clientY / window.innerHeight - .5) * 8;

  photoCard.style.transform =
    `rotate(${2 + x * .15}deg)
     translate(${x}px, ${y}px)`;

});


/* -----------------------------------------
   INITIAL PAGE EFFECT
----------------------------------------- */

window.addEventListener("load", () => {

  setTimeout(() => {

    document
      .querySelector(".hero")
      .classList.add("loaded");

  }, 200);

});