(() => {
  const root = document.querySelector(".bubbles");
  if (root) {
    const count = 18;
    for (let i = 0; i < count; i++) {
      const b = document.createElement("span");
      const size = 4 + Math.random() * 10;
      b.style.left = `${Math.random() * 100}%`;
      b.style.width = `${size}px`;
      b.style.height = `${size}px`;
      b.style.animationDuration = `${10 + Math.random() * 16}s`;
      b.style.animationDelay = `${Math.random() * 12}s`;
      root.appendChild(b);
    }
  }

  const clock = document.querySelector("[data-clock]");
  if (clock) {
    const tick = () => {
      const now = new Date();
      const hh = String(now.getHours()).padStart(2, "0");
      const mm = String(now.getMinutes()).padStart(2, "0");
      const ss = String(now.getSeconds()).padStart(2, "0");
      clock.textContent = `${hh}:${mm}:${ss}`;
    };
    tick();
    setInterval(tick, 1000);
  }
})();
