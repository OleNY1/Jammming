const clientId = 'ef1835cd1fb84e3294f0f08b8c6b1c72';
const redirectUri = 'http://127.0.0.1:3000';
const tokenEndpoint = 'https://accounts.spotify.com/api/token';

// PKCE helper functions
const generateRandomString = (length) => {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const values = crypto.getRandomValues(new Uint8Array(length));
  return values.reduce((acc, x) => acc + possible[x % possible.length], '');
};

const sha256 = async (plain) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  return await crypto.subtle.digest('SHA-256', data);
};

const base64encode = (input) => {
  return btoa(String.fromCharCode(...new Uint8Array(input)))
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
};

const SpotifyAuth = {
  async login() {
    const codeVerifier = generateRandomString(64);
    const hashed = await sha256(codeVerifier);
    const codeChallenge = base64encode(hashed);

    localStorage.setItem('code_verifier', codeVerifier);

    const scope = [
      'playlist-modify-public',
      'playlist-modify-private',
      'user-read-private',
      'user-read-email'
    ].join(' ');

    const params = new URLSearchParams({
      response_type: 'code',
      client_id: clientId,
      scope: scope,
      redirect_uri: redirectUri,
      code_challenge_method: 'S256',
      code_challenge: codeChallenge,
    });

    window.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
  },

  async handleRedirect() {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');

    if (!code) {
      console.error('Missing `code` from redirect URL.');
      return null;
    }

    const codeVerifier = localStorage.getItem('code_verifier');
    if (!codeVerifier) {
      console.error('Missing `code_verifier` in localStorage.');
      return null;
    }

    const body = new URLSearchParams({
      client_id: clientId,
      grant_type: 'authorization_code',
      code,
      redirect_uri: redirectUri,
      code_verifier: codeVerifier,
    });

    const response = await fetch(tokenEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body,
    });

    const data = await response.json();

    if (response.status !== 200) {
      console.error('Token exchange failed:', data);
      return null;
    }

    const expirationTime = Date.now() + data.expires_in * 1000;
    localStorage.setItem('access_token', data.access_token);
    localStorage.setItem('token_expiration', expirationTime.toString());

    // Clean URL
    window.history.replaceState({}, document.title, '/');

    return data.access_token;
  },

  getAccessToken() {
    const token = localStorage.getItem('access_token');
    const expiration = localStorage.getItem('token_expiration');

    if (!token || !expiration || Date.now() > Number(expiration)) {
      return null;
    }

    return token;
  },

  async searchTracks(term) {
    const token = this.getAccessToken();

    if (!token) {
      console.warn("No valid token. Aborting search.");
      return [];
    }

    const response = await fetch(
      `https://api.spotify.com/v1/search?type=track&q=${encodeURIComponent(term)}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      console.error('Spotify API error:', await response.json());
      return [];
    }

    const json = await response.json();
    if (!json.tracks) return [];

    return json.tracks.items.map(track => ({
      id: track.id,
      name: track.name,
      artist: track.artists[0].name,
      album: track.album.name,
      uri: track.uri
    }));
  }
};

export default SpotifyAuth;
