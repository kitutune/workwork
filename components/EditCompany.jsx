import React, { useCallback, useRef } from 'react';
import { Button } from '@supabase/ui';
import { supabase } from 'utils/supabaseClient';
import { useRouter } from 'next/router';
export const EditCompany = (props) => {
  const companyId = props.id;
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
  const companyInfoEditButton = useCallback(async () => {
    const { data, error } = await supabase.from('company_full').select('*');
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
  }, []);
  const companyInfoSubEditButton = useCallback(async () => {
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
  }, []);
  const editButton = () => {
    const edit = async () => {
      await companyInfoEditButton();
      await companyInfoSubEditButton();
    };
    edit().then(() => {
      router.push(`/companyInfo?id=${companyId}`);
    });
  };
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
            <div className="flex flex-col items-center justify-center  py-4 bg-blue-800">
              <div className="text-center uppercase text-2xl">会社名</div>
              <input
                type="text"
                className="text-center uppercase text-xl"
                defaultValue={props.companyInfo.company_name}
                ref={companyName}
              />
            </div>

            <div className="px-4 py-5">
              <div className="flex flex-col text-black">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex flex-col text-center w-3/6 px-2">
                    <label className="mb-1">住所</label>
                    <input
                      type="text"
                      placeholder="住所を入力してください"
                      defaultValue={props.companyInfo.company_address}
                      className="py-3 px-5 rounded focus:outline-none  text-gray-600 focus:text-gray-600"
                      ref={companyAddress}
                    />
                  </div>
                  <div className="flex flex-col text-center w-3/6 px-2">
                    <label className="mb-1">電話番号</label>
                    <input
                      type="tel"
                      placeholder="電話番号を入力してください"
                      maxLength="11"
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
                      type="number"
                      placeholder="数字を入力してください"
                      defaultValue={props.companyInfo.capital_stock}
                      className="py-3 px-5 rounded focus:outline-none  text-gray-600 focus:text-gray-600"
                      ref={companyCapital}
                    />
                  </div>
                  <div className="flex flex-col text-center w-3/6 px-2">
                    <label className="mb-1">社員数</label>
                    <input
                      type="number"
                      placeholder="数字を入力してください"
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
                      type="datetime-local"
                      placeholder="数字を入力してください"
                      defaultValue={props.companyInfo.establishment_date}
                      className="py-3 px-5 rounded focus:outline-none  text-gray-600 focus:text-gray-600"
                      ref={companyDate}
                    />
                  </div>
                  <div className="flex flex-col text-center w-3/6 px-2">
                    <label className="mb-1">求人ページ</label>
                    <input
                      type="url"
                      placeholder="URLを入力してください"
                      className="py-3 px-5 rounded focus:outline-none text-gray-600 focus:text-gray-600"
                      defaultValue={props.companyInfo.job_url}
                      ref={companyJobSite}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between mb-5">
                  <div className="flex flex-col text-center w-3/6 px-2">
                    <label className="mb-1">企業URL</label>
                    <input
                      type="url"
                      placeholder="URLを入力してください"
                      defaultValue={props.companyInfo.URL}
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
                      type="text"
                      placeholder="最寄駅を入力してください"
                      defaultValue={props.companySubInfo.nearest_station}
                      className="py-3 px-5 rounded focus:outline-none  text-gray-600 focus:text-gray-600"
                      ref={companyNearestStation}
                    />
                  </div>
                  <div className="flex flex-col text-center w-3/6 px-2">
                    <label className="mb-1">アクセス</label>
                    <input
                      type="text"
                      placeholder="テキストを入力してください"
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
                      type="text"
                      placeholder="アプリ名や事業を入力してください"
                      defaultValue={props.companySubInfo.work}
                      className="py-3 px-5 rounded focus:outline-none  text-gray-600 focus:text-gray-600"
                      ref={companyWork}
                    />
                  </div>
                  <div className="flex flex-col text-center w-3/6 px-2">
                    <label className="mb-1">駐車場</label>
                    <input
                      type="text"
                      placeholder="駐車場は有る場合は「有」、無い場合は「無」を入力してください"
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
                      type="text"
                      placeholder="駐車場は有る場合は「有」、無い場合は「無」を入力してください"
                      defaultValue={props.companySubInfo.motorcycle_parking}
                      className="py-3 px-5 rounded focus:outline-none  text-gray-600 focus:text-gray-600"
                      ref={companyMotorcycleParking}
                    />
                  </div>
                  <div className="flex flex-col text-center w-3/6 px-2">
                    <label className="mb-1">駐輪場</label>
                    <input
                      type="text"
                      placeholder="駐車場は有る場合は「有」、無い場合は「無」を入力してください"
                      className="py-3 px-5 rounded focus:outline-none text-gray-600 focus:text-gray-600"
                      defaultValue={
                        props.companySubInfo.parking_area_for_bicycles
                      }
                      ref={companyParkingBicycles}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between mb-5">
                  <div className="flex flex-col text-center w-3/6 px-2">
                    <label className="mb-1">備考欄</label>
                    <textarea
                      type="text"
                      placeholder="テキストを入力してください"
                      defaultValue={props.companySubInfo.remarks}
                      className="py-3 px-5 rounded focus:outline-none  text-gray-600 focus:text-gray-600"
                      ref={companyRemarks}
                    />
                  </div>
                </div>
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
                    <div className="py-4 px-8 text-lg rounded ">
                      この企業ページを削除
                    </div>
                  </Button>
                </div>
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
