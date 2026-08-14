# AkwaabaGH

A Ghana tourism discovery web app. AkwaabaGH brings destinations, festivals, and culture across all 16 regions of Ghana into one place, with an AI travel assistant and full Twi language support.

## Why it exists

Ghana's tourism information is scattered across blogs, social feeds, and sites that have long stopped being updated. AkwaabaGH gathers it into one curated, searchable platform, in a language visitors and Ghanaians alike are comfortable in.

## Features

- Over forty destinations across all 16 regions, each with photos, hours, entry fees, best time to visit, and a map
- A festivals calendar with cultural context and what to expect
- An AI travel assistant powered by the Claude API, grounded only in the real catalog, with conversation memory
- Live English to Twi translation powered by the Khaya AI API
- A trip planner for saving favorite destinations and festivals
- An experiences page where visitors can post reviews with a real photo or video
- Sign up and sign in

## Tech stack

**Frontend:** React, TypeScript, Vite, Tailwind CSS, React Router

**Backend:** Express, proxying requests to the Claude and Khaya AI APIs so the API keys never reach the browser

## Project structure

```
akwaaba-web/        The application
  src/               React frontend
  server/            Express backend
assets/              Original reference images
```

## Getting started

Requires Node.js.

1. Clone the repository
2. Install frontend dependencies
   ```
   cd akwaaba-web
   npm install
   ```
3. Install backend dependencies
   ```
   cd server
   npm install
   ```
4. Create `akwaaba-web/server/.env` with your own keys (see `server/.env.example`)
   ```
   ANTHROPIC_API_KEY=your key here
   KHAYA_API_KEY=your key here
   ```
5. From `akwaaba-web`, run both the frontend and backend together
   ```
   npm run dev:all
   ```
6. Open `http://localhost:5183`

## Environment variables

| Variable | Used for |
|---|---|
| `ANTHROPIC_API_KEY` | The Claude powered travel assistant |
| `KHAYA_API_KEY` | Live Twi translation |

Both belong only in `akwaaba-web/server/.env`, which is not committed to version control.

## Current state

There is no real database yet. Accounts and saved trips currently live in the browser's local storage rather than on a server, so they do not sync across devices. This is a known, planned next step.

## About

A student capstone project by Christabel Benewaah.
