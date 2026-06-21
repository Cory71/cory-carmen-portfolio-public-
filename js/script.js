/* Cory Carmen Portfolio Website - Interactive JavaScript */
/* Created: November 8, 2025 */

// Portfolio configuration
const portfolioConfig = buildPortfolioConfig();

// App startup
startPortfolioApp();

function startPortfolioApp() {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initPortfolioApp);
        return;
    }

    initPortfolioApp();
}

function initPortfolioApp() {
    console.log('🚀 Portfolio website loaded successfully!');
    
    initFooterYear();
    initPortfolioProfile();
    initSmoothScrolling();
    initActiveNavigation();
    initSkillInteractions();
    initProjectCardEffects();
    refreshProjectCardColors(); // Set initial colors based on theme
    initContactForm();
    initWeatherWidget();
    initQuoteWidget();
    initNewsWidget();
    initQuickStatsWidget();
    initProjectSpotlightWidget();
    initGitHubActivityWidget();
    initScrollAnimations();
    initScrollToTop();
    initTypingAnimation();
    initSettings();
}

// Configuration helpers
function buildPortfolioConfig() {
    const defaultConfig = {
        contact: {
            name: 'Cory Carmen',
            email: '',
            phone: '',
            location: 'Vancouver Island, BC, Canada',
            linkedinUrl: 'https://www.linkedin.com/in/cory-carmen-87a330382/',
            web3formsAccessKey: '' // Set in js/config.local.js to enable the contact form.
        },
        visibility: {
            showEmail: false,
            showPhone: false,
            showLocation: true,
            enableContactForm: false,
            enableWeatherWidget: false
        },
        weather: {
            apiKey: '',
            defaultLocationQuery: 'Nanaimo,CA',
            defaultLocationLabel: 'Nanaimo, BC',
            units: 'metric'
        }
    };

    return mergePortfolioConfig(defaultConfig, window.PORTFOLIO_LOCAL_CONFIG || {});
}

function mergePortfolioConfig(...configs) {
    return configs.reduce((mergedConfig, config) => mergeConfigLayer(mergedConfig, config), {});
}

function mergeConfigLayer(target, source) {
    const nextTarget = { ...target };

    Object.keys(source).forEach(key => {
        const sourceValue = source[key];
        const targetValue = nextTarget[key];

        if (isPlainObject(sourceValue) && isPlainObject(targetValue)) {
            nextTarget[key] = mergeConfigLayer(targetValue, sourceValue);
            return;
        }

        nextTarget[key] = sourceValue;
    });

    return nextTarget;
}

function isPlainObject(value) {
    return value !== null && typeof value === 'object' && !Array.isArray(value);
}

// Footer helpers
function initFooterYear() {
    const currentYear = document.getElementById('currentYear');
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }
}

// Public profile helpers
function initPortfolioProfile() {
    const profileElements = getPortfolioProfileElements();

    applyContactName(profileElements.contactName);
    applyEmailVisibility(profileElements.contactEmailRow, profileElements.contactEmailText);
    applyLocationVisibility(profileElements.contactLocationRow, profileElements.contactLocationText);
    applyPhoneVisibility(profileElements.contactPhoneRow, profileElements.contactPhoneText);
    applyLinkedInLink(profileElements.contactLinkedInLink);
    applyPrivacyNoteVisibility(profileElements.contactPrivacyNote);
    applyContactFormAvailability(profileElements.contactToggle, profileElements.contactFormContainer);
    applyDefaultLocationLabel(profileElements.currentLocationDisplay);
}

function getPortfolioProfileElements() {
    return {
        contactName: document.getElementById('contactName'),
        contactEmailRow: document.getElementById('contactEmailRow'),
        contactEmailText: document.getElementById('contactEmailText'),
        contactLocationRow: document.getElementById('contactLocationRow'),
        contactLocationText: document.getElementById('contactLocationText'),
        contactPhoneRow: document.getElementById('contactPhoneRow'),
        contactPhoneText: document.getElementById('contactPhoneText'),
        contactLinkedInLink: document.getElementById('contactLinkedInLink'),
        contactPrivacyNote: document.getElementById('contactPrivacyNote'),
        contactToggle: document.getElementById('contactToggle'),
        contactFormContainer: document.getElementById('contactFormContainer'),
        currentLocationDisplay: document.getElementById('currentLocationDisplay')
    };
}

function applyContactName(contactName) {
    if (contactName) {
        contactName.textContent = portfolioConfig.contact.name;
    }
}

function applyEmailVisibility(contactEmailRow, contactEmailText) {
    if (!contactEmailRow || !contactEmailText) return;

    if (portfolioConfig.visibility.showEmail && portfolioConfig.contact.email) {
        contactEmailText.textContent = portfolioConfig.contact.email;
        contactEmailRow.style.display = '';
        return;
    }

    contactEmailText.textContent = 'Available on request';
}

function applyLocationVisibility(contactLocationRow, contactLocationText) {
    if (!contactLocationRow || !contactLocationText) return;

    if (portfolioConfig.visibility.showLocation && portfolioConfig.contact.location) {
        contactLocationText.textContent = portfolioConfig.contact.location;
        contactLocationRow.style.display = '';
        return;
    }

    contactLocationRow.style.display = 'none';
}

function applyPhoneVisibility(contactPhoneRow, contactPhoneText) {
    if (!contactPhoneRow || !contactPhoneText) return;

    if (portfolioConfig.visibility.showPhone && portfolioConfig.contact.phone) {
        contactPhoneText.textContent = portfolioConfig.contact.phone;
        contactPhoneRow.style.display = '';
        return;
    }

    contactPhoneRow.style.display = 'none';
}

function applyLinkedInLink(contactLinkedInLink) {
    if (contactLinkedInLink && portfolioConfig.contact.linkedinUrl) {
        contactLinkedInLink.href = portfolioConfig.contact.linkedinUrl;
    }
}

