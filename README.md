# The Artemis Collective — website

Three plain pages, no build step: `index.html` (landing), `services.html`, `inquire.html`.
Colors and fonts live at the top of `style.css`. Images live in `images/`.

## 1. Put it on GitHub Pages

1. Create a new **public** repo on github.com (for example `artemis-collective`).
2. Push this folder to it:
   ```
   git remote add origin https://github.com/<you>/artemis-collective.git
   git push -u origin main
   ```
3. On GitHub: **Settings → Pages → Source: Deploy from a branch → `main` / root → Save.**
   The site appears at `https://<you>.github.io/artemis-collective/` within a minute or two.
4. Custom domain (optional): add a file named `CNAME` containing the domain, then point the
   domain's DNS at GitHub Pages (same steps as jraft.co).

## 2. Connect the inquiry form (email on every submission)

GitHub Pages only serves files — it can't receive a form. Formspree receives it for you,
emails you each inquiry, and keeps every submission in a dashboard you can log into.

1. Sign up at formspree.io (free plan: 50 submissions/month).
2. **New form** → name it "Artemis Inquiry" → set the email it should notify.
3. Copy the form ID (the part after `/f/` in its endpoint, e.g. `xyzabcd`).
4. In `inquire.html`, replace `YOUR_FORM_ID` with it. Commit and push.
5. Submit a test inquiry on the live site and confirm the email arrives
   (the very first submission asks you to confirm the address).

**Texts:** Formspree's free plan doesn't text. The simplest route on iPhone: in Mail, make the
Formspree sender a VIP (or turn on notifications for that thread), so each inquiry buzzes like a
text. Paid Formspree plans and Zapier can send real SMS later if wanted.

**File uploads** (photos/plans) need a paid Formspree plan, so the form leaves them out for now;
ask for photos in your reply.

## 3. Adding renderings later

- Landing image: replace `images/landscape.jpg` (keep the name, or update `index.html`).
- Services page: swap the image in the `.band` block, or add more.
- A portfolio grid style (`.gallery`) is ready in `style.css` for when there are several renderings.
