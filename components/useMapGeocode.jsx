import axios from 'axios';
import { useEffect, useState } from 'react';
import { Map } from './map';

// axios.defaults.baseURL = 'http://localhost:3000';
// axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
// axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
// axios.defaults.withCredentials = true;

export const useMapGeocode = async (address) => {
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  console.log(lat);
  console.log(lon);
  console.log(address);
  // console.log('住所');
  console.log('この上２個');
  useEffect(() => {
    const mapData = async (address) => {
      // const response = await axios.get(`/api/yahooGeocode?address=${address}`);
      axios.get(`/api/yahooGeocode?address=${address}`).then((response) => {
        console.log(response.data.Feature[0].Geometry.Coordinates);
        const geo = response.data.Feature[0].Geometry.Coordinates.split(',');
        if (response) {
          const geo = response.data.Feature[0].Geometry.Coordinates.split(',');
          console.log(geo);
          console.log('ここ');
          console.log(geo[0]);
          setLat(geo[1]);
          setLon(geo[0]);
          // console.log(lat);
          // console.log(lon);
          // console.log('この上２個');
        }
      });
      // console.log(response.json);

      // return response.data;
    };
    return mapData(address);
  }, []);

  // axios.get(
  //   `/api/yahooGeocode?address=${address}`

  //   {
  //     withCredentials: true,
  //   }
  return;
  <div>
    <Map lat={lat} lon={lon} />
  </div>;
  // );

  // console.log(axios);
};
// useEffect(() => {
//   const getUser = async () => {
//     const response = await axios.get('https://api.github.com/users/tagty');
//     console.log(response.data)
//   }
//   getUser()
// }, [])