function applyPrivacyNoteVisibility(contactPrivacyNote) {
    if (!contactPrivacyNote) return;

    const showingPrivateDetails = portfolioConfig.visibility.showEmail || portfolioConfig.visibility.showPhone;
    contactPrivacyNote.style.display = showingPrivateDetails ? 'none' : 'block';
}

function applyContactFormAvailability(contactToggle, contactFormContainer) {
    if (!contactToggle || !contactFormContainer) return;

    // Show the form once a real Web3Forms key is set, so it works on the live site too.
    contactToggle.style.display = isContactFormEnabled() ? 'inline-flex' : 'none';
    contactFormContainer.style.display = 'none';
}

// The contact form is ready once a Web3Forms access key is set in config.local.js.
function isContactFormEnabled() {
    return Boolean(portfolioConfig.contact.web3formsAccessKey);
}

function applyDefaultLocationLabel(currentLocationDisplay) {
    if (currentLocationDisplay && portfolioConfig.weather.defaultLocationLabel) {
        currentLocationDisplay.textContent = portfolioConfig.weather.defaultLocationLabel;
    }
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetElement = document.getElementById(this.getAttribute('href').substring(1));
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// Active navigation highlighting
function initActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    function updateActiveNav() {
        let current = '';
        sections.forEach(section => {
            if (scrollY >= section.offsetTop - 100) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === '#' + current);
        });
    }
    
    window.addEventListener('scroll', updateActiveNav);
}

// Interactive skill tags
function initSkillInteractions() {
    // Map each visible skill tag to the message shown in the notification popup.
    const skillDetails = {
        'HTML5': 'Semantic HTML5, accessibility best practices, and modern web standards.',
        'CSS3': 'Modern CSS3, Flexbox, Grid, animations, and responsive design principles.',
        'JavaScript': 'Core JavaScript fundamentals, event handling, and interactive web development.',
        'ES6+': 'Modern JavaScript features including arrow functions, destructuring, and modules.',
        'Bootstrap': 'Responsive design framework with component-based architecture and grid system.',
        'REST APIs': 'API integration, HTTP methods, and asynchronous data fetching.',
        'Async/Await': 'Modern asynchronous JavaScript programming and Promise handling.',
        'Git': 'Version control, branching, merging, and collaborative development workflows.',
        'GitHub': 'Repository management, documentation, and portfolio hosting.',
        'Responsive Design': 'Mobile-first design, media queries, and cross-device compatibility.',
        'Postman': 'API testing, request building, documentation, and debugging.',
        'Node.js': 'Server-side JavaScript runtime, npm packages, and backend development.',
        'React': 'Component-based frontend development for building fast, interactive user interfaces.',
        'React Native': 'Cross-platform mobile app development for building native apps with JavaScript and React.',
        'Express.js': 'Backend web framework for routing, APIs, middleware, and server-side application structure.',
        'MongoDB': 'NoSQL database development for storing, querying, and managing application data.',
        'Auth0': 'Authentication and authorization platform for secure login, user management, and identity integration.',
        'Passport Local Strategy': 'Username and password authentication using Passport.js local strategy for custom login flows.',
        'MERN': 'Full-stack JavaScript development using MongoDB, Express.js, React, and Node.js.',
        'JSON': 'Data interchange format, parsing, and API response handling.',
        'DOM Manipulation': 'Dynamic content updates, event handling, and interactive user interfaces.',
        'React Router': 'Client-side routing and navigation for single-page React applications.',
        'Expo': 'Tooling and workflow for building, previewing, and shipping React Native apps.',
        'Vite': 'Fast frontend build tool and dev server for modern JavaScript and React projects.',
        'JWT Authentication': 'Token-based authentication for securing APIs and managing user sessions.',
        'Google OAuth': 'Third-party sign-in letting users authenticate securely with their Google account.',
        'Docker': 'Containerizing applications for consistent development, testing, and deployment environments.',
        'Vitest': 'Fast unit testing framework for JavaScript and React components.',
        'Unit Testing': 'Writing automated tests to verify individual pieces of code work as expected.'
    };
    
    document.querySelectorAll('.skill-tag').forEach(tag => {
        tag.addEventListener('click', () => {
            const skillName = tag.textContent;
            const detail = skillDetails[skillName] || 'More details coming soon!';
            showNotification(`${skillName}: ${detail}`);
        });
        
        tag.addEventListener('mouseenter', () => {
            tag.style.transform = 'translateY(-2px) scale(1.05)';
            tag.style.boxShadow = '0 4px 12px rgba(43, 122, 120, 0.3)';
            tag.style.transition = 'all 0.3s ease';
        });
        
        tag.addEventListener('mouseleave', () => {
            tag.style.transform = 'translateY(0) scale(1)';
            tag.style.boxShadow = 'none';
        });
    });
}

// Project and learning card effects
function initProjectCardEffects() {
    // Apply the same hover treatment to the new learning and project cards.
    const cards = document.querySelectorAll('.project-card, .learning-item');

    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const isDarkMode = document.body.classList.contains('dark-mode');
            card.style.backgroundColor = isDarkMode ? '#363636' : '#e8f5e8';
        });

        card.addEventListener('mouseleave', () => {
            refreshProjectCardColors();
        });
    });
}

// Refresh project and learning card colors when theme changes
function refreshProjectCardColors() {
    // Reapply base colors after hover effects or theme changes.
    const isDarkMode = document.body.classList.contains('dark-mode');
    const cards = document.querySelectorAll('.project-card, .learning-item');
    
    cards.forEach(card => {
        if (isDarkMode) {
            card.style.backgroundColor = '#2a2a2a';
            card.style.color = '#e0e0e0';
        } else {
            card.style.backgroundColor = '#f0fff0';
            card.style.color = '#333';
        }
    });
}

// Contact form helpers
function initContactForm() {
    initContactFormToggle();
    initContactFormSubmission();
}

