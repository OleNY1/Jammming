import React from 'react';

function Track({name, artist, album, track, onAdd, isRemoval, onRemove}) {
    const handleAdd = () => {
        onAdd(track);
    }

    const handleRemove = () => {
        onRemove(track);
    }

  return (
    <div className='Track'>
      <h4>{name}</h4>
      <p>{artist} | {album}</p>
      {!isRemoval && <button onClick={handleAdd}>+</button>}
      {isRemoval && <button onClick={handleRemove}>-</button>}
    </div>
  );
}

export default Track;
