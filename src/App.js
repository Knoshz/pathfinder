import { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import './App.css';
import Modal from './components/modal';

const App = () => {
  const mapRef = useRef();
  const mapContainerRef = useRef();

  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1IjoiYi1zb2FyZXMiLCJhIjoiY21mNzZpcGp2MDltdTJtcHZqbTFranplZiJ9.JqkcsQODC_ZY1g5XJ0IN7A';
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      center: [-52.0986, -32.0332], // starting position [lng, lat]
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      zoom: 12
    });

    return () => {
      mapRef.current.remove();
    }
  }, []);

  return (
    <div className='relative w-full h-screen'>
      <div id='map-container' ref={mapContainerRef}/>
      <Modal />
    </div>
  );
}

export default App;