function initContactFormToggle() {
    const toggleBtn = document.getElementById('contactToggle');
    const formContainer = document.getElementById('contactFormContainer');
    
    if (!toggleBtn || !formContainer) return;
    
    toggleBtn.addEventListener('click', function() {
        const isOpen = formContainer.style.display !== 'none';
        
        formContainer.style.display = isOpen ? 'none' : 'block';
        toggleBtn.classList.toggle('active', !isOpen);
        
        if (!isOpen) {
            setTimeout(() => {
                formContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 100);
        }
    });
}

function initContactFormSubmission() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    const formResponse = document.getElementById('formResponse');
    const submitBtn = contactForm.querySelector('.submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');
    
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const formData = new FormData(contactForm);
        const data = {
            name: formData.get('name').trim(),
            email: formData.get('email').trim(),
            subject: formData.get('subject').trim(),
            message: formData.get('message').trim()
        };

        if (!validateContactForm(data)) {
            showFormResponse('Please fill in all required fields correctly.', 'error');
            return;
        }

        setContactSubmitState(submitBtn, btnText, btnLoading, true);

        try {
            await sendContactMessage(data);
            showFormResponse('Thanks! Your message has been sent.', 'success');
            contactForm.reset();
        } catch (error) {
            console.error('Contact form failed:', error);
            showFormResponse('Sorry, something went wrong. Please try again later.', 'error');
        } finally {
            setContactSubmitState(submitBtn, btnText, btnLoading, false);
        }
    });
    
    // Real-time validation
    contactForm.querySelectorAll('input, textarea').forEach(input => {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => input.style.borderColor = '');
    });
}

function setContactSubmitState(submitButton, buttonText, buttonLoading, isLoading) {
    submitButton.disabled = isLoading;
    buttonText.style.display = isLoading ? 'none' : 'inline';
    buttonLoading.style.display = isLoading ? 'inline' : 'none';
}

// Send the contact message through Web3Forms (no backend needed).
async function sendContactMessage(data) {
    const payload = {
        access_key: portfolioConfig.contact.web3formsAccessKey,
        name: data.name,
        email: data.email,
        subject: data.subject || 'Message from Portfolio Website',
        message: data.message
    };

    const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
    });

    const result = await response.json();

    // Web3Forms returns { success: true } when the email was accepted.
    if (!response.ok || !result.success) {
        throw new Error(result.message || 'Web3Forms request failed');
    }
}

function validateContactForm(data) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return data.name.length >= 2 && emailRegex.test(data.email) && data.message.length >= 10;
}

function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    
    if (field.required) {
        switch(field.type) {
            case 'text':
                isValid = value.length >= 2;
                break;
            case 'email':
                isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
                break;
            default:
                isValid = value.length >= 10;
        }
    }
    
    field.style.borderColor = !isValid ? '#c0d0c0' : '#6495ED';
    return isValid;
}

function showFormResponse(message, type) {
    const formResponse = document.getElementById('formResponse');
    formResponse.textContent = message;
    formResponse.className = `form-response ${type}`;
    formResponse.style.display = 'block';
    
    setTimeout(() => formResponse.style.display = 'none', 5000);
}

// Weather widget helpers
function initWeatherWidget() {
    console.log('🌤️ Initializing weather widget...');

    if (!portfolioConfig.visibility.enableWeatherWidget || !portfolioConfig.weather.apiKey) {
        displayWeatherUnavailable('Weather widget is disabled in the public source version');
        return;
    }

    loadWeather(portfolioConfig.weather.defaultLocationQuery); // Load default location
    initForecastDropdown();
    
    // Refresh weather data every 30 minutes for current location
    setInterval(() => {
        const currentLocationDisplay = document.getElementById('currentLocationDisplay');
        const currentLocation = currentLocationDisplay ? currentLocationDisplay.textContent : portfolioConfig.weather.defaultLocationQuery;
        const locationQuery = currentLocation.includes(',') ? currentLocation : portfolioConfig.weather.defaultLocationQuery;
        loadWeather(locationQuery);
    }, 1800000);
    
    // Add Enter key support for search input
    const weatherInput = document.getElementById('weatherLocation');
    if (weatherInput) {
        weatherInput.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                searchWeather();
            }
        });
    }
}

// Search weather function for user input
function searchWeather() {
    const input = document.getElementById('weatherLocation');
    const locationQuery = input.value.trim();
    
    if (!locationQuery) {
        showNotification('Please enter a city name');
        return;
    }
    
    // Show loading state
    const weatherContainer = document.getElementById('weatherContainer');
    weatherContainer.innerHTML = '<div class="weather-loading">Searching for ' + locationQuery + '...</div>';
    weatherContainer.style.display = 'block';
    
    loadWeather(locationQuery);
    input.value = ''; // Clear input after search
}

async function loadWeather(locationQuery = portfolioConfig.weather.defaultLocationQuery) {
    const API_KEY = portfolioConfig.weather.apiKey;
    const UNITS = portfolioConfig.weather.units;

    const weatherElements = getWeatherElements();

    if (!API_KEY) {
        displayWeatherUnavailable('Weather widget is disabled in the public source version');
        return;
    }

    setWeatherLoadingState(weatherElements.weatherContainer, weatherElements.currentWeather, weatherElements.forecastWeather, weatherElements.weatherError);
    
    try {
        const currentData = await fetchCurrentWeatherData(locationQuery, UNITS, API_KEY);
        const forecastData = await fetchForecastWeatherData(locationQuery, UNITS, API_KEY);

        updateWeatherLocationLabel(weatherElements.currentLocationDisplay, currentData);
        displayCurrentWeather(currentData);
        displayForecast(forecastData);

        showWeatherContent(weatherElements.weatherContainer, weatherElements.currentWeather, weatherElements.forecastWeather);

        if (locationQuery !== portfolioConfig.weather.defaultLocationQuery) {
            showNotification(`Weather updated for ${currentData.name}, ${currentData.sys.country}`);
        }
    } catch (error) {
        handleWeatherLoadError(error, weatherElements.weatherContainer, weatherElements.currentWeather, weatherElements.forecastWeather);
    }
}

