const startBtn = document.getElementById("startBtn");
const themeBtn = document.getElementById("themeBtn");
const searchForm = document.getElementById("searchForm");
const queryInput = document.getElementById("query");
const result = document.getElementById("result");
const installBtn = document.getElementById("installBtn");
const installNote = document.getElementById("installNote");

const data = [
  "سرعت و سادگی با HTML، CSS و JavaScript",
  "طراحی واکنش‌گرا برای موبایل و دسکتاپ",
  "انیمیشن‌های تعاملی و مدرن",
  "امنیت، دسترس‌پذیری و تجربه کاربری بهتر"
];

// ساخت PWA manifest به‌صورت پویا
const manifest = {
  name: "وب مدرن",
  short_name: "وب مدرن",
  start_url: ".",
  display: "standalone",
  background_color: "#f6f8fb",
  theme_color: "#2563eb",
  icons: [
    {
      src:
        "data:image/svg+xml," +
        encodeURIComponent(
          `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512"><rect width="512" height="512" rx="96" fill="#2563eb"/><text x="50%" y="58%" font-size="220" text-anchor="middle" fill="white" font-family="Arial">وب</text></svg>`
        ),
      sizes: "512x512",
      type: "image/svg+xml"
    }
  ]
};

const manifestBlob = new Blob([JSON.stringify(manifest)], {
  type: "application/manifest+json"
});

const manifestLink = document.createElement("link");
manifestLink.rel = "manifest";
manifestLink.href = URL.createObjectURL(manifestBlob);
document.head.appendChild(manifestLink);

// حرکت به بخش قابلیت‌ها
startBtn.addEventListener("click", () => {
  document.getElementById("features").scrollIntoView({
    behavior: "smooth"
  });
});

// حالت تاریک
themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

// جست‌وجوی محلی
searchForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const query = queryInput.value.trim();

  if (!query) {
    result.textContent = "لطفاً یک عبارت وارد کنید.";
    return;
  }

  const matches = data.filter(item => item.includes(query));

  result.textContent = matches.length
    ? matches.join(" | ")
    : "نتیجه‌ای پیدا نشد.";
});

// نصب PWA
installBtn.addEventListener("click", async () => {
  if ("install" in navigator) {
    try {
      await navigator.install();
      installBtn.textContent = "درخواست نصب ارسال شد";
      installNote.textContent =
        "اگر مرورگر پنجره نصب نشان داد، آن را تأیید کنید.";
    } catch {
      installBtn.textContent = "نصب ممکن نیست";
      installNote.textContent =
        "برای نصب کامل، سایت را روی localhost یا HTTPS اجرا کنید.";
    }
  } else {
    installBtn.textContent = "نصب پشتیبانی نمی‌شود";
    installNote.textContent =
      "مرورگر شما در حال حاضر از navigator.install() پشتیبانی نمی‌کند.";
  }
});

// انیمیشن و افکت‌های اشاره‌گر روی کارت‌ها
document.querySelectorAll(".card").forEach(card => {
  card.addEventListener("pointermove", (event) => {
    const rect = card.getBoundingClientRect();

    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    const rotateX = (0.5 - y) * 10;
    const rotateY = (x - 0.5) * 10;

    const brightness = 1 + y * 0.15;
    const saturate = 1 + x * 0.3;

    card.style.transform =
      `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

    card.style.filter =
      `brightness(${brightness}) saturate(${saturate})`;

    const icon = card.querySelector(".icon");

    icon.style.transform =
      `translate(${(x - 0.5) * 10}px, ${(y - 0.5) * 10}px)`;
  });

  card.addEventListener("pointerleave", () => {
    card.style.transform = "";
    card.style.filter = "";

    const icon = card.querySelector(".icon");
    icon.style.transform = "";
  });
});
