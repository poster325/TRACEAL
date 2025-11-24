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
    eventLog: document.getElementById('event-log-screen'),
    authAlarm: document.getElementById('auth-alarm-screen'),
    alarmTriggered: document.getElementById('alarm-triggered-screen')
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

// Initialize App
function initApp() {
    // Show splash for 2 seconds, then go to login
    setTimeout(() => {
        switchScreen('splash', 'login');
    }, 2000);
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

    // Check if password is "wrong" to show error
    if (password === 'wrong') {
        loginError.classList.remove('hidden');
        signupText.classList.add('error-visible');
        return;
    }

    // If credentials provided, proceed to loading
    if (userId && password) {
        switchScreen('login', 'loading');
        
        // Show loading for 2 seconds, then go to dashboard
        setTimeout(() => {
            switchScreen('loading', 'dashboard');
        }, 2000);
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

const registerSerial = document.getElementById('register-serial');
const registerPassword = document.getElementById('register-password');
const registerObserverName = document.getElementById('register-observer-name');

// Dashboard -> Register Observer Screen
registerBtn.addEventListener('click', () => {
    switchScreen('dashboard', 'registerObserver');
});

// Register Observer -> Loading Screen
registerObserverBtn.addEventListener('click', () => {
    const serial = registerSerial.value.trim();
    const password = registerPassword.value.trim();

    if (serial && password) {
        switchScreen('registerObserver', 'registerLoading');
        
        // Show loading for 2 seconds, then go to name screen
        setTimeout(() => {
            switchScreen('registerLoading', 'registerName');
        }, 2000);
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
    // Clear form fields
    registerSerial.value = '';
    registerPassword.value = '';
    registerObserverName.value = '';
    
    switchScreen('registerConfirm', 'dashboard');
});

// Event Log Navigation
const observerLogBtn = document.getElementById('observer-log-btn');
const observerLogBackBtn = document.getElementById('observer-log-back');
const eventLogBackBtn = document.getElementById('event-log-back');
const sensorPopup = document.getElementById('sensor-popup');

// Dashboard -> Observer Log
if (observerLogBtn) {
    observerLogBtn.addEventListener('click', () => {
        switchScreen('dashboard', 'observerLog');
    });
}

// Observer Log -> Back to Dashboard
if (observerLogBackBtn) {
    observerLogBackBtn.addEventListener('click', () => {
        switchScreen('observerLog', 'dashboard');
    });
}

// Event Log -> Back to Dashboard
if (eventLogBackBtn) {
    eventLogBackBtn.addEventListener('click', () => {
        switchScreen('eventLog', 'dashboard');
    });
}

// Observer items click to view Event Log
const observerItems = document.querySelectorAll('.observer-item');
observerItems.forEach(item => {
    item.addEventListener('click', () => {
        switchScreen('dashboard', 'eventLog');
    });
});

// Event items in Event Log can show sensor popup
const eventItems = document.querySelectorAll('.event-item, .event-alert-full');
eventItems.forEach(item => {
    item.addEventListener('click', () => {
        if (sensorPopup) {
            sensorPopup.style.display = 'flex';
        }
    });
});

// Close popup when clicking overlay
if (sensorPopup) {
    sensorPopup.addEventListener('click', (e) => {
        if (e.target === sensorPopup) {
            sensorPopup.style.display = 'none';
        }
    });
}

// Alarm Screen Handlers
const alarmYesBtn = document.getElementById('alarm-yes-btn');
const alarmNoBtn = document.getElementById('alarm-no-btn');
const authenticateAlarmBtn = document.getElementById('authenticate-alarm-btn');
const authAlarmUserId = document.getElementById('auth-alarm-user-id');
const authAlarmPassword = document.getElementById('auth-alarm-password');

// Alarm Triggered -> Authenticate Alarm (when Yes is clicked)
if (alarmYesBtn) {
    alarmYesBtn.addEventListener('click', () => {
        switchScreen('alarmTriggered', 'authAlarm');
    });
}

// Alarm Triggered -> Back to Event Log (when No is clicked)
if (alarmNoBtn) {
    alarmNoBtn.addEventListener('click', () => {
        switchScreen('alarmTriggered', 'eventLog');
    });
}

// Authenticate Alarm -> Dashboard (after authentication)
if (authenticateAlarmBtn) {
    authenticateAlarmBtn.addEventListener('click', () => {
        const userId = authAlarmUserId.value.trim();
        const password = authAlarmPassword.value.trim();

        if (userId && password) {
            // Clear form fields
            authAlarmUserId.value = '';
            authAlarmPassword.value = '';
            
            switchScreen('authAlarm', 'dashboard');
        }
    });
}

// Allow Enter key in alarm auth form
if (authAlarmPassword) {
    authAlarmPassword.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            authenticateAlarmBtn.click();
        }
    });
}

if (authAlarmUserId) {
    authAlarmUserId.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            authAlarmPassword.focus();
        }
    });
}

// Simulate tamper detection - click on tamper events to trigger alarm
const tamperEvents = document.querySelectorAll('.event-alert-full');
tamperEvents.forEach(event => {
    event.addEventListener('click', (e) => {
        // Stop propagation to prevent sensor popup
        e.stopPropagation();
        switchScreen('eventLog', 'alarmTriggered');
    });
});

// Start the app
initApp();