function getWeatherElements() {
    return {
        weatherContainer: document.getElementById('weatherContainer'),
        currentWeather: document.getElementById('weatherCurrent'),
        forecastWeather: document.getElementById('weatherForecast'),
        weatherError: document.getElementById('weatherError'),
        currentLocationDisplay: document.getElementById('currentLocationDisplay')
    };
}

function setWeatherLoadingState(weatherContainer, currentWeather, forecastWeather, weatherError) {
    if (!weatherContainer.innerHTML.includes('Searching')) {
        weatherContainer.innerHTML = '<div class="weather-loading">Loading weather data...</div>';
    }

    weatherContainer.style.display = 'block';
    currentWeather.style.display = 'none';
    forecastWeather.style.display = 'none';
    weatherError.style.display = 'none';
}

async function fetchCurrentWeatherData(locationQuery, units, apiKey) {
    const currentResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(locationQuery)}&units=${units}&appid=${apiKey}`
    );

    if (!currentResponse.ok) {
        throw createWeatherRequestError(currentResponse.status);
    }

    return currentResponse.json();
}

async function fetchForecastWeatherData(locationQuery, units, apiKey) {
    const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(locationQuery)}&units=${units}&appid=${apiKey}`
    );

    if (!forecastResponse.ok) {
        throw new Error(`Forecast API error: ${forecastResponse.status}`);
    }

    return forecastResponse.json();
}

function createWeatherRequestError(statusCode) {
    if (statusCode === 401) {
        console.log('⚠️ API key issue detected.');
        return new Error('API key not valid');
    }

    if (statusCode === 404) {
        return new Error('City not found. Please check the spelling and try again.');
    }

    return new Error(`Weather API error: ${statusCode}`);
}

function updateWeatherLocationLabel(currentLocationDisplay, currentData) {
    if (currentLocationDisplay) {
        currentLocationDisplay.textContent = `${currentData.name}, ${currentData.sys.country}`;
    }
}

function showWeatherContent(weatherContainer, currentWeather, forecastWeather) {
    weatherContainer.style.display = 'none';
    currentWeather.style.display = 'block';
    forecastWeather.style.display = 'block';
}

function handleWeatherLoadError(error, weatherContainer, currentWeather, forecastWeather) {
    console.error('Weather API Error:', error);

    if (error.message.includes('API key')) {
        displayWeatherUnavailable('API key not valid');
        return;
    }

    weatherContainer.innerHTML = `
        <div class="weather-error">
            <p>⚠️ ${error.message}</p>
            <p style="font-size: 0.8rem; color: #666; margin-top: 5px;">
                Try formats like: "Vancouver, CA" or "London, UK"
            </p>
        </div>
    `;
    weatherContainer.style.display = 'block';
    currentWeather.style.display = 'none';
    forecastWeather.style.display = 'none';
}

function displayCurrentWeather(data) {
    document.getElementById('temperature').textContent = `${Math.round(data.main.temp)}°C`;
    document.getElementById('description').textContent = 
        data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1);
    document.getElementById('feelsLike').textContent = `${Math.round(data.main.feels_like)}°C`;
    document.getElementById('humidity').textContent = `${data.main.humidity}%`;
    
    const weatherIcon = document.getElementById('weatherIcon');
    weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    weatherIcon.alt = data.weather[0].description;
}

function displayForecast(data) {
    const forecastContainer = document.getElementById('forecastContainer');
    forecastContainer.innerHTML = '';
    
    // Group forecast data by day and calculate daily highs/lows
    const dailyData = {};
    
    data.list.forEach(item => {
        const date = new Date(item.dt * 1000);
        const dayKey = date.toDateString();
        
        if (!dailyData[dayKey]) {
            dailyData[dayKey] = {
                date: date,
                temps: [],
                weather: item.weather[0] // Use the first weather entry for the day
            };
        }
        
        dailyData[dayKey].temps.push(item.main.temp);
    });
    
    // Convert to array and take first 5 days
    const dailyForecasts = Object.values(dailyData).slice(0, 5);
    
    dailyForecasts.forEach((dayData, index) => {
        const dayName = index === 0 ? 'Today' : dayData.date.toLocaleDateString('en-US', { weekday: 'short' });
        const highTemp = Math.round(Math.max(...dayData.temps));
        const lowTemp = Math.round(Math.min(...dayData.temps));
        
        const forecastItem = document.createElement('div');
        forecastItem.className = 'forecast-item';
        forecastItem.innerHTML = `
            <div class="forecast-day">${dayName}</div>
            <div class="forecast-weather">
                <img class="forecast-icon" 
                     src="https://openweathermap.org/img/wn/${dayData.weather.icon}.png" 
                     alt="${dayData.weather.description}">
                <span class="forecast-desc">${dayData.weather.main}</span>
            </div>
            <div class="forecast-temps">
                <span class="forecast-high">${highTemp}°</span>
                <span class="forecast-low">${lowTemp}°</span>
            </div>
        `;
        
        forecastContainer.appendChild(forecastItem);
    });
}

function displayWeatherUnavailable(message = 'Weather data unavailable') {
    const weatherContainer = document.getElementById('weatherContainer');
    const weatherInput = document.getElementById('weatherLocation');
    const weatherSearchButton = document.querySelector('.weather-search-btn');
    
    weatherContainer.innerHTML = `
        <div class="weather-unavailable">
            <p>⚠️ ${message}</p>
            <p style="font-size: 0.8rem; color: #666; margin-top: 5px;">
                Add a local-only config file if you want this widget to work on your private machine.
            </p>
        </div>
    `;

    if (weatherInput) {
        weatherInput.disabled = true;
    }

    if (weatherSearchButton) {
        weatherSearchButton.disabled = true;
    }
    
    weatherContainer.style.display = 'block';
    document.getElementById('weatherCurrent').style.display = 'none';
    document.getElementById('weatherForecast').style.display = 'none';
}

