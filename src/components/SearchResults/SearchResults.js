import React from 'react';
import TrackList from '../TrackList/TrackList';

function SearchResults({searchResults, onAdd}) {
  return (
    <div className='searchResults'>
      {searchResults.length > 0 && <h2>Results</h2>}
      <TrackList tracks={searchResults} onAdd={onAdd} isRemoval={false}/>
    </div>
  );
}

export default SearchResults;
