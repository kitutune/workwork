import { Auth, Button, IconCornerDownLeft } from '@supabase/ui';
import { Back } from 'components/back';
import { CommentBoard } from 'components/CommentBoard';
import Image from 'next/image';
import router, { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState, VFC } from 'react';
import { supabase } from 'utils/supabaseClient';
import { LayoutWrapper } from '../components/layoutWrapper';
import { EditCompany } from 'components/EditCompany';
import { ToolModal } from 'components/ToolModal';
import { BsCardList } from 'react-icons/bs';
import { FcLikePlaceholder, FcLike } from 'react-icons/fc';
import { GrMapLocation, GrLike } from 'react-icons/gr';
import cc from 'classcat';

// companyとcompany_infoのDBを取ってくる関数（ただし表示されるcompanyのURL＝IDが必要）ここからーーーーーーーーーーーーーーーーーーーーここから
const getCompanyDB = async (id) => {
  console.log('０００００００');
  let { data, error } = await supabase
    .from('company')
    .select('*')
    .eq('company_id', id);
  console.log('１１１１１１１１');
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
    // else {
    //   return { companyInfo: companyInfo, companySubInfo: null };
    // }
  }
  return { companyInfo: null, companySubInfo: null };
};
// companyとcompany_infoのDBを取ってくる関数（ただし表示されるcompanyのURL＝IDが必要ここまでーーーーーーーーーーーーーーーーーーーーここまで

