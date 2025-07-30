import pkceChallenge from 'pkce-challenge';

const clientId = 'c480c4b58b12454e99aecee1f8e04a94';
const redirectUri = 'http://127.0.0.1:3000/';
const authEndpoint = 'https://accounts.spotify.com/authorize';
const tokenEndpoint = 'https://accounts.spotify.com/api/token';

let accessToken = '';
let codeVerifier = '';

const SpotifyAuth = {
  async login() {
    const { code_challenge, code_verifier } = pkceChallenge();
    codeVerifier = code_verifier;
    sessionStorage.setItem('code_verifier', code_verifier);

    const authUrl = `${authEndpoint}?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}&code_challenge_method=S256&code_challenge=${code_challenge}&scope=playlist-modify-public`;
    
    window.location = authUrl;
  },

  async handleRedirect() {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    const storedVerifier = sessionStorage.getItem('code_verifier');

    if (!code || !storedVerifier) return null;

    const body = new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: redirectUri,
      client_id: clientId,
      code_verifier: storedVerifier,
    });

    const response = await fetch(tokenEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body
    });

    const data = await response.json();
    accessToken = data.access_token;
    sessionStorage.setItem('access_token', accessToken);
    window.history.replaceState({}, document.title, '/'); // Clean up URL
    return accessToken;
  },

  getAccessToken() {
    return accessToken || sessionStorage.getItem('access_token');
  }
};

export default SpotifyAuth;