function initForecastDropdown() {
    const forecastToggle = document.getElementById('forecastToggle');
    const forecastDropdown = document.getElementById('forecastDropdown');
    
    if (!forecastToggle || !forecastDropdown) return;
    
    forecastToggle.addEventListener('click', function() {
        const isOpen = forecastDropdown.style.display !== 'none';
        
        forecastDropdown.style.display = isOpen ? 'none' : 'block';
        forecastToggle.classList.toggle('active', !isOpen);
        
        if (!isOpen) {
            setTimeout(() => {
                forecastDropdown.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 100);
        }
    });
}

// Scroll animations
function initScrollAnimations() {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    
    document.querySelectorAll('.card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// Scroll to top button
function initScrollToTop() {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '↑';
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.style.cssText = `
        position: fixed; bottom: 20px; right: 20px; background: #2b7a78; color: white;
        border: none; border-radius: 50%; width: 50px; height: 50px; font-size: 20px;
        cursor: pointer; opacity: 0; transition: opacity 0.3s ease; z-index: 1000;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    `;
    
    document.body.appendChild(scrollBtn);
    
    window.addEventListener('scroll', () => {
        scrollBtn.style.opacity = window.scrollY > 300 ? '1' : '0';
    });
    
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Utility function for notifications
function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed; top: 100px; right: 20px; background: #2b7a78; color: white;
        padding: 15px 20px; border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 1000; max-width: 300px; opacity: 0; transform: translateX(100%);
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

// Sidebar widget helpers
function initQuickStatsWidget() {
    const completedProjects = document.querySelectorAll('.project-status.completed').length;
    const liveProjects = countLiveProjects();
    const focusAreas = document.querySelectorAll('.learning-item').length;

    const completedProjectsCount = document.getElementById('completedProjectsCount');
    const liveProjectsCount = document.getElementById('liveProjectsCount');
    const focusAreasCount = document.getElementById('focusAreasCount');

    if (completedProjectsCount) completedProjectsCount.textContent = completedProjects;
    if (liveProjectsCount) liveProjectsCount.textContent = liveProjects;
    if (focusAreasCount) focusAreasCount.textContent = focusAreas;
}

// Count projects that have a deployed "View Live Site" link.
function countLiveProjects() {
    const projectLinks = document.querySelectorAll('.project-link');

    return Array.from(projectLinks)
        .filter(link => link.textContent.trim() === 'View Live Site')
        .length;
}

function initProjectSpotlightWidget() {
    const spotlightContent = document.getElementById('spotlightContent');
    const projectCards = document.querySelectorAll('.project-card');

    if (!spotlightContent || projectCards.length === 0) return;

    const spotlightProjects = buildSpotlightProjects(projectCards);
    startProjectSpotlightRotation(spotlightContent, spotlightProjects);
}

function buildSpotlightProjects(projectCards) {
    return Array.from(projectCards).map(card => ({
        title: card.querySelector('h4')?.textContent || 'Project',
        meta: getSpotlightMeta(card),
        focus: getSpotlightFocus(card)
    }));
}

// Spotlight text helpers
function getSpotlightMeta(card) {
    const projectTitle = card.querySelector('h4')?.textContent?.trim() || 'Project';
    const spotlightMetaByProject = {
        'Portfolio Website': 'HTML, CSS, JavaScript, Bootstrap, APIs',
        'Note-Taking App': 'JavaScript, EJS, Node.js, MongoDB',
        'Weather Forecasting App': 'React, JavaScript, weather APIs',
        'BC Marine (Mobile App)': 'React Native, Expo, live marine data APIs',
        'StockGrader (Capstone)': 'React, Vite, Node, Express, MongoDB, JWT, Finnhub'
    };

    return spotlightMetaByProject[projectTitle] || cleanSpotlightText(card.querySelector('.project-meta')?.textContent || '');
}

function getSpotlightFocus(card) {
    const projectTitle = card.querySelector('h4')?.textContent?.trim() || 'Project';
    const spotlightFocusByProject = {
        'Portfolio Website': 'Built one polished site that mixes portfolio content with live widgets and theme controls.',
        'Note-Taking App': 'Practiced full-stack CRUD flows, server rendering, and database-backed note management.',
        'Weather Forecasting App': 'Built a clean React weather dashboard with reusable components, live API data, and theme controls.',
        'BC Marine (Mobile App)': 'Built a cross-platform React Native app that pulls live tide, wind, wave, and forecast data for BC waters.',
        'StockGrader (Capstone)': 'Built and deployed a full-stack app that grades stocks A–F, pairing a React frontend with an authenticated Express and MongoDB API.'
    };

    return spotlightFocusByProject[projectTitle] || cleanSpotlightText(card.querySelector('.project-focus')?.textContent || '');
}

function cleanSpotlightText(text) {
    return text.replace(/\s+/g, ' ').trim();
}

function startProjectSpotlightRotation(spotlightContent, spotlightProjects) {
    let currentIndex = 0;

    renderProjectSpotlight(spotlightContent, spotlightProjects[currentIndex]);

    setInterval(() => {
        currentIndex = (currentIndex + 1) % spotlightProjects.length;
        renderProjectSpotlight(spotlightContent, spotlightProjects[currentIndex]);
    }, 7000);
}

function renderProjectSpotlight(spotlightContent, project) {
    spotlightContent.innerHTML = `
        <div class="spotlight-title">${project.title}</div>
        <p class="spotlight-meta">${project.meta}</p>
        <p class="spotlight-focus">${project.focus}</p>
    `;
}

async function initGitHubActivityWidget() {
    const githubActivity = document.getElementById('githubActivity');
    if (!githubActivity) return;

    try {
        const repo = await fetchFeaturedGitHubRepo();
        renderFeaturedGitHubRepo(githubActivity, repo);
    } catch (error) {
        showGitHubActivityError(githubActivity, error);
    }
}

async function fetchFeaturedGitHubRepo() {
    const response = await fetch('https://api.github.com/repos/Cory71/weather-app-cs');
    if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
    }

    const repo = await response.json();
    if (!repo || !repo.html_url) {
        throw new Error('Featured GitHub project is unavailable right now.');
    }

    return repo;
}

function renderFeaturedGitHubRepo(githubActivity, repo) {
    githubActivity.innerHTML = `
        <div class="github-list">
            <div class="github-repo">
                <div class="github-repo-name"><a href="${repo.html_url}" target="_blank" rel="noopener noreferrer">${repo.name}</a></div>
                <div class="github-repo-meta">Updated ${formatGitHubDate(repo.updated_at)}</div>
                <div class="github-repo-meta">Primary language: ${repo.language || 'Not specified'}</div>
            </div>
        </div>
    `;
}

function showGitHubActivityError(githubActivity, error) {
    console.error('GitHub activity error:', error);
    githubActivity.innerHTML = '<div class="github-error">Featured GitHub project is unavailable at the moment.</div>';
}

function formatGitHubDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });
}

