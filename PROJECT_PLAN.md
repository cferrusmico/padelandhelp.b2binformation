# Project plan

## Goal

One landing page should do three things:

1. Explain the B2B offer of Padel & Help, the official platform of Zona de Padel.
2. Collect a company account request.
3. Show the two franchise models and a direct way to get in touch.

The reader is a club, a shop or another padel business. The page does not invent statistics. Contact details stay the published ones: email `b2beu@zonadepadel.com` and WhatsApp `+34 624036927`.

## Page order

1. **Hero.** Court photo, both logos, the offer in one line, and one button into Create Account.
2. **B2B Conditions.** Equipment, the online platform, payments, delivery and personal assistance.
3. **Create Account.** Three steps, then the form.
   - Create the account.
   - The first order is placed with the sales manager, who advises on price and stock.
   - From the second order, the business can order on the portal, with the sales manager still available.
4. **Assistance.** WhatsApp and email under the form. The WhatsApp button stays green. The other action buttons are orange.
5. **Franchises.** A full Zona de Padel store, and a smaller Padel & Help corner.
6. **Contact.** Phone, email and WhatsApp.
7. **Footer.** The same phone and email, plus the line that Padel & Help is the official B2B platform of Zona de Padel.

## How it is built

The site is plain HTML, CSS and JavaScript. There is no framework and no build.

Each language is written in the HTML with `data-lang`. A short script in the page head picks English, French or Spanish from the URL, then from the saved choice. `script.js` keeps the menu, the form and the contacts in the same language.

The account form asks for full name, company name, VAT number, address, country, city, ZIP code, phone and email. The phone field starts with a country flag and dial code. The form does not send until that code is chosen. On success it shows a short green confirmation: the request was received and the sales team will be in touch when the account is ready.

The form is posted to Web3Forms, which emails the B2B team. The access key lives only in `script.js` and is not repeated in this document.

WhatsApp links use the published number. The image shown when the URL is shared is the hero court photo, `assets/hero-court.jpg`.

## What stays fixed

The palette is navy `#0c2340`, blue `#163e78` and white. Orange `#ff5c1f` is for the action buttons. The navigation sits on the hero photo and turns solid navy after the hero scrolls away. The menu labels stay Home, B2B Conditions, Create Account, Franchises and Contact, with Log in and the language flags on the right.
