import GoogleMapReact from 'google-map-react';

export const Map = (props) => {
  const defaultLatLng = {
    // lat: 35.7022589,
    // lng: 139.7744733,
    lat: props.lat,
    lng: props.lon,
  };

  return (
    <div
      //   style={{ height: '300px', width: '300px' }}
      style={{ height: '620px', width: '1092px' }}
      className="container mx-auto"
    >
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY }}
        defaultCenter={defaultLatLng}
        defaultZoom={16}
      />
    </div>
  );
};
