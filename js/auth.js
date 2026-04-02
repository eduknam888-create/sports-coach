/**
 * Authentication Module
 * Handles signup with email verification, login, and guest mode.
 * Uses backend API when available, falls back to local guest mode.
 */
const Auth = {
  currentUser: null,
  pendingVerificationEmail: null,

  init() {
    this.bindAuthTabs();
    this.bindForms();
    this.bindGuestMode();

    // Check for existing session via API client
    if (API.isLoggedIn() && API.user) {
      this.currentUser = { uid: API.user.uid, displayName: API.user.name };
      this.onSignIn(this.currentUser);
    } else {
      // Check for local guest session
      const savedName = localStorage.getItem('pc_guest_name');
      if (savedName) {
        this.signInAsGuest(savedName);
      }
    }

    // Sign out button
    document.getElementById('signout-btn')?.addEventListener('click', () => this.signOut());

    // Resend verification
    document.getElementById('resend-verify-btn')?.addEventListener('click', () => this.resendVerification());
    document.getElementById('back-to-login-btn')?.addEventListener('click', () => this.hideVerification());
  },

  // ==================== TAB SWITCHING ====================
  bindAuthTabs() {
    document.querySelectorAll('.auth-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        document.querySelectorAll('.auth-form').forEach(f => f.classList.remove('active'));
        document.getElementById(tab.dataset.tab === 'login' ? 'login-form' : 'signup-form')?.classList.add('active');
        this.clearMessages();
      });
    });
  },

  // ==================== FORM HANDLERS ====================
  bindForms() {
    document.getElementById('login-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleLogin();
    });
    document.getElementById('signup-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleSignup();
    });
  },

  async handleLogin() {
    const name = document.getElementById('login-name')?.value.trim();
    const email = document.getElementById('login-email')?.value.trim();
    const password = document.getElementById('login-password')?.value;
    this.clearMessages();

    if (!name || !email || !password) {
      this.showError('Please fill in all fields.');
      return;
    }

    const btn = document.getElementById('login-submit-btn');
    btn.disabled = true;
    btn.textContent = 'Logging in...';

    try {
      const data = await API.post('/auth/login', { email, password });
      API.saveAuth(data);
      this.currentUser = { uid: data.user.uid, displayName: data.user.name || name };
      this.onSignIn(this.currentUser);
    } catch (err) {
      if (err.needsVerification) {
        this.showVerification(email);
      } else if (err.status === 401) {
        this.showError('Invalid email or password.');
      } else {
        // Fallback to guest mode if server not available
        localStorage.setItem('pc_guest_name', name);
        this.signInAsGuest(name);
      }
    }

    btn.disabled = false;
    btn.textContent = 'Log In';
  },

  async handleSignup() {
    const name = document.getElementById('signup-name')?.value.trim();
    const email = document.getElementById('signup-email')?.value.trim();
    const password = document.getElementById('signup-password')?.value;
    const confirm = document.getElementById('signup-confirm')?.value;
    this.clearMessages();

    if (!name || !email || !password || !confirm) {
      this.showError('Please fill in all fields.');
      return;
    }
    if (password.length < 6) {
      this.showError('Password must be at least 6 characters.');
      return;
    }
    if (password !== confirm) {
      this.showError('Passwords do not match.');
      return;
    }

    const btn = document.getElementById('signup-submit-btn');
    btn.disabled = true;
    btn.textContent = 'Creating account...';

    try {
      await API.post('/auth/signup', { name, email, password });
      this.pendingVerificationEmail = email;
      this.showVerification(email);
      this.showSuccess('Account created! Check your email to verify.');
    } catch (err) {
      if (err.status === 409) {
        this.showError('An account with this email already exists.');
      } else {
        // Fallback to guest mode if server not available
        localStorage.setItem('pc_guest_name', name);
        this.showSuccess('Account created! Signing you in...');
        setTimeout(() => this.signInAsGuest(name), 1000);
      }
    }

    btn.disabled = false;
    btn.textContent = 'Create Account';
  },

  // ==================== EMAIL VERIFICATION ====================
  showVerification(email) {
    document.getElementById('verify-email').textContent = email;
    document.getElementById('auth-verification')?.classList.add('show');
    document.getElementById('login-form')?.classList.remove('active');
    document.getElementById('signup-form')?.classList.remove('active');
    document.querySelector('.auth-tabs').style.display = 'none';
    this.clearMessages();
  },

  hideVerification() {
    document.getElementById('auth-verification')?.classList.remove('show');
    document.querySelector('.auth-tabs').style.display = '';
    document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
    document.querySelector('.auth-tab[data-tab="login"]')?.classList.add('active');
    document.getElementById('login-form')?.classList.add('active');
  },

  async resendVerification() {
    const btn = document.getElementById('resend-verify-btn');
    btn.disabled = true;
    btn.textContent = 'Sending...';

    try {
      const email = this.pendingVerificationEmail || document.getElementById('verify-email')?.textContent;
      await API.post('/auth/resend-verification', { email });
      this.showSuccess('Verification email sent! Check your inbox.');
    } catch (err) {
      this.showError('Could not resend. Please wait a moment and try again.');
    }

    btn.disabled = false;
    btn.textContent = 'Resend Verification Email';
  },

  // ==================== GUEST MODE ====================
  bindGuestMode() {
    document.getElementById('guest-signin')?.addEventListener('click', async () => {
      try {
        const data = await API.post('/auth/guest', { name: 'Player' });
        API.saveAuth(data);
        this.currentUser = { uid: data.user.uid, displayName: data.user.name };
        this.onSignIn(this.currentUser);
      } catch (e) {
        this.signInAsGuest('Player');
      }
    });
  },

  signInAsGuest(name) {
    const displayName = name || 'Player';
    localStorage.setItem('pc_guest_name', displayName);
    this.currentUser = { uid: 'local_user', displayName, photoURL: '' };
    this.onSignIn(this.currentUser);
  },

  // ==================== SIGN OUT ====================
  async signOut() {
    API.clearAuth();
    localStorage.removeItem('pc_guest_name');
    this.currentUser = null;
    this.onSignOut();
  },

  // ==================== UI UPDATES ====================
  onSignIn(user) {
    const nameEl = document.getElementById('user-name');
    const avatarEl = document.getElementById('user-avatar');
    const welcomeEl = document.getElementById('welcome-user-name');
    if (nameEl) nameEl.textContent = user.displayName || 'Player';
    if (welcomeEl) welcomeEl.textContent = user.displayName || 'Player';
    if (avatarEl) {
      const initial = (user.displayName || 'U').charAt(0).toUpperCase();
      avatarEl.src = user.photoURL || `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'%3E%3Ccircle cx='20' cy='20' r='20' fill='%234f46e5'/%3E%3Ctext x='20' y='25' text-anchor='middle' fill='white' font-size='16'%3E${initial}%3C/text%3E%3C/svg%3E`;
      avatarEl.alt = user.displayName || 'User';
    }

    document.getElementById('auth-screen').classList.add('hidden');
    document.getElementById('main-app').classList.remove('hidden');

    if (typeof App !== 'undefined') App.onUserReady(user);
  },

  onSignOut() {
    document.getElementById('auth-screen').classList.remove('hidden');
    document.getElementById('main-app').classList.add('hidden');
    document.getElementById('login-form')?.reset();
    document.getElementById('signup-form')?.reset();
    this.hideVerification();
    this.clearMessages();
  },

  getUid() {
    return this.currentUser ? this.currentUser.uid : null;
  },

  // ==================== MESSAGES ====================
  showError(msg) {
    const el = document.getElementById('auth-error');
    if (el) { el.textContent = msg; el.classList.add('show'); }
  },

  showSuccess(msg) {
    const el = document.getElementById('auth-success');
    if (el) { el.textContent = msg; el.classList.add('show'); }
  },

  clearMessages() {
    document.getElementById('auth-error')?.classList.remove('show');
    document.getElementById('auth-success')?.classList.remove('show');
  },
};
