import React from 'react';
import TrackList from '../TrackList/TrackList';

function Playlist({playlistTracks}) {
  return (
    <div>
      <h2>Playlist Name</h2>
      <TrackList tracks={playlistTracks}/>
      <button>Save to Spotify</button>
    </div>
  );
}

export default Playlist;