const getFlugDb = async (id) => {
  let { data, error } = await supabase
    .from('flug')
    .select('*')
    .eq('company_id', id);
  // .eq('user_id', user.id);
  if (!error && data) {
    const bookmark = data[0];
    return { bookmark: bookmark };
  }
  return { bookmark: null };
};
// Company Informationに変更
const companyInfo = () => {
  // console.log(user);
  // console.log('222222222222222222222222');
  const Container = () => {
    const { user } = Auth.useUser();
    const [companyInfo, setCompanyInfo] = useState([]);
    const [companySubInfo, setCompanySubInfo] = useState([]);
    const [bookmark, setBookMark] = useState([]);
    const [isLike, setIsLike] = useState(false);
    const router = useRouter();
    const isReady = router.isReady;
    const address = companyInfo.company_address;
    const date = companyInfo.update;
    const date2 = companySubInfo.update_info;
    // 今開いてるcompanyページのcompanyIDをURLから取得ーーーーーここから
    let { id } = router.query;
    // 今開いてるcompanyページのcompanyIDをURLから取得ーーーーーここまで
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

    const getBookmark = useCallback(async () => {
      const { bookmark } = await getFlugDb(id);
      if (bookmark) {
        setBookMark(bookmark);
      } else {
        router.push('/');
      }
    }, [id, router]);

    const bookmarkButton = async () => {
      // if(!bookmark){
      let { data, error } = await supabase.from('flug').insert(
        [
          {
            company_id: id,
            user_id: user.id,
            bookmark: !bookmark ? true : !bookmark.bookmark,
            // bookmark: bookmark.bookmark,
          },
        ],
        { upsert: true }
      );

      // }
      // else{

      // // (bookmark.bookmark)=>{!bookmark.bookmark}

      //   ({data,error}=await supabase.from("flug").insert(
      //   [
      //     {company_id:id,
      //       user_id:user.id,
      //       bookmark:bookmark.bookmark,

      //     }
      //   ]
      // ))

      // }

      if (bookmark.bookmark == false) {
        setBookMark(bookmark);
        alert('お気に入りに登録しました！');
      } else {
        setBookMark(bookmark);
        alert('お気に入りを解除しました！');
      }
    };

    // likeButton画面のオンオフ---------------ここから
    // const likeButton = async () => {
    //   setIsLike((isLike) => !isLike);

    //   const { data, error } = await supabase.from('flug').insert(
    //     [
    //       {
    //         bookmark: isLike,
    //         user_id: user.id,
    //         company_id: id,
    //       },
    //     ],
    //     { upsert: true }
    //   );
    //   if (isLike == true) {
    //     alert('お気に入りに登録しました！');
    //   } else {
    //     alert('お気に入りを解除しました！');
    //   }
    // };
    // likeButton画面のオンオフ-----------------ここまで
    // likeButton画面のオンオフ---------------ここから

    //     console.log(bookmark);
    //     console.log('bookboookbookboookbookboookbookboookbookboookbookboook');
    //     const likeButton = async () => {

    //       // setIsLike((isLike) => !isLike);
    //       if (bookmark == null) {
    //         const { data, error } = await supabase.from('flug').insert(
    //           [
    //             {
    //               bookmark: isLike,
    //               user_id: user.id,
    //               company_id: id,
    //             },
    //           ]
    //           // { upsert: true }
    //         );
    //       } else {
    // if(isLike==true){setIsLike(false)}else
    //         setIsLike((true))
    //       }

    //       if (isLike == true) {
    //         alert('お気に入りに登録しました！');
    //       } else {
    //         alert('お気に入りを解除しました！');
    //       }
    //     };
    // likeButton画面のオンオフ-----------------ここまで

    // user_idをもったflugテーブル作成　ここから

    // const { data, error } = useCallback(() => {
    //   const { user } = Auth.useUser();
    //   supabase
    //     .from('flug')
    //     .insert([{ user_id: user.id, company_id: companyInfo.company_id }]);
    // }, []);

    // const getBookmark = useCallback(async () => {
    //   let { data: flug, error } = await supabase
    //     .from('flug')
    //     .select('bookmark')
    //     .eq('company_id', id)
    //     .single();
    //   setBookMark(flug);
    // }, []);

    // user_idをもったflugテーブル作成　ここまで
    // このページが表示される時に必ず実行される様にするーーーーーーーーーここから

    useEffect(() => {
      let unmounted = false;
      if (!id && isReady) {
        router.push('/');
      }
      getCompanyDBsData();
      // getBookmark();

      // clean up関数（Unmount時の処理）
      return () => {
        unmounted = true;
      };
    }, []);

    // -------------------------------
    // useEffect(() => {
    //   let unmounted = false;
    //   if (!id && isReady) {
    //     router.push('/');
    //   }

    //   // clean up関数（Unmount時の処理）
    //   return () => {
    //     unmounted = true;
    //   };
    // }, [getCompanyDBsData, id]);
    // このページが表示される時に必ず実行される様にするーーーーーーーーーここまで
    // {
    //   console.log(companySubInfo);
    // }
    // {
    //   console.log('ここは温泉街');
    // }

    {
      /* <useMapGeocode/> */
    }

    if (user) {
      return (
        <div>
          {/* {console.log(isLike)}
          {console.log(
            'console.log(isLike);console.log(isLike);console.log(isLike);'
          )} */}

          <div className="flex justify-end gap-2 my-2 mr-2">
            {/* 右端寄席のCSS */}

            {/* Backボタン表示　ここから */}
            <div className="w-24">
              <Button block size="medium" icon={<IconCornerDownLeft />}>
                {/* EDIT */}
                <ToolModal name="EDIT">
                  <EditCompany
                    companyInfo={companyInfo}
                    companySubInfo={companySubInfo}
                    id={id}
                  />
                </ToolModal>
              </Button>
            </div>
            {/* Backボタン表示　ここまで */}
            {/* Backボタン表示　ここから */}
            <div className="w-24">
              <Back>
                <Button block size="medium" icon={<IconCornerDownLeft />}>
                  BACK
                </Button>
              </Back>
            </div>
            {/* Backボタン表示　ここまで */}
          </div>
          <div className="flex flex-row-reverse">
            {console.log(date2)}
            {console.log('ここはいい色町一丁目')}
            <div>update:{date >= date2 ? date : date2}</div>
          </div>
          {/* ここから追加 */}
          <div className="font-mono bg-gray-400">
            {/* <!-- Container --> */}
            <div className="container mx-auto">
              <div className="flex justify-center px-6 my-12">
                {/* <!-- Row --> */}
                <div className="w-full xl:w-3/4 lg:w-11/12 flex">
                  {/* <!-- Col --> */}
                  <div
                    className="w-full h-auto bg-gray-400 hidden lg:block lg:w-5/12 bg-cover rounded-l-lg"
                    //  style="background-image: url('https://source.unsplash.com/Mv9hjnEUHR4/600x800')"
                    style={{
                      backgroundImage:
                        'url(https://source.unsplash.com/Mv9hjnEUHR4/600x800)',
                    }}
                  >
                    {/* <CommentBoard id={id} /> */}
                    <CommentBoard id={id} />
                  </div>
                  {/* <!-- Col --> */}
                  <div className="w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none">
                    <button className="float-right " onClick={bookmarkButton}>
                      {!bookmark.bookmark ? <FcLikePlaceholder /> : <FcLike />}
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
                            type="email"
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
                        <a href={companyInfo.URL} target="_blank">
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
                        <a href={companyInfo.job_url} target="_blank">
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
                      {/* <div className="text-center">
                        <a
                          className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                          href="#"
                        >
                          Forgot Password?
                        </a>
                      </div>
                      <div className="text-center">
                        <a
                          className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                          href="./index.html"
                        >
                          Already have an account? Login!
                        </a>
                      </div> */}
                      <div className="flex">
                        <div className="w-24 pr-3">
                          <Button
                            block
                            size="medium"
                            onClick={companyOptionButton}
                            // icon={<IconCornerDownLeft />}
                          >
                            <BsCardList />
                            option
                          </Button>
                        </div>
                        <div className="w-24">
                          <Button
                            block
                            size="medium"
                            onClick={toggle}
                            // icon={<IconCornerDownLeft />}
                          >
                            <GrMapLocation />
                            Map
                          </Button>
                        </div>
                        {/* <GrMap /> */}
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              {/* ---------------- */}

              {/* -------------------- */}

              {/* --------------------------- */}
              <div className="flex justify-center px-6 my-12">
                <div
                  className="
                
                "
                ></div>
              </div>
              {/* ---------- */}
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

              {/* ------------- */}
              <div className="flex justify-center px-6 my-12　 lg:hidden">
                {/* <!-- Row --> */}
                <div className="w-full xl:w-3/4 lg:w-11/12 flex">
                  {/* <CommentBoard id={id} /> */}
                  <CommentBoard id={id} />
                </div>
              </div>
            </div>
          </div>
          {/* ここまで追加 */}
        </div>
      );
    }
    return <div></div>;
  };

  return (
    <LayoutWrapper>
      <Auth.UserContextProvider supabaseClient={supabase}>
        <Container
        //  id={id}
        />
      </Auth.UserContextProvider>
    </LayoutWrapper>
  );
};

export default companyInfo;
