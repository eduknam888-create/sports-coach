/**
 * Authentication Module
 * Handles Google Sign-In when Firebase is configured,
 * or local-only mode with a "Continue as Guest" button.
 */
const Auth = {
  currentUser: null,

  init() {
    if (firebaseReady && auth) {
      // Firebase mode: listen for auth state
      auth.onAuthStateChanged(user => {
        this.currentUser = user;
        if (user) {
          this.onSignIn(user);
        } else {
          this.onSignOut();
        }
      });

      const signinBtn = document.getElementById('google-signin');
      if (signinBtn) signinBtn.addEventListener('click', () => this.signInWithGoogle());
    } else {
      // Local mode: show guest button, hide Google sign-in
      const signinBtn = document.getElementById('google-signin');
      if (signinBtn) signinBtn.style.display = 'none';

      const guestBtn = document.getElementById('guest-signin');
      if (guestBtn) {
        guestBtn.addEventListener('click', () => this.signInAsGuest());
      }

      // Auto-restore local session
      const savedName = localStorage.getItem('pc_guest_name');
      if (savedName) {
        this.signInAsGuest(savedName);
      }
    }

    const signoutBtn = document.getElementById('signout-btn');
    if (signoutBtn) signoutBtn.addEventListener('click', () => this.signOut());
  },

  async signInWithGoogle() {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      await auth.signInWithPopup(provider);
    } catch (err) {
      console.error('Sign-in error:', err);
      if (err.code === 'auth/popup-blocked') {
        App.toast('Popup blocked. Please allow popups for this site.', 'error');
      } else if (err.code !== 'auth/cancelled-popup-request' && err.code !== 'auth/popup-closed-by-user') {
        App.toast('Sign-in failed. Please try again.', 'error');
      }
    }
  },

  signInAsGuest(name) {
    const displayName = name || 'Player';
    localStorage.setItem('pc_guest_name', displayName);
    this.currentUser = { uid: 'local_user', displayName, photoURL: '' };
    this.onSignIn(this.currentUser);
  },

  async signOut() {
    if (firebaseReady && auth) {
      try { await auth.signOut(); } catch (e) { console.error(e); }
    } else {
      localStorage.removeItem('pc_guest_name');
      this.currentUser = null;
      this.onSignOut();
    }
  },

  onSignIn(user) {
    const nameEl = document.getElementById('user-name');
    const avatarEl = document.getElementById('user-avatar');
    const welcomeEl = document.getElementById('welcome-user-name');
    if (nameEl) nameEl.textContent = user.displayName || 'Player';
    if (welcomeEl) welcomeEl.textContent = user.displayName || 'Player';
    if (avatarEl) {
      avatarEl.src = user.photoURL || "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'%3E%3Ccircle cx='20' cy='20' r='20' fill='%234f46e5'/%3E%3Ctext x='20' y='25' text-anchor='middle' fill='white' font-size='16'%3EU%3C/text%3E%3C/svg%3E";
      avatarEl.alt = user.displayName || 'User';
    }

    document.getElementById('auth-screen').classList.add('hidden');
    document.getElementById('main-app').classList.remove('hidden');

    if (typeof App !== 'undefined') App.onUserReady(user);
  },

  onSignOut() {
    document.getElementById('auth-screen').classList.remove('hidden');
    document.getElementById('main-app').classList.add('hidden');
  },

  getUid() {
    return this.currentUser ? this.currentUser.uid : null;
  },
};
