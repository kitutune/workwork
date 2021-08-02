import axios from 'axios';
import GoogleMapReact from 'google-map-react';
import { useCallback, useEffect, useState } from 'react';
// import { useMapGeocode } from './useMapGeocode';

// const useMapGeocode = (props) => {
//     const [lat, setLat] = useState(null);
//     const [lon, setLon] = useState(null);
//     return useCallback(() => {
//       // console.log(lat);
//       // console.log(lon);
//       // console.log(address);
//       // // console.log('住所');
//       // console.log('この上２個');
//       useEffect(() => {
//         // const response = await axios.get(`/api/yahooGeocode?address=${address}`);
//         console.log(props);
//         console.log('ここまで来れている？');

//         if (address) {
//           axios
//             .get(`/api/yahooGeocode?address=${props.address}`)
//             .then((response) => {
//               console.log(response.data.Feature[0].Geometry.Coordinates);

//               // const geo = response.data.Feature[0].Geometry.Coordinates.split(',');
//               if (response) {
//                 const geo =
//                   response.data.Feature[0].Geometry.Coordinates.split(',');
//                 // console.log(geo);
//                 // console.log('ここ');
//                 // console.log(geo[0]);
//                 if (geo[0] && geo[1]) {
//                   setLat(geo[1]);
//                   setLon(geo[0]);
//                 }
//                 // console.log(lat);
//                 // console.log(lon);
//                 // console.log('この上２個');
//               }
//             });
//         }

//         return;
//       }, []);
//       console.log({ lat, lon });
//       console.log('手前の奴です');

//       return { lat: Number(lat), lng: Number(lon) };
//     }, [lat, lon])();
//   };

export const Map = (props) => {
  const address = props.address;
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  //   const [defaultLatLng, setDefaultLatLng] = useState({});

  //   const getPoint = () => {
  // if (address) {
  console.log(address);
  console.log('アドレスすすすすすすすすすすすすすすすすすすすすすう');
  axios.get(`/api/yahooGeocode?address=${props.address}`).then((response) => {
    console.log(response.data.Feature[0].Geometry.Coordinates);

    // const geo = response.data.Feature[0].Geometry.Coordinates.split(',');
    if (response) {
      const geo = response.data.Feature[0].Geometry.Coordinates.split(',');
      // console.log(geo);
      // console.log('ここ');
      // console.log(geo[0]);
      if (geo[0] && geo[1]) {
        setLat(geo[1]);
        setLon(geo[0]);
      }
      // console.log(lat);
      // console.log(lon);
      // console.log('この上２個');
    }
  });

  //   if (lat && lon) {
  //   const defaultLatLng = useMapGeocode(address);
  console.log('ここから下');
  //   console.log(lat);
  //   console.log(props.address);
  //   console.log(useMapGeocode(address));

  const defaultLatLng = {
    lat: 35.7022589,
    lng: 139.7744733,
    //     //     //     // lat: props.lat,
    //     //     //     // lng: props.lon,
    //   lat: lat,
    //   lng: lon,
  };
  // console.log(defaultLatLng);

  // console.log('来ているか？');

  //         console.log(defaultLatLng);

  //         console.log(
  //           '来ているか？来ているか？来ているか？来ているか？来ているか？来ているか？'
  //         );
  //         return setDefaultLatLng(defaultLatLng);
  //       }
  //     }
  //   };
  //   useEffect(() => {
  //     getPoint();
  //     return () => {
  //       setDefaultLatLng(defaultLatLng);
  //       console.log(defaultLatLng);
  //       console.log(
  //         'あああああああああああああああああああああああああああああああああああ'
  //       );
  //     };
  //   }, []);

  return (
    <div
      //   style={{ height: '300px', width: '300px' }}
      style={{ height: '620px', width: '1092px' }}
      className="container mx-auto"
    >
      {console.log(defaultLatLng)}
      {console.log('defaultLatLngdefaultLatLngdefaultLatLngdefaultLatLng')}
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
