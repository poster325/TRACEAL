// ==========================================
// TRACEAL Console - Fresh Implementation
// Exact Figma Design
// ==========================================

class TracealApp {
    constructor() {
        this.currentScreen = 'splash';
        this.init();
    }

    init() {
        console.log('TRACEAL Console - Pixel-Perfect Figma Implementation');
        
        // Auto-transition from splash to login
        setTimeout(() => {
            this.showScreen('login');
        }, 2500);
        
        this.setupEventHandlers();
    }

    setupEventHandlers() {
        // Login button
        const loginBtn = document.getElementById('login-btn');
        if (loginBtn) {
            loginBtn.addEventListener('click', () => this.handleLogin());
        }

        // Enter key on login
        const passwordInput = document.getElementById('login-password');
        if (passwordInput) {
            passwordInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this.handleLogin();
            });
        }

        // Observer names click to event log
        const observerNames = document.querySelectorAll('.dashboard-observer-name.clickable');
        observerNames.forEach(name => {
            name.addEventListener('click', () => {
                // Will open event log for that observer
                console.log('Observer clicked:', name.dataset.observer);
            });
        });

        // Observer Log button
        const observerLogBtn = document.getElementById('observer-log-btn');
        if (observerLogBtn) {
            observerLogBtn.addEventListener('click', () => {
                console.log('Observer Log clicked');
            });
        }

        // Register button
        const registerBtn = document.getElementById('register-btn');
        if (registerBtn) {
            registerBtn.addEventListener('click', () => {
                console.log('Register New Observer clicked');
            });
        }

        // Delete button
        const deleteBtn = document.getElementById('delete-btn');
        if (deleteBtn) {
            deleteBtn.addEventListener('click', () => {
                console.log('Delete Observer clicked');
            });
        }

        // Settings button
        const settingsBtn = document.getElementById('settings-btn');
        if (settingsBtn) {
            settingsBtn.addEventListener('click', () => {
                console.log('Settings clicked');
            });
        }
    }

    handleLogin() {
        const userId = document.getElementById('login-userid').value.trim();
        const password = document.getElementById('login-password').value;
        const errorDiv = document.getElementById('login-error');

        // Check for "wrong" password to show error
        if (password === 'wrong') {
            errorDiv.classList.remove('hidden');
            return;
        }

        // Hide error if showing
        errorDiv.classList.add('hidden');

        // Show loading
        this.showScreen('loading');

        // Simulate loading, then show dashboard
        setTimeout(() => {
            this.showScreen('dashboard');
        }, 1500);
    }

    showScreen(screenId) {
        // Hide all screens
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });

        // Show target screen
        const screen = document.getElementById(screenId);
        if (screen) {
            screen.classList.add('active');
            this.currentScreen = screenId;
        }
    }
}

// Initialize app
const app = new TracealApp();

