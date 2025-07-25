import React from 'react';

function Track({name, artist, album}) {
  return (
    <div className='Track'>
      <h3>{name}</h3>
      <p>{artist} | {album}</p>
    </div>
  );
}

export default Track;
