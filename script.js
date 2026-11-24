const startBtn = document.getElementById("startBtn");
const themeBtn = document.getElementById("themeBtn");
const searchForm = document.getElementById("searchForm");
const queryInput = document.getElementById("query");
const result = document.getElementById("result");
const installBtn = document.getElementById("installBtn");

const data = [
  "سرعت و سادگی با HTML، CSS و JavaScript",
  "طراحی واکنش‌گرا برای موبایل و دسکتاپ",
  "انیمیشن‌های تعاملی و مدرن",
  "امنیت، دسترس‌پذیری و تجربه کاربری بهتر"
];

startBtn.addEventListener("click", () => {
  document.getElementById("features").scrollIntoView({
    behavior: "smooth"
  });
});

themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

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

installBtn.addEventListener("click", async () => {
  if ("install" in navigator) {
    try {
      await navigator.install();
      installBtn.textContent = "درخواست نصب ارسال شد";
    } catch {
      installBtn.textContent = "نصب در این مرورگر پشتیبانی نمی‌شود";
    }
  } else {
    installBtn.textContent = "مرورگر شما از نصب PWA پشتیبانی نمی‌کند";
  }
});

document.querySelectorAll(".card").forEach(card => {
  card.addEventListener("pointermove", (event) => {
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    card.style.transform =
      `perspective(800px) rotateX(${(0.5 - y) * 6}deg) rotateY(${(x - 0.5) * 6}deg)`;
  });

  card.addEventListener("pointerleave", () => {
    card.style.transform = "";
  });
});
