// Tema gelap/terang (disimpan di browser)
const root = document.documentElement;
const toggle = document.getElementById("themeToggle");
let saved = null;
try { saved = localStorage.getItem("theme"); } catch (e) {}
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

function setTheme(t) {
  root.setAttribute("data-theme", t);
  toggle.textContent = t === "dark" ? "☀️" : "🌙";
  try { localStorage.setItem("theme", t); } catch (e) {}
}
setTheme(saved || (prefersDark ? "dark" : "light"));
toggle.addEventListener("click", () =>
  setTheme(root.getAttribute("data-theme") === "dark" ? "light" : "dark"));

// Menu mobile
const navLinks = document.getElementById("navLinks");
document.getElementById("menuBtn").addEventListener("click", () => navLinks.classList.toggle("open"));
navLinks.querySelectorAll("a").forEach(a =>
  a.addEventListener("click", () => navLinks.classList.remove("open")));

// Efek mengetik pada hero
const roles = ["Web Developer", "Frontend Developer", "Problem Solver"];
const typed = document.getElementById("typed");
let r = 0, c = 0, deleting = false;
(function type() {
  const word = roles[r];
  typed.textContent = word.slice(0, c);
  if (!deleting && c < word.length) c++;
  else if (!deleting) { deleting = true; return setTimeout(type, 1400); }
  else if (c > 0) c--;
  else { deleting = false; r = (r + 1) % roles.length; }
  setTimeout(type, deleting ? 40 : 90);
})();

// Animasi muncul + hitung angka
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add("show");
    e.target.querySelectorAll("[data-count]").forEach(countUp);
    io.unobserve(e.target);
  });
}, { threshold: .15 });
document.querySelectorAll(".reveal").forEach(el => io.observe(el));

function countUp(el) {
  const target = +el.dataset.count;
  let n = 0;
  const step = Math.max(1, Math.ceil(target / 40));
  const t = setInterval(() => {
    n = Math.min(target, n + step);
    el.textContent = n + "+";
    if (n >= target) clearInterval(t);
  }, 35);
}

// Filter proyek
const filterBtns = document.querySelectorAll(".filter-btn");
filterBtns.forEach(btn => btn.addEventListener("click", () => {
  filterBtns.forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  const f = btn.dataset.filter;
  document.querySelectorAll(".project").forEach(p =>
    p.classList.toggle("hide", f !== "all" && p.dataset.cat !== f));
}));

// Menu aktif saat scroll
const sections = document.querySelectorAll("section[id]");
const links = document.querySelectorAll(".nav-links a");
window.addEventListener("scroll", () => {
  let current = "home";
  sections.forEach(s => { if (scrollY >= s.offsetTop - 120) current = s.id; });
  links.forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + current));
});

// Form kontak: membuka aplikasi email (ganti dengan Formspree/EmailJS bila ingin kirim langsung)
document.getElementById("contactForm").addEventListener("submit", e => {
  e.preventDefault();
  const name = encodeURIComponent(document.getElementById("name").value);
  const email = encodeURIComponent(document.getElementById("email").value);
  const msg = encodeURIComponent(document.getElementById("message").value);
  location.href = `mailto:emailkamu@example.com?subject=Pesan dari ${name}&body=${msg}%0A%0A${name} (${email})`;
});

document.getElementById("year").textContent = new Date().getFullYear();
