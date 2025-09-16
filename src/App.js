import { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import './App.css';
import Modal from './components/modal';
import { getCurrentPosition } from './services/api';

const App = () => {
  const mapRef = useRef();
  const mapContainerRef = useRef();

  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      center: [-52.0986, -32.0332], // starting position [lng, lat]
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      zoom: 12
    });

    // getCurrentPosition().then(data => {
    //   if(data && data.location) {
    //     console.log(data)
    //     const userCoords = [data.location.lng, data.location.lat];       
    //     new mapboxgl.Marker({ color: "blue" })
    //     .setLngLat(userCoords)
    //     .setPopup(new mapboxgl.Popup().setText("Você está aqui"))
    //     .addTo(mapRef.current);
    //     mapRef.current.setCenter(userCoords);
    //   }
    // });

    

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

  const calcularRota = async () => {
  if (destinations.length < 2) {
    console.error("Precisa de pelo menos 2 destinos");
    return;
  }

  // Cria a string de coordenadas pro Mapbox
  const coordsStr = destinations
    .map(dest => `${dest.coords[0]},${dest.coords[1]}`)
    .join(';');

  try {
    const response = await fetch(
      `https://api.mapbox.com/optimized-trips/v1/mapbox/driving/${coordsStr}?geometries=geojson&overview=full&access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`
    );
    const data = await response.json();

    // Checa se veio alguma rota
    if (!data.trips || data.trips.length === 0) {
      console.error("Não foi possível calcular a rota otimizada", data);
      return;
    }

    const route = data.trips[0].geometry;

    // Adiciona ou atualiza a rota no mapa
    if (mapRef.current.getSource("rota")) {
      mapRef.current.getSource("rota").setData(route);
    } else {
      mapRef.current.addSource("rota", {
        type: "geojson",
        data: route,
      });
      mapRef.current.addLayer({
        id: "rota",
        type: "line",
        source: "rota",
        layout: { "line-join": "round", "line-cap": "round" },
        paint: { "line-color": "#007cbf", "line-width": 5 },
      });
    }

    // Opcional: ordem dos destinos
    console.log("Ordem otimizada:", data.waypoints.map(wp => wp.name));
  } catch (err) {
    console.error("Erro ao chamar a Optimization API:", err);
  }
};

  return (
    <div className='relative w-full h-screen'>
      <div id='map-container' ref={mapContainerRef}/>
      <button 
        className="absolute top-4 right-4 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center" 
        type="button"
        onClick={() => calcularRota()}>
            Calcular
      </button>
      <Modal setDestinations={setDestinations}/>
    </div>
  );
}

export default App;
