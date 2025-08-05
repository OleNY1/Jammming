import React, { useEffect, useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import SpotifyAuth from '../../util/SpotifyAuth'; // ✅ New auth file

function App() {
  const [accessToken, setAccessToken] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  const [playlistTracks, setPlaylistTracks] = useState([]);

  const [playlistName, setPlaylistName] = useState('');

  const search = (term) => {
    SpotifyAuth.searchTracks(term)
      .then(results => {
        setSearchResults(results);
      })
      .catch(err => {
        console.error("Search error:", err);
      });
  };



  useEffect(() => {
    const token = SpotifyAuth.getAccessToken();
    const code = new URLSearchParams(window.location.search).get('code');
  
    const hasVerifier = localStorage.getItem('code_verifier');
  
    if (token) {
      setAccessToken(token);
    } else if (code && hasVerifier) {
      SpotifyAuth.handleRedirect().then(newToken => {
        if (newToken) setAccessToken(newToken);
      });
    } else {
      SpotifyAuth.login(); // Always run login first
    }
  }, []);
  
  
  

  const addTrack = (track) => {
    if (playlistTracks.find(savedTrack => savedTrack.id === track.id)) return;
    setPlaylistTracks(prev => [...prev, track]);
  };

  const removeTrack = (track) => {
    setPlaylistTracks(prev => prev.filter(savedTrack => savedTrack.id !== track.id));
  };

  const savePlaylist = () => {
    const uris = playlistTracks.map(track => track.uri);
  
    if (!playlistName || uris.length === 0) {
      alert("Playlist name or tracks missing.");
      return;
    }
  
    SpotifyAuth.savePlaylist(playlistName, uris)
      .then(() => {
        setPlaylistName('');
        setPlaylistTracks([]);
      });
  };  

  return (
    <div className="container">
      <h1>Jammming</h1>
      {!accessToken ? (
        <p>Loading Spotify access...</p>
      ) : (
        <>
          <SearchBar onSearch={search} />
          
          <div className="App-playlist">
            <SearchResults searchResults={searchResults} onAdd={addTrack} />
            <Playlist
              playlistName={playlistName}
              playlistTracks={playlistTracks}
              onRemove={removeTrack}
              onNameChange={setPlaylistName}
              onSave={savePlaylist}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default App;

//copypaste it to the devtools
// localStorage.clear();
//window.location.href = 'http://127.0.0.1:3000';
