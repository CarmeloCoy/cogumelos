(() => {
  "use strict";

  const readStorage = key => {
    try { return window.localStorage.getItem(key); }
    catch { return null; }
  };
  const writeStorage = (key, value) => {
    try { window.localStorage.setItem(key, value); }
    catch { /* Storage can be unavailable in private or embedded contexts. */ }
  };

  const root = document.documentElement;
    const themeToggle = document.getElementById("themeToggle");
    const languageMenu = document.getElementById("languageMenu");
    const languageTrigger = document.getElementById("languageTrigger");
    const languageOptions = document.getElementById("languageOptions");
    const languageCurrent = document.getElementById("languageCurrent");
    const languageOptionButtons = [...document.querySelectorAll(".language-option")];
    const languageNames = {en:"English", es:"Español", pt:"Português"};
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");
    const topBar = document.querySelector(".top-app-bar");
    const detailPanel = document.getElementById("engagementDetail");
    const tabButtons = [...document.querySelectorAll(".tab-button")];

    const profileDialog = document.getElementById("profileDialog");
    const profileDialogClose = document.getElementById("profileDialogClose");
    const profileCards = [...document.querySelectorAll(".person-card[data-profile]")];
    const profileViews = [...document.querySelectorAll("[data-profile-detail]")];
    let activeProfile = null;
    let profileReturnFocus = null;

    const currentLanguage = root.lang;
    let currentService = "definition";

    const themeColourMeta = document.querySelector('meta[name="theme-color"]');
    function syncThemeColour() {
      if (!themeColourMeta) return;
      themeColourMeta.setAttribute("content", root.dataset.theme === "dark" ? "#11131a" : "#ffffff");
    }

    const storedTheme = readStorage("studio-theme");
    if (storedTheme) root.dataset.theme = storedTheme;
    syncThemeColour();

    themeToggle.addEventListener("click", () => {
      const nextTheme = root.dataset.theme === "light" ? "dark" : "light";
      root.dataset.theme = nextTheme;
      writeStorage("studio-theme", nextTheme);
      syncThemeColour();
    });

    menuToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.querySelector("use").setAttribute("href", isOpen ? "#icon-close" : "#icon-menu");
      menuToggle.setAttribute("aria-label", isOpen ? menuToggle.dataset.closeLabel : menuToggle.dataset.openLabel);
    });

    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.querySelector("use").setAttribute("href", "#icon-menu");
      });
    });

    window.addEventListener("scroll", () => {
      topBar.classList.toggle("scrolled", window.scrollY > 10);
    }, { passive: true });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 1050 && navLinks.classList.contains("open")) {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.querySelector("use").setAttribute("href", "#icon-menu");
      }
    }, { passive: true });

    function displayService(key) {
      detailPanel.querySelectorAll("[data-service-detail]").forEach(view => {
        view.hidden = view.dataset.serviceDetail !== key;
      });
    }

    function openProfileDialog(key, sourceElement) {
      activeProfile = key;
      profileReturnFocus = sourceElement || document.activeElement;
      profileViews.forEach(view => {
        view.hidden = view.dataset.profileDetail !== key;
      });
      profileDialog.setAttribute("aria-labelledby", `profileDialogTitle-${key}`);
      profileDialog.showModal();
      document.body.style.overflow = "hidden";
      requestAnimationFrame(() => profileDialogClose.focus());
    }

    function closeProfileDialog() {
      if (profileDialog.open) profileDialog.close();
    }

    profileCards.forEach(card => {
      card.addEventListener("click", event => {
        if (event.target.closest("a,button")) return;
        openProfileDialog(card.dataset.profile, card);
      });

      card.addEventListener("keydown", event => {
        if (event.key === "Enter" || event.key === " ") {
          if (event.target.closest("a,button")) return;
          event.preventDefault();
          openProfileDialog(card.dataset.profile, card);
        }
      });
    });

    profileDialogClose.addEventListener("click", closeProfileDialog);

    profileDialog.addEventListener("click", event => {
      if (event.target === profileDialog) closeProfileDialog();
    });

    profileDialog.addEventListener("close", () => {
      document.body.style.overflow = "";
      activeProfile = null;
      profileReturnFocus?.focus();
    });

    function applyLanguage() {
      languageCurrent.textContent = languageNames[currentLanguage];
      languageOptionButtons.forEach(option => {
        const selected = option.dataset.lang === currentLanguage;
        option.classList.toggle("selected", selected);
        option.setAttribute("aria-selected", String(selected));
      });

      displayService(currentService);
    }

    function setLanguageMenu(open) {
      languageMenu.classList.toggle("open", open);
      languageOptions.hidden = !open;
      languageTrigger.setAttribute("aria-expanded", String(open));
      languageTrigger.querySelector(".language-chevron").classList.toggle("rotated", open);
    }

    function focusLanguageOption(direction = 1) {
      const currentIndex = languageOptionButtons.findIndex(option => option === document.activeElement);
      const selectedIndex = languageOptionButtons.findIndex(option => option.classList.contains("selected"));
      const baseIndex = currentIndex >= 0 ? currentIndex : selectedIndex;
      const nextIndex = (baseIndex + direction + languageOptionButtons.length) % languageOptionButtons.length;
      languageOptionButtons[nextIndex].focus();
    }

    languageTrigger.addEventListener("click", () => {
      const willOpen = !languageMenu.classList.contains("open");
      setLanguageMenu(willOpen);
      if (willOpen) {
        const selected = languageOptionButtons.find(option => option.classList.contains("selected"));
        selected?.focus();
      }
    });

    languageTrigger.addEventListener("keydown", event => {
      if (event.key === "ArrowDown" || event.key === "ArrowUp") {
        event.preventDefault();
        setLanguageMenu(true);
        const selected = languageOptionButtons.find(option => option.classList.contains("selected"));
        selected?.focus();
      }
    });

    languageOptionButtons.forEach(option => {
      option.addEventListener("click", () => {
        const page = window.location.pathname.endsWith("how-we-work.html")
          ? "how-we-work.html"
          : "index.html";
        const prefix = currentLanguage === "en" ? "" : "../";
        const destination = option.dataset.lang === "en"
          ? `${prefix}${page}`
          : `${prefix}${option.dataset.lang}/${page}`;
        window.location.assign(`${destination}${window.location.hash}`);
      });

      option.addEventListener("keydown", event => {
        if (event.key === "ArrowDown") {
          event.preventDefault();
          focusLanguageOption(1);
        } else if (event.key === "ArrowUp") {
          event.preventDefault();
          focusLanguageOption(-1);
        } else if (event.key === "Escape") {
          event.preventDefault();
          setLanguageMenu(false);
          languageTrigger.focus();
        } else if (event.key === "Home") {
          event.preventDefault();
          languageOptionButtons[0].focus();
        } else if (event.key === "End") {
          event.preventDefault();
          languageOptionButtons[languageOptionButtons.length - 1].focus();
        }
      });
    });

    document.addEventListener("click", event => {
      if (!languageMenu.contains(event.target)) setLanguageMenu(false);
    });

    document.addEventListener("keydown", event => {
      if (event.key === "Escape" && languageMenu.classList.contains("open")) {
        setLanguageMenu(false);
        languageTrigger.focus();
      }
    });

    function activateServiceTab(button, moveFocus = false) {
      tabButtons.forEach(item => {
        const selected = item === button;
        item.classList.toggle("active", selected);
        item.setAttribute("aria-selected", String(selected));
        item.tabIndex = selected ? 0 : -1;
      });
      currentService = button.dataset.service;
      detailPanel.setAttribute("aria-labelledby", button.id);
      displayService(currentService);
      if (moveFocus) button.focus();
    }

    tabButtons.forEach((button, index) => {
      button.addEventListener("click", () => activateServiceTab(button));
      button.addEventListener("keydown", event => {
        let nextIndex = null;
        if (event.key === "ArrowRight" || event.key === "ArrowDown") nextIndex = (index + 1) % tabButtons.length;
        if (event.key === "ArrowLeft" || event.key === "ArrowUp") nextIndex = (index - 1 + tabButtons.length) % tabButtons.length;
        if (event.key === "Home") nextIndex = 0;
        if (event.key === "End") nextIndex = tabButtons.length - 1;
        if (nextIndex !== null) {
          event.preventDefault();
          activateServiceTab(tabButtons[nextIndex], true);
        }
      });
    });

    const revealElements = [...document.querySelectorAll(".reveal")];
    if ("IntersectionObserver" in window) {
      const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
          }
        });
      }, { threshold: .1 });
      revealElements.forEach(element => revealObserver.observe(element));
    } else {
      revealElements.forEach(element => element.classList.add("visible"));
    }
    document.getElementById("year").textContent = new Date().getFullYear();

    /*
      English is the clean default on a new visit. Once a visitor selects another
      language, that preference is retained for later navigation.
    */
    applyLanguage();
})();
