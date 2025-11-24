// Screen Management
const screens = {
    splash: document.getElementById('splash-screen'),
    login: document.getElementById('login-screen'),
    loading: document.getElementById('loading-screen'),
    dashboard: document.getElementById('dashboard-screen'),
    registerObserver: document.getElementById('register-observer-screen'),
    registerLoading: document.getElementById('register-loading-screen'),
    registerName: document.getElementById('register-name-screen'),
    registerConfirm: document.getElementById('register-confirm-screen'),
    observerLog: document.getElementById('observer-log-screen'),
    eventLog: document.getElementById('event-log-screen')
};

// Switch Screen Function
function switchScreen(fromScreen, toScreen) {
    if (screens[fromScreen]) {
        screens[fromScreen].classList.remove('active');
    }
    if (screens[toScreen]) {
        screens[toScreen].classList.add('active');
    }
}

// Observer Management
function loadObservers() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (!loggedInUser) return [];
    
    const user = JSON.parse(loggedInUser);
    const storageKey = `observers_${user.userId}`;
    const stored = localStorage.getItem(storageKey);
    
    if (stored) {
        return JSON.parse(stored);
    }
    
    // First time - use user-specific default observers
    const defaultObs = userObservers[user.userId] || userObservers['default'];
    localStorage.setItem(storageKey, JSON.stringify(defaultObs));
    return defaultObs;
}

function saveObservers(observers) {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (!loggedInUser) return;
    
    const user = JSON.parse(loggedInUser);
    const storageKey = `observers_${user.userId}`;
    localStorage.setItem(storageKey, JSON.stringify(observers));
}

function renderObserverList() {
    const observers = loadObservers();
    const listContainer = document.getElementById('observer-list');
    listContainer.innerHTML = '';
    
    // Update dashboard stats
    const totalObservers = observers.length;
    const totalEvents = observers.reduce((sum, obs) => sum + obs.events, 0);
    
    const registeredCountEl = document.getElementById('registered-count');
    const eventsCountEl = document.getElementById('events-count');
    if (registeredCountEl) registeredCountEl.textContent = totalObservers;
    if (eventsCountEl) eventsCountEl.textContent = totalEvents;
    
    observers.forEach((observer, index) => {
        // Create observer item
        const itemDiv = document.createElement('div');
        itemDiv.className = 'observer-item';
        itemDiv.dataset.observerId = observer.id;
        itemDiv.style.cursor = 'pointer';
        
        const infoDiv = document.createElement('div');
        infoDiv.className = 'observer-info';
        
        const nameP = document.createElement('p');
        nameP.className = 'observer-name';
        nameP.textContent = observer.name;
        
        const serialP = document.createElement('p');
        serialP.className = 'observer-serial';
        serialP.textContent = `SERIAL: ${observer.serial}`;
        
        infoDiv.appendChild(nameP);
        infoDiv.appendChild(serialP);
        itemDiv.appendChild(infoDiv);
        
        // Add badge if there are events
        if (observer.events > 0) {
            const badge = document.createElement('div');
            badge.className = 'badge-alert';
            badge.textContent = observer.events;
            itemDiv.appendChild(badge);
        }
        
        // Add click handler
        itemDiv.addEventListener('click', () => {
            // Store selected observer for event log
            localStorage.setItem('selectedObserver', observer.name);
            
            // Update event log title
            const eventObserverName = document.querySelector('.event-observer-name');
            if (eventObserverName) {
                eventObserverName.textContent = observer.name;
            }
            
            // Render event log
            renderEventLog(observer.name);
            
            switchScreen('dashboard', 'eventLog');
        });
        
        listContainer.appendChild(itemDiv);
        
        // Add divider
        const divider = document.createElement('div');
        divider.className = 'divider-line';
        listContainer.appendChild(divider);
    });
    
    // Update registered count
    document.getElementById('registered-count').textContent = observers.length;
    
    // Update button and delete link positions
    updateDashboardPositions(observers.length);
}

