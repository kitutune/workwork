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

// import { BsCardList, GrMapLocation, GrMap } from 'react-icons/fa';
import { GrMapLocation, GrLike } from 'react-icons/gr';
import cc from 'classcat';
import { CommentB } from 'components/CommentBoard';
// 企業情報と企業情報補助のDBを取ってくる関数（ただし表示される企業情報のURL＝IDが必要）ここからーーーーーーーーーーーーーーーーーーーーここから
const getCompanyDB = async (id) => {
  let { data, error } = await supabase
    .from('企業情報')
    .select('*')
    .eq('id', id);

  if (!error && data) {
    const companyInfo = data[0];
    ({ data, error } = await supabase
      .from('企業情報補助')
      .select('*')
      .eq('企業情報_id', id));
    if (!error && data) {
      const companySubInfo = data[0];

      return { companyInfo: companyInfo, companySubInfo: companySubInfo }; // 企業情報DBはある企業情報補助DBある
    }
    // else {
    //   console.log('222222222222');
    //   return { companyInfo: companyInfo, companySubInfo: null };
    // }
  }
  console.log('333333333333333');
  return { companyInfo: null, companySubInfo: null };
};

// 企業情報と企業情報補助のDBを取ってくる関数（ただし表示される企業情報のURL＝IDが必要ここまでーーーーーーーーーーーーーーーーーーーーここまで

// Company Informationに変更
const companyInfo = () => {
  const Container = () => {
    const { user } = Auth.useUser();
    const [companyInfo, setCompanyInfo] = useState([]);
    const [companySubInfo, setCompanySubInfo] = useState([]);
    const [isLike, setIsLike] = useState(false);
    const router = useRouter();
    const isReady = router.isReady;
    // 今開いてる企業情報ページの企業情報IDをURLから取得ーーーーーここから
    let { id } = router.query;
    // 今開いてる企業情報ページの企業情報IDをURLから取得ーーーーーここまで
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
    const likeButton = async () => {
      setIsLike((like) => !like);

      const { data, error } = await supabase.from('flug').insert(
        [
          {
            ブックマーク: isLike,
            user_id: user.id,
            企業情報_id: id,
          },
        ],
        { upsert: true }
      );
      if (isLike == true) {
        alert('お気に入りに登録しました！');
      } else {
        alert('お気に入りを解除しました！');
      }
    };

    // 取得した企業情報DBと企業情報補助DBのデータを利用しやすいように定数に格納する　ここからーーーーーーーーーーーーー
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

    // 取得した企業情報DBと企業情報補助DBのデータを利用しやすいように定数に格納する　ここまでーーーーーーーーーーーーー
    // このページが表示される時に必ず実行される様にするーーーーーーーーーここから
    useEffect(() => {
      if (!id && isReady) {
        router.push('/');
      }
      getCompanyDBsData();
      // // clean up関数（Unmount時の処理）
      // return () => {
      //   unmounted = true;
      // };
    }, [getCompanyDBsData, id]);
    // このページが表示される時に必ず実行される様にするーーーーーーーーーここまで

    const address = companyInfo.住所;
    const date = companyInfo.更新日;
    const date2 = companySubInfo.更新日補助;
    {
      /* <useMapGeocode/> */
    }

    if (user) {
      return (
        <div>
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
            <div>更新日:{date >= date2 ? date : date2}</div>
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
                    <CommentB id={id} />
                  </div>
                  {/* <!-- Col --> */}
                  <div className="w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none">
                    <button className="float-right " onClick={likeButton}>
                      {!isLike ? <FcLike /> : <FcLikePlaceholder />}
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
                      {companyInfo.会社名}
                      {console.log(companyInfo)}
                      {console.log('ここはいい色町一丁目')}
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
                            {companyInfo.住所}
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
                            {companyInfo.電話番号}
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
                            {companyInfo.資本金}
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
                            {companyInfo.社員数}人
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
                            {companyInfo.設立日}
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
                        <a href={companyInfo.求人URL} target="_blank">
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
                                {companySubInfo.最寄駅}
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
                                {companySubInfo.アクセス}
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
                                {companySubInfo.代表的なアプリ名}
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
                                {companySubInfo.駐輪場}
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
                                {companySubInfo.バイク置き場}
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
                                {companySubInfo.駐車場}
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
                                {companySubInfo.備考欄}
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
                  <CommentB id={id} />
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
