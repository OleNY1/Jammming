import React from 'react';
import Track from '../Track/Track';

function TrackList({tracks, onAdd, isRemoval, onRemove}) {
  return (
    <div className='TrackList'>
      {tracks.map(track => (
        <Track
            key={track.id}
            name={track.name}
            artist={track.artist}
            album={track.album}
            onAdd={onAdd}
            track={track}
            isRemoval={isRemoval}
            onRemove={onRemove}
        />
      ))}
    </div>
  );
}

export default TrackList;
