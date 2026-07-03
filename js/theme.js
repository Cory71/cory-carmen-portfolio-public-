// Minimal dark-mode handling for the standalone writing pages.
// Uses the same localStorage key ("darkMode") and body class ("dark-mode")
// as the main site, so a visitor's theme choice carries across pages.

(function initArticleTheme() {
    // Decide the starting theme: a saved choice wins, otherwise follow the system.
    function shouldStartDark() {
        const saved = localStorage.getItem('darkMode');
        if (saved !== null) {
            return saved === 'true';
        }
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }

    function wireToggle() {
        const toggle = document.getElementById('darkModeToggle');
        if (!toggle) {
            return;
        }

        toggle.checked = document.body.classList.contains('dark-mode');
        toggle.addEventListener('change', function () {
            document.body.classList.toggle('dark-mode', this.checked);
            localStorage.setItem('darkMode', String(this.checked));
        });
    }

    // The class is applied inline in the page as early as possible to avoid a
    // flash; here we just keep the toggle in sync once the page is ready.
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', wireToggle);
    } else {
        wireToggle();
    }

    // Expose the starting choice for the inline head script (if it runs late).
    window.__shouldStartDark = shouldStartDark;
})();