// Quote widget functionality
function initQuoteWidget() {
    console.log('💭 Initializing quote widget...');
    loadQuote();
    
    // Refresh quote every 4 hours
    setInterval(loadQuote, 14400000);
}

// Extended collection of professional inspirational quotes
const professionalQuotes = [
    {
        content: "The only way to do great work is to love what you do.",
        author: "Steve Jobs"
    },
    {
        content: "Innovation distinguishes between a leader and a follower.",
        author: "Steve Jobs"
    },
    {
        content: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
        author: "Winston Churchill"
    },
    {
        content: "The only impossible journey is the one you never begin.",
        author: "Tony Robbins"
    },
    {
        content: "It is during our darkest moments that we must focus to see the light.",
        author: "Aristotle"
    },
    {
        content: "Whether you think you can or you think you can't, you're right.",
        author: "Henry Ford"
    },
    {
        content: "The best time to plant a tree was 20 years ago. The second best time is now.",
        author: "Chinese Proverb"
    },
    {
        content: "Don't watch the clock; do what it does. Keep going.",
        author: "Sam Levenson"
    },
    {
        content: "Believe you can and you're halfway there.",
        author: "Theodore Roosevelt"
    },
    {
        content: "The future belongs to those who believe in the beauty of their dreams.",
        author: "Eleanor Roosevelt"
    },
    {
        content: "It does not matter how slowly you go as long as you do not stop.",
        author: "Confucius"
    },
    {
        content: "Everything you've ever wanted is on the other side of fear.",
        author: "George Addair"
    }
];

function loadQuote() {
    // Get daily quote based on date for consistency throughout the day
    const today = new Date();
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
    const quoteIndex = dayOfYear % professionalQuotes.length;
    
    const todaysQuote = professionalQuotes[quoteIndex];
    displayQuote(todaysQuote);
    console.log('✅ Daily quote loaded:', todaysQuote.author);
}

function displayQuote(data) {
    const quoteContainer = document.getElementById('quoteContainer');
    const quoteContent = document.getElementById('quoteContent');
    const quoteText = document.getElementById('quoteText');
    const quoteAuthor = document.getElementById('quoteAuthor');
    
    if (!quoteText || !quoteAuthor) return;
    
    // Update content
    quoteText.textContent = data.content;
    quoteAuthor.textContent = data.author;
    
    // Show quote, hide loading
    quoteContainer.style.display = 'none';
    quoteContent.style.display = 'block';
}

// Typing animation for hero section
function initTypingAnimation() {
    const heroSubtitle = document.querySelector('.hero p:nth-child(4)'); // Target the tagline paragraph
    if (heroSubtitle && heroSubtitle.textContent.trim()) {
        const originalText = heroSubtitle.textContent;
        heroSubtitle.textContent = '';
        
        let index = 0;
        function typeText() {
            if (index < originalText.length) {
                heroSubtitle.textContent += originalText.charAt(index);
                index++;
                setTimeout(typeText, 50);
            }
        }
        
        // Start typing animation after a short delay
        setTimeout(typeText, 1000);
    }
}

// Settings helpers
function initSettings() {
    const darkModeCheckbox = document.getElementById('darkMode');
    const weatherCheckbox = document.getElementById('weatherWidget');
    const quoteCheckbox = document.getElementById('quoteWidget');
    const newsCheckbox = document.getElementById('newsWidget');

    applySavedDarkModePreference(darkModeCheckbox);
    initDarkModeToggle(darkModeCheckbox);
    applySavedWidgetPreference(weatherCheckbox, '.weather-widget', 'weatherWidget');
    applySavedWidgetPreference(quoteCheckbox, '.quote-widget', 'quoteWidget');
    applySavedWidgetPreference(newsCheckbox, '.news-widget', 'newsWidget');
    initWidgetToggle(weatherCheckbox, '.weather-widget', 'weatherWidget', 'Weather widget enabled', 'Weather widget hidden');
    initWidgetToggle(quoteCheckbox, '.quote-widget', 'quoteWidget', 'Quote widget enabled', 'Quote widget hidden');
    initWidgetToggle(newsCheckbox, '.news-widget', 'newsWidget', 'News feed enabled', 'News feed hidden');
}

function applySavedDarkModePreference(darkModeCheckbox) {
    // Use the saved choice if there is one; otherwise follow the system setting.
    if (shouldStartInDarkMode()) {
        document.body.classList.add('dark-mode');

        if (darkModeCheckbox) {
            darkModeCheckbox.checked = true;
        }

        refreshProjectCardColors(); // Apply dark mode colors on load.
    }

    // Keep following the system theme until the user makes their own choice.
    watchSystemThemeChanges(darkModeCheckbox);
}

