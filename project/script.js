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

function updateDateTime() {
  const now = new Date();
  const options = { 
    hour: '2-digit', 
    minute: '2-digit', 
    second: '2-digit' 
  };
  const formatted = now.toLocaleString('en-US', options);
  document.getElementById('datetime').textContent = formatted;
}

setInterval(updateDateTime, 1000);
updateDateTime();