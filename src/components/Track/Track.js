import React from 'react';

function Track({ name, artist, album, track, onAdd, isRemoval, onRemove }) {
  const handleAdd = () => onAdd(track);
  const handleRemove = () => onRemove(track);

  return (
    <div className="Track">
      <div className="Track-content">
        <div className="Track-info">
          <h4>{name}</h4>
          <p>{artist} | {album}</p>
        </div>
        <div className="Track-action">
          {!isRemoval && <button onClick={handleAdd}>+</button>}
          {isRemoval && <button onClick={handleRemove}>-</button>}
        </div>
      </div>
    </div>
  );
}

export default Track;
