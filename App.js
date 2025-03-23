import { useState } from 'react';
import './App.css';

function App() {
  const[keyword, setKeyword] = useState("");
  const[isLoading, setIsloading] = useState(false);
  const[tracks, setTracks] = useState([]);

const getTracks = async () => {
  setIsloading(true)
 let data = await fetch(
`https://v1.nocodeapi.com/kaveri01/spotify/eCZyPwzAvXWnQsLt/search?q=${keyword === "" ? "trending" : keyword}&type=track`
);
 let convertedData = await data.json();
 setTracks(convertedData.tracks.items);
 setIsloading(false);
};

  return (
  <>
  <nav className="navbar navbar-dark navbar-expand-lg bg-dark">
  <div className="container-fluid">
    <a className="navbar-brand" href="/">
      Spotify
    </a>
    
    <div className="collapse navbar-collapse deflex justify-content-center" 
    id="navbarSupportedContent">
      
        <input
        value={keyword}
        onChange={(event) => setKeyword(event.target.value)}
          className="form-control me-2 w-75"
          type="search"
          placeholder="Search"
          aria-label="Search"
        />
        <button onClick={getTracks} className="btn btn-outline-success">
          Search
        </button>
    </div>
  </div>
</nav>

<div className='container'>
  <div className={'row ${isLoading ? "" : "d-none"}'}>
    <div className='col-12 py-5 text-center'>

    <div className="spinner-border"
  style={{ width: "3rem", height: "3rem" }}
  role="status">
  <span className="visually-hidden">Loading...</span>
    </div>
  </div>
  </div>

  <div className={'row ${keyword === "" ? "" : "d-none"}'}>
    <div className='col-12 py-5 text-center'>
    <h1>Spotify</h1>
    </div>
  </div>

  <div className='row'>
  {tracks.map((element) => {
      return (
      <div key={element.album.id} className='col-lg-3 col-md-6 py-2'>
        
  <div className="card">
  <img 
  src={element.album.images[0].url}  
  className="card-img-top" 
  alt="..." />
  <div className="card-body">
    <h5 className="card-title">{element.name}</h5>
    <p className="card-text">
      Artist: {element.album.artists[0].name}
    </p>
    <p className="card-text">
    Release date: {element.album.release_date}
    </p>
   <audio src={element.preview_url} controls className='w-100'>
   </audio>

    </div>
  </div>  
  </div>
      );
    })}
  </div>
</div>
  </>
)
}
export default App;
