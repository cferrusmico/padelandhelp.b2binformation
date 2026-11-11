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
    menuOpen: "Open menu",
    menuClose: "Close menu",
    phonePrefix: "Country code",
    phoneSearch: "Search country",
    langGroup: "Language",
    navLabel: "Primary",
    errors: {
      fullName: "Please enter your full name.",
      company: "Please enter your company name.",
      vat: "Please enter your company VAT number.",
      address: "Please enter your address.",
      country: "Please enter your country.",
      city: "Please enter your city.",
      zip: "Please enter your ZIP code.",
      phone: "Please enter your phone number.",
      phonePrefix: "Please select the country code.",
      email: "Please enter a valid email address."
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
    menuOpen: "Ouvrir le menu",
    menuClose: "Fermer le menu",
    phonePrefix: "Indicatif du pays",
    phoneSearch: "Rechercher un pays",
    langGroup: "Langue",
    navLabel: "Principal",
    errors: {
      fullName: "Veuillez indiquer votre nom complet.",
      company: "Veuillez indiquer le nom de l’entreprise.",
      vat: "Veuillez indiquer le numéro de TVA de l’entreprise.",
      address: "Veuillez indiquer l’adresse.",
      country: "Veuillez indiquer le pays.",
      city: "Veuillez indiquer la ville.",
      zip: "Veuillez indiquer le code postal.",
      phone: "Veuillez indiquer le numéro de téléphone.",
      phonePrefix: "Veuillez sélectionner l’indicatif du pays.",
      email: "Veuillez indiquer une adresse e-mail valide."
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
    menuOpen: "Abrir el menú",
    menuClose: "Cerrar el menú",
    phonePrefix: "Prefijo del país",
    phoneSearch: "Buscar país",
    langGroup: "Idioma",
    navLabel: "Principal",
    errors: {
      fullName: "Introduce tu nombre completo.",
      company: "Introduce el nombre de la empresa.",
      vat: "Introduce el número de IVA de la empresa.",
      address: "Introduce la dirección.",
      country: "Introduce el país.",
      city: "Introduce la ciudad.",
      zip: "Introduce el código postal.",
      phone: "Introduce el teléfono.",
      phonePrefix: "Selecciona el prefijo del país.",
      email: "Introduce un correo electrónico válido."
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

  const note = document.querySelector("[data-whatsapp-note]");
  const display = document.querySelector("[data-whatsapp-display]");
  const buttons = document.querySelectorAll("[data-whatsapp]");
  const digits = whatsappDigits(WHATSAPP_NUMBER);

  if (!buttons.length) return;

  if (!digits) {
    buttons.forEach((button) => {
      button.removeAttribute("href");
      button.removeAttribute("target");
      button.setAttribute("aria-disabled", "true");
      button.setAttribute("aria-describedby", "whatsapp-note");
      button.classList.add("is-disabled");
    });
    if (note) note.hidden = false;
    if (display) display.textContent = WHATSAPP_DISPLAY;
    return;
  }

  const text = encodeURIComponent(COPY[language].whatsapp);
  buttons.forEach((button) => {
    button.href = `https://wa.me/${digits}?text=${text}`;
    button.target = "_blank";
    button.rel = "noopener noreferrer";
    button.removeAttribute("aria-disabled");
    button.removeAttribute("aria-describedby");
    button.classList.remove("is-disabled");
  });
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
  const prefixButton = document.getElementById("phone-prefix-btn");
  if (prefixButton) prefixButton.setAttribute("aria-label", COPY[language].phonePrefix);
  const prefixSearch = document.querySelector(".phone-prefix-search");
  if (prefixSearch) prefixSearch.placeholder = COPY[language].phoneSearch;

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

const ACCOUNT_FIELDS = ["full-name", "company-name", "vat-number", "address", "country", "city", "zip", "phone", "email"];

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
    from_name: fieldValue("full-name")
  };

  ACCOUNT_FIELDS.forEach((id) => {
    const label = visibleText(document.querySelector(`label[for="${id}"]`)) || id;
    if (id === "phone") {
      const prefix = fieldValue("phone-prefix");
      const number = fieldValue("phone");
      payload[label] = prefix && number ? `${prefix} ${number}` : number;
      return;
    }
    payload[label] = fieldValue(id);
  });

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
    ["full-name", "fullName"],
    ["company-name", "company"],
    ["vat-number", "vat"],
    ["address", "address"],
    ["country", "country"],
    ["city", "city"],
    ["zip", "zip"],
    ["phone", "phone"],
    ["email", "email"]
  ];
  let firstInvalid = null;

  checks.forEach(([id, key]) => {
    const field = document.getElementById(id);
    const value = fieldValue(id);
    let message = "";
    if (!value) message = COPY[language].errors[key];
    if (id === "phone" && !fieldValue("phone-prefix")) {
      message = COPY[language].errors.phonePrefix;
    }
    if (id === "email" && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      message = COPY[language].errors.email;
    }
    setFieldError(field, message);
    if (message && !firstInvalid) {
      firstInvalid = id === "phone" && !fieldValue("phone-prefix")
        ? document.getElementById("phone-prefix-btn")
        : field;
    }
  });

  if (firstInvalid) firstInvalid.focus();
  return !firstInvalid;
}

