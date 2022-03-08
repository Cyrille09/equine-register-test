import React, { useState, useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import data from '../data/data';
import Loading from '../loading';
import accessToken from '../config/config';
mapboxgl.accessToken = accessToken;

interface MapboxProps {
  latitude: number | undefined;
  longitude: number | undefined;
  url: string;
  ueln?: string;
  dateFrom?: any;
  dateTo?: any;
}

function Mapbox({
  latitude,
  longitude,
  ueln,
  dateFrom,
  dateTo,
  url,
}: MapboxProps) {
  let mapContainerRef: any = useRef('');
  const [lng, setLng] = useState<any>(-3.436);
  const [lat, setLat] = useState<any>(55.3781);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLng(longitude || -3.436);
    setLat(latitude || 55.3781);

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: 5,
    });

    if (url === 'home') {
      new mapboxgl.Marker()
        .setLngLat([lng, lat])
        .setPopup(
          new mapboxgl.Popup({ offset: 30 }).setHTML(
            `<span> longitude: ${lng} </span> latitude: ${lat}`
          )
        )
        .addTo(map);
      setLoading(true);
    } else if (url === 'search') {
      data.forEach((location) => {
        location.equines.forEach((record: any) => {
          if (
            record.ueln === ueln &&
            record.date_from >= dateFrom &&
            record.date_from <= dateTo
          ) {
            new mapboxgl.Marker()
              .setLngLat([record.location.long, record.location.lat])
              .setPopup(
                new mapboxgl.Popup({ offset: 30 }).setHTML(
                  `<span> City: ${record.location.city} </span> <br/> <span>County: ${record.location.county}</span>`
                )
              )
              .addTo(map);
            setLoading(true);
          } else {
            setLoading(true);
          }
        });
      });
    }
  }, [latitude, longitude, lat, lng, url, ueln, dateFrom, dateTo]);

  return (
    <div>
      {loading ? null : <Loading />}
      <div style={{ width: '100%', height: '80vh' }} ref={mapContainerRef} />
    </div>
  );
}

export default Mapbox;
