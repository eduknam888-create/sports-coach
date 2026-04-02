/**
 * API Client - Handles all communication with the backend server
 */
const API = {
  baseUrl: '/api',
  token: null,
  refreshToken: null,
  user: null,

  init() {
    const saved = sessionStorage.getItem('pc_auth');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        this.token = data.accessToken;
        this.refreshToken = data.refreshToken;
        this.user = data.user;
      } catch (e) { /* ignore */ }
    }
  },

  saveAuth(data) {
    this.token = data.accessToken;
    this.refreshToken = data.refreshToken;
    this.user = data.user;
    sessionStorage.setItem('pc_auth', JSON.stringify(data));
  },

  clearAuth() {
    this.token = null;
    this.refreshToken = null;
    this.user = null;
    sessionStorage.removeItem('pc_auth');
  },

  isLoggedIn() {
    return !!this.token;
  },

  async request(method, path, body = null) {
    const opts = {
      method,
      headers: {},
    };
    if (this.token) opts.headers['Authorization'] = `Bearer ${this.token}`;
    if (body && !(body instanceof FormData)) {
      opts.headers['Content-Type'] = 'application/json';
      opts.body = JSON.stringify(body);
    } else if (body instanceof FormData) {
      opts.body = body;
    }

    let res = await fetch(`${this.baseUrl}${path}`, opts);

    // If 401 and we have a refresh token, try to refresh
    if (res.status === 401 && this.refreshToken) {
      const refreshed = await this.tryRefresh();
      if (refreshed) {
        opts.headers['Authorization'] = `Bearer ${this.token}`;
        res = await fetch(`${this.baseUrl}${path}`, opts);
      }
    }

    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: res.statusText }));
      throw { status: res.status, ...err };
    }
    return res.json();
  },

  async tryRefresh() {
    try {
      const res = await fetch(`${this.baseUrl}/auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken: this.refreshToken }),
      });
      if (!res.ok) { this.clearAuth(); return false; }
      const data = await res.json();
      this.token = data.accessToken;
      this.refreshToken = data.refreshToken;
      const saved = JSON.parse(sessionStorage.getItem('pc_auth') || '{}');
      saved.accessToken = data.accessToken;
      saved.refreshToken = data.refreshToken;
      sessionStorage.setItem('pc_auth', JSON.stringify(saved));
      return true;
    } catch (e) {
      this.clearAuth();
      return false;
    }
  },

  get(path) { return this.request('GET', path); },
  put(path, body) { return this.request('PUT', path, body); },
  post(path, body) { return this.request('POST', path, body); },
};

API.init();
