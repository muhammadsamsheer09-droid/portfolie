const progress = document.querySelector(".scroll-progress");
const spot = document.querySelector(".cursor-spot");
const menu = document.querySelector(".menu-toggle");
const nav = document.querySelector(".site-nav");

window.addEventListener("scroll", () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${Math.min(100, (window.scrollY / max) * 100)}%`;
}, {passive:true});

window.addEventListener("pointermove", e => {
  spot.style.left = `${e.clientX}px`;
  spot.style.top = `${e.clientY}px`;
}, {passive:true});

menu.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menu.setAttribute("aria-expanded", open ? "true" : "false");
});
document.querySelectorAll(".site-nav a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menu.setAttribute("aria-expanded", "false");
  });
});

// Subtle reveal: only animate elements after they enter the viewport.
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.animate(
        [{opacity:0, transform:"translateY(24px)"}, {opacity:1, transform:"translateY(0)"}],
        {duration:700, easing:"cubic-bezier(.2,.8,.2,1)", fill:"forwards"}
      );
      revealObserver.unobserve(entry.target);
    }
  });
}, {threshold:.12});

document.querySelectorAll(
  ".about-grid,.role-card,.skills-grid,.proof-grid,.achievement-band,.education-row,.contact-inner"
).forEach(el => {
  el.style.opacity = "0";
  revealObserver.observe(el);
});
