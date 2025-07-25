import React from 'react';
import Track from '../Track/Track';

function TrackList({tracks = []}) {
  return (
    <div className='TrackList'>
      {tracks.map(track => (
        <Track
            key={track.id}
            name={track.name}
            artist={track.artist}
            album={track.album}
        />
      ))}
    </div>
  );
}

export default TrackList;
