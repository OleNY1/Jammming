import React from 'react';
import TrackList from '../TrackList/TrackList';

function Playlist({playlistName, playlistTracks}) {
  return (
    <div>
      <h2>{playlistName}</h2>
      <TrackList tracks={playlistTracks}/>
      <button>Save to Spotify</button>
    </div>
  );
}

export default Playlist;
