/* Padel & Help landing interactions.
   This file is loaded at the end of body. */

const CONTACT_EMAIL = "b2beu@zonadepadel.com";
const WEB3FORMS_ACCESS_KEY = "085f4001-9b12-4e6f-964b-4386490b0ae5";

/* International digits only, with no plus sign or spaces. */
const WHATSAPP_NUMBER = "34624036927";
const WHATSAPP_DISPLAY = "+34 624036927";

const COPY = {
  en: {
    title: "Padel & Help | Official B2B Platform of Zona de Padel",
    description:
      "Discover Padel & Help, the official B2B platform of Zona de Padel. Access professional padel equipment, competitive B2B prices and personalized support.",
    subjectAccount: "New B2B Account Request — Padel & Help",
    subjectEnquiry: "Padel & Help — B2B Enquiry",
    whatsapp: "Hello! I would like to know more about Padel & Help and your B2B services.",
    languageLine: "Language: English",
    consentLine: "Consent to be contacted: Yes",
    menuOpen: "Open menu",
    menuClose: "Close menu",
    langGroup: "Language",
    navLabel: "Primary",
    errors: {
      firstName: "Please enter your first name.",
      lastName: "Please enter your last name.",
      vat: "Please enter your company EU VAT number.",
      company: "Please enter your company name.",
      address: "Please enter your address.",
      country: "Please enter your country.",
      state: "Please enter your state.",
      province: "Please enter your province.",
      zip: "Please enter your ZIP code.",
      city: "Please enter your city.",
      phone: "Please enter your phone number.",
      email: "Please enter a valid email address.",
      consent: "Please confirm that we may contact you."
    }
  },
  fr: {
    title: "Padel & Help | Plateforme B2B officielle de Zona de Padel",
    description:
      "Découvrez Padel & Help, la plateforme B2B officielle de Zona de Padel. Accédez au matériel de padel professionnel, à des prix B2B compétitifs et à un accompagnement personnalisé.",
    subjectAccount: "Nouvelle demande de compte B2B — Padel & Help",
    subjectEnquiry: "Padel & Help — Demande B2B",
    whatsapp: "Bonjour ! Je souhaite en savoir plus sur Padel & Help et vos services B2B.",
    languageLine: "Langue : Français",
    consentLine: "Consentement pour être contacté : Oui",
    menuOpen: "Ouvrir le menu",
    menuClose: "Fermer le menu",
    langGroup: "Langue",
    navLabel: "Principal",
    errors: {
      firstName: "Veuillez indiquer votre prénom.",
      lastName: "Veuillez indiquer votre nom.",
      vat: "Veuillez indiquer le numéro de TVA intracommunautaire.",
      company: "Veuillez indiquer le nom de l’entreprise.",
      address: "Veuillez indiquer l’adresse.",
      country: "Veuillez indiquer le pays.",
      state: "Veuillez indiquer l’état.",
      province: "Veuillez indiquer la province.",
      zip: "Veuillez indiquer le code postal.",
      city: "Veuillez indiquer la ville.",
      phone: "Veuillez indiquer le numéro de téléphone.",
      email: "Veuillez indiquer une adresse e-mail valide.",
      consent: "Veuillez confirmer que nous pouvons vous contacter."
    }
  },
  es: {
    title: "Padel & Help | Plataforma B2B oficial de Zona de Padel",
    description:
      "Descubre Padel & Help, la plataforma B2B oficial de Zona de Padel. Accede a material de pádel profesional, precios B2B competitivos y asistencia personalizada.",
    subjectAccount: "Nueva solicitud de cuenta B2B — Padel & Help",
    subjectEnquiry: "Padel & Help — Consulta B2B",
    whatsapp: "¡Hola! Me gustaría saber más sobre Padel & Help y tus servicios B2B.",
    languageLine: "Idioma: Español",
    consentLine: "Consentimiento para ser contactado: Sí",
    menuOpen: "Abrir el menú",
    menuClose: "Cerrar el menú",
    langGroup: "Idioma",
    navLabel: "Principal",
    errors: {
      firstName: "Introduce tu nombre.",
      lastName: "Introduce tus apellidos.",
      vat: "Introduce el NIF-IVA intracomunitario.",
      company: "Introduce el nombre de la empresa.",
      address: "Introduce la dirección.",
      country: "Introduce el país.",
      state: "Introduce el estado.",
      province: "Introduce la provincia.",
      zip: "Introduce el código postal.",
      city: "Introduce la ciudad.",
      phone: "Introduce el teléfono.",
      email: "Introduce un correo electrónico válido.",
      consent: "Confirma que podemos contactarte."
    }
  }
};

const menu = document.querySelector("#nav-menu");
const toggle = document.querySelector(".nav-toggle");
const form = document.querySelector("#b2b-form");

function lang() {
  return COPY[document.documentElement.lang] ? document.documentElement.lang : "en";
}

function visibleText(el) {
  if (!el) return "";
  const node = el.querySelector(`[data-lang="${lang()}"]`);
  return (node ? node.textContent : el.textContent).replace(/\s+/g, " ").trim();
}

