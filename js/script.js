/* Cory Carmen Portfolio Website - Interactive JavaScript */
/* Created: November 8, 2025 */

// Initialize all features when DOM loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Portfolio website loaded successfully!');
    
    initSmoothScrolling();
    initActiveNavigation();
    initSkillInteractions();
    initProjectTableHover();
    refreshProjectTableColors(); // Set initial colors based on theme
    initContactForm();
    initWeatherWidget();
    initQuoteWidget();
    initNewsWidget();
    initScrollAnimations();
    initScrollToTop();
    initTypingAnimation();
    initSettings();
});

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
        'MERN': 'Full-stack JavaScript development using MongoDB, Express.js, React, and Node.js.',
        'JSON': 'Data interchange format, parsing, and API response handling.',
        'DOM Manipulation': 'Dynamic content updates, event handling, and interactive user interfaces.'
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

// Project table hover effects
function initProjectTableHover() {
    const projectRows = document.querySelectorAll('.project-table > div:not(.project-header)');
    
    for (let i = 0; i < projectRows.length; i += 4) {
        const projectCells = [projectRows[i], projectRows[i + 1], projectRows[i + 2], projectRows[i + 3]];
        
        projectCells.forEach(cell => {
            if (cell) {
                cell.addEventListener('mouseenter', () => {
                    const isDarkMode = document.body.classList.contains('dark-mode');
                    // Only highlight the current row (4 cells)
                    projectCells.forEach(c => {
                        if (c) {
                            if (isDarkMode) {
                                // Dark mode: subtle gray hover (original choice)
                                c.style.backgroundColor = '#363636';
                            } else {
                                // Light mode: brighter green hover
                                c.style.backgroundColor = '#e8f5e8';
                            }
                            c.style.transition = 'background-color 0.3s ease';
                        }
                    });
                });
                
                cell.addEventListener('mouseleave', () => {
                    const isDarkMode = document.body.classList.contains('dark-mode');
                    projectCells.forEach(c => {
                        if (c) {
                            if (isDarkMode) {
                                // Dark mode: return to dark background
                                c.style.backgroundColor = '#2a2a2a';
                            } else {
                                // Light mode: return to light green
                                c.style.backgroundColor = '#f0fff0';
                            }
                        }
                    });
                });
            }
        });
    }
}

// Refresh project table colors when theme changes
function refreshProjectTableColors() {
    const isDarkMode = document.body.classList.contains('dark-mode');
    const projectDivs = document.querySelectorAll('.project-table > div:not(.project-header)');
    
    projectDivs.forEach(div => {
        if (isDarkMode) {
            div.style.backgroundColor = '#2a2a2a';
            div.style.color = '#e0e0e0';
        } else {
            div.style.backgroundColor = '#f0fff0';
            div.style.color = '#333';
        }
    });
}

// Contact form functionality
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
    
    contactForm.addEventListener('submit', function(e) {
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
        
        // Show loading state
        submitBtn.disabled = true;
        btnText.style.display = 'none';
        btnLoading.style.display = 'inline';
        
        setTimeout(() => {
            // Create mailto link and open email client
            const mailtoLink = createMailtoLink(data);
            window.location.href = mailtoLink;
            
            showFormResponse('Email client opened! Your message has been prepared.', 'success');
            contactForm.reset();
            
            // Reset button state
            submitBtn.disabled = false;
            btnText.style.display = 'inline';
            btnLoading.style.display = 'none';
        }, 1500);
    });
    
    // Real-time validation
    contactForm.querySelectorAll('input, textarea').forEach(input => {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => input.style.borderColor = '');
    });
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

function createMailtoLink(data) {
    const to = 'cory2@shaw.ca';
    const subject = encodeURIComponent(data.subject || 'Message from Portfolio Website');
    const body = encodeURIComponent(
        `Hello Cory,\n\n${data.message}\n\n` +
        `Best regards,\n${data.name}\n\n` +
        `---\nSent from your portfolio website\nReply to: ${data.email}`
    );
    
    return `mailto:${to}?subject=${subject}&body=${body}`;
}

function showFormResponse(message, type) {
    const formResponse = document.getElementById('formResponse');
    formResponse.textContent = message;
    formResponse.className = `form-response ${type}`;
    formResponse.style.display = 'block';
    
    setTimeout(() => formResponse.style.display = 'none', 5000);
}

