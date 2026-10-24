# Cory Carmen — Projects

## StockGrader (Capstone)

**Built with:** React, Vite, React Router, Bootstrap, Recharts, jsPDF, Node.js,
Express.js, MongoDB, JWT, Google OAuth, Finnhub API, XBRL financial data,
GitHub Actions.

A full-stack web app that grades publicly traded stocks on an A–F scale by
analyzing five fundamental financial criteria from Finnhub data, turning complex
numbers into a quick, easy-to-read assessment. It currently grades 165 publicly
traded companies, re-graded automatically every morning, and is backed by 332
automated tests across the frontend and backend. Anyone can grade a stock without
an account (guests are rate-limited to 30 lookups per 15 minutes). Signing in
with email/password or Google adds a watchlist that tracks grade changes, search
history, and a compare view for two to three stocks. Includes dark/light mode,
ticker and company-name search, a five-year revenue and free-cash-flow trend
chart, and unit tests across the frontend and backend.

This is Cory's capstone, but it is still live and actively worked on against a
post-MVP roadmap. Work shipped in September and October 2026:

- **Bank grading model:** banks used to get N/A because they have no free cash
  flow in the usual sense. They are now graded on book value growth, net income
  growth, return on equity, return on assets, and efficiency ratio, compared with
  the median of 14 seeded banks. A ratio passes unless it is clearly worse than
  the typical bank, because banks cluster too tightly for a strict line. Insurers,
  REITs, and utilities still use the general model with a caveat.
- **Plain-English explanations:** every grade opens with a "Why this grade?"
  summary and a plain sentence for each criterion.
- **Industry comparison:** each stock's revenue growth, free cash flow margin,
  and free cash flow growth are compared with its industry median, shown only
  when at least 8 peers are graded. It never changes the letter.
- **Keeping grades current:** a daily GitHub Actions job re-grades stale stocks
  directly against MongoDB, and a yearly job updates the bank medians (refusing
  to commit if any median jumps more than 25%). Every Finnhub call is paced
  through one shared rate limiter, and the watchlist shows progress while
  refreshing.
- **Grade-flip investigation:** in early October the daily refresh flipped many
  grades back and forth with no code or filing changes. Cory traced it to the
  trailing-twelve-month criteria depending on which quarter Finnhub returned as
  newest, and made the refresh log record which criteria moved and which quarter
  TTM was built from, so the next occurrence explains itself.
- **PDF reports and account settings:** every grade page can download a PDF
  report, and a new Account page lets users rename themselves, download their
  data as a PDF, clear search history, or delete their account.

Earlier post-MVP work focused on grading accuracy with messy real-world filings:
sector-aware caveats, summing segment-level capex for companies like NextEra,
and measuring the growth lookback in calendar years.

**What Cory learned:** building and deploying a complete full-stack app end to
end, wiring a React frontend to an authenticated Express and MongoDB API with
third-party data and OAuth — then running it like a real product, with scheduled
jobs, a shared rate limit, and tracing unexpected grade changes back to the data.

Live site: https://stock-advisor-frontend.vercel.app
Frontend repo: https://github.com/Cory71/stock-advisor-frontend
Backend repo: https://github.com/Cory71/stock-advisor-backend

## BC Marine (Web & Mobile App)

**Built with:** React 19, Vite, React Router, Expo SDK 57, React Native,
JavaScript (ES modules), Vercel Functions, Vitest, Testing Library, ESLint,
GitHub Actions.

Live tides, wind, waves, tidal currents, and Environment Canada marine
forecasts for 40+ locations on the BC coast, from Victoria to Prince Rupert.
Data comes from the DFO tide API, Open-Meteo Marine API, and Environment Canada
feeds. It started as an Expo / React Native mobile app (search, favorites, GPS,
pull-to-refresh, offline caching) and on October 24, 2026 also launched as a
public web app. Both apps share one data layer. It is live and still actively
worked on, with more features planned.

What shipped with the web launch:

