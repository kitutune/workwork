import React from 'react';
// eslint-disable-next-line react/display-name
export const CompanyInfoSubList = React.memo((props) => {
  const lists = [
    '最寄駅',
    'アクセス',
    'WORK',
    '駐輪場',
    'バイク置き場',
    '駐車場',
    '備考欄',
  ];
  const types = ['station', 'accses', 'text', 'text', 'text', 'text', 'text'];
  const infos = {
    最寄駅: props.companySubInfo.nearest_station,
    アクセス: props.companySubInfo.access,
    WORK: props.companySubInfo.capital_stock,
    駐輪場: props.companySubInfo.parking_area_for_bicycles,
    バイク置き場: props.companySubInfo.motorcycle_parking,
    駐車場: props.companySubInfo.parking,
    備考欄: props.companySubInfo.remarks,
  };
  return (
    <>
      {lists.map((list, i) => (
        <div key={[i]}>
          {!infos[list] ? (
            <></>
          ) : (
            <div className="mb-4" key={[i]}>
              <div className="text-center">
                <label className="block mb-2 text-sm　 font-bold text-gray-700">
                  {lists[i]}
                </label>
                <div
                  className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  type={types[i]}
                >
                  {infos[list]}
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </>
  );
});
