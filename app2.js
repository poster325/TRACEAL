// ===================================
// TRACEAL Console - Exact Figma Design
// Frame 8 (275:646) & Frame 4 (267:363)
// =================================== */

class TracealApp {
    constructor() {
        // Store registration data
        this.registrationData = {
            userId: '',
            observerSerial: '',
            observerName: ''
        };
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
        this.setupObserverNameForm();
        this.setupConfirmScreen();
        this.setupObserverLogScreen();
        this.setupEventLogScreen();
        this.setupDashboardScreen();
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
        
        // Store user ID for later display
        this.registrationData.userId = userId;
        
        // Show loading screen
        this.showScreen('loading-screen');
        
        // Simulate loading for 1.5 seconds
        setTimeout(() => {
            console.log('Login successful:', userId);
            // Show dashboard
            this.showScreen('dashboard-screen');
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
        const observerSerial = document.getElementById('register-observer-serial').value.trim();
        const userPassword = document.getElementById('register-user-password').value;
        
        if (!observerSerial || !userPassword) {
            alert('Please fill in all fields');
            return;
        }
        
        // Store observer serial for later display
        this.registrationData.observerSerial = observerSerial;
        
        // Show serial verification loading screen
        this.showScreen('serial-loading-screen');
        
        // Simulate serial verification for 1.5 seconds
        setTimeout(() => {
            console.log('Serial verified:', observerSerial);
            // Show observer name screen
            this.showScreen('observer-name-screen');
        }, 1500);
    }

    setupObserverNameForm() {
        const form = document.getElementById('observer-name-form');
        
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleObserverName();
            });
        }
    }

    handleObserverName() {
        const observerName = document.getElementById('observer-unit-name').value.trim();
        
        if (!observerName) {
            alert('Please enter an observer name');
            return;
        }
        
        // Store observer name
        this.registrationData.observerName = observerName;
        
        console.log('Observer named:', observerName);
        
        // Update confirmation screen with collected data
        this.updateConfirmScreen();
        
        // Show confirmation screen
        this.showScreen('confirm-screen');
    }

    setupConfirmScreen() {
        const confirmBtn = document.getElementById('confirm-btn');
        
        if (confirmBtn) {
            confirmBtn.addEventListener('click', () => {
                this.handleConfirm();
            });
        }
    }

    updateConfirmScreen() {
        // Update observer name
        const observerNameEl = document.getElementById('confirm-observer-name');
        if (observerNameEl) {
            observerNameEl.textContent = this.registrationData.observerName;
        }
        
        // Update observer serial
        const serialEl = document.getElementById('confirm-serial');
        if (serialEl) {
            serialEl.textContent = `OBSERVER SERIAL: ${this.registrationData.observerSerial}`;
        }
        
        // Update manager name (use userId converted to uppercase)
        const managerEl = document.getElementById('confirm-manager');
        if (managerEl) {
            const managerName = this.registrationData.userId.toUpperCase().replace(/[^A-Z0-9]/g, ' ');
            managerEl.textContent = `MANAGER NAME: ${managerName}`;
        }
    }

    handleConfirm() {
        console.log('Registration confirmed:', this.registrationData);
        alert('Observer registered successfully!');
        
        // Go back to dashboard
        this.showScreen('dashboard-screen');
    }

    setupObserverLogScreen() {
        const backBtn = document.getElementById('log-back-btn');
        
        if (backBtn) {
            backBtn.addEventListener('click', () => {
                // Go back to dashboard
                this.showScreen('dashboard-screen');
            });
        }
    }

    setupEventLogScreen() {
        const backBtn = document.getElementById('event-back-btn');
        
        if (backBtn) {
            backBtn.addEventListener('click', () => {
                // Go back to dashboard
                this.showScreen('dashboard-screen');
            });
        }
        
        // Setup sensor detail modal
        this.setupSensorModal();
        
        // Make sensor IDs clickable
        const sensorIds = document.querySelectorAll('.event-sensor');
        sensorIds.forEach(sensor => {
            sensor.style.cursor = 'pointer';
            sensor.style.textDecoration = 'underline';
            sensor.addEventListener('click', (e) => {
                e.stopPropagation();
                this.showSensorModal();
            });
        });
    }

    setupSensorModal() {
        const modal = document.getElementById('sensor-detail-modal');
        const overlay = document.getElementById('sensor-modal-overlay');
        
        if (overlay) {
            overlay.addEventListener('click', () => {
                this.hideSensorModal();
            });
        }
    }

    showSensorModal() {
        const modal = document.getElementById('sensor-detail-modal');
        if (modal) {
            modal.classList.remove('hidden');
        }
    }

    hideSensorModal() {
        const modal = document.getElementById('sensor-detail-modal');
        if (modal) {
            modal.classList.add('hidden');
        }
    }

    setupDashboardScreen() {
        // Observer Log button
        const observerLogBtn = document.getElementById('dashboard-observer-log-btn');
        if (observerLogBtn) {
            observerLogBtn.addEventListener('click', () => {
                this.showScreen('observer-log-screen');
            });
        }
        
        // Register New Observer button
        const registerBtn = document.getElementById('dashboard-register-btn');
        if (registerBtn) {
            registerBtn.addEventListener('click', () => {
                this.showScreen('observer-register-screen');
            });
        }
        
        // Delete Observer button
        const deleteBtn = document.getElementById('dashboard-delete-btn');
        if (deleteBtn) {
            deleteBtn.addEventListener('click', () => {
                alert('Delete observer functionality will be added');
            });
        }
        
        // Settings button
        const settingsBtn = document.getElementById('settings-btn');
        if (settingsBtn) {
            settingsBtn.addEventListener('click', () => {
                alert('Settings functionality will be added');
            });
        }
        
        // Observer items - click to view event log
        const observerItems = document.querySelectorAll('.dashboard-observer-item');
        observerItems.forEach(item => {
            item.style.cursor = 'pointer';
            item.addEventListener('click', () => {
                this.showScreen('event-log-screen');
            });
        });
    }
}

// Initialize app
const app = new TracealApp();
