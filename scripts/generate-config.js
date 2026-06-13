// Build step for Vercel deploys.
// Recreates js/config.local.js from environment variables so the live site has
// the private contact details and API keys WITHOUT committing them to the repo.
//
// Safe locally: if the environment variables are not set, this does nothing and
// leaves any existing js/config.local.js untouched.

const fs = require('fs');
const path = require('path');

// These values are private, so they come from environment variables (set in Vercel).
const email = process.env.CONTACT_EMAIL || '';
const phone = process.env.CONTACT_PHONE || '';
const location = process.env.CONTACT_LOCATION || '';
const web3formsAccessKey = process.env.WEB3FORMS_ACCESS_KEY || '';
const weatherApiKey = process.env.WEATHER_API_KEY || '';

// If the key values are missing (e.g. local dev), skip and keep the existing file.
if (!web3formsAccessKey && !weatherApiKey && !email) {
    console.log('generate-config: no env vars set, keeping existing config.local.js');
    process.exit(0);
}

// Build the config object the site already understands.
const config = {
    contact: {
        email,
        phone,
        location,
        web3formsAccessKey
    },
    visibility: {
        showEmail: true,
        showPhone: true,
        showLocation: true,
        enableContactForm: true,
        enableWeatherWidget: true
    },
    weather: {
        apiKey: weatherApiKey,
        defaultLocationQuery: 'Nanaimo,CA',
        defaultLocationLabel: 'Nanaimo, BC',
        units: 'metric'
    }
};

// Write the file the same way the manual version looks.
const fileContents =
    '// Auto-generated at build time from environment variables. Do not edit by hand.\n' +
    'window.PORTFOLIO_LOCAL_CONFIG = ' + JSON.stringify(config, null, 4) + ';\n';

const outputPath = path.join(__dirname, '..', 'js', 'config.local.js');
fs.writeFileSync(outputPath, fileContents);

console.log('generate-config: wrote js/config.local.js from environment variables');
