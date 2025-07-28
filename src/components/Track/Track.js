import React from 'react';

function Track({name, artist, album, track, onAdd, isRemoval}) {
    const handleAdd = () => {
        onAdd(track);
    }

  return (
    <div className='Track'>
      <h4>{name}</h4>
      <p>{artist} | {album}</p>
      {!isRemoval && <button onClick={handleAdd}>+</button>}
    </div>
  );
}

export default Track;
