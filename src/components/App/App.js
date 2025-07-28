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
  
  const [playlistTracks, setPlaylistTracks] = useState([
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

  const [playlistName, setPlaylistName] = useState('');

  const addTrack = (track) => {
    if (playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }
    setPlaylistTracks(prev => [...prev, track]);
  }

  const removeTrack = (track) => {
    setPlaylistTracks(prevTracks => prevTracks.filter(savedTrack => savedTrack.id !== track.id));
  };

  return (
    <div>
      <h1>Jammming</h1>
      <SearchBar />
      <div className="App-playlist">
        <SearchResults searchResults={searchResults} onAdd={addTrack}/>
        <Playlist playlistName={playlistName} playlistTracks={playlistTracks} onRemove={removeTrack} onNameChange={setPlaylistName}/>
      </div>
    </div>
  );
}

export default App;

//A question: is this ok that after i add songs in my playlist they are shown in the playlist with the + button and when i press it i get an error "Uncaught runtime errors"