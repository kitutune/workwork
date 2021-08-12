import { Auth, Button, IconCornerDownLeft } from '@supabase/ui';
import { CommentBoard } from 'components/CommentBoard';
import Image from 'next/image';
import router, { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState, VFC } from 'react';
import { supabase } from 'utils/supabaseClient';
import { EditCompany } from 'components/EditCompany';
import { ToolModal } from 'components/ToolModal';
import { BsCardList } from 'react-icons/bs';
import { FcLikePlaceholder, FcLike } from 'react-icons/fc';
import { GrMapLocation, GrLike } from 'react-icons/gr';
import cc from 'classcat';
import { LayoutWrapper } from 'components/LayoutWrapper';
import { Back } from 'components/back';
// import { Back } from 'components/Back';

const getCompanyDB = async (id) => {
  let { data, error } = await supabase
    .from('company')
    .select('*')
    .eq('company_id', id);
  if (!error && data) {
    const companyInfo = data[0];
    ({ data, error } = await supabase
      .from('company_info')
      .select('*')
      .eq('company_id', id));
    if (!error && data) {
      const companySubInfo = data[0];
      return { companyInfo: companyInfo, companySubInfo: companySubInfo };
    }
  }
  return { companyInfo: null, companySubInfo: null };
};
const companyInfo = () => {
  const Container = () => {
    const [companyInfo, setCompanyInfo] = useState([]);
    const [companySubInfo, setCompanySubInfo] = useState([]);
    const [likeCompany, setLikeCompany] = useState(false);

    const { user } = Auth.useUser();
    const router = useRouter();
    let { id } = router.query;

    const isReady = router.isReady;
    const address = companyInfo.company_address;
    const date = companyInfo.update;
    const date2 = companySubInfo.update_info;
    // map画面のオンオフ
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => {
      setIsOpen((isOpen) => !isOpen);
    };
    // map画面のオンオフ
    // companyOption画面のオンオフ
    const [companyOption, setCompanyOption] = useState(false);
    const companyOptionButton = () => {
      setCompanyOption((companyOption) => !companyOption);
    };
    // companyOption画面のオンオフ
    // 取得したcompanyDBとcompany_infoDBのデータを利用しやすいように定数に格納する　ここからーーーーーーーーーーーーー
    const getCompanyDBsData = useCallback(async () => {
      if (id) {
        const { companyInfo, companySubInfo } = await getCompanyDB(id);
        if (companyInfo) {
          setCompanyInfo(companyInfo);
        } else {
          router.push('/');
        }
        if (companySubInfo) {
          setCompanySubInfo(companySubInfo);
        }
      }
    }, [id, router]);
    // 取得したcompanyDBとcompany_infoDBのデータを利用しやすいように定数に格納する　ここまでーーーーーーーーーーーーー

    const bookmarkButton = async () => {
      console.log(likeCompany);
      console.log('00');
      const { data, error } = await supabase
        .from('flug')
        .update({ bookmark: !likeCompany })
        .eq('company_id', id);
      console.log(data);
      console.log('変更');
      console.log(likeCompany);
      console.log(data[0].bookmark);
      console.log('01');
      return setLikeCompany(data[0].bookmark);
    };
    console.log(likeCompany);
    console.log('3');

    const getFlugDb = useCallback(async () => {
      if (id === undefined) {
        return;
      }

      if ((id, user)) {
        let { data, error } = await supabase
          .from('flug')
          .select('*')
          .eq('company_id', id)
          .eq('user_id', user.id);
        console.log(data);
        console.log('いらっしゃい');
        if (data && data.length) {
          const likeCompany = data[0].bookmark;
          console.log(data[0].bookmark);
          console.log('入れる');
          return setLikeCompany(likeCompany);
        } else {
          ({ data, error } = await supabase
            .from('flug')
            .insert([{ company_id: id, user_id: user.id }]));

          console.log('作る');
          return setLikeCompany(likeCompany);
        }
      }
      console.log('idまたはuserが不在のため帰りました');
    }, [id, likeCompany, user]);
    console.log(likeCompany);
    console.log('2');

    useEffect(() => {
      let unmounted = false;

      // clean up関数（Unmount時の処理）
      return () => {
        console.log('アンマウント');
        unmounted = true;
      };
    }, []);
    useEffect(() => {
      console.log(id);
      console.log('idは有るのか？');
      if (!id && isReady) {
        console.log('idがいません');
        router.push('/');
      }
      if (!user) {
        console.log('userがいません');
        // router.reload();
      }
      getCompanyDBsData();
      console.log('マウント');
      getFlugDb();
    }, [user, router, getCompanyDBsData, getFlugDb, id, isReady]);

    useEffect(() => {
      console.log(id);
      console.log('idは有るのか？');

      getCompanyDBsData();
      console.log('マウント');
      getFlugDb();
    }, [user, router, getCompanyDBsData, getFlugDb, id]);

    console.log(likeCompany);
    console.log('1');
    if (user) {
      return (
        <div>
          {console.log(likeCompany)}
          {console.log('0')}

          <div className="flex justify-end gap-2 my-2 mr-2">
            <div className="w-24">
              <Button block size="medium" icon={<IconCornerDownLeft />}>
                <ToolModal name="EDIT">
                  <EditCompany
                    companyInfo={companyInfo}
                    companySubInfo={companySubInfo}
                    id={id}
                  />
                </ToolModal>
              </Button>
            </div>
            <div className="w-24">
              <Back>
                <Button block size="medium" icon={<IconCornerDownLeft />}>
                  BACK
                </Button>
              </Back>
            </div>
          </div>
          <div className="flex flex-row-reverse">
            <div>update:{date >= date2 ? date : date2}</div>
          </div>
          <div className="font-mono bg-gray-400">
            <div className="container mx-auto">
              <div className="flex justify-center px-6 my-12">
                <div className="w-full xl:w-3/4 lg:w-11/12 flex">
                  <div
                    className="w-full h-auto bg-gray-400 hidden lg:block lg:w-5/12 bg-cover rounded-l-lg"
                    style={{
                      backgroundImage:
                        'url(https://source.unsplash.com/Mv9hjnEUHR4/600x800)',
                    }}
                  >
                    {/* <CommentBoard id={id} /> */}
                  </div>
                  {/* <!-- Col --> */}
                  <div className="w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none">
                    <button className="float-right " onClick={bookmarkButton}>
                      {likeCompany == false ? (
                        <FcLikePlaceholder />
                      ) : (
                        <FcLike />
                      )}
                    </button>
                    <h3 className="pt-4 text-2xl text-center">
                      <Image
                        width={40}
                        height={40}
                        layout={'intrinsic'}
                        alt="companyicon"
                        src="/company2.png"
                        className="z-1"
                      />
                      {companyInfo.company_name}
                    </h3>
                    <form className="px-8 pt-6 pb-8 mb-4　 bg-white rounded">
                      {/* 　項目ここから */}
                      <div className="mb-4　">
                        <div className="text-center">
                          <label className="block mb-2 text-sm　 font-bold text-gray-700">
                            住所
                          </label>
                          <div
                            className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                            id="address"
                            type="address"
                          >
                            {companyInfo.company_address}
                          </div>
                        </div>
                      </div>
                      {/* 　項目ここまで */}
                      {/* 　項目ここから */}
                      <div className="mb-4　">
                        <div className="text-center">
                          <label className="block mb-2 text-sm　 font-bold text-gray-700">
                            電話番号
                          </label>
                          <div
                            className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                            id="email"
                            type="tel"
                          >
                            {companyInfo.phone_number}
                          </div>
                        </div>
                      </div>
                      {/* 　項目ここまで */}
                      {/* 　項目ここから */}
                      <div className="mb-4　">
                        <div className="text-center">
                          <label className="block mb-2 text-sm　 font-bold text-gray-700">
                            資本金
                          </label>

                          <div
                            className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                            id="capital"
                            type="capital"
                          >
                            {companyInfo.capital_stock}
                            万円
                          </div>
                        </div>
                      </div>
                      {/* 　項目ここまで */}
                      {/* 　項目ここから */}
                      <div className="mb-4　">
                        <div className="text-center">
                          <label className="block mb-2 text-sm　 font-bold text-gray-700">
                            社員数
                          </label>
                          <div
                            className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                            id="email"
                            type="email"
                          >
                            {companyInfo.employees}人
                          </div>
                        </div>
                      </div>
                      {/* 　項目ここまで */}
                      {/* 　項目ここから */}
                      <div className="mb-4　">
                        <div className="text-center">
                          <label className="block mb-2 text-sm　 font-bold text-gray-700">
                            設立日
                          </label>

                          <div
                            className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                            id="date"
                            type="date"
                          >
                            {companyInfo.establishment_date}
                          </div>
                        </div>
                      </div>
                      {/* 　項目ここまで */}
                      <button
                        className="w-full mb-4 px-4 py-2 font-bold text-white
                         bg-blue-500 rounded-full hover:bg-blue-700 
                         focus:outline-none focus:shadow-outline
                         "
                        type="button"
                      >
                        <a
                          href={companyInfo.URL}
                          target="_blank"
                          rel="noreferrer"
                        >
                          HPへ
                        </a>
                      </button>
                      <button
                        className="w-full px-4 py-2 font-bold text-white
                         bg-blue-500 rounded-full hover:bg-blue-700 
                         focus:outline-none focus:shadow-outline
                         "
                        type="button"
                      >
                        <a
                          href={companyInfo.job_url}
                          target="_blank"
                          rel="noreferrer"
                        >
                          求人サイトへ
                        </a>
                      </button>
                      <hr className="mb-6 border-t" />
                      {companyOption === true ? (
                        <div>
                          {/* 　項目ここから */}
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
                                {companySubInfo.nearest_station}
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
                                {companySubInfo.access}
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
                                {companySubInfo.work}
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
                                {companySubInfo.parking_area_for_bicycles}
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
                                {companySubInfo.motorcycle_parking}
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
                                {companySubInfo.parking}
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
                                {companySubInfo.remarks}
                              </div>
                            </div>
                          </div>
                          {/* 　項目ここまで */}
                        </div>
                      ) : (
                        <div></div>
                      )}
                      <div className="flex">
                        <div className="w-24 pr-3">
                          <Button
                            block
                            size="medium"
                            onClick={companyOptionButton}
                          >
                            <BsCardList />
                            option
                          </Button>
                        </div>
                        <div className="w-24">
                          <Button block size="medium" onClick={toggle}>
                            <GrMapLocation />
                            Map
                          </Button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="flex justify-center px-6 my-12">
                <div
                  className="
                
                "
                ></div>
              </div>
              {isOpen === false ? (
                <div></div>
              ) : (
                <div className="flex justify-center px-6 my-12">
                  <div
                    className="  w-full  
                  object-contain
                  justify-center
                flex"
                  >
                    <iframe
                      src={`http://maps.google.co.jp/maps?q=${address}&output=embed`}
                      width="1100"
                      height="1100"
                    ></iframe>
                  </div>
                </div>
              )}

              <div className="flex justify-center px-6 my-12　 lg:hidden">
                <div className="w-full xl:w-3/4 lg:w-11/12 flex">
                  <CommentBoard id={id} />
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return <div></div>;
  };

  return (
    <LayoutWrapper>
      <Auth.UserContextProvider supabaseClient={supabase}>
        <Container />
      </Auth.UserContextProvider>
    </LayoutWrapper>
  );
};

export default companyInfo;
