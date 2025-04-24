function toggleMenu() {
  document.getElementById("navLinks").classList.toggle("active");
}

gsap.registerPlugin(ScrollTrigger);

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

setInterval(updateDateTime, 1000);
updateDateTime();