- **Web app:** Vite + React 19 on Vercel, with a desktop station sidebar, a
  phone-friendly drawer, a dashboard, tides / weather / currents views, a
  hand-built SVG tide chart, and shareable links (e.g. `/tides?station=tofino`).
- **Monorepo:** npm workspaces with `apps/web`, `apps/mobile`, and
  `packages/shared`, a plain-JS data layer used by both apps.
- **Serverless proxy:** Environment Canada's feeds block browser requests (no
  CORS headers), so a Vercel function with an allowlist fetches them. Responses
  are CDN-cached for 30 minutes.
- **BC time everywhere:** times show in Pacific time for every viewer, with
  daylight-saving edge cases tested. CI also caught BC's move to permanent
  UTC−7 on November 1, 2026.
- **Data accuracy fix:** Cory audited all 41 locations against DFO's station
  catalogue. 23 were showing tides from 20–218 km away; each now uses its own
  station, verified against live data.
- **Performance:** each data source appears as soon as it arrives, axios was
  replaced with `fetch`, and code-splitting cut the first JavaScript download
  from 125 KB to 86 KB (gzipped).
- **Quality:** 77 Vitest tests, ESLint, and GitHub Actions CI (lint, tests, web
  build, mobile bundle check). Lighthouse desktop: Performance 98–100,
  Accessibility 100, Best Practices 100, SEO 100.

**How it was built:** Cory designed the app and wrote the design spec and build
plan, including the key decisions: shared data package, Vercel hosting,
JavaScript, BC time in shared code, and an allowlisted proxy. Implementation
was AI-assisted (Claude Code), with tests written first and every step checked
in a browser or on a phone.

Live site: https://bc-marine.vercel.app
Repo: https://github.com/Cory71/bc-marine
Architecture notes: https://github.com/Cory71/bc-marine/blob/main/docs/architecture.md

## Weather Forecasting App

**Built with:** React, JavaScript, Material UI, OpenWeatherMap API, Browser
Geolocation API.

A weather app that lets users search any city and view current conditions plus a
five-day forecast, with light/dark mode and Celsius/Fahrenheit switching. Manages
search state, loading, and error feedback with React, in a responsive layout.

A "Use my location" button reads the device location from the browser and turns
the coordinates into a city name with OpenWeatherMap reverse geocoding, with an
optional setting to do that automatically on startup. Favorite cities can be
saved from a star button beside the search box and reloaded from the settings
menu, kept in the browser between visits. The theme follows the device light or
dark setting by default, and a manual pick survives a reload.

**What Cory learned:** building a clean React dashboard with reusable components,
API-driven views, browser geolocation and storage, and a polished user interface.

Live site: https://skycast-nine-livid.vercel.app/
Repo: https://github.com/Cory71/weather-app-cs

## Note-Taking App

**Built with:** JavaScript, Node.js, Express, MongoDB, Mongoose, EJS, Passport,
Auth0.

A full-stack note-taking app where users sign in and create, read, update, and
delete their own personal notes, with ownership-based authorization and a REST
API at /api/notes. Supports local accounts or optional Auth0 login, with
sessions persisted in MongoDB across restarts. Offers full CRUD, scoped search,
and pin/unpin with manual reordering, plus a dark/light theme.

**What Cory learned:** building an authenticated full-stack app with sessions,
ownership-based authorization, CRUD workflows, and a matching REST API on
MongoDB.

Live site: https://note-taking-app-mt.onrender.com (Render free tier — first
load may take up to a minute to wake)
Repo: https://github.com/Cory71/note-taking-app-MT

## Portfolio Website

**Built with:** HTML5, CSS3, JavaScript, Bootstrap, DOM Manipulation, REST APIs.

Cory's personal portfolio site, combining personal branding content with
interactive frontend behavior: live weather data, news feeds, quotes, dark mode,
settings controls, and a contact form. Uses responsive layouts and theme-aware
styling throughout. This "Chat with Cory" AI assistant is the newest feature.

**What Cory learned:** combining frontend polish, API integration, and
user-focused improvements in one evolving project.

Repo: https://github.com/Cory71/cory-carmen-portfolio-public-
