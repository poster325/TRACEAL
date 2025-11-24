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
    const stored = localStorage.getItem('observers');
    if (stored) {
        return JSON.parse(stored);
    }
    // First time - use default observers
    localStorage.setItem('observers', JSON.stringify(defaultObservers));
    return defaultObservers;
}

function saveObservers(observers) {
    localStorage.setItem('observers', JSON.stringify(observers));
}

function renderObserverList() {
    const observers = loadObservers();
    const listContainer = document.getElementById('observer-list');
    listContainer.innerHTML = '';
    
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

// Logout functionality (if needed)
function logout() {
    localStorage.removeItem('loggedInUser');
    location.reload();
}

// Start the app
initApp();
