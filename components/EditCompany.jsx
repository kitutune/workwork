import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Button } from '@supabase/ui';
import { supabase } from 'utils/supabaseClient';
import { useRouter } from 'next/router';
export const EditCompany = (props) => {
  const companyId = props.id;
  const companyInfo = props.companyInfo;
  const companySubInfo = props.companySubInfo;
  console.log(companyInfo);
  console.log('companySubInfocompanyInfoooooooooooooooooooo');
  const router = useRouter();

  const companyName = useRef(null);
  const companyUrl = useRef(null);
  const companyAddress = useRef(null);
  const companyPhone = useRef(null);
  const companyCapital = useRef(null);
  const companyEmployees = useRef(null);
  const companyDate = useRef(null);
  const companyJobSite = useRef(null);

  const companyNearestStation = useRef(null);
  const companyAccess = useRef(null);
  const companyWork = useRef(null);
  const companyParking = useRef(null);
  const companyMotorcycleParking = useRef(null);
  const companyParkingBicycles = useRef(null);
  const companyRemarks = useRef(null);
  //   const companyInfoEditButton = useCallback(() => {
  const companyInfoEditButton = useCallback(async () => {
    // if (name.current.value == '') {
    //   alert('名前を入力してください!');
    //   return;
    // }
    if (
      !companyPhone.current.value.match(/^[0-9-]{6,9}$|^[0-9-]{12}$/) ||
      !companyPhone.current.value.match(
        /^\d{1,4}-\d{4}$|^\d{2,5}-\d{1,4}-\d{4}$/
      )
    ) {
      alert('電話番号は-を抜いた数字で入力してください');
    }
    console.log(companyId);
    console.log('companyIddedededededede');
    await supabase
      .from('company')
      .update({
        company_name: companyName.current.value,
        phone_number: companyPhone.current.value,
        company_address: companyAddress.current.value,
        capital_stock: companyCapital.current.value,
        employees: companyEmployees.current.value,
        establishment_date: companyDate.current.value,
        URL: companyUrl.current.value,
        job_url: companyJobSite.current.value,
      })
      .eq('company_id', companyId);
    //   .then(() => {
    //     router.reload();
    //   });
    // .then(() => router.push(`/companyInfo?id=${companyId}`));
  }, []);
  //   console.log(companyId);
  //   console.log('companyIddedededededede');
  const companyInfoSubEditButton = useCallback(async () => {
    // if (name.current.value == '') {
    //   alert('名前を入力してください!');
    //   return;
    // }
    console.log(companyId);
    console.log('companyIddedededededede');
    await supabase
      .from('company_info')
      .update({
        nearest_station: companyNearestStation.current.value,
        access: companyAccess.current.value,
        work: companyWork.current.value,
        parking: companyParking.current.value,
        motorcycle_parking: companyMotorcycleParking.current.value,
        parking_area_for_bicycles: companyParkingBicycles.current.value,
        remarks: companyRemarks.current.value,
      })
      .eq('company_id', companyId);
    //   .then(() => {
    //     router.reload();
    //   });
  }, []);
  // ーーーーーーーーーーーーーーーーーーーーーーーーーー
  const editButton = () => {
    const edit = async () => {
      await companyInfoEditButton();
      await companyInfoSubEditButton();
      //   router.push(`/companyInfo?id=${companyId}`);
    };
    // edit();
    edit().then(() => {
      router.push(`/companyInfo?id=${companyId}`);
    });
  };
  // -----------------------------------------------
  //   const editButton = () => {
  //     companyInfoEditButton();
  //     companyInfoSubEditButton();
  //     if (companyId) {
  //       router.reload();
  //     }
  //   router.push(`/companyInfo?id=${companyId}`);
  //   };
  const backButton = async () => {
    await supabase.from('company_info').delete().eq('company_id', companyId);
    await supabase.from('company').delete().eq('company_id', companyId);

    router.push('/');
  };
  return (
    <div>
      <div className="min-w-screen min-h-screen bg-gray-100 flex flex-col items-center justify-center">
        <div className="w-5/6 lg:w-3/6 rounded-xl bg-gradient-to-b from-blue-600 to-blue-400 mr-3">
          <div className="flex flex-col">
            <div
              id="header"
              className="flex flex-col items-center justify-center  py-4 bg-blue-800"
            >
              <div className="text-center uppercase text-2xl">会社名</div>
              <input
                // type="number"

                className="text-center uppercase text-xl"
                defaultValue={props.companyInfo.company_name}
                ref={companyName}
              />
              {/* <div className="text-sm">
                <a
                  className="hover:underline"
                  href="https://codepen.io/webgleb/full/GRNdeLv"
                  target="_blank"
                >
                  Live version with JS
                </a>
              </div> */}
            </div>

            <div id="converters-area" className="px-4 py-5">
              <div className="flex flex-col text-black">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex flex-col text-center w-3/6 px-2">
                    <label className="mb-1">住所</label>
                    <input
                      //   type="number"
                      defaultValue={props.companyInfo.company_address}
                      id="address"
                      className="py-3 px-5 rounded focus:outline-none  text-gray-600 focus:text-gray-600"
                      ref={companyAddress}
                    />
                  </div>
                  <div className="flex flex-col text-center w-3/6 px-2">
                    <label className="mb-1">電話番号</label>
                    <input
                      //   type="number"
                      className="py-3 px-5 rounded focus:outline-none text-gray-600 focus:text-gray-600"
                      defaultValue={props.companyInfo.phone_number}
                      ref={companyPhone}
                    />
                  </div>
                </div>{' '}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex flex-col text-center w-3/6 px-2">
                    <label className="mb-1">資本金</label>
                    <input
                      //   type="number"
                      defaultValue={props.companyInfo.capital_stock}
                      id="capital"
                      className="py-3 px-5 rounded focus:outline-none  text-gray-600 focus:text-gray-600"
                      ref={companyCapital}
                    />
                  </div>
                  <div className="flex flex-col text-center w-3/6 px-2">
                    <label className="mb-1">社員数</label>
                    <input
                      //   type="number"
                      className="py-3 px-5 rounded focus:outline-none text-gray-600 focus:text-gray-600"
                      defaultValue={props.companyInfo.employees}
                      ref={companyEmployees}
                    />
                  </div>
                </div>{' '}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex flex-col text-center w-3/6 px-2">
                    <label className="mb-1">設立日</label>
                    <input
                      //   type="number"
                      defaultValue={props.companyInfo.establishment_date}
                      id="date"
                      className="py-3 px-5 rounded focus:outline-none  text-gray-600 focus:text-gray-600"
                      ref={companyDate}
                    />
                  </div>
                  <div className="flex flex-col text-center w-3/6 px-2">
                    <label className="mb-1">求人ページ</label>
                    <input
                      //   type="number"
                      className="py-3 px-5 rounded focus:outline-none text-gray-600 focus:text-gray-600"
                      defaultValue={props.companyInfo.job_url}
                      ref={companyJobSite}
                    />
                  </div>
                </div>{' '}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex flex-col text-center w-3/6 px-2">
                    <label className="mb-1">企業URL</label>
                    <input
                      //   type="number"
                      defaultValue={props.companyInfo.URL}
                      id="homeurl"
                      className="py-3 px-5 rounded focus:outline-none  text-gray-600 focus:text-gray-600"
                      ref={companyUrl}
                    />
                  </div>
                </div>
                <div className="border-pink-50 border-2"></div>
                <div className="flex items-center justify-between mb-5">
                  <div className="flex flex-col text-center w-3/6 px-2">
                    <label className="mb-1">最寄駅</label>
                    <input
                      //   type="number"
                      defaultValue={props.companySubInfo.nearest_station}
                      id="weight-pounds"
                      className="py-3 px-5 rounded focus:outline-none  text-gray-600 focus:text-gray-600"
                      ref={companyNearestStation}
                    />
                  </div>
                  <div className="flex flex-col text-center w-3/6 px-2">
                    <label className="mb-1">アクセス</label>
                    <input
                      //   type="number"
                      className="py-3 px-5 rounded focus:outline-none text-gray-600 focus:text-gray-600"
                      defaultValue={props.companySubInfo.access}
                      ref={companyAccess}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between mb-5">
                  <div className="flex flex-col text-center w-3/6 px-2">
                    <label className="mb-1">ワーク</label>
                    <input
                      //   type="number"
                      defaultValue={props.companySubInfo.work}
                      id="work"
                      className="py-3 px-5 rounded focus:outline-none  text-gray-600 focus:text-gray-600"
                      ref={companyWork}
                    />
                  </div>
                  <div className="flex flex-col text-center w-3/6 px-2">
                    <label className="mb-1">駐車場</label>
                    <input
                      //   type="number"
                      className="py-3 px-5 rounded focus:outline-none text-gray-600 focus:text-gray-600"
                      defaultValue={props.companySubInfo.parking}
                      ref={companyParking}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between mb-5">
                  <div className="flex flex-col text-center w-3/6 px-2">
                    <label className="mb-1">バイク置き場</label>
                    <input
                      //   type="number"
                      defaultValue={props.companySubInfo.motorcycle_parking}
                      id="motorcycleparking"
                      className="py-3 px-5 rounded focus:outline-none  text-gray-600 focus:text-gray-600"
                      ref={companyMotorcycleParking}
                    />
                  </div>
                  {/* ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー工事中ここから */}
                  <div className="flex flex-col text-center w-3/6 px-2">
                    <label className="mb-1">駐輪場</label>
                    <input
                      //   type="number"
                      className="py-3 px-5 rounded focus:outline-none text-gray-600 focus:text-gray-600"
                      defaultValue={
                        props.companySubInfo.parking_area_for_bicycles
                      }
                      ref={companyParkingBicycles}
                    />
                  </div>
                  {/* <div className="flex items-center justify-between mb-5 text-right">
                    <div className="flex flex-col text-right w-3/6 px-2">
                      <label className="mr-3">parking_area_for_bicycles</label>
                    </div>
                    <div
                      //  className="flex flex-col text-center w-3/6 px-2"
                      className="py-3 px-5 rounded focus:outline-none text-gray-600 focus:text-gray-600"
                    >
                      <select
                        // ref={companyParkingBicycles}
                        className="appearance-none border-none text-gray-600 py-3 pl-3 pr-8 rounded leading-tight w-32"
                      >
                        <option ref={companyParkingBicycles} value="無">
                          無
                        </option>
                        <option ref={companyParkingBicycles} value="有">
                          有
                        </option>
                        <option
                          ref={companyParkingBicycles}
                          value=" 有り（民間又は公共）"
                        >
                          有り（民間又は公共）
                        </option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                      </select>
                    </div>
                  </div> */}
                  {/* ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー工事中ここまで */}
                </div>
                <div className="flex items-center justify-between mb-5">
                  <div className="flex flex-col text-center w-3/6 px-2">
                    <label className="mb-1">備考欄</label>
                    <textarea
                      //   type="number"
                      defaultValue={props.companySubInfo.remarks}
                      id="remarks"
                      className="py-3 px-5 rounded focus:outline-none  text-gray-600 focus:text-gray-600"
                      ref={companyRemarks}
                    />
                  </div>
                </div>
                {/* ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー */}
                <div className="flex items-center justify-evenly mb-5　">
                  <Button>
                    <div
                      className="py-4 px-8 text-lg rounded "
                      onClick={editButton}
                    >
                      変更
                    </div>
                  </Button>
                  <Button onClick={backButton}>
                    <div className="py-4 px-8 text-lg rounded ">戻る</div>
                  </Button>
                </div>
                {/* 選択型投稿画面ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー〜 */}
                <div className="flex items-center justify-between mb-5 text-right">
                  <div className="flex flex-col text-right w-3/6 px-2">
                    <label className="mr-3">work</label>
                  </div>
                  <div className="flex flex-col text-center w-3/6 px-2">
                    <select
                      id="decimals"
                      className="appearance-none border-none text-gray-600 py-3 pl-3 pr-8 rounded leading-tight w-32"
                    >
                      <option value="0">0</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                    </select>
                  </div>
                </div>
                {/* 選択型投稿画面ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー〜 */}
              </div>
            </div>
          </div>
        </div>
        <div className="text-sm mt-3">
          Follow me on twitter{' '}
          <a
            href="https://twitter.com/devgleb"
            className="text-blue-600 hover:underline"
            target="_blank"
          >
            @devgleb
          </a>
        </div>
      </div>
    </div>
  );
};