function updateDashboardPositions(observerCount) {
    const registerBtn = document.getElementById('register-btn');
    const deleteLink = document.querySelector('.delete-link');
    
    // Base position for first observer: 269px
    // Each observer + divider: 59px + 2px = 61px
    const baseTop = 269;
    const itemHeight = 61;
    const buttonTop = baseTop + (observerCount * itemHeight) + 18; // 18px gap after last divider
    const deleteTop = buttonTop + 44 + 9; // button height + gap
    
    registerBtn.style.top = `${buttonTop}px`;
    deleteLink.style.top = `${deleteTop}px`;
}

// Check if user is logged in
function checkLoginState() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
        const user = JSON.parse(loggedInUser);
        updateDashboardWithUser(user);
        renderObserverList();
        return true;
    }
    return false;
}

// Update dashboard with logged-in user info
function updateDashboardWithUser(user) {
    const managerNameElement = document.querySelector('.manager-name');
    if (managerNameElement) {
        managerNameElement.textContent = user.name;
    }
    renderObserverList();
}

// Initialize App
function initApp() {
    // Check if user is already logged in
    const isLoggedIn = checkLoginState();
    
    if (isLoggedIn) {
        // User is logged in, go directly to dashboard
        switchScreen('splash', 'dashboard');
    } else {
        // Show splash for 2 seconds, then go to login
        setTimeout(() => {
            switchScreen('splash', 'login');
        }, 2000);
    }
}

// Login Handling
const loginBtn = document.getElementById('login-btn');
const loginUserId = document.getElementById('login-user-id');
const loginPassword = document.getElementById('login-password');
const loginError = document.getElementById('login-error');
const signupText = document.querySelector('.signup-text');

function handleLogin() {
    const userId = loginUserId.value.trim();
    const password = loginPassword.value.trim();

    // Hide error initially
    loginError.classList.add('hidden');
    signupText.classList.remove('error-visible');

    // Validate credentials
    if (!userId || !password) {
        return;
    }

    // Find user in database
    const user = userDatabase.find(u => u.userId === userId && u.password === password);

    if (user) {
        // Valid credentials - store login state
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        
        // Proceed to loading
        switchScreen('login', 'loading');
        
        // Show loading for 1 second, then go to dashboard
        setTimeout(() => {
            updateDashboardWithUser(user);
            switchScreen('loading', 'dashboard');
        }, 1000);
    } else {
        // Invalid credentials - show error
        loginError.classList.remove('hidden');
        signupText.classList.add('error-visible');
    }
}

// Event Listeners
loginBtn.addEventListener('click', handleLogin);

// Allow Enter key to submit login
loginPassword.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleLogin();
    }
});

loginUserId.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        loginPassword.focus();
    }
});

// Observer Registration Flow
const registerBtn = document.getElementById('register-btn');
const registerObserverBtn = document.getElementById('register-observer-btn');
const nameObserverBtn = document.getElementById('name-observer-btn');
const confirmRegisterBtn = document.getElementById('confirm-register-btn');
const backToDashboardBtn = document.getElementById('back-to-dashboard');

const registerSerial = document.getElementById('register-serial');
const registerPassword = document.getElementById('register-password');
const registerObserverName = document.getElementById('register-observer-name');

// Dashboard -> Register Observer Screen
registerBtn.addEventListener('click', () => {
    switchScreen('dashboard', 'registerObserver');
});

// Back to Dashboard
backToDashboardBtn.addEventListener('click', () => {
    // Clear form fields
    registerSerial.value = '';
    registerPassword.value = '';
    registerObserverName.value = '';
    
    switchScreen('registerObserver', 'dashboard');
});

// Register Observer -> Loading Screen
registerObserverBtn.addEventListener('click', () => {
    const serial = registerSerial.value.trim();
    const password = registerPassword.value.trim();

    if (serial && password) {
        switchScreen('registerObserver', 'registerLoading');
        
        // Show loading for 1 second, then go to name screen
        setTimeout(() => {
            switchScreen('registerLoading', 'registerName');
        }, 1000);
    }
});

// Allow Enter key to submit observer registration
registerPassword.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        registerObserverBtn.click();
    }
});

registerSerial.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        registerPassword.focus();
    }
});

