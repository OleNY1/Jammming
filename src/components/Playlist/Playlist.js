import React from 'react';
import TrackList from '../TrackList/TrackList';

function Playlist({playlistName, playlistTracks, onRemove, onNameChange}) {
    const handleNameChange = (event) => {
        onNameChange(event.target.value);
    }

  return (
    <div>
        <input type="text" value={playlistName} onChange={handleNameChange} placeholder="Enter playlist name"/>
      
      <TrackList tracks={playlistTracks} onRemove={onRemove} isRemoval={true}/>
      <button>Save to Spotify</button>
    </div>
  );
}

export default Playlist;
