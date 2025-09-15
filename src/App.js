import { useRef, useEffect, useState, use } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import './App.css';
import Modal from './components/modal';

const App = () => {
  const mapRef = useRef();
  const mapContainerRef = useRef();

  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1IjoiYi1zb2FyZXMiLCJhIjoiY21mNzZpcGp2MDltdTJtcHZqbTFranplZiJ9.JqkcsQODC_ZY1g5XJ0IN7A';
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      center: [-52.0986, -32.0332], // starting position [lng, lat]
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      zoom: 12
    });

    const errorLocation = () => {
      console.log("Não foi possível obter a localização.");
    }
  
    const successLocation = (position) => {
      const userCoords = [position.coords.longitude, position.coords.latitude];

      new mapboxgl.Marker({ color: "blue" })
      .setLngLat(userCoords)
      .setPopup(new mapboxgl.Popup().setText("Você está aqui"))
      .addTo(mapRef.current);

      mapRef.current.setCenter(userCoords);
    };

    // Pega sua localização atual
    navigator.geolocation.getCurrentPosition(successLocation, errorLocation);

    return () => {
      mapRef.current.remove();
    }
  }, []);

  useEffect(() => {
    // Adiciona marcadores dos endereços
    destinations.forEach(destino => {
      new mapboxgl.Marker({ color: "red" })
        .setLngLat(destino.coords)
        .setPopup(new mapboxgl.Popup().setText(destino.nome))
        .addTo(mapRef.current);
    });
  }, [destinations]);

  return (
    <div className='relative w-full h-screen'>
      <div id='map-container' ref={mapContainerRef}/>
      <Modal setDestinations={setDestinations}/>
    </div>
  );
}

export default App;