function whatsappDigits(value) {
  const trimmed = String(value || "").trim();
  if (!/^\d{8,15}$/.test(trimmed)) return "";
  return trimmed;
}

function writeUrl(language) {
  const url = new URL(window.location.href);
  if (language === "en") url.searchParams.delete("lang");
  else url.searchParams.set("lang", language);
  const next = url.pathname + url.search + url.hash;
  const current = window.location.pathname + window.location.search + window.location.hash;
  if (next !== current) history.replaceState(null, "", next);
}

function updateContacts() {
  const language = lang();
  const subject = encodeURIComponent(COPY[language].subjectEnquiry);
  const mailto = `mailto:${CONTACT_EMAIL}?subject=${subject}`;
  document.querySelectorAll("[data-email-link]").forEach((link) => {
    link.href = mailto;
  });

  const button = document.querySelector("[data-whatsapp]");
  const note = document.querySelector("[data-whatsapp-note]");
  const display = document.querySelector("[data-whatsapp-display]");
  const digits = whatsappDigits(WHATSAPP_NUMBER);

  if (!button) return;

  if (!digits) {
    button.removeAttribute("href");
    button.removeAttribute("target");
    button.setAttribute("aria-disabled", "true");
    button.setAttribute("aria-describedby", "whatsapp-note");
    button.classList.add("is-disabled");
    if (note) note.hidden = false;
    if (display) display.textContent = WHATSAPP_DISPLAY;
    return;
  }

  const text = encodeURIComponent(COPY[language].whatsapp);
  button.href = `https://wa.me/${digits}?text=${text}`;
  button.target = "_blank";
  button.rel = "noopener noreferrer";
  button.removeAttribute("aria-disabled");
  button.removeAttribute("aria-describedby");
  button.classList.remove("is-disabled");
  if (note) note.hidden = true;
  if (display) display.textContent = WHATSAPP_DISPLAY;
}

function applyLanguage(language, options) {
  const settings = options || {};
  if (!COPY[language]) language = "en";
  document.documentElement.lang = language;

  try {
    localStorage.setItem("ph-lang", language);
  } catch (error) {
    /* Storage can be blocked. The language still changes for this visit. */
  }

  if (settings.updateUrl) writeUrl(language);

  document.title = COPY[language].title;
  const description = document.querySelector('meta[name="description"]');
  if (description) description.setAttribute("content", COPY[language].description);

  document.querySelectorAll(".lang-btn").forEach((button) => {
    button.setAttribute("aria-pressed", button.dataset.setLang === language ? "true" : "false");
  });

  document.querySelectorAll("[data-lang]").forEach((node) => {
    if (node.getAttribute("data-lang") === language) node.removeAttribute("aria-hidden");
    else node.setAttribute("aria-hidden", "true");
  });

  const switcher = document.querySelector(".lang-switch");
  if (switcher) switcher.setAttribute("aria-label", COPY[language].langGroup);
  if (menu) menu.setAttribute("aria-label", COPY[language].navLabel);

  document.querySelectorAll("select option[data-en]").forEach((option) => {
    option.textContent = option.dataset[language] || option.dataset.en;
  });

  if (toggle) {
    const open = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-label", open ? COPY[language].menuClose : COPY[language].menuOpen);
  }

  updateContacts();
}

function setMenu(open) {
  if (!menu || !toggle) return;
  menu.classList.toggle("is-open", open);
  toggle.setAttribute("aria-expanded", open ? "true" : "false");
  toggle.setAttribute("aria-label", open ? COPY[lang()].menuClose : COPY[lang()].menuOpen);
  document.body.classList.toggle("nav-open", open);
}

function setFieldError(field, message) {
  const box = field.closest(".field");
  if (!box) return;
  const error = box.querySelector(".field-error");
  if (message) {
    box.classList.add("is-invalid");
    field.setAttribute("aria-invalid", "true");
    if (error && error.id) field.setAttribute("aria-describedby", error.id);
    if (error) error.textContent = message;
    return;
  }
  box.classList.remove("is-invalid");
  field.removeAttribute("aria-invalid");
  field.removeAttribute("aria-describedby");
  if (error) error.textContent = "";
}

function fieldValue(id) {
  const field = document.getElementById(id);
  return field ? field.value.trim() : "";
}

const ACCOUNT_FIELDS = ["first-name", "last-name", "vat-number", "company-name", "address", "country", "state", "province", "zip", "city", "phone", "email"];

const SUBMIT_LABELS = {
  idle: {
    en: "Request B2B Account",
    fr: "Demander un compte B2B",
    es: "Solicitar cuenta B2B"
  },
  sending: {
    en: "Sending...",
    fr: "Envoi…",
    es: "Enviando..."
  },
  sent: {
    en: "Sent",
    fr: "Envoyé",
    es: "Enviado"
  }
};

