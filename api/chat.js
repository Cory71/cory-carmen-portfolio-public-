// Vercel serverless function for the "Chat with Cory" widget.
// Receives a visitor question, grounds it in Cory's documents, and streams
// Claude's answer back to the browser. The API key stays server-side only.

const {
    MODEL,
    MAX_TOKENS,
    buildSystemPrompt,
    validateQuestion,
    createClient
} = require('../lib/chat-core');

module.exports = async function handler(req, res) {
    // Only POST is supported.
    if (req.method !== 'POST') {
        res.statusCode = 405;
        res.end('Method not allowed');
        return;
    }

    let question;
    try {
        const body = await readJsonBody(req);
        question = body.question;
    } catch (error) {
        sendError(res, 400, 'Sorry, that request could not be read.');
        return;
    }

    // Reject empty or oversized questions before spending any tokens.
    const validationError = validateQuestion(question);
    if (validationError) {
        sendError(res, 400, validationError);
        return;
    }

    const client = createClient();
    if (!client) {
        sendError(res, 503, 'Chat is not configured right now. Please try again later.');
        return;
    }

    await streamAnswer(client, question.trim(), res);
};

// Read and parse the JSON request body in a way that works both on Vercel
// (which may pre-parse req.body) and on a plain Node server (which does not).
function readJsonBody(req) {
    if (req.body && typeof req.body === 'object') {
        return Promise.resolve(req.body);
    }

    return new Promise((resolve, reject) => {
        let raw = '';
        req.on('data', chunk => { raw += chunk; });
        req.on('end', () => {
            try {
                resolve(raw ? JSON.parse(raw) : {});
            } catch (error) {
                reject(error);
            }
        });
        req.on('error', reject);
    });
}

// Stream Claude's grounded answer to the browser as plain text.
async function streamAnswer(client, question, res) {
    res.writeHead(200, {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-store'
    });

    try {
        const stream = client.messages.stream({
            model: MODEL,
            max_tokens: MAX_TOKENS,
            system: buildSystemPrompt(),
            messages: [{ role: 'user', content: question }]
        });

        // Forward each piece of text to the browser as it arrives.
        stream.on('text', text => res.write(text));

        await stream.finalMessage();
        res.end();
    } catch (error) {
        console.error('Chat streaming error:', error);
        // If we have not sent any text yet, a short apology still reads cleanly.
        res.write('\n\nSorry, something went wrong answering that. Please try again.');
        res.end();
    }
}

// Send a simple error response before streaming has started.
function sendError(res, statusCode, message) {
    res.writeHead(statusCode, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end(message);
}