// Name Observer -> Confirm Screen
nameObserverBtn.addEventListener('click', () => {
    const observerName = registerObserverName.value.trim();

    if (observerName) {
        // Update confirm screen with entered name and serial
        document.getElementById('confirm-observer-name').textContent = observerName;
        document.getElementById('confirm-observer-serial').textContent = 
            `OBSERVER SERIAL: ${registerSerial.value.trim().toUpperCase()}   `;
        
        switchScreen('registerName', 'registerConfirm');
    }
});

// Allow Enter key to submit observer name
registerObserverName.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        nameObserverBtn.click();
    }
});

// Confirm & Register -> Dashboard
confirmRegisterBtn.addEventListener('click', () => {
    // Get the observer data
    const serial = registerSerial.value.trim().toUpperCase();
    const name = registerObserverName.value.trim();
    
    // Create new observer
    const newObserver = {
        id: serial,
        name: name,
        serial: serial,
        events: 0
    };
    
    // Add to observers list
    const observers = loadObservers();
    observers.push(newObserver);
    saveObservers(observers);
    
    // Clear form fields
    registerSerial.value = '';
    registerPassword.value = '';
    registerObserverName.value = '';
    
    // Re-render dashboard and switch screen
    renderObserverList();
    switchScreen('registerConfirm', 'dashboard');
});

// Observer Log Navigation
const observerLogBtn = document.getElementById('observer-log-btn');
const backFromLogBtn = document.getElementById('back-from-log');