// Decide the starting theme: a saved preference wins, the system setting is the fallback.
function shouldStartInDarkMode() {
    const savedDarkMode = localStorage.getItem('darkMode');

    if (savedDarkMode !== null) {
        return savedDarkMode === 'true';
    }

    return prefersDarkSystemTheme();
}

// Read the operating system's light or dark setting.
function prefersDarkSystemTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

// Match the page and the toggle to the current system theme.
function applySystemTheme(darkModeCheckbox) {
    const isDarkMode = prefersDarkSystemTheme();

    document.body.classList.toggle('dark-mode', isDarkMode);

    if (darkModeCheckbox) {
        darkModeCheckbox.checked = isDarkMode;
    }

    refreshProjectCardColors();
}

// Follow live system theme changes, but only while the user has not set their own preference.
function watchSystemThemeChanges(darkModeCheckbox) {
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');

    systemTheme.addEventListener('change', function() {
        // A saved preference means the user chose manually, so leave their choice alone.
        if (localStorage.getItem('darkMode') !== null) return;

        applySystemTheme(darkModeCheckbox);
    });
}

function initDarkModeToggle(darkModeCheckbox) {
    if (!darkModeCheckbox) return;

    darkModeCheckbox.addEventListener('change', function() {
        const isDarkMode = this.checked;

        document.body.classList.toggle('dark-mode', isDarkMode);
        localStorage.setItem('darkMode', String(isDarkMode));
        showNotification(isDarkMode ? 'Dark mode enabled' : 'Dark mode disabled');
        refreshProjectCardColors();
    });
}

function applySavedWidgetPreference(checkbox, widgetSelector, storageKey) {
    if (!checkbox) return;

    const savedValue = localStorage.getItem(storageKey);
    if (savedValue === null) return;

    const shouldShowWidget = savedValue === 'true';
    checkbox.checked = shouldShowWidget;
    setWidgetVisibility(widgetSelector, shouldShowWidget);
}

function initWidgetToggle(checkbox, widgetSelector, storageKey, enabledMessage, disabledMessage) {
    if (!checkbox) return;

    checkbox.addEventListener('change', function() {
        setWidgetVisibility(widgetSelector, this.checked);
        localStorage.setItem(storageKey, String(this.checked));
        showNotification(this.checked ? enabledMessage : disabledMessage);
    });
}

function setWidgetVisibility(widgetSelector, shouldShowWidget) {
    const widget = document.querySelector(widgetSelector);
    if (!widget) return;

    widget.style.display = shouldShowWidget ? 'block' : 'none';
}

// Settings reset helpers
function resetSettings() {
    const darkModeCheckbox = document.getElementById('darkMode');
    const weatherCheckbox = document.getElementById('weatherWidget');
    const quoteCheckbox = document.getElementById('quoteWidget');
    const newsCheckbox = document.getElementById('newsWidget');

    resetSettingsCheckboxes(darkModeCheckbox, weatherCheckbox, quoteCheckbox, newsCheckbox);

    // Clear the saved theme override so the site follows the system setting again.
    localStorage.removeItem('darkMode');
    applySystemTheme(darkModeCheckbox);

    showWidgetAndSavePreference('.weather-widget', 'weatherWidget');
    showWidgetAndSavePreference('.quote-widget', 'quoteWidget');
    showWidgetAndSavePreference('.news-widget', 'newsWidget');

    refreshProjectCardColors();
    showNotification('Settings reset to defaults');
}

function resetSettingsCheckboxes(darkModeCheckbox, weatherCheckbox, quoteCheckbox, newsCheckbox) {
    if (darkModeCheckbox) darkModeCheckbox.checked = false;
    if (weatherCheckbox) weatherCheckbox.checked = true;
    if (quoteCheckbox) quoteCheckbox.checked = true;
    if (newsCheckbox) newsCheckbox.checked = true;
}

function showWidgetAndSavePreference(widgetSelector, storageKey) {
    const widget = document.querySelector(widgetSelector);
    if (!widget) return;

    widget.style.display = 'block';
    localStorage.setItem(storageKey, 'true');
}

// News widget helpers
const NEWS_MAX_ARTICLE_AGE_HOURS = 72;

function initNewsWidget() {
    console.log('📰 News widget ready');

    setWidgetCollapsed(true);
    startNewsAutoRefresh();
    initNewsCategoryHandler();
}

function startNewsAutoRefresh() {
    setInterval(() => {
        if (isWidgetExpanded()) {
            loadNews();
        }
    }, 3600000);
}

function initNewsCategoryHandler() {
    const categorySelect = document.getElementById('newsCategory');
    if (categorySelect) {
        categorySelect.addEventListener('change', loadNews);
    }
}

// Simple toggle function
function toggleNewsWidget() {
    const isExpanded = isWidgetExpanded();
    
    if (isExpanded) {
        setWidgetCollapsed(true);
        resetWidget();
        showNotification('News collapsed');
    } else {
        setWidgetCollapsed(false);
        loadNews();
        showNotification('News expanded');
    }
}

// Refresh button handler
function refreshNews() {
    showNotification('Refreshing...');
    loadNews();
}

// Main news loading function
async function loadNews() {
    const category = getSelectedCategory();

    updateWidgetTitle(category);
    showLoading(category);

    try {
        const articles = await fetchNewsData(category);
        renderLoadedArticles(articles);
    } catch (error) {
        console.error('News loading failed:', error);
        showError('News Feeds Unavailable');
    }
}

function renderLoadedArticles(articles) {
    const recentArticles = filterRecentArticles(articles);

    if (recentArticles.length > 0) {
        displayArticles(recentArticles.slice(0, 6));
        return;
    }

    showError('No recent news in this category');
}

