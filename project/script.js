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
    end: "top 20%",
  },
  x: 700,
  rotation: 45,
  scale: 0.5,
  duration: 2
});