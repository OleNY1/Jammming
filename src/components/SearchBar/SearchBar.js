import React, { useState } from 'react';

function SearchBar({ onSearch }) {
    const [term, setTerm] = useState('');
  
    const handleSearch = () => {
      if (term.trim() !== '') {
        onSearch(term);
      }
    };
  
    return (
      <div>
        <input
          type="text"
          placeholder="Enter a song, album, or artist"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
    );
  }
  
  export default SearchBar;
