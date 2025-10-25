# Quick Start Guide

## What You Got

A super basic Angular app with:
- Landing page at `/`
- Login/Signup page at `/auth`
- Clean, minimal styling
- Basic routing

## To Run It

1. Extract the `angular-app.tar.gz` file
2. Open terminal in the extracted folder
3. Run: `npm install`
4. Run: `npm start`
5. Open browser to `http://localhost:4200`

## File Structure

```
angular-app/
├── src/
│   ├── app/
│   │   ├── landing/          # Landing page
│   │   │   ├── landing.html
│   │   │   ├── landing.css
│   │   │   └── landing.ts
│   │   ├── auth/             # Login/Signup page
│   │   │   ├── auth.html
│   │   │   ├── auth.css
│   │   │   └── auth.ts
│   │   ├── app.routes.ts     # Routes config
│   │   └── app.ts            # Main app
│   └── styles.css            # Global styles
└── package.json

```

## What the Pages Do

**Landing Page:**
- Shows a hero section with "Get Started" button
- Displays 3 feature cards
- Button navigates to auth page

**Auth Page:**
- Toggle between Login and Signup
- Login form: email + password
- Signup form: name + email + password
- Currently just logs to console (add your backend!)
- Back button returns to landing page

## Next Steps

The forms are wired up but need backend integration:
1. Replace the `onSubmit()` method in `auth.ts` with actual API calls
2. Add form validation (Angular Reactive Forms)
3. Add authentication service
4. Store tokens/session data
5. Add route guards for protected pages

Enjoy building! 🚀
