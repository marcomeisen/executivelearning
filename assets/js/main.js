(function () {
  const navToggle = document.querySelector("[data-nav-toggle]");
  const navMenu = document.querySelector("[data-nav-menu]");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  if (navToggle && navMenu) {
    function setMenuState(isOpen) {
      navToggle.setAttribute("aria-expanded", String(isOpen));
      navMenu.classList.toggle("open", isOpen);
      document.documentElement.classList.toggle("menu-open", isOpen);
    }

    navToggle.addEventListener("click", function () {
      const expanded = navToggle.getAttribute("aria-expanded") === "true";
      setMenuState(!expanded);
    });

    navMenu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        if (window.innerWidth <= 760) {
          setMenuState(false);
        }
      });
    });
  }

  const moduleSearch = document.querySelector("#module-search");
  const moduleTrack = document.querySelector("#module-track");
  const moduleCards = document.querySelectorAll("[data-module-card]");

  function filterModules() {
    const searchTerm = moduleSearch ? moduleSearch.value.trim().toLowerCase() : "";
    const selectedTrack = moduleTrack ? moduleTrack.value : "all";

    moduleCards.forEach(function (card) {
      const text = card.getAttribute("data-search") || "";
      const track = card.getAttribute("data-track") || "";

      const matchesSearch = text.includes(searchTerm);
      const matchesTrack = selectedTrack === "all" || selectedTrack === track;

      card.hidden = !(matchesSearch && matchesTrack);
    });
  }

  if (moduleCards.length > 0) {
    if (moduleSearch) {
      moduleSearch.addEventListener("input", filterModules);
    }

    if (moduleTrack) {
      moduleTrack.addEventListener("change", filterModules);
    }
  }

  const faqItems = document.querySelectorAll(".faq details");
  faqItems.forEach(function (item) {
    item.addEventListener("toggle", function () {
      if (!item.open) {
        return;
      }

      faqItems.forEach(function (other) {
        if (other !== item) {
          other.open = false;
        }
      });
    });
  });

  const revealItems = document.querySelectorAll("[data-reveal]");
  if (revealItems.length > 0) {
    if (reduceMotion.matches || !("IntersectionObserver" in window)) {
      revealItems.forEach(function (item) {
        item.classList.add("is-visible");
      });
    } else {
      const observer = new IntersectionObserver(
        function (entries, currentObserver) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) {
              return;
            }

            entry.target.classList.add("is-visible");
            currentObserver.unobserve(entry.target);
          });
        },
        {
          threshold: 0.18,
          rootMargin: "0px 0px -40px 0px",
        }
      );

      revealItems.forEach(function (item) {
        observer.observe(item);
      });
    }
  }
})();
