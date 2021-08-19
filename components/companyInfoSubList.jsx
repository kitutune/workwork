export const CompanyInfoSubList = (props) => {
  return (
    <>
      <div className="mb-4　">
        <div className="text-center">
          <label className="block mb-2 text-sm　 font-bold text-gray-700">
            最寄駅
          </label>
          <div
            className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            id="station"
            type="station"
          >
            {props.companySubInfo.nearest_station}
          </div>
        </div>
      </div>
      {/* 　項目ここまで */} {/* 　項目ここから */}
      <div className="mb-4　">
        <div className="text-center">
          <label className="block mb-2 text-sm　 font-bold text-gray-700">
            アクセス
          </label>
          <div
            className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            id="access"
            type="accses"
          >
            {props.companySubInfo.access}
          </div>
        </div>
      </div>
      {/* 　項目ここまで */} {/* 　項目ここから */}
      <div className="mb-4　">
        <div className="text-center">
          <label className="block mb-2 text-sm　 font-bold text-gray-700">
            WORK
          </label>
          <div
            className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            id="address"
            type="address"
          >
            {props.companySubInfo.work}
          </div>
        </div>
      </div>
      {/* 　項目ここまで */} {/* 　項目ここから */}
      <div className="mb-4　">
        <div className="text-center">
          <label className="block mb-2 text-sm　 font-bold text-gray-700">
            駐輪場
          </label>
          <div
            className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            id="address"
            type="address"
          >
            {props.companySubInfo.parking_area_for_bicycles}
          </div>
        </div>
      </div>
      {/* 　項目ここまで */} {/* 　項目ここから */}
      <div className="mb-4　">
        <div className="text-center">
          <label className="block mb-2 text-sm　 font-bold text-gray-700">
            バイク置き場
          </label>
          <div
            className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            id="address"
            type="address"
          >
            {props.companySubInfo.motorcycle_parking}
          </div>
        </div>
      </div>
      {/* 　項目ここまで */} {/* 　項目ここから */}
      <div className="mb-4　">
        <div className="text-center">
          <label className="block mb-2 text-sm　 font-bold text-gray-700">
            駐車場
          </label>
          <div
            className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            id="address"
            type="address"
          >
            {props.companySubInfo.parking}
          </div>
        </div>
      </div>
      {/* 　項目ここまで */} {/* 　項目ここから */}
      <div className="mb-4　">
        <div className="text-center">
          <label className="block mb-2 text-sm　 font-bold text-gray-700">
            備考欄
          </label>
          <div
            className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            id="address"
            type="address"
          >
            {props.companySubInfo.remarks}
          </div>
        </div>
      </div>
    </>
  );
};
