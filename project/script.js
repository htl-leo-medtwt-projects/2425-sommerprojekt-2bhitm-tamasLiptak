function toggleMenu() {
  document.getElementById("navLinks").classList.toggle("active");
}

const bodyClass = document.body.className;
const logoImg = document.getElementById("logo-img");
const headerbg1 = document.getElementById("bfheaderbg1");

if (bodyClass.includes("bf2042")) {
  logoImg.src = "./../media/img/battlefield2042-logo.svg";
  headerbg1.style.backgroundImage = "url('./../media/img/bf2042/bf2042header.jpg')";
} else if (bodyClass.includes("bf5")) {
  logoImg.src = "./../media/img/battlefield5-logo.png";
  headerbg1.style.backgroundImage = "url('./../media/img/bf5/bf5header.png')";
} else if (bodyClass.includes("bf1")) {
  logoImg.src = "./../media/img/battlefield1-logo.svg";
  headerbg1.style.backgroundImage = "url('./../media/img/bf1/bf1header.jpg')";
} else if (bodyClass.includes("bf4")) {
  logoImg.src = "./../media/img/battlefield4-logo.png";
  headerbg1.style.backgroundImage = "url('./../media/img/bf4/bf4header.webp')";
}

if (window.innerWidth >= 768) {
  gsap.registerPlugin(ScrollTrigger);

  // Animation for Main Page
  gsap.from(".lockerweaponimg", {
    scrollTrigger: {
      trigger: ".lockerweaponimg",
      toggleActions: "restart pause reverse pause",
      start: "top 80%",
      scrub: 1,
      end: "top 25%",
    },
    x: 700,
    rotation: 45,
    scale: 0.5,
    duration: 2
  });

  gsap.from(".homepageText p", {
    scrollTrigger: {
      trigger: ".homepageText",
      start: "top 80%",
      end: "top 20%",
    },
    x: -700,
    duration: 1.5
  });

  gsap.from(".vehicleimg", {
    scrollTrigger: {
      trigger: ".vehicleimg",
      start: "top 70%",
      end: "top 40%",
      scrub: 1
    },
    rotation: -10,
    scale: 0.7,
    x: -700,
    y: 100,
    duration: 2
  });

  gsap.from(".homepageText1 p", {
    scrollTrigger: {
      trigger: ".homepageText1",
      start: "top 80%",
      end: "top 20%",
    },
    x: 700,
    duration: 1.5
  });

  gsap.from(".vehicleshot", {
    scrollTrigger: {
      trigger: ".vehicleshot",
      scrub: 1,
      start: "top 45%",
      end: "top 35%",
    },
    opacity: 0,
    scale: 0.1,
    duration: 0.2
  });

  gsap.from(".signup", {
    scrollTrigger: {
      trigger: ".signup",
      start: "top 90%",
      end: "top 50%",
    },
    y: 300,
    scale: 0.6,
    opacity: 0,
    duration: 1
  });

  function updateDateTime() {
    const now = new Date();
    const options = {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    };
    const formatted = now.toLocaleString('en-US', options);
    document.getElementById('datetime').textContent = formatted;
  }

  // Animation for Battlefield X Header
  gsap.from(".imgheader", {
    x: -700,
    y: 700,
    duration: 1.5,
    delay: 0.5,
    rotation: -45,
  });

  gsap.from(".cardheader", {
    x: 1200,
    duration: 1.5,
    delay: 0.5
  });
}

setInterval(updateDateTime, 1000);
updateDateTime();