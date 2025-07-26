import React from 'react';

function Track({name, artist, album}) {
  return (
    <div className='Track'>
      <h4>{name}</h4>
      <p>{artist} | {album}</p>
    </div>
  );
}

export default Track;
