/**
 * Authentication Module
 * Handles Email/Password signup with verification, Google Sign-In,
 * and Guest mode fallback.
 */
const Auth = {
  currentUser: null,
  pendingVerificationEmail: null,

  init() {
    this.bindAuthTabs();
    this.bindForms();
    this.bindGuestMode();

    if (firebaseReady && auth) {
      // Firebase mode
      auth.onAuthStateChanged(user => {
        if (user) {
          if (user.emailVerified || user.providerData[0]?.providerId === 'google.com') {
            this.currentUser = user;
            this.onSignIn(user);
          } else {
            // Signed in but email not verified
            this.showVerification(user.email);
          }
        } else {
          this.currentUser = null;
          this.onSignOut();
        }
      });

      // Google sign-in buttons
      document.getElementById('google-signin')?.addEventListener('click', () => this.signInWithGoogle());
      document.getElementById('google-signin-2')?.addEventListener('click', () => this.signInWithGoogle());
    } else {
      // Local mode: hide Google buttons, show forms for guest
      document.getElementById('google-signin')?.closest('.auth-divider')?.remove();
      document.getElementById('google-signin')?.remove();
      document.getElementById('google-signin-2')?.closest('.auth-divider')?.remove();
      document.getElementById('google-signin-2')?.remove();

      // Auto-restore local session
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
    // Login form
    document.getElementById('login-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleLogin();
    });

    // Signup form
    document.getElementById('signup-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleSignup();
    });
  },

  async handleLogin() {
    const email = document.getElementById('login-email')?.value.trim();
    const password = document.getElementById('login-password')?.value;
    this.clearMessages();

    if (!email || !password) {
      this.showError('Please fill in all fields.');
      return;
    }

    const btn = document.getElementById('login-submit-btn');
    btn.disabled = true;
    btn.textContent = 'Logging in...';

    if (firebaseReady && auth) {
      try {
        const cred = await auth.signInWithEmailAndPassword(email, password);
        if (!cred.user.emailVerified) {
          this.showVerification(email);
          btn.disabled = false;
          btn.textContent = 'Log In';
          return;
        }
        // onAuthStateChanged will handle the rest
      } catch (err) {
        btn.disabled = false;
        btn.textContent = 'Log In';
        this.showError(this.getErrorMessage(err.code));
      }
    } else {
      // Local mode: sign in as guest with email as name
      const name = email.split('@')[0];
      localStorage.setItem('pc_guest_name', name);
      this.signInAsGuest(name);
    }
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

    if (firebaseReady && auth) {
      try {
        const cred = await auth.createUserWithEmailAndPassword(email, password);

        // Set display name
        await cred.user.updateProfile({ displayName: name });

        // Send verification email
        await cred.user.sendEmailVerification();

        this.pendingVerificationEmail = email;
        this.showVerification(email);

        btn.disabled = false;
        btn.textContent = 'Create Account';
      } catch (err) {
        btn.disabled = false;
        btn.textContent = 'Create Account';
        this.showError(this.getErrorMessage(err.code));
      }
    } else {
      // Local mode: save as guest
      localStorage.setItem('pc_guest_name', name);
      this.showSuccess('Account created! Signing you in...');
      setTimeout(() => this.signInAsGuest(name), 1000);
      btn.disabled = false;
      btn.textContent = 'Create Account';
    }
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
    // Show login tab
    document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
    document.querySelector('.auth-tab[data-tab="login"]')?.classList.add('active');
    document.getElementById('login-form')?.classList.add('active');
    if (firebaseReady && auth) auth.signOut();
  },

  async resendVerification() {
    const btn = document.getElementById('resend-verify-btn');
    btn.disabled = true;
    btn.textContent = 'Sending...';

    try {
      if (firebaseReady && auth && auth.currentUser) {
        await auth.currentUser.sendEmailVerification();
        this.showSuccess('Verification email sent! Check your inbox.');
      }
    } catch (err) {
      this.showError('Could not resend. Please wait a moment and try again.');
    }

    btn.disabled = false;
    btn.textContent = 'Resend Verification Email';
  },

  // ==================== GOOGLE SIGN-IN ====================
  async signInWithGoogle() {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      await auth.signInWithPopup(provider);
    } catch (err) {
      if (err.code === 'auth/popup-blocked') {
        this.showError('Popup blocked. Please allow popups for this site.');
      } else if (err.code !== 'auth/cancelled-popup-request' && err.code !== 'auth/popup-closed-by-user') {
        this.showError('Sign-in failed. Please try again.');
      }
    }
  },

  // ==================== GUEST MODE ====================
  bindGuestMode() {
    document.getElementById('guest-signin')?.addEventListener('click', () => {
      this.signInAsGuest('Player');
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
    if (firebaseReady && auth) {
      try { await auth.signOut(); } catch (e) { console.error(e); }
    } else {
      localStorage.removeItem('pc_guest_name');
      this.currentUser = null;
      this.onSignOut();
    }
  },

  // ==================== UI UPDATES ====================
  onSignIn(user) {
    const nameEl = document.getElementById('user-name');
    const avatarEl = document.getElementById('user-avatar');
    const welcomeEl = document.getElementById('welcome-user-name');
    if (nameEl) nameEl.textContent = user.displayName || 'Player';
    if (welcomeEl) welcomeEl.textContent = user.displayName || 'Player';
    if (avatarEl) {
      avatarEl.src = user.photoURL || "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'%3E%3Ccircle cx='20' cy='20' r='20' fill='%234f46e5'/%3E%3Ctext x='20' y='25' text-anchor='middle' fill='white' font-size='16'%3E" + (user.displayName || 'U').charAt(0).toUpperCase() + "%3C/text%3E%3C/svg%3E";
      avatarEl.alt = user.displayName || 'User';
    }

    document.getElementById('auth-screen').classList.add('hidden');
    document.getElementById('main-app').classList.remove('hidden');

    if (typeof App !== 'undefined') App.onUserReady(user);
  },

  onSignOut() {
    document.getElementById('auth-screen').classList.remove('hidden');
    document.getElementById('main-app').classList.add('hidden');
    // Reset forms
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

  getErrorMessage(code) {
    const messages = {
      'auth/user-not-found': 'No account found with this email. Sign up first.',
      'auth/wrong-password': 'Incorrect password. Please try again.',
      'auth/email-already-in-use': 'An account with this email already exists. Try logging in.',
      'auth/weak-password': 'Password is too weak. Use at least 6 characters.',
      'auth/invalid-email': 'Please enter a valid email address.',
      'auth/too-many-requests': 'Too many attempts. Please wait a moment and try again.',
      'auth/network-request-failed': 'Network error. Check your internet connection.',
      'auth/invalid-credential': 'Invalid email or password. Please try again.',
    };
    return messages[code] || 'Something went wrong. Please try again.';
  },
};
