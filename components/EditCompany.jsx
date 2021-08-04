import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Button } from '@supabase/ui';
import { supabase } from 'utils/supabaseClient';
import { useRouter } from 'next/router';
export const EditCompany = (props) => {
  const uuid = props.id;
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
      alert('電話番号は数字で入力してください');
    }
    console.log(uuid);
    console.log('uuiddedededededede');
    await supabase
      .from('企業情報')
      .update({
        会社名: companyName.current.value,
        電話番号: companyPhone.current.value,
        住所: companyAddress.current.value,
        資本金: companyCapital.current.value,
        社員数: companyEmployees.current.value,
        設立日: companyDate.current.value,
        URL: companyUrl.current.value,
        求人URL: companyJobSite.current.value,
      })
      .eq('id', uuid);
    //   .then(() => {
    //     router.reload();
    //   });
    // .then(() => router.push(`/companyInfo?id=${uuid}`));
  }, []);
  //   console.log(uuid);
  //   console.log('uuiddedededededede');
  const companyInfoSubEditButton = useCallback(async () => {
    // if (name.current.value == '') {
    //   alert('名前を入力してください!');
    //   return;
    // }
    console.log(uuid);
    console.log('uuiddedededededede');
    await supabase
      .from('企業情報補助')
      .update({
        最寄駅: companyNearestStation.current.value,
        アクセス: companyAccess.current.value,
        代表的なアプリ名: companyWork.current.value,
        駐車場: companyParking.current.value,
        バイク置き場: companyMotorcycleParking.current.value,
        駐輪場: companyParkingBicycles.current.value,
        備考欄: companyRemarks.current.value,
      })
      .eq('企業情報_id', uuid);
    //   .then(() => {
    //     router.reload();
    //   });
  }, []);
  // ーーーーーーーーーーーーーーーーーーーーーーーーーー
  const editButton = () => {
    const edit = async () => {
      await companyInfoEditButton();
      await companyInfoSubEditButton();
      //   router.push(`/companyInfo?id=${uuid}`);
    };
    // edit();
    edit().then(() => {
      router.push(`/companyInfo?id=${uuid}`);
    });
  };
  // -----------------------------------------------
  //   const editButton = () => {
  //     companyInfoEditButton();
  //     companyInfoSubEditButton();
  //     if (uuid) {
  //       router.reload();
  //     }
  //   router.push(`/companyInfo?id=${uuid}`);
  //   };
  const backButton = async () => {
    await supabase.from('企業情報補助').delete().eq('企業情報_id', uuid);
    await supabase.from('企業情報').delete().eq('id', uuid);

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
                defaultValue={props.companyInfo.会社名}
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
                      defaultValue={props.companyInfo.住所}
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
                      defaultValue={props.companyInfo.電話番号}
                      ref={companyPhone}
                    />
                  </div>
                </div>{' '}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex flex-col text-center w-3/6 px-2">
                    <label className="mb-1">資本金</label>
                    <input
                      //   type="number"
                      defaultValue={props.companyInfo.資本金}
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
                      defaultValue={props.companyInfo.社員数}
                      ref={companyEmployees}
                    />
                  </div>
                </div>{' '}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex flex-col text-center w-3/6 px-2">
                    <label className="mb-1">設立日</label>
                    <input
                      //   type="number"
                      defaultValue={props.companyInfo.設立日}
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
                      defaultValue={props.companyInfo.求人URL}
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
                      defaultValue={props.companySubInfo.最寄駅}
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
                      defaultValue={props.companySubInfo.アクセス}
                      ref={companyAccess}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between mb-5">
                  <div className="flex flex-col text-center w-3/6 px-2">
                    <label className="mb-1">代表的なアプリ</label>
                    <input
                      //   type="number"
                      defaultValue={props.companySubInfo.代表的なアプリ名}
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
                      defaultValue={props.companySubInfo.駐車場}
                      ref={companyParking}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between mb-5">
                  <div className="flex flex-col text-center w-3/6 px-2">
                    <label className="mb-1">バイク置き場</label>
                    <input
                      //   type="number"
                      defaultValue={props.companySubInfo.バイク置き場}
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
                      defaultValue={props.companySubInfo.駐輪場}
                      ref={companyParkingBicycles}
                    />
                  </div>
                  {/* <div className="flex items-center justify-between mb-5 text-right">
                    <div className="flex flex-col text-right w-3/6 px-2">
                      <label className="mr-3">駐輪場</label>
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
                      defaultValue={props.companySubInfo.備考欄}
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
                    <label className="mr-3">代表的なアプリ名</label>
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
