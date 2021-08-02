import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Button } from '@supabase/ui';
import { supabase } from 'utils/supabaseClient';
import { useRouter } from 'next/router';
export const EditCompany = (props) => {
  const uuid = props.id;
  const companyInfo = props.companyInfo;
  const companySubInfo = props.companySubInfo;
  console.log(companyInfo);
  console.log('companyInfoooooooooooooooooooo');
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
  //   const editButton = useCallback(() => {
  //     // if (name.current.value == '') {
  //     //   alert('名前を入力してください!');
  //     //   return;
  //     // }
  //     console.log(uuid);
  //     console.log('uuiddedededededede');
  //     supabase
  //       .from('企業情報')
  //       .update({
  //         会社名: companyName.current.value,
  //         電話番号: companyPhone.current.value,
  //         住所: companyAddress.current.value,
  //         資本金: companyCapital.current.value,
  //         社員数: companyEmployees.current.value,
  //         設立日: companyDate.current.value,
  //         URL: companyUrl.current.value,
  //         求人URL: companyJobSite.current.value,
  //       })
  //       .eq('id', uuid)
  //       .then(() => {
  //         router.reload();
  //       });
  //   }, []);
  console.log(uuid);
  console.log('uuiddedededededede');
  //   const editButton = useCallback(() => {
  //     // if (name.current.value == '') {
  //     //   alert('名前を入力してください!');
  //     //   return;
  //     // }
  //     console.log(uuid);
  //     console.log('uuiddedededededede');
  //     supabase
  //       .from('企業情報補助')
  //       .update({
  //         最寄駅: companyNearestStation.current.value,
  //         アクセス: companyAccess.current.value,
  //         代表的なアプリ: companyWork.current.value,
  //         駐車場: companyParking.current.value,
  //         バイク置き場: companyMotorcycleParking.current.value,
  //         駐輪場: companyParkingBicycles.current.value,
  //         備考欄: companyRemarks.current.value,
  //       })
  //       .eq('企業情報_id', uuid)
  //       .then(() => {
  //         router.reload();
  //       });
  //   }, []);
  // ーーーーーーーーーーーーーーーーーーーーーーーーーー
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
                    <label className="mb-1" for="weight-pounds">
                      住所
                    </label>
                    <input
                      //   type="number"
                      defaultValue={props.companyInfo.住所}
                      id="weight-pounds"
                      className="py-3 px-5 rounded focus:outline-none  text-gray-600 focus:text-gray-600"
                      ref={companyAddress}
                    />
                  </div>
                  <div className="flex flex-col text-center w-3/6 px-2">
                    <label className="mb-1" for="weight-kilograms">
                      電話番号
                    </label>
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
                    <label className="mb-1" for="weight-pounds">
                      資本金
                    </label>
                    <input
                      //   type="number"
                      defaultValue={props.companyInfo.資本金}
                      id="weight-pounds"
                      className="py-3 px-5 rounded focus:outline-none  text-gray-600 focus:text-gray-600"
                      ref={companyCapital}
                    />
                  </div>
                  <div className="flex flex-col text-center w-3/6 px-2">
                    <label className="mb-1" for="weight-kilograms">
                      社員数
                    </label>
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
                    <label className="mb-1" for="weight-pounds">
                      設立日
                    </label>
                    <input
                      //   type="number"
                      defaultValue={props.companyInfo.設立日}
                      id="weight-pounds"
                      className="py-3 px-5 rounded focus:outline-none  text-gray-600 focus:text-gray-600"
                      ref={companyDate}
                    />
                  </div>
                  <div className="flex flex-col text-center w-3/6 px-2">
                    <label className="mb-1" for="weight-kilograms">
                      求人ページ
                    </label>
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
                    <label className="mb-1" for="weight-pounds">
                      企業URL
                    </label>
                    <input
                      //   type="number"
                      defaultValue={props.companyInfo.URL}
                      id="weight-pounds"
                      className="py-3 px-5 rounded focus:outline-none  text-gray-600 focus:text-gray-600"
                      ref={companyUrl}
                    />
                  </div>
                </div>
                <div className="border-pink-50 border-2"></div>
                <div className="flex items-center justify-between mb-5">
                  <div className="flex flex-col text-center w-3/6 px-2">
                    <label className="mb-1" for="weight-pounds">
                      最寄駅
                    </label>
                    <input
                      //   type="number"
                      defaultValue={props.companyInfo.最寄駅}
                      id="weight-pounds"
                      className="py-3 px-5 rounded focus:outline-none  text-gray-600 focus:text-gray-600"
                      ref={companyNearestStation}
                    />
                  </div>
                  <div className="flex flex-col text-center w-3/6 px-2">
                    <label className="mb-1" for="weight-kilograms">
                      アクセス
                    </label>
                    <input
                      //   type="number"
                      className="py-3 px-5 rounded focus:outline-none text-gray-600 focus:text-gray-600"
                      defaultValue={props.companyInfo.アクセス}
                      ref={companyAccess}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between mb-5">
                  <div className="flex flex-col text-center w-3/6 px-2">
                    <label className="mb-1" for="weight-pounds">
                      代表的なアプリ
                    </label>
                    <input
                      //   type="number"
                      defaultValue={props.companyInfo.代表的なアプリ名}
                      id="weight-pounds"
                      className="py-3 px-5 rounded focus:outline-none  text-gray-600 focus:text-gray-600"
                      ref={companyWork}
                    />
                  </div>
                  <div className="flex flex-col text-center w-3/6 px-2">
                    <label className="mb-1" for="weight-kilograms">
                      駐車場
                    </label>
                    <input
                      //   type="number"
                      className="py-3 px-5 rounded focus:outline-none text-gray-600 focus:text-gray-600"
                      defaultValue={props.companyInfo.駐車場}
                      ref={companyParking}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between mb-5">
                  <div className="flex flex-col text-center w-3/6 px-2">
                    <label className="mb-1" for="weight-pounds">
                      バイク置き場
                    </label>
                    <input
                      //   type="number"
                      defaultValue={props.companyInfo.バイク置き場}
                      id="weight-pounds"
                      className="py-3 px-5 rounded focus:outline-none  text-gray-600 focus:text-gray-600"
                      ref={companyMotorcycleParking}
                    />
                  </div>
                  <div className="flex flex-col text-center w-3/6 px-2">
                    <label className="mb-1" for="weight-kilograms">
                      駐輪場
                    </label>
                    <input
                      //   type="number"
                      className="py-3 px-5 rounded focus:outline-none text-gray-600 focus:text-gray-600"
                      defaultValue={props.companyInfo.駐輪場}
                      ref={companyParkingBicycles}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between mb-5">
                  <div className="flex flex-col text-center w-3/6 px-2">
                    <label className="mb-1" for="weight-pounds">
                      備考欄
                    </label>
                    <textarea
                      //   type="number"
                      defaultValue={props.companyInfo.備考欄}
                      id="weight-pounds"
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
                  <Button>
                    <div className="py-4 px-8 text-lg rounded ">戻る</div>
                  </Button>
                </div>
                {/* 選択型投稿画面ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー〜 */}
                {/* <div className="flex items-center justify-between mb-5 text-right">
                  <div className="flex flex-col text-right w-3/6 px-2">
                    <label for="decimals" className="mr-3">
                      代表的なアプリ名
                    </label>
                  </div>
                  <div className="flex flex-col text-center w-3/6 px-2">
                    <select
                      id="decimals"
                      className="appearance-none border-none text-gray-600 py-3 pl-3 pr-8 rounded leading-tight w-32"
                    >
                      <option value="0">0</option>
                      <option value="1">1</option>
                      <option value="2" selected>
                        2
                      </option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                    </select>
                  </div>
                </div> */}
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
