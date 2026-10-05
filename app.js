(() => {
  const config = window.VALLETI_CONFIG || {};
  const whatsappNumber = String(config.whatsappNumber || "").replace(/\D/g, "");
  const message = "Olá! Conheci a ValleTI Sistemas pelo site e gostaria de conversar sobre uma solução para o meu negócio.";
  const analyticsId = /^G-[A-Z0-9]+$/i.test(config.gaMeasurementId || "") ? config.gaMeasurementId : "";
  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector("#main-nav");
  const status = document.querySelector("#contact-status");

  if (whatsappNumber && status) {
    status.textContent = "Ao clicar, você será direcionado ao WhatsApp com uma mensagem inicial já preenchida.";
  }

  document.querySelector("#year").textContent = new Date().getFullYear();
  if (config.siteUrl && /^https:\/\//i.test(config.siteUrl)) {
    const canonical = document.createElement("link");
    canonical.rel = "canonical";
    canonical.href = config.siteUrl.replace(/\/$/, "") + "/";
    document.head.append(canonical);
  }
  if (config.searchConsoleVerification) {
    const verification = document.createElement("meta");
    verification.name = "google-site-verification";
    verification.content = config.searchConsoleVerification;
    document.head.append(verification);
  }

  document.querySelectorAll(".wa-link").forEach((link) => {
    if (!whatsappNumber) {
      link.setAttribute("aria-disabled", "true");
      link.classList.add("is-unconfigured");
      link.addEventListener("click", (event) => {
        event.preventDefault();
        document.querySelector("#contato").scrollIntoView({ behavior: "smooth" });
        status?.focus?.();
      });
      return;
    }
    link.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.removeAttribute("aria-disabled");
    link.classList.remove("is-unconfigured");
    link.addEventListener("click", () => {
      if (window.gtag) window.gtag("event", "whatsapp_click", { link_url: link.href, cta_placement: link.dataset.placement || "unknown" });
    });
  });

  menuButton?.addEventListener("click", () => {
    const expanded = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!expanded));
    menuButton.setAttribute("aria-label", expanded ? "Abrir menu" : "Fechar menu");
    nav?.classList.toggle("is-open", !expanded);
  });
  nav?.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
    nav.classList.remove("is-open");
    menuButton?.setAttribute("aria-expanded", "false");
    menuButton?.setAttribute("aria-label", "Abrir menu");
  }));

  if (!analyticsId) return;
  const consentKey = "valleti-analytics-consent";
  const banner = document.querySelector("#consent-banner");
  const loadAnalytics = () => {
    if (window.__valletiAnalyticsLoaded) return;
    window.__valletiAnalyticsLoaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function(){ window.dataLayer.push(arguments); };
    window.gtag("js", new Date());
    window.gtag("config", analyticsId, { anonymize_ip: true });
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(analyticsId)}`;
    document.head.append(script);
  };
  const savedConsent = localStorage.getItem(consentKey);
  if (savedConsent === "granted") loadAnalytics();
  else if (!savedConsent && banner) banner.hidden = false;
  document.querySelector("#consent-accept")?.addEventListener("click", () => {
    localStorage.setItem(consentKey, "granted");
    banner.hidden = true;
    loadAnalytics();
  });
  document.querySelector("#consent-reject")?.addEventListener("click", () => {
    localStorage.setItem(consentKey, "denied");
    banner.hidden = true;
  });
})();