function syncHeader() {
  const header = document.querySelector(".site-header");
  const hero = document.querySelector(".hero");
  if (!header || !hero) return;

  const update = () => {
    const pastHero = hero.getBoundingClientRect().bottom <= header.offsetHeight;
    header.classList.toggle("is-solid", pastHero);
  };

  update();
  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
}

function phoneFlag(iso) {
  return String.fromCodePoint(...iso.toUpperCase().split("").map((char) => 127397 + char.charCodeAt(0)));
}

const PHONE_COUNTRIES = `
Afghanistan|AF|93
Albania|AL|355
Algeria|DZ|213
Andorra|AD|376
Angola|AO|244
Antigua and Barbuda|AG|1 268
Argentina|AR|54
Armenia|AM|374
Australia|AU|61
Austria|AT|43
Azerbaijan|AZ|994
Bahamas|BS|1 242
Bahrain|BH|973
Bangladesh|BD|880
Barbados|BB|1 246
Belarus|BY|375
Belgium|BE|32
Belize|BZ|501
Benin|BJ|229
Bhutan|BT|975
Bolivia|BO|591
Bosnia and Herzegovina|BA|387
Botswana|BW|267
Brazil|BR|55
Brunei|BN|673
Bulgaria|BG|359
Burkina Faso|BF|226
Burundi|BI|257
Cambodia|KH|855
Cameroon|CM|237
Canada|CA|1
Cape Verde|CV|238
Central African Republic|CF|236
Chad|TD|235
Chile|CL|56
China|CN|86
Colombia|CO|57
Comoros|KM|269
Congo|CG|242
Costa Rica|CR|506
Croatia|HR|385
Cuba|CU|53
Cyprus|CY|357
Czechia|CZ|420
Denmark|DK|45
Djibouti|DJ|253
Dominica|DM|1 767
Dominican Republic|DO|1 809
DR Congo|CD|243
Ecuador|EC|593
Egypt|EG|20
El Salvador|SV|503
Equatorial Guinea|GQ|240
Eritrea|ER|291
Estonia|EE|372
Eswatini|SZ|268
Ethiopia|ET|251
Fiji|FJ|679
Finland|FI|358
France|FR|33
Gabon|GA|241
Gambia|GM|220
Georgia|GE|995
Germany|DE|49
Ghana|GH|233
Greece|GR|30
Grenada|GD|1 473
Guatemala|GT|502
Guinea|GN|224
Guinea-Bissau|GW|245
Guyana|GY|592
Haiti|HT|509
Honduras|HN|504
Hungary|HU|36
Iceland|IS|354
India|IN|91
Indonesia|ID|62
Iran|IR|98
Iraq|IQ|964
Ireland|IE|353
Israel|IL|972
Italy|IT|39
Ivory Coast|CI|225
Jamaica|JM|1 876
Japan|JP|81
Jordan|JO|962
Kazakhstan|KZ|7
Kenya|KE|254
Kiribati|KI|686
Kuwait|KW|965
Kyrgyzstan|KG|996
Laos|LA|856
Latvia|LV|371
Lebanon|LB|961
Lesotho|LS|266
Liberia|LR|231
Libya|LY|218
Liechtenstein|LI|423
Lithuania|LT|370
Luxembourg|LU|352
Madagascar|MG|261
Malawi|MW|265
Malaysia|MY|60
Maldives|MV|960
Mali|ML|223
Malta|MT|356
Marshall Islands|MH|692
Mauritania|MR|222
Mauritius|MU|230
Mexico|MX|52
Micronesia|FM|691
Moldova|MD|373
Monaco|MC|377
Mongolia|MN|976
Montenegro|ME|382
Morocco|MA|212
Mozambique|MZ|258
Myanmar|MM|95
Namibia|NA|264
Nauru|NR|674
Nepal|NP|977
Netherlands|NL|31
New Zealand|NZ|64
Nicaragua|NI|505
Niger|NE|227
Nigeria|NG|234
North Korea|KP|850
North Macedonia|MK|389
Norway|NO|47
Oman|OM|968
Pakistan|PK|92
Palau|PW|680
Palestine|PS|970
Panama|PA|507
Papua New Guinea|PG|675
Paraguay|PY|595
Peru|PE|51
Philippines|PH|63
Poland|PL|48
Portugal|PT|351
Qatar|QA|974
Romania|RO|40
Russia|RU|7
Rwanda|RW|250
Saint Kitts and Nevis|KN|1 869
Saint Lucia|LC|1 758
Saint Vincent and the Grenadines|VC|1 784
Samoa|WS|685
San Marino|SM|378
Sao Tome and Principe|ST|239
Saudi Arabia|SA|966
Senegal|SN|221
Serbia|RS|381
Seychelles|SC|248
Sierra Leone|SL|232
Singapore|SG|65
Slovakia|SK|421
Slovenia|SI|386
Solomon Islands|SB|677
Somalia|SO|252
South Africa|ZA|27
South Korea|KR|82
South Sudan|SS|211
Spain|ES|34
Sri Lanka|LK|94
Sudan|SD|249
Suriname|SR|597
Sweden|SE|46
Switzerland|CH|41
Syria|SY|963
Taiwan|TW|886
Tajikistan|TJ|992
Tanzania|TZ|255
Thailand|TH|66
Timor-Leste|TL|670
Togo|TG|228
Tonga|TO|676
Trinidad and Tobago|TT|1 868
Tunisia|TN|216
Turkey|TR|90
Turkmenistan|TM|993
Tuvalu|TV|688
Uganda|UG|256
Ukraine|UA|380
United Arab Emirates|AE|971
United Kingdom|GB|44
United States|US|1
Uruguay|UY|598
Uzbekistan|UZ|998
Vanuatu|VU|678
Vatican City|VA|39
Venezuela|VE|58
Vietnam|VN|84
Yemen|YE|967
Zambia|ZM|260
Zimbabwe|ZW|263
`.trim().split("\n").map((line) => {
  const [name, iso, dial] = line.split("|");
  return { name, iso, dial, prefix: `+${dial}` };
}).sort((a, b) => a.name.localeCompare(b.name));

