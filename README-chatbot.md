# Chat with Cory — AI Career Assistant

A small AI chat widget on the portfolio site that answers visitor questions about
Cory Carmen. Answers are **grounded** in Cory's own documents, **stream** in
token by token, **cite their sources**, and the bot **refuses to invent facts**
it cannot find.

## How it works

```
Browser widget (js/chat-widget.js)
      |  POST /api/chat  { question }
      v
Serverless function (api/chat.js)
      |  builds a grounded prompt from data/knowledge/*.md
      v
Claude (Anthropic API)  --stream-->  browser
```

- **Knowledge base:** four small markdown files in `data/knowledge/`
  (`bio.md`, `resume.md`, `projects.md`, `links.md`). These are the *only* facts
  the bot may use.
- **Grounding + citations:** the prompt (`lib/chat-core.js`) instructs Claude to
  answer only from those documents, speak about Cory in the third person, refuse
  when the answer is not present, and end every reply with a `SOURCES:` line. The
  widget splits that line off and shows the sources as chips.
- **Model:** Claude Haiku 4.5 — fast and low-cost, which suits a chat widget.

## Why no vector database / RAG?

The spec originally described a Retrieval-Augmented Generation pipeline with
OpenAI embeddings and a cosine-similarity index. That was intentionally
**simplified**: Cory's knowledge base is only a few thousand tokens, so the whole
thing fits comfortably in a single prompt. Inlining every document each call is:

- **Simpler** — no embeddings build step, no vector index, no second service.
- **More accurate** — the model always sees all the relevant context.
- **Cheaper and easier to run** — one API key (Anthropic) instead of two.

RAG becomes worthwhile when the corpus is too large to fit in context. For a
personal profile, it would be over-engineering — and choosing the right tool for
the size of the problem is itself the point.

## Running locally

1. Install dependencies: `npm install`
2. Copy `.env.example` to `.env` and add your `ANTHROPIC_API_KEY`.
3. Start the dev server: `npm run dev`
4. Open `http://localhost:3000` and click **Chat with Cory**.

The dev server (`scripts/dev-server.js`) serves the static site and routes
`/api/chat` to the same handler Vercel runs in production, so local behavior
matches the live site.

## Evaluation

`eval/questions.json` holds tested question/answer expectations, including an
out-of-scope question the bot should refuse. Run the suite with:

```
npm run eval
```

It runs each question through the same grounded logic and prints a pass/fail
report with a final score.

## Cost and abuse protection

- **Server-side key:** `ANTHROPIC_API_KEY` lives only in Vercel environment
  variables (and a gitignored local `.env`). It is never sent to the browser.
- **Capped output:** answers are limited to 400 tokens.
- **Input limit:** questions over 500 characters are rejected before any API call.
- **Per-session cap:** the widget allows 10 messages per session, then invites the
  visitor to use the contact form.
- **Grounded prompt:** resists prompt-injection by refusing instructions inside a
  question that try to change the bot's role or rules.
- **Spend cap:** a hard spend cap is set in the Anthropic console as a safety net.

## Deploying

Set `ANTHROPIC_API_KEY` in the Vercel project's environment variables, then
deploy as usual. The `/api/chat` function and the committed knowledge files ship
with the repo — no build step is needed for the chat itself.
