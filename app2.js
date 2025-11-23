// ===================================
// TRACEAL Console - Exact Figma Design
// Frame 8 (275:646) & Frame 4 (267:363)
// =================================== */

class TracealApp {
    constructor() {
        this.init();
    }

    init() {
        console.log('TRACEAL Console - Version 2 (Exact Figma Design)');
        console.log('Frame 8 - Splash Screen');
        
        // Transition from splash to login after 2.5 seconds
        setTimeout(() => {
            this.showScreen('login-screen');
        }, 2500);
        
        this.setupEventListeners();
        this.setupRegisterForm();
    }

    setupEventListeners() {
        // Login button
        const loginBtn = document.getElementById('login-btn');
        if (loginBtn) {
            loginBtn.addEventListener('click', () => this.handleLogin());
        }
        
        // Enter key on password field
        const passwordField = document.getElementById('login-password');
        if (passwordField) {
            passwordField.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.handleLogin();
                }
            });
        }
    }

    showScreen(screenId) {
        // Hide all screens
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        
        // Show target screen
        const targetScreen = document.getElementById(screenId);
        if (targetScreen) {
            targetScreen.classList.add('active');
        }
    }

    handleLogin() {
        const userId = document.getElementById('login-user-id').value.trim();
        const password = document.getElementById('login-password').value;
        const errorElement = document.getElementById('login-error');
        
        // Hide error initially
        errorElement.classList.add('hidden');
        
        if (!userId || !password) {
            errorElement.querySelector('.error-text').textContent = 'Please enter both User ID and Password';
            errorElement.classList.remove('hidden');
            return;
        }
        
        // Check if password is 'wrong' to trigger error
        if (password === 'wrong') {
            errorElement.querySelector('.error-text').innerHTML = '<div>Authentication Failed —</div><div>Please check your credentials.</div>';
            errorElement.classList.remove('hidden');
            return;
        }
        
        // Show loading screen
        this.showScreen('loading-screen');
        
        // Simulate loading for 1.5 seconds
        setTimeout(() => {
            console.log('Login successful:', userId);
            alert('Dashboard will be added in next screen');
            // Go back to login for now
            this.showScreen('login-screen');
        }, 1500);
    }

    setupRegisterForm() {
        const form = document.getElementById('register-form');
        
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleRegister();
            });
        }
    }

    handleRegister() {
        const observerSerial = document.getElementById('register-observer-serial').value;
        const userPassword = document.getElementById('register-user-password').value;
        
        if (!observerSerial || !userPassword) {
            alert('Please fill in all fields');
            return;
        }
        
        // Show serial verification loading screen
        this.showScreen('serial-loading-screen');
        
        // Simulate serial verification for 1.5 seconds
        setTimeout(() => {
            console.log('Observer registration successful:', observerSerial);
            alert('Observer registered successfully! Dashboard will be added.');
            // Go back to login for now
            this.showScreen('login-screen');
        }, 1500);
    }
}

// Initialize app
const app = new TracealApp();
