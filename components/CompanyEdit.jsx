import Image from 'next/image';
import { useCallback, useRef, useState } from 'react';
import { supabase } from 'utils/supabaseClient';
// import { Auth, Button } from '@supabase/ui';
export const CompanyEdit = (props) => {
  // // ここから

  const [company, setCompany] = useState({});
  const companyName = useRef(null);
  const companyUrl = useRef(null);
  const companyAddress = useRef(null);
  const companyPhone = useRef(null);
  const companyCapital = useRef(null);
  const companyEmployees = useRef(null);
  const companyDate = useRef(null);
  const companyMap = useRef(null);
  const nearestStation = useRef(null);
  const access = useRef(null);
  const typicalApp = useRef(null);
  const bicycleParking = useRef(null);
  const bikeStorage = useRef(null);
  const carParking = useRef(null);
  const comment = useRef(null);
  const publicClassification = useRef(null);

  // useEffect(() => {
  //   supabase
  //     .from('企業情報')
  //     .select('*')
  //     .then((DB) => {
  //       setProf(DB.data[0]);
  //     });
  // }, [user]);
  // uuid={user.id}
  // // console.log(user);
  const companyInfo = useCallback(async () => {
    if (companyName.current.value == '') {
      alert('名前を入力してください!');
      return;
    }

    const { data, error } = await supabase.from('企業情報').insert(
      [
        {
          // id: uuid,
          会社名: companyName.current.value,
          URL: companyUrl.current.value,
          電話番号: companyPhone.current.value,
          住所: companyAddress.current.value,
          地図: companyMap.current.value,
          資本金: companyCapital.current.value,
          社員数: companyEmployees.current.value,
          設立日: companyDate.current.value,
        },
      ],
      { upsert: true }
    );
    alert('登録完了');
    // alert(uuid);
    alert(companyName.current.value);
    alert(companyUrl.current.value);
    alert(companyPhone.current.value);
    alert(companyAddress.current.value);
    alert(companyMap.current.value);
    alert(companyCapital.current.value);
    alert(companyEmployees.current.value);
    alert(companyDate.current.value);
  }, [
    companyName,
    companyUrl,
    companyPhone,
    companyAddress,
    companyMap,
    companyCapital,
    companyEmployees,
    companyDate,
  ]);
  // ここから企業情報補助

  const companyInfosub = useCallback(
    async (uuid) => {
      if (companyName.current.value == '') {
        alert('名前を入力してください!');
        return;
      }

      const { data, error } = await supabase.from('企業情報補助').insert(
        [
          {
            id: uuid,
            最寄駅: nearestStation.current.value,
            アクセス: access.current.value,
            代表的なアプリ名: typicalApp.current.value,
            駐輪場: bicycleParking.current.value,
            バイク置き場: bikeStorage.current.value,
            駐車場: carParking.current.value,
            // 社員数: companyEmployees.current.value,
            // 設立日: companyDate.current.value,
          },
        ],
        { upsert: true }
      );
      alert('登録完了');
      alert(uuid);
      alert(nearestStation.current.value);
      alert(access.current.value);
      alert(typicalApp.current.value);
      alert(bicycleParking.current.value);
      alert(bikeStorage.current.value);
      alert(carParking.current.value);
      // alert(companyEmployees.current.value);
      // alert(companyDate.current.value);
    },
    [
      nearestStation,
      access,
      typicalApp,
      bicycleParking,
      bikeStorage,
      carParking,
      // companyEmployees,
      // companyDate,
    ]
  );
  // ここまで企業情報補助
  // ここから企業コメント
  const companyComment = useCallback(
    async (uuid) => {
      if (companyName.current.value == '') {
        alert('名前を入力してください!');
        return;
      }

      const { data, error } = await supabase.from('企業コメント').insert(
        [
          {
            id: uuid,
            コメント: comment.current.value,
            公開区分: publicClassification.current.value,
          },
        ],
        { upsert: true }
      );
      alert('登録完了');
      alert(uuid);
      alert(comment.current.value);
      alert(publicClassification.current.value);
    },
    [comment, publicClassification]
  );
  // ここまで企業コメント

  // ここまで
  return (
    <div>
      {/* <!-- component --> */}
      <div
        className="relative min-h-screen flex items-center justify-center bg-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 bg-gray-500 bg-no-repeat bg-cover relative items-center"
        // style={{
        //   backgroundImage:
        //     'url(https://images.unsplash.com/photo-1532423622396-10a3f979251a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1500&q=80)',
        // }}

        // エラー文で返ってくる構文　style={{marginRight: spacing + 'em'}}
      >
        <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
        <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-lg z-10">
          <div className="grid  gap-8 grid-cols-1">
            <div className="flex flex-col ">
              <div className="flex flex-col 　sm:flex-row items-center">
                <h2 className="font-semibold text-lg mr-auto">企業情報</h2>
                <div className="w-full sm:w-auto sm:ml-auto mt-3 sm:mt-0"></div>
              </div>
              <div className="mt-5">
                <div className="form">
                  <div className="md:space-y-2 text-center mb-3">
                    <Image
                      src="/1160151.jpeg"
                      // layout="fill"
                      width={300}
                      height={300}
                    />
                    {/* <label className="text-xs font-semibold text-gray-600 py-2">
                      企業ロゴ
                      <abbr className="hidden" title="required">
                        *
                      </abbr>
                    </label>
                    <div className="flex items-center py-6">
                      <div className="w-12 h-12 mr-4 flex-none rounded-xl border overflow-hidden">
                        <img
                          className="w-12 h-12 mr-4 object-cover"
                          src="https://images.unsplash.com/photo-1611867967135-0faab97d1530?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1352&amp;q=80"
                          alt="Avatar Upload"
                        />
                      </div>
                      <label className="cursor-pointer ">
                        <span className="focus:outline-none text-white text-sm py-2 px-4 rounded-full bg-green-400 hover:bg-green-500 hover:shadow-lg">
                          Browse
                        </span>
                        <input
                          type="file"
                          className="hidden"
                          //    :multiple="multiple" :accept="accept"
                        />
                      </label>
                    </div> */}
                  </div>
                  {/* ここから */}
                  <div className="md:flex flex-row md:space-x-4 w-full text-xs">
                    <div className="mb-3 space-y-2 w-full text-xs">
                      <label className="font-semibold text-gray-600 py-2">
                        企業名 <abbr title="required">*</abbr>
                      </label>
                      <input
                        ref={companyName}
                        placeholder="企業名"
                        className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4"
                        required="required"
                        type="text"
                        name="integration[shop_name]"
                        id="integration_shop_name"
                      />
                      <p className="text-red text-xs hidden">
                        Please fill out this field.
                      </p>
                    </div>
                    <div className="mb-3 space-y-2 w-full text-xs">
                      <label className=" font-semibold text-gray-600 py-2">
                        企業のWebサイト
                      </label>
                      <div className="flex flex-wrap items-stretch w-full mb-4 relative">
                        <div className="flex">
                          <span className="flex items-center leading-normal bg-grey-lighter border-1 rounded-r-none border border-r-0 border-blue-300 px-3 whitespace-no-wrap text-grey-dark text-sm w-12 h-10 bg-blue-300 justify-center items-center  text-xl rounded-lg text-white">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-6"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              ></path>
                            </svg>
                          </span>
                        </div>
                        <input
                          ref={companyUrl}
                          type="text"
                          className="flex-shrink flex-grow flex-auto leading-normal w-px flex-1 border border-l-0 h-10 border-grey-light rounded-lg rounded-l-none px-3 relative focus:border-blue focus:shadow"
                          placeholder="https://"
                        />
                      </div>
                    </div>
                  </div>
                  {/* ここまで */}
                  {/* ここから */}
                  <div className="md:flex flex-row md:space-x-4 w-full text-xs">
                    <div className="mb-3 space-y-2 w-full text-xs">
                      <label className="font-semibold text-gray-600 py-2">
                        所在地 「必須」<abbr title="required">*</abbr>
                      </label>
                      <input
                        ref={companyAddress}
                        placeholder="会社名-text"
                        className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4"
                        required="required"
                        type="text"
                        name="integration[shop_name]"
                        id="integration_shop_name"
                      />
                      <p className="text-red text-xs hidden">
                        Please fill out this field.
                      </p>
                    </div>
                    <div className="mb-3 space-y-2 w-full text-xs">
                      <label className="font-semibold text-gray-600 py-2">
                        電話番号 <abbr title="required">*</abbr>
                      </label>
                      <input
                        ref={companyPhone}
                        placeholder="電話番号「必須」-int2"
                        className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4"
                        required="required"
                        type="text"
                        name="integration[shop_name]"
                        id="integration_shop_name"
                      />
                      <p className="text-red text-xs hidden">
                        Please fill out this field.
                      </p>
                    </div>
                  </div>
                  {/* ここまで */}
                  {/* ここから */}
                  <div className="md:flex flex-row md:space-x-4 w-full text-xs">
                    <div className="mb-3 space-y-2 w-full text-xs">
                      <label className="font-semibold text-gray-600 py-2">
                        資本金 <abbr title="required">*</abbr>
                      </label>
                      <input
                        ref={companyCapital}
                        placeholder="住所「必須」-text"
                        className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4"
                        required="required"
                        type="text"
                        name="integration[shop_name]"
                        id="integration_shop_name"
                      />
                      <p className="text-red text-xs hidden">
                        Please fill out this field.
                      </p>
                    </div>
                    <div className="mb-3 space-y-2 w-full text-xs">
                      <label className="font-semibold text-gray-600 py-2">
                        社員数 <abbr title="required">*</abbr>
                      </label>
                      <input
                        ref={companyEmployees}
                        placeholder="資本金-int2"
                        className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4"
                        required="required"
                        type="text"
                        name="integration[shop_name]"
                        id="integration_shop_name"
                      />
                      <p className="text-red text-xs hidden">
                        Please fill out this field.
                      </p>
                    </div>
                  </div>
                  {/* ここまで */}
                  {/* ここから */}
                  <div className="md:flex flex-row md:space-x-4 w-full text-xs">
                    <div className="mb-3 space-y-2 w-full text-xs">
                      <label className="font-semibold text-gray-600 py-2">
                        設立日<abbr title="required">*</abbr>
                      </label>
                      <input
                        ref={companyDate}
                        placeholder="社員数-int2"
                        className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4"
                        required="required"
                        type="text"
                        name="integration[shop_name]"
                        id="integration_shop_name"
                      />
                      <p className="text-red text-xs hidden">
                        Please fill out this field.
                      </p>
                    </div>
                    <div className="mb-3 space-y-2 w-full text-xs">
                      <label className="font-semibold text-gray-600 py-2">
                        地図 <abbr title="required">*</abbr>
                      </label>
                      <input
                        ref={companyMap}
                        placeholder="設立日-date"
                        className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4"
                        required="required"
                        type="text"
                        name="integration[shop_name]"
                        id="integration_shop_name"
                      />
                      <p className="text-red text-xs hidden">
                        Please fill out this field.
                      </p>
                    </div>
                  </div>
                  {/* ここまで */}
                  {/* ここから情報補助 */}
                  <div className="md:flex flex-row md:space-x-4 w-full text-xs">
                    <div className="mb-3 space-y-2 w-full text-xs">
                      <label className="font-semibold text-gray-600 py-2">
                        最寄駅 <abbr title="required">*</abbr>
                      </label>
                      <input
                        ref={nearestStation}
                        placeholder="最寄駅-text"
                        className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4"
                        required="required"
                        type="text"
                        name="integration[shop_name]"
                        id="integration_shop_name"
                      />
                      <p className="text-red text-xs hidden">
                        Please fill out this field.
                      </p>
                    </div>
                    <div className="mb-3 space-y-2 w-full text-xs">
                      <label className="font-semibold text-gray-600 py-2">
                        アクセス <abbr title="required">*</abbr>
                      </label>
                      <input
                        placeholder="アクセス-text"
                        className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4"
                        required="required"
                        type="text"
                        name="integration[shop_name]"
                        id="integration_shop_name"
                      />
                      <p className="text-red text-xs hidden">
                        Please fill out this field.
                      </p>
                    </div>
                  </div>
                  {/* ここまで */}
                  {/* ここから */}
                  <div className="md:flex flex-row md:space-x-4 w-full text-xs">
                    <div className="mb-3 space-y-2 w-full text-xs">
                      <label className="font-semibold text-gray-600 py-2">
                        代表的なアプリ名 <abbr title="required">*</abbr>
                      </label>
                      <input
                        placeholder="代表的なアプリ名-text"
                        className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4"
                        required="required"
                        type="text"
                        name="integration[shop_name]"
                        id="integration_shop_name"
                      />
                      <p className="text-red text-xs hidden">
                        Please fill out this field.
                      </p>
                    </div>
                    {/* <div className="mb-3 space-y-2 w-full text-xs">
                      <label className="font-semibold text-gray-600 py-2">
                        駐車スペース <abbr title="required">*</abbr>
                      </label>
                      <input
                        placeholder="駐車スペース-text"
                        className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4"
                        required="required"
                        type="text"
                        name="integration[shop_name]"
                        id="integration_shop_name"
                      />
                      <p className="text-red text-xs hidden">
                        Please fill out this field.
                      </p>
                    </div> */}
                  </div>
                  {/* ここまで */}
                  <div className="md:flex md:flex-row md:space-x-4 w-full text-xs">
                    {/* 駐車情報 */}
                    <div className="w-full flex flex-col mb-3">
                      <label className="font-semibold text-gray-600 py-2">
                        駐車スペース-text駐輪場-text
                        <abbr title="required">*</abbr>
                      </label>
                      <select
                        ref={bicycleParking}
                        className="block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4 md:w-full "
                        required="required"
                        name="integration[city_id]"
                        id="integration_city_id"
                      >
                        <option value="">
                          選択してください　不明（基本値）
                        </option>
                        <option value="private">社用</option>
                        <option value="public">公衆</option>
                        <option value="non">無し</option>
                      </select>
                      <p
                        className="text-sm text-red-500 hidden mt-3"
                        id="error"
                      >
                        Please fill out this field.
                      </p>
                    </div>
                    {/* 駐車情報ここまで */}
                  </div>
                  <div className="md:flex md:flex-row md:space-x-4 w-full text-xs">
                    {/* 駐車情報 */}
                    <div className="w-full flex flex-col mb-3">
                      <label className="font-semibold text-gray-600 py-2">
                        駐車スペース-textバイク置き場-text
                        <abbr title="required">*</abbr>
                      </label>
                      <select
                        ref={bikeStorage}
                        className="block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4 md:w-full "
                        required="required"
                        name="integration[city_id]"
                        id="integration_city_id"
                      >
                        <option value="">
                          選択してください　不明（基本値）
                        </option>
                        <option value="private">社用</option>
                        <option value="public">公衆</option>
                        <option value="non">無し</option>
                      </select>
                      <p
                        className="text-sm text-red-500 hidden mt-3"
                        id="error"
                      >
                        Please fill out this field.
                      </p>
                    </div>
                    {/* 駐車情報ここまで */}
                  </div>
                  <div className="md:flex md:flex-row md:space-x-4 w-full text-xs">
                    {/* 駐車情報 */}
                    <div className="w-full flex flex-col mb-3">
                      <label className="font-semibold text-gray-600 py-2">
                        駐車場-text<abbr title="required">*</abbr>
                      </label>
                      <select
                        ref={carParking}
                        className="block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4 md:w-full "
                        required="required"
                        name="integration[city_id]"
                        id="integration_city_id"
                      >
                        <option value="">
                          選択してください　不明（基本値）
                        </option>
                        <option value="private">社用</option>
                        <option value="public">公衆</option>
                        <option value="non">無し</option>
                      </select>
                      <p
                        className="text-sm text-red-500 hidden mt-3"
                        id="error"
                      >
                        Please fill out this field.
                      </p>
                    </div>
                    {/* 駐車情報ここまで */}
                  </div>

                  <div className="flex-auto w-full mb-1 text-xs space-y-2">
                    <label className="font-semibold text-gray-600 py-2">
                      コメント欄
                    </label>
                    <textarea
                      required=""
                      name="message"
                      id=""
                      className="w-full min-h-[200px] max-h-[300px] h-28 appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg  py-4 px-4"
                      placeholder="コメント欄-text　Enter your comapny info"
                      spellcheck="false"
                    ></textarea>
                    <p className="text-xs text-gray-400 text-left my-3">
                      You inserted 0 characters
                    </p>
                  </div>
                  <p className="text-xs text-red-500 text-right my-3">
                    Required fields are marked with an asterisk{' '}
                    <abbr title="Required field">*</abbr>
                  </p>
                  <div className="mt-5 text-right md:space-x-3 md:block flex flex-col-reverse">
                    <button className="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100">
                      Cancel
                    </button>
                    <button
                      onClick={companyInfo}
                      className="mb-2 md:mb-0 bg-green-400 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-green-500"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