// Weather widget functionality
function initWeatherWidget() {
    console.log('🌤️ Initializing weather widget...');
    loadWeather('Nanaimo,CA'); // Load default location
    initForecastDropdown();
    
    // Refresh weather data every 30 minutes for current location
    setInterval(() => {
        const currentLocationDisplay = document.getElementById('currentLocationDisplay');
        const currentLocation = currentLocationDisplay ? currentLocationDisplay.textContent : 'Nanaimo,CA';
        const locationQuery = currentLocation.includes(',') ? currentLocation : 'Nanaimo,CA';
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

async function loadWeather(locationQuery = 'Nanaimo,CA') {
    const API_KEY = '8e0ae4dbecc76ecfcb65601a0b55ab83';
    const UNITS = 'metric';
    
    const weatherContainer = document.getElementById('weatherContainer');
    const currentWeather = document.getElementById('weatherCurrent');
    const forecastWeather = document.getElementById('weatherForecast');
    const weatherError = document.getElementById('weatherError');
    const currentLocationDisplay = document.getElementById('currentLocationDisplay');
    
    // Show loading state
    if (!weatherContainer.innerHTML.includes('Searching')) {
        weatherContainer.innerHTML = '<div class="weather-loading">Loading weather data...</div>';
    }
    weatherContainer.style.display = 'block';
    currentWeather.style.display = 'none';
    forecastWeather.style.display = 'none';
    weatherError.style.display = 'none';
    
    try {
        // Fetch current weather
        const currentResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(locationQuery)}&units=${UNITS}&appid=${API_KEY}`
        );
        
        if (!currentResponse.ok) {
            if (currentResponse.status === 401) {
                console.log('⚠️ API key issue detected.');
                displayWeatherUnavailable('API key not valid');
                return;
            } else if (currentResponse.status === 404) {
                throw new Error('City not found. Please check the spelling and try again.');
            }
            throw new Error(`Weather API error: ${currentResponse.status}`);
        }
        
        const currentData = await currentResponse.json();
        
        // Update location display
        if (currentLocationDisplay) {
            currentLocationDisplay.textContent = `${currentData.name}, ${currentData.sys.country}`;
        }
        
        // Fetch 5-day forecast
        const forecastResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(locationQuery)}&units=${UNITS}&appid=${API_KEY}`
        );
        
        if (!forecastResponse.ok) {
            throw new Error(`Forecast API error: ${forecastResponse.status}`);
        }
        
        const forecastData = await forecastResponse.json();
        
        // Display weather data
        displayCurrentWeather(currentData);
        displayForecast(forecastData);
        
        weatherContainer.style.display = 'none';
        currentWeather.style.display = 'block';
        forecastWeather.style.display = 'block';
        
        // Show success notification for searches (not initial load)
        if (locationQuery !== 'Nanaimo,CA') {
            showNotification(`Weather updated for ${currentData.name}, ${currentData.sys.country}`);
        }
        
    } catch (error) {
        console.error('Weather API Error:', error);
        
        if (error.message.includes('Invalid API key') || error.message.includes('401')) {
            displayWeatherUnavailable('API key not valid');
            return;
        }
        
        // Show user-friendly error messages
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
    
    weatherContainer.innerHTML = `
        <div class="weather-unavailable">
            <p>⚠️ ${message}</p>
            <p style="font-size: 0.8rem; color: #666; margin-top: 5px;">
                Please check your internet connection or try again later.
            </p>
        </div>
    `;
    
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
    const heroSubtitle = document.querySelector('.hero p:nth-child(4)'); // Target the second paragraph
    if (heroSubtitle && heroSubtitle.textContent.includes('Full-Stack')) {
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

// Settings functionality
function initSettings() {
    const darkModeCheckbox = document.getElementById('darkMode');
    const weatherCheckbox = document.getElementById('weatherWidget');
    const quoteCheckbox = document.getElementById('quoteWidget');
    const newsCheckbox = document.getElementById('newsWidget');
    
    // Load saved dark mode preference
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    if (savedDarkMode) {
        document.body.classList.add('dark-mode');
        if (darkModeCheckbox) darkModeCheckbox.checked = true;
        refreshProjectTableColors(); // Apply dark mode colors immediately
    }
    
    // Handle dark mode toggle
    if (darkModeCheckbox) {
        darkModeCheckbox.addEventListener('change', function() {
            if (this.checked) {
                document.body.classList.add('dark-mode');
                localStorage.setItem('darkMode', 'true');
                showNotification('Dark mode enabled');
                refreshProjectTableColors(); // Refresh colors after toggling
            } else {
                document.body.classList.remove('dark-mode');
                localStorage.setItem('darkMode', 'false');
                showNotification('Dark mode disabled');
                refreshProjectTableColors(); // Refresh colors after toggling
            }
        });
    }
    
    // Handle weather widget toggle
    if (weatherCheckbox) {
        weatherCheckbox.addEventListener('change', function() {
            const weatherWidget = document.querySelector('.weather-widget');
            if (weatherWidget) {
                if (this.checked) {
                    weatherWidget.style.display = 'block';
                    showNotification('Weather widget enabled');
                } else {
                    weatherWidget.style.display = 'none';
                    showNotification('Weather widget hidden');
                }
            }
        });
    }
    
    // Handle quote widget toggle
    if (quoteCheckbox) {
        quoteCheckbox.addEventListener('change', function() {
            const quoteWidget = document.querySelector('.quote-widget');
            if (quoteWidget) {
                if (this.checked) {
                    quoteWidget.style.display = 'block';
                    showNotification('Quote widget enabled');
                } else {
                    quoteWidget.style.display = 'none';
                    showNotification('Quote widget hidden');
                }
            }
        });
    }
    
    // Handle news widget toggle
    if (newsCheckbox) {
        newsCheckbox.addEventListener('change', function() {
            const newsWidget = document.querySelector('.news-widget');
            if (newsWidget) {
                if (this.checked) {
                    newsWidget.style.display = 'block';
                    showNotification('News feed enabled');
                } else {
                    newsWidget.style.display = 'none';
                    showNotification('News feed hidden');
                }
            }
        });
    }
}

// Reset settings function
function resetSettings() {
    const darkModeCheckbox = document.getElementById('darkMode');
    const weatherCheckbox = document.getElementById('weatherWidget');
    const quoteCheckbox = document.getElementById('quoteWidget');
    const newsCheckbox = document.getElementById('newsWidget');
    
    // Reset all checkboxes to default
    if (darkModeCheckbox) darkModeCheckbox.checked = false;
    if (weatherCheckbox) weatherCheckbox.checked = true;
    if (quoteCheckbox) quoteCheckbox.checked = true;
    if (newsCheckbox) newsCheckbox.checked = true;
    
    // Reset dark mode
    document.body.classList.remove('dark-mode');
    localStorage.setItem('darkMode', 'false');
    
    // Show weather widget
    const weatherWidget = document.querySelector('.weather-widget');
    if (weatherWidget) {
        weatherWidget.style.display = 'block';
        localStorage.setItem('weatherWidget', 'true');
    }
    
    // Show quote widget
    const quoteWidget = document.querySelector('.quote-widget');
    if (quoteWidget) {
        quoteWidget.style.display = 'block';
        localStorage.setItem('quoteWidget', 'true');
    }
    
    // Show news widget
    const newsWidget = document.querySelector('.news-widget');
    if (newsWidget) {
        newsWidget.style.display = 'block';
        localStorage.setItem('newsWidget', 'true');
    }
    
    // Refresh project table colors to light mode
    refreshProjectTableColors();
    
    showNotification('Settings reset to defaults');
}

// News Widget - Simple & Optimized
function initNewsWidget() {
    console.log('📰 News widget ready');
    
    // Start collapsed
    setWidgetCollapsed(true);
    
    // Auto-refresh every hour when expanded
    setInterval(() => {
        if (isWidgetExpanded()) loadNews();
    }, 3600000);
    
    // Category change handler
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
        
        if (articles.length > 0) {
            displayArticles(articles.slice(0, 6));
        } else {
            showError('News Feeds Unavailable');
        }
    } catch (error) {
        console.error('News loading failed:', error);
        showError('News Feeds Unavailable');
    }
}

// Fetch news from RSS feeds
async function fetchNewsData(category) {
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
    
    const feedUrl = feeds[category] || feeds.headline;
    const proxyUrl = 'https://api.allorigins.win/raw?url=';
    
    const response = await fetch(proxyUrl + encodeURIComponent(feedUrl));
    
    if (!response.ok) {
        throw new Error(`Feed unavailable: ${response.status}`);
    }
    
    const xmlText = await response.text();
    return parseNewsXML(xmlText, category);
}

// Parse XML to articles
function parseNewsXML(xmlText, category) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(xmlText, 'text/xml');
    
    if (doc.querySelector('parsererror')) {
        throw new Error('XML parsing failed');
    }
    
    const items = doc.querySelectorAll('item');
    const articles = [];
    
    items.forEach((item, index) => {
        if (index < 8) {
            const title = item.querySelector('title')?.textContent?.trim();
            const description = item.querySelector('description')?.textContent?.replace(/<[^>]*>/g, '').trim();
            const url = item.querySelector('link')?.textContent?.trim();
            const pubDate = item.querySelector('pubDate')?.textContent;
            
            if (title) {
                articles.push({
                    title,
                    description: description?.substring(0, 180) + (description?.length > 180 ? '...' : ''),
                    url,
                    publishedAt: pubDate || new Date().toISOString(),
                    source: getSourceName(category)
                });
            }
        }
    });
    
    return articles;
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