// Observer Log Button -> Observer Log Screen
observerLogBtn.addEventListener('click', () => {
    // Special trigger functionality for "tri" user
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
        const user = JSON.parse(loggedInUser);
        if (user.userId === 'tri') {
            // Update demo's tamper detected timestamp to current time
            const now = new Date();
            const timestamp = `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, '0')}.${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
            
            // Store trigger timestamp locally
            localStorage.setItem('demo_tamper_timestamp', timestamp);
            
            // Store trigger timestamp in Firebase for cross-device sync
            if (database) {
                database.ref('demo/tamper_timestamp').set(timestamp)
                    .then(() => {
                        console.log('Trigger activated! Timestamp synced to Firebase:', timestamp);
                    })
                    .catch((error) => {
                        console.error('Error syncing to Firebase:', error);
                    });
            }
            
            // Update demo's observer events count to 1
            const demoObserversKey = 'observers_demo';
            const demoObservers = JSON.parse(localStorage.getItem(demoObserversKey) || '[]');
            if (demoObservers.length > 0) {
                demoObservers[0].events = 1;
                localStorage.setItem(demoObserversKey, JSON.stringify(demoObservers));
            }
            
            console.log('Trigger activated! Demo tamper timestamp updated to:', timestamp);
        }
    }
    
    updateObserverLogWithUser();
    switchScreen('dashboard', 'observerLog');
});

// Back from Observer Log -> Dashboard
backFromLogBtn.addEventListener('click', () => {
    switchScreen('observerLog', 'dashboard');
});

// Update observer log with user name
function updateObserverLogWithUser() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
        const user = JSON.parse(loggedInUser);
        const logManagerName = document.querySelector('.log-manager-name');
        if (logManagerName) {
            logManagerName.textContent = user.name;
        }
    }
}

// Event Log Rendering
function parseTimestamp(timestamp) {
    // Parse "2025.11.25 18:33:22" format
    const parts = timestamp.split(' ');
    const date = parts[0].split('.');
    const time = parts[1].split(':');
    return new Date(date[0], date[1] - 1, date[2], time[0], time[1], time[2]);
}

function shouldShowTriangle(currentTimestamp, previousTimestamp) {
    if (!previousTimestamp) return false;
    
    const current = parseTimestamp(currentTimestamp);
    const previous = parseTimestamp(previousTimestamp);
    const hoursDiff = Math.abs(current - previous) / (1000 * 60 * 60);
    
    return hoursDiff > 5;
}

function renderEventLog(observerName) {
    let events = eventLogDatabase[observerName] || [];
    
    // For demo observer, check if there's a triggered timestamp
    if (observerName === 'N25_Demo_1124') {
        const triggeredTimestamp = localStorage.getItem('demo_tamper_timestamp');
        if (triggeredTimestamp) {
            // Clone events array and update the tamper timestamp
            events = JSON.parse(JSON.stringify(events));
            const tamperIndex = events.findIndex(e => e.type === 'tamper_detected');
            if (tamperIndex !== -1) {
                events[tamperIndex].timestamp = triggeredTimestamp;
            }
        }
    }
    
    // Count tamper events for the alert
    const tamperCount = events.filter(e => e.type === "tamper_detected").length;
    
    // Update alert section if tampers exist
    if (tamperCount > 0) {
        document.querySelector('.event-alert-subtitle').textContent = `${tamperCount} Recent Tamper${tamperCount > 1 ? 's' : ''}`;
    }
    
    // Render events starting from top position
    let currentTop = 219; // Starting position for first red background
    const eventContainer = document.querySelector('#event-log-screen');
    
    // Remove old dynamic events (keep static header elements)
    const oldEvents = eventContainer.querySelectorAll('.dynamic-event');
    oldEvents.forEach(el => el.remove());
    
    events.forEach((event, index) => {
        const config = eventConfig[event.type];
        if (!config) return;
        
        // Check if triangle needed (time gap > 5 hours from previous event)
        const showTriangle = index > 0 && shouldShowTriangle(event.timestamp, events[index - 1].timestamp);
        
        // Add red background for tamper events
        if (config.useRedBackground) {
            const redBg = document.createElement('div');
            redBg.className = 'event-red-bg dynamic-event';
            redBg.style.top = `${currentTop}px`;
            eventContainer.appendChild(redBg);
        }
        
        const iconTop = currentTop + 13;
        const textTop = currentTop + 28;
        const timestampTop = currentTop + 13;
        
        // Add divider
        const divider = document.createElement('div');
        divider.className = 'event-divider dynamic-event';
        divider.style.top = `${textTop}px`;
        divider.style.background = config.dividerColor;
        eventContainer.appendChild(divider);
        
        // Add icon
        const iconWrapper = document.createElement('div');
        iconWrapper.className = 'event-icon-wrapper dynamic-event';
        iconWrapper.style.top = `${iconTop}px`;
        iconWrapper.style.background = config.circleColor;
        
        const icon = document.createElement('img');
        icon.src = `svgs/${config.icon}`;
        icon.className = 'log-icon-img';
        if (event.type === 'tamper_detected') {
            icon.classList.add('event-tamper-icon');
        }
        iconWrapper.appendChild(icon);
        eventContainer.appendChild(iconWrapper);
        
        // Add event name
        const eventName = document.createElement('p');
        eventName.className = config.textWhite ? 'event-name-white dynamic-event' : 'event-name dynamic-event';
        eventName.style.top = `${textTop}px`;
        eventName.textContent = config.name;
        eventContainer.appendChild(eventName);
        
        // Add timestamp
        const eventTime = document.createElement('p');
        eventTime.className = config.textWhite ? 'event-timestamp-white dynamic-event' : 'event-timestamp dynamic-event';
        eventTime.style.top = `${timestampTop}px`;
        eventTime.textContent = event.timestamp;
        eventContainer.appendChild(eventTime);
        
        // Add sensor ID
        const sensorId = document.createElement('p');
        sensorId.className = config.textWhite ? 'event-sensor-white dynamic-event' : 'event-sensor dynamic-event';
        sensorId.style.top = `${timestampTop - 1}px`;
        sensorId.textContent = `Sensor ID: ${event.sensorId}`;
        eventContainer.appendChild(sensorId);
        
        // Move to next position
        currentTop += config.useRedBackground ? 59 : 59;
        
        // Add triangle if time gap > 5 hours
        if (showTriangle) {
            const triangle = document.createElement('div');
            triangle.className = 'event-timeline-triangle dynamic-event';
            triangle.style.top = `${currentTop + 10}px`;
            eventContainer.appendChild(triangle);
            currentTop += 41; // Additional space for triangle
        }
    });
}

// Event Log Navigation (Per Observer)
const backFromEventLogBtn = document.getElementById('back-from-event-log');

// Back from Event Log -> Dashboard
backFromEventLogBtn.addEventListener('click', () => {
    switchScreen('eventLog', 'dashboard');
});

// Popup Modal for Sensor Detail
const sensorPopup = document.getElementById('sensor-popup');
const popupDarkener = document.getElementById('popup-darkener');

// Show popup when clicking on event items in event log
// We'll add click handlers to all event entries that show event names
function initPopupHandlers() {
    const eventNames = document.querySelectorAll('#event-log-screen .event-name, #event-log-screen .event-name-white');
    
    eventNames.forEach(eventName => {
        eventName.style.cursor = 'pointer';
        eventName.addEventListener('click', () => {
            sensorPopup.classList.remove('hidden');
        });
    });
}

// Close popup when clicking outside the card (on darkener)
popupDarkener.addEventListener('click', () => {
    sensorPopup.classList.add('hidden');
});

// Initialize popup handlers
initPopupHandlers();

// Logout functionality
function logout() {
    localStorage.removeItem('loggedInUser');
    location.reload();
}

// Settings icon click handler (logout)
const settingsIcon = document.getElementById('settings-icon');
if (settingsIcon) {
    settingsIcon.addEventListener('click', () => {
        if (confirm('Are you sure you want to log out?')) {
            logout();
        }
    });
}

// Auto-refresh for demo account when trigger is activated
let lastCheckedTimestamp = null;

function refreshDemoView(timestamp) {
    console.log('Trigger detected! Auto-refreshing demo view...', timestamp);
    
    // Store locally
    localStorage.setItem('demo_tamper_timestamp', timestamp);
    lastCheckedTimestamp = timestamp;
    
    // Update observers data with new event count
    const demoObserversKey = 'observers_demo';
    const demoObservers = JSON.parse(localStorage.getItem(demoObserversKey) || '[]');
    if (demoObservers.length > 0) {
        demoObservers[0].events = 1;
        localStorage.setItem(demoObserversKey, JSON.stringify(demoObservers));
    }
    
    // Refresh dashboard if currently on dashboard
    const dashboardScreen = document.getElementById('dashboard-screen');
    if (dashboardScreen && dashboardScreen.classList.contains('active')) {
        renderObserverList();
    }
    
    // Refresh event log if currently viewing the demo observer
    const eventLogScreen = document.getElementById('event-log-screen');
    if (eventLogScreen && eventLogScreen.classList.contains('active')) {
        const selectedObserver = localStorage.getItem('selectedObserver');
        if (selectedObserver === 'N25_Demo_1124') {
            renderEventLog('N25_Demo_1124');
        }
    }
}

function checkForTriggerUpdate() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (!loggedInUser) return;
    
    const user = JSON.parse(loggedInUser);
    
    // Only check if logged in as demo
    if (user.userId === 'demo') {
        const currentTimestamp = localStorage.getItem('demo_tamper_timestamp');
        
        // If timestamp exists and changed since last check
        if (currentTimestamp && currentTimestamp !== lastCheckedTimestamp) {
            refreshDemoView(currentTimestamp);
        }
    }
}

// Firebase Real-time Listener for cross-device sync
function setupFirebaseListener() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (!loggedInUser) return;
    
    const user = JSON.parse(loggedInUser);
    
    // Only set up listener if logged in as demo and Firebase is available
    if (user.userId === 'demo' && database) {
        console.log('Setting up Firebase listener for demo account...');
        
        database.ref('demo/tamper_timestamp').on('value', (snapshot) => {
            const timestamp = snapshot.val();
            if (timestamp && timestamp !== lastCheckedTimestamp) {
                console.log('Firebase update received:', timestamp);
                refreshDemoView(timestamp);
            }
        });
    }
}

// Initialize Firebase listener on page load
setTimeout(setupFirebaseListener, 1000);

// Poll for updates every 2 seconds (for fallback/same-device testing)
setInterval(checkForTriggerUpdate, 2000);

// Also listen to storage events (for cross-tab updates on same device)
window.addEventListener('storage', (e) => {
    if (e.key === 'demo_tamper_timestamp') {
        checkForTriggerUpdate();
    }
});

// Start the app
initApp();
