import GoogleMapReact from 'google-map-react';
import { useEffect } from 'react';
import { useMapGeocode } from './useMapGeocode';

export const Map = (props) => {
  let address = props.address;

  const defaultLatLng = useMapGeocode(address);
  console.log('ここから下');
  //   console.log(lat);
  //   console.log(props.address);
  //   console.log(useMapGeocode(address));
  console.log(defaultLatLng);

  console.log('来ているか？');

  //   const defaultLatLng = {
  //     //     // lat: 35.7022589,
  //     //     // lng: 139.7744733,
  //     //     //     // lat: props.lat,
  //     //     //     // lng: props.lon,
  //     //     lat: lat,
  //     //     lng: lon,
  //   };
  useEffect(() => {
    return () => {};
  }, [defaultLatLng]);
  return (
    <div
      //   style={{ height: '300px', width: '300px' }}
      style={{ height: '620px', width: '1092px' }}
      className="container mx-auto"
    >
      {/* {defaultLatLng.lat && defaultLatLng.lon && ( */}
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY }}
        defaultCenter={defaultLatLng}
        // defaultCenter={base}
        defaultZoom={16}
      />
      {/* )} */}
    </div>
  );
};