function setupPhonePrefix() {
  const root = document.querySelector(".phone-prefix");
  const button = document.getElementById("phone-prefix-btn");
  const panel = document.getElementById("phone-prefix-list");
  const hidden = document.getElementById("phone-prefix");
  const phone = document.getElementById("phone");
  if (!root || !button || !panel || !hidden || !phone) return;

  const value = button.querySelector(".phone-prefix-value");
  const search = document.createElement("input");
  search.type = "text";
  search.className = "phone-prefix-search";
  search.autocomplete = "off";
  search.setAttribute("aria-label", COPY.en.phoneSearch);
  const list = document.createElement("ul");
  list.id = "phone-prefix-options";
  list.className = "phone-prefix-options";
  list.setAttribute("role", "listbox");
  panel.append(search, list);

  function paint() {
    const selected = PHONE_COUNTRIES.find((country) => country.prefix === hidden.value);
    if (!selected) {
      value.textContent = "+";
      value.classList.add("is-empty");
      return;
    }
    value.textContent = `${phoneFlag(selected.iso)} ${selected.prefix}`;
    value.classList.remove("is-empty");
  }

  function render() {
    const query = search.value.trim().toLowerCase();
    const digits = query.replace(/\D/g, "");
    list.replaceChildren();
    PHONE_COUNTRIES.filter((country) => {
      if (!query) return true;
      const dial = country.dial.replace(/\s/g, "");
      return country.name.toLowerCase().includes(query) || (digits && dial.includes(digits));
    }).forEach((country) => {
      const item = document.createElement("li");
      const option = document.createElement("button");
      option.type = "button";
      option.className = "phone-prefix-option";
      option.setAttribute("role", "option");
      option.setAttribute("aria-selected", country.prefix === hidden.value ? "true" : "false");
      option.innerHTML = `<span aria-hidden="true">${phoneFlag(country.iso)}</span><span class="phone-prefix-code">${country.prefix}</span><span class="phone-prefix-name">${country.name}</span>`;
      option.addEventListener("click", () => {
        hidden.value = country.prefix;
        paint();
        close();
        setFieldError(phone, "");
        phone.focus();
      });
      item.append(option);
      list.append(item);
    });
  }

  function open() {
    panel.hidden = false;
    button.setAttribute("aria-expanded", "true");
    render();
    search.focus();
  }

  function close() {
    panel.hidden = true;
    button.setAttribute("aria-expanded", "false");
    search.value = "";
  }

  button.addEventListener("click", () => {
    if (panel.hidden) open();
    else close();
  });

  search.addEventListener("input", render);
  search.addEventListener("keydown", (event) => {
    if (event.key === "Enter") event.preventDefault();
    if (event.key === "Escape") {
      event.preventDefault();
      close();
      button.focus();
    }
  });

  document.addEventListener("click", (event) => {
    if (!panel.hidden && !root.contains(event.target)) close();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !panel.hidden && document.activeElement !== search) {
      close();
      button.focus();
    }
  });

  if (form) {
    form.addEventListener("reset", () => {
      window.setTimeout(paint, 0);
    });
  }

  paint();
}

function init() {
  setupPhonePrefix();
  const params = new URLSearchParams(window.location.search);
  const queryLang = params.get("lang");
  const initial = lang();
  const updateUrl = queryLang ? queryLang !== initial : initial !== "en";
  applyLanguage(initial, { updateUrl });
  syncHeader();

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

  document.querySelectorAll("[data-whatsapp]").forEach((whatsapp) => {
    whatsapp.addEventListener("click", (event) => {
      if (whatsapp.getAttribute("aria-disabled") === "true") event.preventDefault();
    });
  });
}

init();
