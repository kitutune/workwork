import React, { useCallback, useMemo, useState } from 'react';
import { Button } from '@supabase/ui';
export const EditCompany = (props) => {
  const [companyName, setCompanyName] = useState('');
  const [companyUrl, setCompanyUrl] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');
  const [companyPhone, setCompanyPhone] = useState('');
  const [companyCapital, setCompanyCapital] = useState('');
  const [companyEmployees, setCompanyEmployees] = useState('');
  const [companyDate, setCompanyDate] = useState('');
  const [companyJobSite, setCompanyJobSite] = useState('');

  const [companyNearestStation, setCompanyNearestStation] = useState('');
  const [companyAccess, setCompanyAccess] = useState('');
  const [companyWork, setCompanyWork] = useState('');
  const [companyParking, setCompanyParking] = useState('');
  const [companyMotorcycleParking, setCompanyMotorcycleParking] = useState('');
  const [companyParkingBicycles, setCompanyParkingBicycles] = useState('');
  const [companyRemarks, setCompanyRemarks] = useState('');
  console.log(props);
  console.log('props');
  const editCompanyInfo = useMemo(() => {
    async () => {
      const { data, error } = await supabase
        .from('企業情報')
        .select('*')
        .eq('id', props.data.id)
        .insert(
          [
            {
              id: uuid,
              会社名: companyName,
              URL: companyUrl,
              住所: companyAddress,
              電話番号: companyPhone,
              資本金: companyCapital,
              社員数: companyEmployees,
              設立日: companyDate,
              求人URL: companyJobSite,
            },
          ],
          then((uuid = props.data.id)),
          setCompanyName(companyName),
          setCompanyUrl(companyUrl),
          setCompanyAddress(companyAddress),
          setCompanyPhone(companyPhone),
          setCompanyCapital(companyCapital),
          setCompanyEmployees(companyEmployees),
          setCompanyDate(companyDate),
          setCompanyJobSite(companyJobSite),
          { upsert: true }
        );
    };
  }, [editButton]);

  const editCompanyInfosub = useMemo(() => {
    async () => {
      const { data, error } = await supabase
        .from('企業情報補助')
        .select('*')

        .insert(
          [
            {
              企業情報_id: uuid,
              最寄駅: companyNearestStation,
              アクセス: companyAccess,
              代表的なアプリ名: companyWork,
              駐輪場: companyParking,
              バイク置き場: companyMotorcycleParking,
              駐車場: companyParkingBicycles,
              備考欄: companyRemarks,
            },
          ],
          then((uuid = props.data.id)),
          { upsert: true }
        );
    };
  }, [editButton]);

  const editButton = () => {
    editCompanyInfo();
    editCompanyInfosub();
  };
  return (
    <div>
      <div className="min-w-screen min-h-screen bg-gray-100 flex flex-col items-center justify-center">
        <div className="w-5/6 lg:w-3/6 rounded-xl bg-gradient-to-b from-blue-600 to-blue-400 mr-3">
          <div className="flex flex-col">
            <div
              id="header"
              className="flex flex-col items-center justify-center text-white py-4 bg-blue-800"
            >
              <div className="text-center uppercase text-2xl">
                会社名{props.data.会社名}
              </div>
              <input
                type="number"
                id="weight-kilograms"
                className="text-center uppercase text-xl"
                // placeholder={props.data.会社名}
                value={companyName}
                onChange={(e) => {
                  return setCompanyName(() => e.target.value);
                }}
              />
              <div className="text-sm">
                <a
                  className="hover:underline"
                  href="https://codepen.io/webgleb/full/GRNdeLv"
                  target="_blank"
                >
                  Live version with JS
                </a>
              </div>
            </div>

            <div id="converters-area" className="px-4 py-5">
              <div className="flex flex-col text-white">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex flex-col text-center w-3/6 px-2">
                    <label className="mb-1" for="weight-kilograms">
                      URL{props.data.URL}
                    </label>
                    <input
                      type="number"
                      id="weight-kilograms"
                      className="py-3 px-5 rounded focus:outline-none text-gray-600 focus:text-gray-600"
                      //   placeholder={props.data.URL}
                      value={companyUrl}
                      onChange={(e) => {
                        return setCompanyUrl(() => e.target.value);
                      }}
                    />
                  </div>
                  <div className="flex flex-col text-center w-3/6 px-2">
                    <label className="mb-1" for="weight-pounds">
                      住所{props.data.住所}
                    </label>
                    <input
                      type="number"
                      id="weight-pounds"
                      className="py-3 px-5 rounded focus:outline-none text-gray-600 focus:text-gray-600"
                      //   placeholder={props.data.住所}
                      value={companyAddress}
                      onChange={(e) => {
                        return setCompanyAddress(() => e.target.value);
                      }}
                    />
                  </div>
                </div>
                {/* <div className="flex items-center justify-between mb-5">
                  <div className="flex flex-col text-center w-3/6 px-2">
                    <label className="mb-1" for="height-metres">
                      電話番号{props.data.電話番号}
                    </label>
                    <input
                      type="number"
                      id="height-metres"
                      className="py-3 px-5 rounded focus:outline-none text-gray-600 focus:text-gray-600"
                      //   placeholder={props.data.電話番号}
                      value={companyPhone}
                      onChange={(e) => {
                        return setCompanyPhone(()=>e.target.value);
                      }}
                    />
                  </div>
                  <div className="flex flex-col text-center w-3/6 px-2">
                    <label className="mb-1" for="height-feet">
                      資本金{props.data.資本金}
                    </label>
                    <input
                      type="number"
                      id="height-feet"
                      className="py-3 px-5 rounded focus:outline-none text-gray-600 focus:text-gray-600"
                      //   placeholder={props.data.資本金}
                      value={companyCapital}
                      onChange={(e) => {
                        return setCompanyCapital(()=>e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between mb-5">
                  <div className="flex flex-col text-center w-3/6 px-2">
                    <label className="mb-1" for="height-metres">
                      社員数{props.data.社員数}
                    </label>
                    <input
                      type="number"
                      id="distance-kilometres"
                      className="py-3 px-5 rounded focus:outline-none text-gray-600 focus:text-gray-600"
                      placeholder={props.data.社員数}
                      value={companyEmployees}
                      onChange={(e) => {
                        return setCompanyEmployees(()=>e.target.value);
                      }}
                    />
                  </div>
                  <div className="flex flex-col text-center w-3/6 px-2">
                    <label className="mb-1" for="height-feet">
                      設立日{props.data.設立日}
                    </label>
                    <input
                      type="number"
                      id="distance-miles"
                      className="py-3 px-5 rounded focus:outline-none text-gray-600 focus:text-gray-600"
                      placeholder={props.data.設立日}
                      value={companyDate}
                      onChange={(e) => {
                        return setCompanyDate(()=>e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between mb-5">
                  <div className="flex flex-col text-center w-3/6 px-2">
                    <label className="mb-1" for="height-metres">
                      最寄駅{props.data.最寄駅}
                    </label>
                    <input
                      type="number"
                      id="volume-litres"
                      className="py-3 px-5 rounded focus:outline-none text-gray-600 focus:text-gray-600"
                      placeholder={props.data.最寄駅}
                      value={companyNearestStation}
                      onChange={(e) => {
                        return setCompanyNearestStation(()=>e.target.value);
                      }}
                    />
                  </div>
                  <div className="flex flex-col text-center w-3/6 px-2">
                    <label className="mb-1" for="height-feet">
                      アクセス{props.data.アクセス}
                    </label>
                    <input
                      type="number"
                      id="volume-gallons"
                      className="py-3 px-5 rounded focus:outline-none text-gray-600 focus:text-gray-600"
                      placeholder={props.data.アクセス}
                      value={companyAccess}
                      onChange={(e) => {
                        return setCompanyAccess(()=>e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between mb-5">
                  <div className="flex flex-col text-center w-3/6 px-2">
                    <label className="mb-1" for="weight-kilograms">
                      代表的なアプリ名{props.data.代表的なアプリ名}
                    </label>
                    <input
                      type="number"
                      id="weight-kilograms"
                      className="py-3 px-5 rounded focus:outline-none text-gray-600 focus:text-gray-600"
                      placeholder={props.data.代表的なアプリ名}
                      value={companyWork}
                      onChange={(e) => {
                        return setCompanyWork(()=>e.target.value);
                      }}
                    />
                  </div>
                  <div className="flex flex-col text-center w-3/6 px-2">
                    <label className="mb-1" for="weight-pounds">
                      駐輪場
                    </label>
                    <input
                      type="number"
                      id="weight-pounds"
                      className="py-3 px-5 rounded focus:outline-none text-gray-600 focus:text-gray-600"
                      value={companyParking}
                      onChange={(e) => {
                        return setCompanyParking(()=>e.target.value);
                      }}
                    />
                  </div>
                </div>{' '}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex flex-col text-center w-3/6 px-2">
                    <label className="mb-1" for="weight-kilograms">
                      バイク置き場
                    </label>
                    <input
                      type="number"
                      id="weight-kilograms"
                      className="py-3 px-5 rounded focus:outline-none text-gray-600 focus:text-gray-600"
                      value={companyMotorcycleParking}
                      onChange={(e) => {
                        return setCompanyMotorcycleParking(()=>e.target.value);
                      }}
                    />
                  </div>
                  <div className="flex flex-col text-center w-3/6 px-2">
                    <label className="mb-1" for="weight-pounds">
                      駐車場
                    </label>
                    <input
                      type="number"
                      id="weight-pounds"
                      className="py-3 px-5 rounded focus:outline-none text-gray-600 focus:text-gray-600"
                      value={companyParkingBicycles}
                      onChange={(e) => {
                        return setCompanyParkingBicycles(()=>e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between mb-5">
                  <div className="flex flex-col text-center w-3/6 px-2">
                    <label className="mb-1" for="weight-kilograms">
                      求人情報サイト
                    </label>
                    <input
                      type="number"
                      id="weight-kilograms"
                      className="py-3 px-5 rounded focus:outline-none text-gray-600 focus:text-gray-600"
                      value={companyRemarks}
                      onChange={(e) => {
                        return setCompanyRemarks(()=>e.target.value);
                      }}
                    />
                  </div>
                  <div className="flex flex-col text-center w-3/6 px-2">
                    <label className="mb-1" for="weight-pounds">
                      備考欄
                    </label>
                    <input
                      type="number"
                      id="weight-pounds"
                      className="py-3 px-5 rounded focus:outline-none text-gray-600 focus:text-gray-600"
                    />
                  </div>
                </div> */}
                <div className="flex items-center justify-evenly mb-5">
                  <Button>
                    <div
                      className="py-4 px-16 text-lg rounded text-white"
                      onClick={editButton}
                    >
                      編集
                    </div>
                  </Button>
                  <Button>
                    <div className="py-4 px-16 text-lg rounded text-white">
                      戻る
                    </div>
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