function accountPayload() {
  const language = lang();
  const payload = {
    access_key: WEB3FORMS_ACCESS_KEY,
    subject: COPY[language].subjectAccount,
    email: fieldValue("email"),
    from_name: [fieldValue("first-name"), fieldValue("last-name")].filter(Boolean).join(" ")
  };

  ACCOUNT_FIELDS.forEach((id) => {
    const label = visibleText(document.querySelector(`label[for="${id}"]`)) || id;
    payload[label] = fieldValue(id);
  });

  const consentLabel = visibleText(document.querySelector('label[for="consent"]'));
  if (consentLabel) payload[consentLabel] = COPY[language].consentLine.split(": ").pop();

  const languageParts = COPY[language].languageLine.split(":");
  payload[languageParts[0].trim()] = languageParts.slice(1).join(":").trim();
  return payload;
}

function setFormStatus(state) {
  const success = document.querySelector("[data-form-success]");
  const failure = document.querySelector("[data-form-fail]");
  if (success) success.hidden = state !== "success";
  if (failure) failure.hidden = state !== "fail";
}

function setSubmitLabel(state) {
  const button = form.querySelector(".btn-submit");
  if (!button) return;
  const labels = SUBMIT_LABELS[state];
  button.querySelectorAll("[data-lang]").forEach((span) => {
    const language = span.getAttribute("data-lang");
    if (labels[language]) span.textContent = labels[language];
  });
  button.disabled = state !== "idle";
}

/**
 * Posts the account request to Web3Forms, which emails CONTACT_EMAIL.
 * Sent is shown only after Web3Forms accepts the request.
 */
async function sendAccountRequest() {
  const honey = form.querySelector("[name='_honey']");
  if (honey && honey.value.trim()) return;

  if (!WEB3FORMS_ACCESS_KEY) {
    setFormStatus("fail");
    setSubmitLabel("idle");
    return;
  }

  setSubmitLabel("sending");
  setFormStatus("pending");

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(accountPayload())
    });
    let data = {};
    try {
      data = await response.json();
    } catch (error) {
      data = {};
    }
    if (response.ok && data.success === true) {
      setFormStatus("success");
      form.reset();
      setSubmitLabel("sent");
      return;
    }
    setFormStatus("fail");
    setSubmitLabel("idle");
  } catch (error) {
    setFormStatus("fail");
    setSubmitLabel("idle");
  }
}

function validateForm() {
  const language = lang();
  const checks = [
    ["first-name", "firstName"],
    ["last-name", "lastName"],
    ["vat-number", "vat"],
    ["company-name", "company"],
    ["address", "address"],
    ["country", "country"],
    ["state", "state"],
    ["province", "province"],
    ["zip", "zip"],
    ["city", "city"],
    ["phone", "phone"],
    ["email", "email"]
  ];
  let firstInvalid = null;

  checks.forEach(([id, key]) => {
    const field = document.getElementById(id);
    const value = fieldValue(id);
    let message = "";
    if (!value) message = COPY[language].errors[key];
    if (id === "email" && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      message = COPY[language].errors.email;
    }
    setFieldError(field, message);
    if (message && !firstInvalid) firstInvalid = field;
  });

  const consent = document.getElementById("consent");
  const consentMessage = consent.checked ? "" : COPY[language].errors.consent;
  setFieldError(consent, consentMessage);
  if (consentMessage && !firstInvalid) firstInvalid = consent;

  if (firstInvalid) firstInvalid.focus();
  return !firstInvalid;
}

function init() {
  const params = new URLSearchParams(window.location.search);
  const queryLang = params.get("lang");
  const initial = lang();
  const updateUrl = queryLang ? queryLang !== initial : initial !== "en";
  applyLanguage(initial, { updateUrl });

  document.querySelectorAll("[data-set-lang]").forEach((button) => {
    button.addEventListener("click", () => {
      applyLanguage(button.dataset.setLang, { updateUrl: true });
    });
  });

  if (toggle) {
    toggle.addEventListener("click", () => {
      setMenu(toggle.getAttribute("aria-expanded") !== "true");
    });
  }

  if (menu) {
    menu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => setMenu(false));
    });
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menu && menu.classList.contains("is-open")) {
      setMenu(false);
      toggle.focus();
    }
  });

  document.addEventListener("click", (event) => {
    if (!menu || !menu.classList.contains("is-open")) return;
    if (menu.contains(event.target) || toggle.contains(event.target)) return;
    setMenu(false);
  });

  const mobileNav = window.matchMedia("(max-width: 1180px)");
  mobileNav.addEventListener("change", (event) => {
    if (!event.matches) setMenu(false);
  });

  if (form) {
    form.querySelectorAll("input, select, textarea").forEach((field) => {
      field.addEventListener("input", () => setFieldError(field, ""));
      field.addEventListener("change", () => setFieldError(field, ""));
    });

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!validateForm()) {
        setFormStatus("pending");
        return;
      }
      sendAccountRequest();
    });
  }

  const whatsapp = document.querySelector("[data-whatsapp]");
  if (whatsapp) {
    whatsapp.addEventListener("click", (event) => {
      if (whatsapp.getAttribute("aria-disabled") === "true") event.preventDefault();
    });
  }
}

init();
