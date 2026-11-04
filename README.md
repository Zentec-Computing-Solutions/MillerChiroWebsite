# Miller Chiropractic

A responsive single-page website built with vanilla HTML, CSS and JavaScript. No build step is required.

## Preview

From this directory, run `python -m http.server 8000` and open http://localhost:8000.

## GitHub Pages

In the repository's **Settings → Pages**, choose **Deploy from a branch**, then select the branch containing these files and **/ (root)**. All local asset paths are relative, so the site supports both project Pages URLs and a custom domain. No domain or DNS change is included in this checkout.

## Contact form

The form uses the official Forminit browser SDK and public Form ID `e20cx0opi34`. It sends name (`fi-sender-fullName`), email (`fi-sender-email`), optional international phone (`fi-sender-phone`) and message (`fi-text-message`). No API key is needed. It prevents concurrent submissions, retains input on failure, and reports success only when the SDK returns a submission hash. Native HTML submission is available without JavaScript.

Submit one real test from the deployed site and verify it at https://app.forminit.com. Check Spam if it does not reach the inbox, especially if Authorized domains exclude the testing host. A real submission has not been sent during development.

## Content and assets

Prices (effective 1 January 2026), phone number, biography and original photography were taken from https://www.millerchiro.co.nz/ and its Prices/Policies and Contact/About us pages. The design intentionally excludes clinics, policies and products sections. Services copy is a concise introduction, without additional treatment-outcome claims. Fonts load from Google Fonts with system fallbacks; Forminit is the only form service.

Original images used:
- `assets/rowan.jpg`: `/uploads/4/3/2/0/43200219/2807624.jpg`
- `assets/coast.jpg`: `/uploads/4/3/2/0/43200219/background-images/852011334.jpg` (fern photograph)

Before launch, the customer should review the content, prices and photographs. Update prices directly in `index.html`, styles in `styles.css`, and form/navigation behaviour in `script.js`.
