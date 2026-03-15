# Cory Carmen Portfolio Website

A personal portfolio website that showcases Cory Carmen's transition from commercial diving and fishing into software development. The site combines personal story, project presentation, interactive widgets, and responsive design to demonstrate growth toward full-stack development.

## Overview

The portfolio is built as a static website with interactive JavaScript features and responsive styling. It highlights Cory's background, development journey, technical skills, current learning focus, and recent projects.

## Key Features

- Expanded hero, About, and Journey content with stronger personal branding
- Dedicated transition story section
- Grouped technical skills with interactive skill popups
- Currently Learning section for active growth areas
- Project showcase cards with descriptive summaries
- Public GitHub link for the note-taking app
- Weather widget with local-only API configuration support
- News widget using Global News RSS feeds
- Quote of the Day widget
- Contact form with validation and mail client integration
- Dark mode with saved settings
- Dynamic footer year set through JavaScript
- Simple local-only config setup for private contact details and API keys
- Responsive layout refinements for desktop, tablet, and mobile screens

## Project Structure

```text
cory-carmen-portfolio/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── script.js
├── images/
│   ├── Profile1.jpeg
│   └── Profile2.jpeg
├── README.md
├── MyInteractiveWebsiteJourney.md
└── Portfolio-Upgrade-Plan.md
```

## Technologies Used

- Frontend: HTML5, CSS3, JavaScript (ES6+)
- Frameworks and UI: Bootstrap 5.3.0
- APIs: OpenWeatherMap API, Global News RSS feeds
- JavaScript features: Async/Await, Fetch API, DOM manipulation, event-driven interactions
- Current stack growth: React, React Native, Express.js, MongoDB, Auth0, Passport Local Strategy
- Tools: Git, GitHub, Postman

## Content Sections

### Personal Story

- Hero section with stronger portfolio messaging
- Expanded About section
- Career transition story
- Rewritten Journey section with clearer milestones

### Skills and Learning

- Categorized skills for easier scanning
- Interactive skill details on click
- Separate Currently Learning section for active technologies

### Projects

- Project table replaced with project cards
- Featured portfolio project card
- Public repository link for the note-taking app

## Responsive Design

- Main layout collapses cleanly to one column on smaller screens
- Skill groups, learning cards, and project cards stack at tablet and mobile breakpoints
- Project links become full-width on smaller screens for easier tapping
- Widget controls stack vertically on smaller devices for better usability

## Development Setup

1. Clone or download the project files.
2. Open the folder in VS Code.
3. Run the site with a local server or Live Server for best results.

## Local Private Setup

This project now separates public-safe values from local private values.

- Public-safe defaults live directly in `js/script.js`.
- `js/config.local.js` is only for your private local values.
- `js/config.local.js` is ignored by Git, so it stays on your machine.

If you want your local version to show your direct contact details and weather widget, create a file named `js/config.local.js` and add your own values.

Example:

```js
window.PORTFOLIO_LOCAL_CONFIG = {
    contact: {
        email: 'your-email@example.com',
        phone: '(555) 555-5555',
        location: 'Your City, Province, Country'
    },
    visibility: {
        showEmail: true,
        showPhone: true,
        showLocation: true,
        enableContactForm: true,
        enableWeatherWidget: true
    },
    weather: {
        apiKey: 'your-openweathermap-api-key',
        defaultLocationQuery: 'Nanaimo,CA',
        defaultLocationLabel: 'Nanaimo, BC',
        units: 'metric'
    }
};
```

Without that local file:

- the public version hides direct contact details
- the contact form stays disabled
- the weather widget stays disabled

This keeps the public repo cleaner while letting the local version keep working with saved private values.

## Recent Updates

### March 14, 2026

- Rewrote the hero, About, and Journey content for a stronger portfolio voice
- Added a career transition story section
- Added grouped skills and a Currently Learning section
- Replaced the project table with descriptive project cards
- Added a public GitHub link for the note-taking app
- Improved mobile responsiveness for the newer sections and widgets
- Added a dynamic footer year
- Updated the upgrade planning document checklist

## Next Ideas

- Add more public project links as repositories are ready
- Add live demos for future projects where possible
