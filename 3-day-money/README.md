# 3-Day Introduction to Understanding Money

A free Right Side of Money program. Static HTML, CSS and JavaScript, ready for GitHub Pages.

## Files

| File | What it is |
|---|---|
| `index.html` | Welcome page and sign-up form (name and email go to Formspree) |
| `day-1.html` | Day 1: Understanding Money |
| `day-2.html` | Day 2: Understand the System |
| `day-3.html` | Day 3: Understand How to Position Yourself |
| `final.html` | Final Knowledge Check (15 questions) and Course Completion Message |
| `complete.html` | Certificate, growth self-rating, action plan and reflection journal |
| `assets/course.css` | Brand styles (black and gold) |
| `assets/course.js` | Course engine. **Settings are at the top of this file.** |
| `assets/rsm-logo.png` | RSM logo with a transparent background |

## Put it on your site

1. Upload the whole `3-day-money` folder to your rightsideofmoney.com repository, keeping the `assets` folder inside it.
2. Commit. GitHub Pages publishes it at `https://rightsideofmoney.com/3-day-money/`.
3. Link your site's buttons, and your old Wix course page, to that address.

## Settings (top of `assets/course.js`)

- `formspreeId`: your Formspree form ID (currently `xrpbgjbb`).
- `instructorName` / `instructorTitle`: printed on the certificate.
- `passMark`: 0.8 means 80% is required to unlock the next day.

## What Formspree receives

- **Registered:** name and email when someone signs up.
- **Completed course:** name, email, final score, and Day 1 to 3 scores when someone passes the Final.

## How progress works

Progress, answers and reflections save in the student's browser on that device. If a student switches devices or clears their browser data, they'll need to register again and start over. Nothing a student types in a reflection is sent anywhere.