// News data helpers
async function fetchNewsData(category) {
    const feedUrl = getNewsFeedUrl(category);
    return fetchNewsFromRss2Json(feedUrl, category);
}

function getNewsFeedUrl(category) {
    const feeds = {
        headline: 'https://globalnews.ca/feed/',
        local: 'https://globalnews.ca/bc/feed/',
        canada: 'https://globalnews.ca/canada/feed/',
        world: 'https://globalnews.ca/world/feed/',
        business: 'https://globalnews.ca/money/feed/',
        technology: 'https://globalnews.ca/tech/feed/',
        health: 'https://globalnews.ca/health/feed/',
        sports: 'https://globalnews.ca/sports/feed/'
    };

    return feeds[category] || feeds.headline;
}

// Fetch the RSS feed as JSON through rss2json, which also handles CORS for us.
async function fetchNewsFromRss2Json(feedUrl, category) {
    const requestUrl = buildRss2JsonUrl(feedUrl);
    const response = await fetch(requestUrl, { cache: 'no-store' });

    if (!response.ok) {
        throw new Error(`News service unavailable: ${response.status}`);
    }

    const data = await response.json();

    if (data.status !== 'ok' || !Array.isArray(data.items)) {
        throw new Error('News service returned no items');
    }

    // Keep the first few items and convert them to the widget's article shape.
    return data.items
        .slice(0, 8)
        .map(item => createArticleFromJson(item, category))
        .filter(article => article.title);
}

function buildRss2JsonUrl(feedUrl) {
    return `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feedUrl)}`;
}

// News parsing helpers
function createArticleFromJson(item, category) {
    const description = stripHtml(item.description || '').trim();

    return {
        title: (item.title || '').trim(),
        description: buildArticleDescription(description),
        url: item.link,
        publishedAt: normalizePublishedDate(item.pubDate),
        source: getSourceName(category)
    };
}

// rss2json sends dates like "2026-06-12 15:15:44"; convert to ISO so Date can parse them.
function normalizePublishedDate(pubDate) {
    if (!pubDate) {
        return new Date().toISOString();
    }

    return pubDate.replace(' ', 'T');
}

function buildArticleDescription(description) {
    if (!description) {
        return '';
    }

    const shortDescription = description.substring(0, 180);
    return shortDescription + (description.length > 180 ? '...' : '');
}

function filterRecentArticles(articles) {
    const maxArticleAgeMs = NEWS_MAX_ARTICLE_AGE_HOURS * 60 * 60 * 1000;
    const now = Date.now();

    return articles.filter(article => {
        const publishedAt = new Date(article.publishedAt).getTime();

        if (Number.isNaN(publishedAt)) {
            return false;
        }

        return now - publishedAt <= maxArticleAgeMs;
    });
}

function stripHtml(text) {
    return text.replace(/<[^>]*>/g, ' ');
}

// Helper functions - Simple & Clear
function isWidgetExpanded() {
    const content = document.getElementById('newsContent');
    return content && content.style.display !== 'none';
}

function setWidgetCollapsed(collapsed) {
    const content = document.getElementById('newsContent');
    const arrow = document.querySelector('.news-toggle-arrow');
    
    if (content) content.style.display = collapsed ? 'none' : 'block';
    if (arrow) arrow.innerHTML = collapsed ? '▼' : '▲';
}

function getSelectedCategory() {
    const select = document.getElementById('newsCategory');
    return select ? select.value : 'headline';
}

function updateWidgetTitle(category) {
    const titles = {
        headline: '📰 Headlines',
        local: '📰 Local BC',
        canada: '📰 Canada',
        world: '📰 World',
        business: '📰 Business',
        technology: '📰 Tech',
        health: '📰 Health',
        sports: '📰 Sports'
    };
    
    const header = document.querySelector('.news-header h3');
    if (header) header.textContent = titles[category] || '📰 News';
}

function getSourceName(category) {
    const sources = {
        local: 'Global News BC',
        canada: 'Global News Canada',
        world: 'Global News World',
        business: 'Global News Business',
        technology: 'Global News Tech',
        health: 'Global News Health',
        sports: 'Global News Sports'
    };
    
    return sources[category] || 'Global News';
}

function showLoading(category) {
    const container = document.getElementById('newsContainer');
    if (container) {
        container.innerHTML = `<div class="news-loading">Loading ${category} news...</div>`;
    }
}

function displayArticles(articles) {
    const container = document.getElementById('newsContainer');
    
    const html = articles.map(article => {
        const timeAgo = getTimeAgo(new Date(article.publishedAt));
        
        return `
            <div class="news-article">
                <h4 class="news-title">
                    <a href="${article.url}" target="_blank" rel="noopener">
                        ${article.title}
                    </a>
                </h4>
                <p class="news-description">${article.description}</p>
                <div class="news-meta">
                    <span class="news-source">${article.source}</span>
                    <span class="news-time">${timeAgo}</span>
                </div>
            </div>
        `;
    }).join('');
    
    if (container) container.innerHTML = html;
}

function showError(message) {
    const container = document.getElementById('newsContainer');
    if (container) {
        container.innerHTML = `
            <div class="news-error">
                <p>📰 ${message}</p>
                <p>Check connection and try again.</p>
            </div>
        `;
    }
}

function resetWidget() {
    const select = document.getElementById('newsCategory');
    const header = document.querySelector('.news-header h3');
    const container = document.getElementById('newsContainer');
    
    if (select) select.value = 'headline';
    if (header) header.textContent = '📰 News Now';
    if (container) container.innerHTML = '<div class="news-loading">Loading news...</div>';
}

function getTimeAgo(date) {
    const diff = Math.floor((new Date() - date) / 60000); // minutes
    
    if (diff < 60) return `${diff}m ago`;
    if (diff < 1440) return `${Math.floor(diff / 60)}h ago`;
    return `${Math.floor(diff / 1440)}d ago`;
}