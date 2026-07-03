// Offline quality check for the "Chat with Cory" assistant.
// Runs a set of questions through the SAME grounded prompt the live widget uses
// (non-streamed) and reports how many answers meet expectations.
//
// Run with: npm run eval   (needs ANTHROPIC_API_KEY set, e.g. in .env)

const fs = require('fs');
const path = require('path');

const {
    MODEL,
    MAX_TOKENS,
    buildSystemPrompt,
    createClient
} = require('../lib/chat-core');

loadEnvFile(path.join(__dirname, '..', '.env'));

runEval();

async function runEval() {
    const client = createClient();
    if (!client) {
        console.error('ANTHROPIC_API_KEY is not set. Add it to a .env file to run the eval.');
        process.exit(1);
    }

    const questions = readQuestions();
    const system = buildSystemPrompt();

    let passed = 0;

    for (const item of questions) {
        const answer = await getAnswer(client, system, item.question);
        const result = scoreAnswer(item, answer);

        if (result.pass) {
            passed += 1;
        }

        printResult(item, answer, result);
    }

    console.log(`\nScore: ${passed} / ${questions.length} passed.`);
    process.exit(passed === questions.length ? 0 : 1);
}

// Load the question set.
function readQuestions() {
    const filePath = path.join(__dirname, 'questions.json');
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

// Ask one question and return the full answer text.
async function getAnswer(client, system, question) {
    const message = await client.messages.create({
        model: MODEL,
        max_tokens: MAX_TOKENS,
        system,
        messages: [{ role: 'user', content: question }]
    });

    return message.content
        .filter(block => block.type === 'text')
        .map(block => block.text)
        .join('');
}

// Decide whether an answer meets the expectation for its question.
function scoreAnswer(item, answer) {
    const lowerAnswer = answer.toLowerCase();

    if (item.expectRefusal) {
        const refused = looksLikeRefusal(lowerAnswer);
        return { pass: refused, reason: refused ? 'refused as expected' : 'should have refused' };
    }

    const missing = item.expectedKeywords.filter(
        keyword => !lowerAnswer.includes(keyword.toLowerCase())
    );

    return {
        pass: missing.length === 0,
        reason: missing.length === 0 ? 'all keywords found' : 'missing: ' + missing.join(', ')
    };
}

// A refusal either cites no sources or uses "do not / don't have" style wording.
function looksLikeRefusal(lowerAnswer) {
    if (/sources:\s*none/.test(lowerAnswer)) {
        return true;
    }

    return lowerAnswer.includes("don't have") || lowerAnswer.includes('do not have');
}

// Print a single question result.
function printResult(item, answer, result) {
    const status = result.pass ? 'PASS' : 'FAIL';
    console.log(`[${status}] ${item.question}`);
    console.log(`        ${result.reason}`);
    console.log(`        answer: ${answer.replace(/\s+/g, ' ').trim().slice(0, 120)}...`);
}

// Small .env loader so the eval works without a global env setup.
function loadEnvFile(envPath) {
    if (!fs.existsSync(envPath)) {
        return;
    }

    fs.readFileSync(envPath, 'utf8').split('\n').forEach(line => {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) {
            return;
        }

        const index = trimmed.indexOf('=');
        if (index === -1) {
            return;
        }

        const key = trimmed.slice(0, index).trim();
        const value = trimmed.slice(index + 1).trim();

        if (key && !(key in process.env)) {
            process.env[key] = value;
        }
    });
}
