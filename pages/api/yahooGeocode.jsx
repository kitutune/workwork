import axios from 'axios';
export default async (req, res) => {
  const url = `https://map.yahooapis.jp/geocode/V1/geoCoder?appid=dj0zaiZpPUh0ak1Ra2FTM2FQaSZzPWNvbnN1bWVyc2VjcmV0Jng9NTc-&query=${encodeURIComponent(
    req.query.address
  )}&output=json`;
  console.log(url);
  console.log('URLここ');
  return await axios
    .get(url)
    .then((response) => {
      console.log(response.data.Feature[0].Geometry);
      console.log('dataのコンソ');
      //   console.log(response.data.json);
      console.log(response.data.Feature[0].Geometry);
      res.status(200).json(response.data);
    })
    .catch((e) => {
      res.status(400).json({});
      console.log('errorrrrrrrrr!!');
    });
};
