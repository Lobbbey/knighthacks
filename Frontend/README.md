# Angular Landing & Auth App

A super basic Angular application with a landing page and login/signup functionality.

## Features

- **Landing Page**: Simple welcome page with call-to-action
- **Auth Page**: Combined login and signup forms with toggle functionality
- **Routing**: Basic navigation between pages

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm

### Installation

1. Navigate to the project directory:
```bash
cd angular-app
```

2. Install dependencies:
```bash
npm install
```

### Running the App

Start the development server:
```bash
npm start
```

Or use:
```bash
ng serve
```

The app will be available at `http://localhost:4200`

## Project Structure

```
src/app/
├── landing/          # Landing page component
├── auth/            # Login/Signup page component
├── app.routes.ts    # Route configuration
└── app.ts           # Main app component
```

## Usage

- Visit `/` for the landing page
- Click "Sign Up / Login" button to go to the auth page
- Toggle between login and signup modes on the auth page
- Forms currently log data to console (add your backend logic)

## Next Steps

To make this production-ready, you'll want to:
1. Connect forms to a backend API
2. Add form validation
3. Implement authentication logic
4. Add error handling
5. Add loading states
6. Implement proper session management
