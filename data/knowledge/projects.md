# Cory Carmen — Projects

## StockGrader (Capstone)

**Built with:** React, Vite, React Router, Bootstrap, Recharts, Node.js,
Express.js, MongoDB, JWT, Google OAuth, Finnhub API, XBRL financial data.

A full-stack web app that grades publicly traded stocks on an A–F scale by
analyzing five fundamental financial criteria from Finnhub data, turning complex
numbers into a quick, easy-to-read assessment. Supports email/password and
Google sign-in, a grade card breaking down all five criteria, a watchlist that
tracks grade changes, and a compare view for two to three stocks. Includes
dark/light mode, ticker and company-name search, and a full suite of unit tests
across the frontend and backend.

This is Cory's capstone, but it is still live and actively worked on against a
post-MVP roadmap. Recent work focuses on grading accuracy with messy real-world
filings: a revenue and free-cash-flow trend chart on the grade page that plots
five years on one shared axis and names any years a filing could not supply;
sector-aware messaging so REITs and utilities get an honest caveat instead of
being told they are financial firms; summing segment-level capital-expenditure
lines for companies like NextEra that file no consolidated capex line; and
measuring the growth lookback window in calendar years rather than row count, so
every stock is judged over the same span even when a filing year is unreadable.

**What Cory learned:** building and deploying a complete full-stack app end to
end, wiring a React frontend to an authenticated Express and MongoDB API with
third-party data and OAuth — then continuing to harden the grading logic against
inconsistent real-world financial data.

Live site: https://stock-advisor-frontend.vercel.app
Frontend repo: https://github.com/Cory71/stock-advisor-frontend
Backend repo: https://github.com/Cory71/stock-advisor-backend

## BC Marine (Mobile App)

**Built with:** React Native, Expo, React Navigation, Axios, AsyncStorage,
react-native-svg.

A cross-platform mobile app for British Columbia's coastal mariners that shows
live tide heights, wind, waves, currents, and Environment Canada marine
forecasts for stations from Victoria to Prince Rupert. Pulls live data from the
DFO tide API, Open-Meteo Marine API, and Environment Canada feeds. Lets users
search locations, save favorites, or use GPS, with pull-to-refresh and offline
caching. Handles partial API outages gracefully, showing whatever data did load
instead of failing the whole screen.

Kept current with the platform: upgraded through Expo SDK 57, running on React
Native 0.86 and React 19, with unused dependencies pruned.

**What Cory learned:** building a full React Native app with Expo, combining
multiple live APIs, managing app state, navigation, and local storage on mobile,
and keeping a shipped app current across major SDK upgrades.

Repo: https://github.com/Cory71/bc-marine

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
