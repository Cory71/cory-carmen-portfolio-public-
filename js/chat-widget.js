/* "Chat with Cory" widget - vanilla JS, streaming answers with citations. */

// Keep the whole widget in one setup call so it is easy to follow.
(function initChatWidget() {
    // Suggested questions shown in the empty chat to solve the "blank box" problem.
    const SUGGESTED_QUESTIONS = [
        'Why should we hire Cory?',
        'What is Cory\'s background?',
        'What is Cory\'s strongest project?',
        'Is Cory available and authorized to work?'
    ];

    // Simple per-session limit to keep costs and abuse bounded.
    const MAX_MESSAGES = 10;
    let messagesSent = 0;

    // Elements we reuse after building the widget.
    let panel;
    let launcher;
    let messagesEl;
    let inputEl;
    let sendBtn;

    // Start once the page is ready.
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', buildWidget);
    } else {
        buildWidget();
    }

    // Build the launcher button and chat panel, then wire up events.
    function buildWidget() {
        const container = document.createElement('div');
        container.className = 'chat-widget';
        container.innerHTML = getWidgetMarkup();
        document.body.appendChild(container);

        launcher = container.querySelector('.chat-launcher');
        panel = container.querySelector('.chat-panel');
        messagesEl = container.querySelector('.chat-messages');
        inputEl = container.querySelector('.chat-input');
        sendBtn = container.querySelector('.chat-send');

        launcher.addEventListener('click', openPanel);
        container.querySelector('.chat-close').addEventListener('click', closePanel);
        container.querySelector('.chat-input-row').addEventListener('submit', handleSubmit);

        renderIntro();
    }

    // The static HTML for the widget.
    function getWidgetMarkup() {
        return `
            <button class="chat-launcher" aria-label="Ask about Cory with the AI assistant">
                <span aria-hidden="true">💬</span> Ask about Cory
            </button>
            <div class="chat-panel" role="dialog" aria-label="Cory's AI Assistant" hidden>
                <div class="chat-header">
                    <div class="chat-header-title">
                        <strong>Cory's AI Assistant</strong>
                        <span>Ask me anything about Cory's background &amp; work</span>
                    </div>
                    <button class="chat-close" aria-label="Close chat">&times;</button>
                </div>
                <div class="chat-messages"></div>
                <form class="chat-input-row">
                    <input type="text" class="chat-input" placeholder="Ask about Cory..."
                           autocomplete="off" aria-label="Your question">
                    <button type="submit" class="chat-send">Send</button>
                </form>
            </div>
        `;
    }

    // Show the panel and hide the launcher.
    function openPanel() {
        panel.hidden = false;
        launcher.classList.add('hidden');
        inputEl.focus();
    }

    // Hide the panel and show the launcher again.
    function closePanel() {
        panel.hidden = true;
        launcher.classList.remove('hidden');
    }

    // Render the welcome text and suggested starter questions.
    function renderIntro() {
        const intro = document.createElement('div');
        intro.className = 'chat-intro';
        intro.textContent = "Hi! I'm Cory's AI assistant. Ask me anything about his background, skills, and projects. Try one of these:";
        messagesEl.appendChild(intro);

        const suggestions = document.createElement('div');
        suggestions.className = 'chat-suggestions';

        SUGGESTED_QUESTIONS.forEach(question => {
            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'chat-suggestion';
            button.textContent = question;
            button.addEventListener('click', () => askQuestion(question));
            suggestions.appendChild(button);
        });

        messagesEl.appendChild(suggestions);
    }

    // Handle the form submit (typed question).
    function handleSubmit(event) {
        event.preventDefault();
        const question = inputEl.value.trim();
        if (question) {
            askQuestion(question);
        }
    }

    // Send a question and stream back the answer.
    async function askQuestion(question) {
        if (messagesSent >= MAX_MESSAGES) {
            return;
        }

        removeSuggestions();
        inputEl.value = '';
        addMessage('user', question);
        messagesSent += 1;

        const typing = addTypingIndicator();
        setInputEnabled(false);

        try {
            await streamAnswer(question, typing);
        } catch (error) {
            typing.remove();
            addMessage('bot', 'Sorry, I could not reach the chat service. Please try again.');
        }

        finishTurn();
    }

    // Fetch the streamed answer and render it as it arrives.
    async function streamAnswer(question, typing) {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ question })
        });

        if (!response.ok) {
            const message = await response.text();
            typing.remove();
            addMessage('bot', message || 'Sorry, something went wrong.');
            return;
        }

        typing.remove();
        const bubble = addMessage('bot', '');

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let rawText = '';

        // Read chunks until the stream ends, updating the bubble each time.
        while (true) {
            const { value, done } = await reader.read();
            if (done) {
                break;
            }

            rawText += decoder.decode(value, { stream: true });
            bubble.textContent = getAnswerText(rawText);
            scrollToBottom();
        }

        renderCitations(rawText);
    }

    // Split the answer from the trailing "SOURCES:" line.
    function getAnswerText(rawText) {
        const marker = rawText.search(/\n*SOURCES:/i);
        const answer = marker === -1 ? rawText : rawText.slice(0, marker);
        return answer.trim();
    }

    // Read the source titles from the "SOURCES:" line and show them as chips.
    function renderCitations(rawText) {
        const match = rawText.match(/SOURCES:\s*(.*)$/i);
        if (!match) {
            return;
        }

        const sources = match[1]
            .split(',')
            .map(source => source.trim())
            .filter(source => source && source.toLowerCase() !== 'none');

        if (sources.length === 0) {
            return;
        }

        const citations = document.createElement('div');
        citations.className = 'chat-citations';

        sources.forEach(source => {
            const chip = document.createElement('span');
            chip.className = 'chat-chip';
            chip.textContent = 'Source: ' + source;
            citations.appendChild(chip);
        });

        messagesEl.appendChild(citations);
        scrollToBottom();
    }

    // Add a message bubble and return it so we can update it while streaming.
    function addMessage(role, text) {
        const bubble = document.createElement('div');
        bubble.className = 'chat-msg ' + role;
        bubble.textContent = text;
        messagesEl.appendChild(bubble);
        scrollToBottom();
        return bubble;
    }

    // Show a temporary "thinking" indicator.
    function addTypingIndicator() {
        const typing = document.createElement('div');
        typing.className = 'chat-typing';
        typing.textContent = 'Cory\'s AI assistant is typing...';
        messagesEl.appendChild(typing);
        scrollToBottom();
        return typing;
    }

    // Remove the suggested questions once a conversation starts.
    function removeSuggestions() {
        const suggestions = messagesEl.querySelector('.chat-suggestions');
        if (suggestions) {
            suggestions.remove();
        }
    }

    // Re-enable input, or lock it if the session limit is reached.
    function finishTurn() {
        if (messagesSent >= MAX_MESSAGES) {
            lockInputAtLimit();
            return;
        }

        setInputEnabled(true);
        inputEl.focus();
    }

    // Disable the input and show a friendly limit note.
    function lockInputAtLimit() {
        setInputEnabled(false);

        const note = document.createElement('div');
        note.className = 'chat-limit-note';
        note.textContent = 'You have reached the message limit for this session. Please reach out through the contact form for more.';
        messagesEl.appendChild(note);
        scrollToBottom();
    }

    // Enable or disable the input and send button together.
    function setInputEnabled(enabled) {
        inputEl.disabled = !enabled;
        sendBtn.disabled = !enabled;
    }

    // Keep the newest message in view.
    function scrollToBottom() {
        messagesEl.scrollTop = messagesEl.scrollHeight;
    }
})();
