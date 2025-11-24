// Screen Management
const screens = {
    splash: document.getElementById('splash-screen'),
    login: document.getElementById('login-screen'),
    loading: document.getElementById('loading-screen'),
    dashboard: document.getElementById('dashboard-screen')
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

// Start the app
initApp();
