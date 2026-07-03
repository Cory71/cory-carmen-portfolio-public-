// Tiny local development server for testing the site + chat API together.
// It serves the static files from the repo root and routes POST /api/chat to
// the same handler Vercel uses in production. No global Vercel CLI needed.
//
// Run with: npm run dev  ->  http://localhost:3000

const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const PORT = process.env.PORT || 3000;

// Load a local .env file (if present) into process.env before anything else.
loadEnvFile(path.join(ROOT, '.env'));

// The chat handler is required AFTER env vars are loaded so it sees the API key.
const chatHandler = require('../api/chat');

const CONTENT_TYPES = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'text/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.pdf': 'application/pdf'
};

const server = http.createServer((req, res) => {
    // The chat API is the only dynamic route.
    if (req.url.split('?')[0] === '/api/chat') {
        chatHandler(req, res);
        return;
    }

    serveStaticFile(req, res);
});

server.listen(PORT, () => {
    console.log(`Dev server running at http://localhost:${PORT}`);
    if (!process.env.ANTHROPIC_API_KEY) {
        console.log('Note: ANTHROPIC_API_KEY is not set, so chat answers will be disabled.');
        console.log('Add it to a .env file in the project root to enable chat.');
    }
});

// Serve a static file from the repo root, defaulting "/" to index.html.
function serveStaticFile(req, res) {
    const urlPath = decodeURIComponent(req.url.split('?')[0]);
    const relativePath = urlPath === '/' ? 'index.html' : urlPath.replace(/^\/+/, '');
    const filePath = path.join(ROOT, relativePath);

    // Keep requests inside the project folder.
    if (!filePath.startsWith(ROOT)) {
        res.writeHead(403);
        res.end('Forbidden');
        return;
    }

    fs.readFile(filePath, (error, data) => {
        if (error) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Not found');
            return;
        }

        const contentType = CONTENT_TYPES[path.extname(filePath)] || 'application/octet-stream';
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(data);
    });
}

// Very small .env parser: reads KEY=value lines into process.env.
function loadEnvFile(envPath) {
    if (!fs.existsSync(envPath)) {
        return;
    }

    const lines = fs.readFileSync(envPath, 'utf8').split('\n');

    lines.forEach(line => {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) {
            return;
        }

        const separatorIndex = trimmed.indexOf('=');
        if (separatorIndex === -1) {
            return;
        }

        const key = trimmed.slice(0, separatorIndex).trim();
        const value = trimmed.slice(separatorIndex + 1).trim();

        if (key && !(key in process.env)) {
            process.env[key] = value;
        }
    });
}
