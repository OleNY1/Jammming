import React from 'react';
import TrackList from '../TrackList/TrackList';

function Playlist({playlistName, playlistTracks, onRemove, onNameChange, onSave}) {
    const handleNameChange = (event) => {
        onNameChange(event.target.value);
    }

  return (
    <div>
        <input type="text" value={playlistName} onChange={handleNameChange} placeholder="Enter playlist name"/>
      
      <TrackList tracks={playlistTracks} onRemove={onRemove} isRemoval={true}/>
      <button onClick={onSave}>Save to Spotify</button>
    </div>
  );
}

export default Playlist;
