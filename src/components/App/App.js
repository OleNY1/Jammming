import React, {useState} from 'react';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

//It is a React functional component
//A React component is just a JavaScript function that returns JSX (UI)
function App() {
  //hard-coded track data
  const [searchResults] = useState([
    {
      name: 'Summertime Sadness',
      artist: 'Lana Del Rey',
      album: 'Summertime Sadness',
      id: 1
    },
    {
      name: 'Cherry',
      artist: 'Lana Del Rey',
      album: 'Lust for Life',
      id: 2
    },
    {
      name: 'Born to Die',
      artist: 'Lana Del Rey',
      album: 'Born to Die',
      id: 3
    }
  ]);
  
  const [playlistTracks] = useState([
    {
      name: 'Love',
      artist: 'Lana Del Rey',
      album: 'Lust for Life',
      id: 4
    },
    {
      name: 'Young and Beautiful',
      artist: 'Lana Del Rey',
      album: 'The Great Gatsby',
      id: 5
    }
  ]);

  const [playlistName, setPlaylistName] = useState('My Playlist');

  return (
    <div>
      <h1>Jammming</h1>
      <SearchBar />
      <div className="App-playlist">
        <SearchResults searchResults={searchResults}/>
        <Playlist playlistName={playlistName} playlistTracks={playlistTracks}/>
      </div>
    </div>
  );
}

export default App;
