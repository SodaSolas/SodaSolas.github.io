(() => {
  const isTab = /\/wiki(\/|$)/i.test(location.pathname) || location.pathname.endsWith("/wiki");
  document.body.classList.add(isTab ? "is-tab" : "is-home");

  const asset = (rel) => {
    const base = isTab ? "../assets/" : "assets/";
    return base + rel;
  };

  // —— Bubbles ——
  const root = document.querySelector(".bubbles");
  if (root) {
    for (let i = 0; i < 18; i++) {
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

  // —— Clock ——
  const clock = document.querySelector("[data-clock]");
  if (clock) {
    const tick = () => {
      const now = new Date();
      clock.textContent = [now.getHours(), now.getMinutes(), now.getSeconds()]
        .map((n) => String(n).padStart(2, "0"))
        .join(":");
    };
    tick();
    setInterval(tick, 1000);
  }

  // —— Waves on every page ——
  let waves = document.querySelector(".waves");
  if (!waves) {
    waves = document.createElement("div");
    waves.className = "waves";
    waves.setAttribute("aria-hidden", "true");
    waves.innerHTML = `
      <svg class="waves__svg waves__svg--back" viewBox="0 0 1440 200" preserveAspectRatio="none">
        <path fill="rgba(30,90,160,0.45)" d="M0,120 C240,180 480,40 720,100 C960,160 1200,60 1440,110 L1440,200 L0,200 Z">
          <animate attributeName="d" dur="9s" repeatCount="indefinite"
            values="M0,120 C240,180 480,40 720,100 C960,160 1200,60 1440,110 L1440,200 L0,200 Z;
                    M0,100 C240,40 480,160 720,90 C960,30 1200,150 1440,100 L1440,200 L0,200 Z;
                    M0,120 C240,180 480,40 720,100 C960,160 1200,60 1440,110 L1440,200 L0,200 Z" />
        </path>
      </svg>
      <svg class="waves__svg waves__svg--mid" viewBox="0 0 1440 200" preserveAspectRatio="none">
        <path fill="rgba(78,184,255,0.28)" d="M0,130 C200,80 400,170 700,120 C1000,70 1200,150 1440,115 L1440,200 L0,200 Z">
          <animate attributeName="d" dur="7s" repeatCount="indefinite"
            values="M0,130 C200,80 400,170 700,120 C1000,70 1200,150 1440,115 L1440,200 L0,200 Z;
                    M0,110 C220,160 450,70 720,130 C990,180 1220,90 1440,125 L1440,200 L0,200 Z;
                    M0,130 C200,80 400,170 700,120 C1000,70 1200,150 1440,115 L1440,200 L0,200 Z" />
        </path>
      </svg>
      <svg class="waves__svg waves__svg--front" viewBox="0 0 1440 200" preserveAspectRatio="none">
        <path fill="rgba(126,200,255,0.35)" d="M0,140 C180,100 360,170 640,135 C920,100 1160,165 1440,130 L1440,200 L0,200 Z">
          <animate attributeName="d" dur="5s" repeatCount="indefinite"
            values="M0,140 C180,100 360,170 640,135 C920,100 1160,165 1440,130 L1440,200 L0,200 Z;
                    M0,125 C200,165 380,95 660,140 C940,175 1180,105 1440,145 L1440,200 L0,200 Z;
                    M0,140 C180,100 360,170 640,135 C920,100 1160,165 1440,130 L1440,200 L0,200 Z" />
        </path>
      </svg>
      <div class="waves__glow"></div>
    `;
    document.body.appendChild(waves);
  }

  waves.classList.toggle("is-top", isTab);
  waves.classList.toggle("is-bottom", !isTab);

  // —— Dive veil ——
  let veil = document.querySelector(".dive-veil");
  if (!veil) {
    veil = document.createElement("div");
    veil.className = "dive-veil";
    veil.setAttribute("aria-hidden", "true");
    veil.innerHTML = `
      <div class="dive-veil__water"></div>
      <div class="dive-veil__ripples"></div>
      <div class="dive-veil__label">DESCENDING</div>
    `;
    document.body.appendChild(veil);
  }

  const label = veil.querySelector(".dive-veil__label");
  const DIVE_KEY = "von-dive";
  const SURFACE_KEY = "von-surface";

  const playDiveOut = (href) => {
    if (label) label.textContent = "DESCENDING";
    document.body.classList.add("is-diving");
    waves.classList.add("is-top");
    waves.classList.remove("is-bottom");
    sessionStorage.setItem(DIVE_KEY, "1");
    window.setTimeout(() => {
      location.href = href;
    }, 1000);
  };

  const playSurfaceOut = (href) => {
    if (label) label.textContent = "SURFACING";
    document.body.classList.add("is-surfacing");
    waves.classList.add("is-bottom");
    waves.classList.remove("is-top");
    sessionStorage.setItem(SURFACE_KEY, "1");
    window.setTimeout(() => {
      location.href = href;
    }, 1000);
  };

  if (isTab && sessionStorage.getItem(DIVE_KEY) === "1") {
    sessionStorage.removeItem(DIVE_KEY);
    document.body.classList.add("is-diving-in");
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.body.classList.add("is-diving-in-done");
        window.setTimeout(() => {
          document.body.classList.remove("is-diving-in", "is-diving-in-done");
        }, 1100);
      });
    });
  }

  if (!isTab && sessionStorage.getItem(SURFACE_KEY) === "1") {
    sessionStorage.removeItem(SURFACE_KEY);
    document.body.classList.add("is-surfacing-in");
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.body.classList.add("is-surfacing-in-done");
        window.setTimeout(() => {
          document.body.classList.remove("is-surfacing-in", "is-surfacing-in-done");
        }, 900);
      });
    });
  }

  const isHomeHref = (href) => {
    if (!href) return false;
    if (href === "../index.html" || href === "/index.html" || href === "index.html") {
      // on tab pages, index.html is wiki index — home is ../index.html
      if (isTab) return href.includes("../index.html") || href.endsWith("/soda-site/index.html");
      return href === "index.html" || href.endsWith("/index.html");
    }
    // absolute file path ending with soda-site/index.html without /wiki/
    try {
      const u = new URL(href, location.href);
      return /index\.html$/i.test(u.pathname) && !/\/wiki\//i.test(u.pathname);
    } catch {
      return false;
    }
  };

  document.addEventListener("click", (e) => {
    const a = e.target.closest("a");
    if (!a) return;
    const href = a.getAttribute("href");
    if (!href || href.startsWith("#") || href.startsWith("http") || href.startsWith("mailto:")) return;
    if (a.target === "_blank") return;

    const fromHomeToTab = !isTab && /(?:^|\/)wiki\//.test(href);
    if (fromHomeToTab) {
      e.preventDefault();
      playDiveOut(a.href);
      return;
    }

    const fromTabToHome = isTab && isHomeHref(href);
    if (fromTabToHome) {
      e.preventDefault();
      playSurfaceOut(a.href);
    }
  });

  // —— Floating triangle portrait (tabs only) ——
  if (isTab && !document.querySelector(".float-tri")) {
    const wrap = document.createElement("aside");
    wrap.className = "float-tri";
    wrap.setAttribute("aria-label", "Portrait");
    wrap.innerHTML = `
      <div class="float-tri__glow"></div>
      <div class="float-tri__frame">
        <img class="float-tri__img" src="${asset("img/portrait.png")}" alt="" data-portrait />
        <div class="float-tri__placeholder">IMG</div>
      </div>
      <div class="float-tri__caption">SURFACE LINK</div>
    `;
    document.body.appendChild(wrap);

    const img = wrap.querySelector(".float-tri__img");
    const ph = wrap.querySelector(".float-tri__placeholder");
    let triedSvg = false;
    img.addEventListener("load", () => wrap.classList.add("has-image"));
    img.addEventListener("error", () => {
      if (!triedSvg) {
        triedSvg = true;
        img.src = asset("img/portrait.svg");
        return;
      }
      img.style.display = "none";
      ph.hidden = false;
    });
    ph.hidden = false;
  }
})();
