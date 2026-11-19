# Padel & Help B2B

Padel & Help is the official B2B platform of Zona de Padel. It is not a separate company. This repository is the landing page for clubs, shops and padel businesses that want a professional account, B2B prices and support from a sales manager.

The public site is [https://padelandhelp.vercel.app/](https://padelandhelp.vercel.app/).

The page is in English, French and Spanish. Open `?lang=en`, `?lang=fr` or `?lang=es`. The choice is remembered in the browser.

## Open it locally

There is no build step. From this folder, start a static server and open the address it prints:

```bash
python3 -m http.server 8777
```

Then visit `http://127.0.0.1:8777/`.

## Files

| File | Role |
| --- | --- |
| `index.html` | The page: copy in three languages, sections and the account form |
| `style.css` | Layout and colour |
| `script.js` | Language switching, the account form and the phone country code |
| `assets/` | Court photo, franchise photos and logos |

`PROJECT_PLAN.md` explains the goal of the page and how it is put together.
