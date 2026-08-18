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

    const localeData = window.STUDIO_LOCALE.home;
    const {serviceContent, attributeTranslations, profileContent, profileUi} = localeData;

    const assetPath = root.lang === "en" ? "assets" : "../assets";
    const profileLinks = {"carolina": {"linkedin": "https://www.linkedin.com/in/carolinavasconceloscastro/", "portfolio": "https://carolinavasconceloscastro.github.io/", "email": "mailto:cavacaaz@gmail.com", "photo": `${assetPath}/images/carolina-vasconcelos.jpg`, "position": "50% 42%"}, "carmelo": {"linkedin": "https://linkedin.com/in/carmeloalccoy", "portfolio": "https://carmelocoy.github.io/", "email": "mailto:carmeloalcarazcoy@gmail.com", "photo": `${assetPath}/images/carmelo-alcaraz.jpg`, "position": "50% 50%"}};
    const profileDialog = document.getElementById("profileDialog");
    const profileDialogContent = document.getElementById("profileDialogContent");
    const profileDialogClose = document.getElementById("profileDialogClose");
    const profileCards = [...document.querySelectorAll(".person-card[data-profile]")];
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
      const key = isOpen ? "Close navigation" : "Open navigation";
      menuToggle.setAttribute(
        "aria-label",
        currentLanguage === "en"
          ? key
          : (attributeTranslations[key] || key)
      );
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

    function renderService(key) {
      const item = serviceContent[key];
      detailPanel.innerHTML = `
        <div class="detail-copy">
          <p class="detail-kicker">${item.kicker}</p>
          <h3>${item.title}</h3>
          <p>${item.description}</p>
          <div class="deliverables">
            ${item.deliverables.map(value => `<span class="deliverable">${value}</span>`).join("")}
          </div>
        </div>
        <aside class="detail-aside">
          <svg class="ui-icon" aria-hidden="true"><use href="#icon-${item.icon}"></use></svg>
          <div>
            <strong>${item.best}</strong>
            <p>${item.note}</p>
          </div>
        </aside>
      `;
    }

    function updateProfileCardLabels() {
      const labels = profileUi;
      document.querySelectorAll(".profile-open-label").forEach(label => {
        label.textContent = labels.open;
      });
      const carolinaCard = document.querySelector('[data-profile="carolina"]');
      const carmeloCard = document.querySelector('[data-profile="carmelo"]');
      if (carolinaCard) carolinaCard.setAttribute("aria-label", labels.carolina_aria);
      if (carmeloCard) carmeloCard.setAttribute("aria-label", labels.carmelo_aria);
    }

    function profileIcon(name) {
      return `<svg class="ui-icon" aria-hidden="true"><use href="#icon-${name}"></use></svg>`;
    }

    function renderProfileModal(key) {
      const item = profileContent[key];
      const links = profileLinks[key];
      const isEngineering = key === "carmelo";

      profileDialogContent.innerHTML = `
        <article class="profile-modal-layout">
          <header class="profile-modal-hero ${isEngineering ? "engineering" : ""}">
            <div class="profile-modal-hero-copy">
              <span class="profile-modal-location">${item.location}</span>
              <h2 id="profileDialogTitle">${item.name}</h2>
              <p class="profile-modal-role">${item.role}</p>
              <h3 class="profile-modal-headline">${item.headline}</h3>
              <p class="profile-modal-intro">${item.intro}</p>
            </div>

            <figure class="profile-modal-photo-card">
              <img
                class="profile-modal-photo"
                src="${links.photo}"
                alt="${item.name}"
                style="object-position:${links.position}">
            </figure>
          </header>

          <div class="profile-modal-content ${isEngineering ? "engineering" : ""}">
            <div class="profile-modal-narrative">
              ${item.paragraphs.map(paragraph => `<p>${paragraph}</p>`).join("")}
            </div>

            <section class="profile-modal-section">
              <h4 class="profile-modal-section-title">${item.value_title}</h4>
              <div class="profile-value-grid">
                ${item.values.map(value => `
                  <article class="profile-value-card">
                    <span class="profile-value-icon">${profileIcon(value.icon)}</span>
                    <div>
                      <h4>${value.title}</h4>
                      <p>${value.copy}</p>
                    </div>
                  </article>
                `).join("")}
              </div>
            </section>

            <section class="profile-modal-section">
              <h4 class="profile-modal-section-title">${item.evidence_title}</h4>
              <div class="profile-evidence-list">
                ${item.evidence.map(evidence => `
                  <article class="profile-evidence-item">
                    <span class="profile-evidence-dot" aria-hidden="true"></span>
                    <div>
                      <strong>${evidence.title}</strong>
                      <p>${evidence.copy}</p>
                    </div>
                  </article>
                `).join("")}
              </div>
            </section>

            <section class="profile-modal-section">
              <h4 class="profile-modal-section-title">${item.capabilities_title}</h4>
              <div class="profile-capability-list">
                ${item.capabilities.map(capability => `<span class="profile-capability">${capability}</span>`).join("")}
              </div>
            </section>

            <div class="profile-modal-actions">
              <a class="button outlined small" href="${links.linkedin}" target="_blank" rel="noreferrer">
                ${item.links.linkedin}
              </a>
              <a class="button outlined small" href="${links.portfolio}" target="_blank" rel="noreferrer">
                ${item.links.portfolio}
              </a>
              <a class="button tonal small" href="${links.email}">
                ${item.links.email}
              </a>
            </div>
          </div>
        </article>
      `;

      profileDialogClose.setAttribute("aria-label", item.close);
    }

    function openProfileDialog(key, sourceElement) {
      activeProfile = key;
      profileReturnFocus = sourceElement || document.activeElement;
      renderProfileModal(key);
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

      renderService(currentService);
      updateProfileCardLabels();
      if (activeProfile && profileDialog.open) renderProfileModal(activeProfile);
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
      renderService(currentService);
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
