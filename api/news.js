// Vercel serverless function for the "News Now" widget.
// Fetches a Global News RSS feed server-side (no CORS issues, no third-party
// converter) and returns the newest items as simple JSON.

// Only these feeds can be requested, so this can't be used as an open proxy.
const FEEDS = {
    headline: 'https://globalnews.ca/feed/',
    local: 'https://globalnews.ca/bc/feed/',
    canada: 'https://globalnews.ca/canada/feed/',
    world: 'https://globalnews.ca/world/feed/',
    business: 'https://globalnews.ca/money/feed/',
    technology: 'https://globalnews.ca/tech/feed/',
    health: 'https://globalnews.ca/health/feed/',
    sports: 'https://globalnews.ca/sports/feed/'
};

const MAX_ITEMS = 8;

module.exports = async function handler(req, res) {
    const category = getCategory(req.url);
    const feedUrl = FEEDS[category] || FEEDS.headline;

    try {
        const xml = await fetchFeed(feedUrl);
        const items = parseRssItems(xml).slice(0, MAX_ITEMS);

        // Let Vercel's CDN cache the result for 10 minutes.
        res.setHeader('Cache-Control', 's-maxage=600, stale-while-revalidate=300');
        sendJson(res, 200, { status: 'ok', items });
    } catch (error) {
        console.error('News feed failed:', error.message);
        sendJson(res, 502, { status: 'error', message: 'News feed unavailable' });
    }
};

// Read ?category=... from the request URL.
function getCategory(url) {
    const query = new URL(url, 'http://localhost').searchParams;
    return query.get('category') || 'headline';
}

async function fetchFeed(feedUrl) {
    const response = await fetch(feedUrl, {
        headers: { 'User-Agent': 'Mozilla/5.0 (portfolio news widget)' }
    });

    if (!response.ok) {
        throw new Error(`Feed returned ${response.status}`);
    }

    return response.text();
}

// RSS parsing helpers
function parseRssItems(xml) {
    const itemBlocks = xml.match(/<item>[\s\S]*?<\/item>/g) || [];

    return itemBlocks
        .map(block => ({
            title: readTag(block, 'title'),
            link: readTag(block, 'link'),
            description: readTag(block, 'description'),
            pubDate: toIsoDate(readTag(block, 'pubDate'))
        }))
        .filter(item => item.title && item.link);
}

// Get the text inside <tag>...</tag>, unwrapping CDATA if present.
function readTag(block, tagName) {
    // String.raw keeps the backslashes in the pattern exactly as written.
    const pattern = String.raw`<${tagName}>([\s\S]*?)</${tagName}>`;
    const match = block.match(new RegExp(pattern));
    if (!match) {
        return '';
    }

    const text = match[1].replace(/^\s*<!\[CDATA\[([\s\S]*?)\]\]>\s*$/, '$1');
    return decodeEntities(text).trim();
}

// Turn "Thu, 22 Oct 2026 19:28:46 +0000" into an ISO string the browser can parse.
function toIsoDate(pubDate) {
    const date = new Date(pubDate);
    return Number.isNaN(date.getTime()) ? '' : date.toISOString();
}

// Decode the common HTML entities that appear in feed text (e.g. &#8217; and &amp;).
function decodeEntities(text) {
    return text
        .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
        .replace(/&quot;/g, '"')
        .replace(/&apos;/g, "'")
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&');
}

function sendJson(res, statusCode, data) {
    res.statusCode = statusCode;
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.end(JSON.stringify(data));
}
