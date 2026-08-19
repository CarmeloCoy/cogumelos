(() => {
  "use strict";

  const languageNames = { en: "English", es: "Español", pt: "Português" };

  const readStorage = (key) => {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  };
  const writeStorage = (key, value) => {
    try {
      localStorage.setItem(key, value);
    } catch {
      /* Storage can be unavailable. */
    }
  };

  const root = document.documentElement;
  const topBar = document.querySelector(".top-app-bar");
  const themeToggle = document.getElementById("themeToggle");
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  const languageMenu = document.getElementById("languageMenu");
  const languageTrigger = document.getElementById("languageTrigger");
  const languageOptions = document.getElementById("languageOptions");
  const languageCurrent = document.getElementById("languageCurrent");
  const languageOptionButtons = [
    ...document.querySelectorAll(".language-option"),
  ];

  const currentLanguage = root.lang;

  const storedTheme = readStorage("studio-theme");
  if (storedTheme === "dark" || storedTheme === "light") {
    root.dataset.theme = storedTheme;
  }

  function updateThemeColour() {
    const themeMeta = document.querySelector('meta[name="theme-color"]');
    if (themeMeta)
      themeMeta.content = root.dataset.theme === "dark" ? "#11131a" : "#ffffff";
  }

  function setLanguageMenu(open) {
    if (!languageMenu || !languageOptions || !languageTrigger) return;
    languageMenu.classList.toggle("open", open);
    languageOptions.hidden = !open;
    languageTrigger.setAttribute("aria-expanded", String(open));
    languageTrigger
      .querySelector(".language-chevron")
      ?.classList.toggle("rotated", open);
  }

  function applyLanguage() {
    if (languageCurrent)
      languageCurrent.textContent = languageNames[currentLanguage];
    languageOptionButtons.forEach((option) => {
      const selected = option.dataset.lang === currentLanguage;
      option.classList.toggle("selected", selected);
      option.setAttribute("aria-selected", String(selected));
      option.tabIndex = selected ? 0 : -1;
    });

    if (menuToggle && !navLinks?.classList.contains("open")) {
      menuToggle.setAttribute("aria-label", menuToggle.dataset.openLabel);
    }
  }

  function moveLanguageFocus(direction) {
    if (!languageOptionButtons.length) return;
    const focused = languageOptionButtons.indexOf(document.activeElement);
    const selected = languageOptionButtons.findIndex((option) =>
      option.classList.contains("selected"),
    );
    const origin = focused >= 0 ? focused : Math.max(selected, 0);
    const next =
      (origin + direction + languageOptionButtons.length) %
      languageOptionButtons.length;
    languageOptionButtons[next].focus();
  }

  themeToggle?.addEventListener("click", () => {
    root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
    writeStorage("studio-theme", root.dataset.theme);
    updateThemeColour();
  });

  menuToggle?.addEventListener("click", () => {
    const open = navLinks?.classList.toggle("open") || false;
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute(
      "aria-label",
      open ? menuToggle.dataset.closeLabel : menuToggle.dataset.openLabel,
    );
    menuToggle
      .querySelector("use")
      ?.setAttribute("href", open ? "#icon-close" : "#icon-menu");
  });

  navLinks?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle?.setAttribute("aria-expanded", "false");
      menuToggle?.setAttribute("aria-label", menuToggle.dataset.openLabel);
      menuToggle?.querySelector("use")?.setAttribute("href", "#icon-menu");
    });
  });

  languageTrigger?.addEventListener("click", () => {
    const open = !languageMenu.classList.contains("open");
    setLanguageMenu(open);
    if (open)
      languageOptionButtons
        .find((option) => option.classList.contains("selected"))
        ?.focus();
  });

  languageTrigger?.addEventListener("keydown", (event) => {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      setLanguageMenu(true);
      languageOptionButtons
        .find((option) => option.classList.contains("selected"))
        ?.focus();
    }
  });

  languageOptionButtons.forEach((option) => {
    option.addEventListener("click", () => {
      const page = window.location.pathname.endsWith("how-we-work.html")
        ? "how-we-work.html"
        : "index.html";
      const prefix = currentLanguage === "en" ? "" : "../";
      const destination =
        option.dataset.lang === "en"
          ? `${prefix}${page}`
          : `${prefix}${option.dataset.lang}/${page}`;
      window.location.assign(`${destination}${window.location.hash}`);
    });

    option.addEventListener("keydown", (event) => {
      if (event.key === "ArrowDown") {
        event.preventDefault();
        moveLanguageFocus(1);
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        moveLanguageFocus(-1);
      } else if (event.key === "Home") {
        event.preventDefault();
        languageOptionButtons[0].focus();
      } else if (event.key === "End") {
        event.preventDefault();
        languageOptionButtons.at(-1)?.focus();
      } else if (event.key === "Escape") {
        event.preventDefault();
        setLanguageMenu(false);
        languageTrigger?.focus();
      }
    });
  });

  document.addEventListener("click", (event) => {
    if (languageMenu && !languageMenu.contains(event.target))
      setLanguageMenu(false);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && languageMenu?.classList.contains("open")) {
      setLanguageMenu(false);
      languageTrigger?.focus();
    }
  });

  window.addEventListener(
    "scroll",
    () => {
      topBar?.classList.toggle("scrolled", window.scrollY > 10);
    },
    { passive: true },
  );

  const revealElements = [...document.querySelectorAll(".reveal")];
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 },
    );
    revealElements.forEach((element) => observer.observe(element));
  } else {
    revealElements.forEach((element) => element.classList.add("visible"));
  }

  const chapterLinks = [...document.querySelectorAll('.nav-link[href^="#"]')];
  const chapters = chapterLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if ("IntersectionObserver" in window && chapters.length) {
    const chapterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          chapterLinks.forEach((link) => {
            const current = link.getAttribute("href") === `#${entry.target.id}`;
            if (current) link.setAttribute("aria-current", "location");
            else link.removeAttribute("aria-current");
          });
        });
      },
      { rootMargin: "-25% 0px -65% 0px", threshold: 0 },
    );
    chapters.forEach((chapter) => chapterObserver.observe(chapter));
  }

  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  updateThemeColour();
  applyLanguage();
})();
