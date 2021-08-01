import { Auth, Button, IconCornerDownLeft } from '@supabase/ui';
import { Back } from 'components/back';
import { Map } from 'components/map';
import { useMapGeocode } from 'components/useMapGeocode';
import { CommentBoard } from 'components/CommentBoard';
import Image from 'next/image';
import router, { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState, VFC } from 'react';
import { supabase } from 'utils/supabaseClient';
// import { EditTitle } from '../components/editTitle';
import { LayoutWrapper } from '../components/layoutWrapper';
import { EditCompany } from 'components/EditCompany';
// import { SubtitleList } from '../components/subtitleList';

// 企業情報と企業情報補助のDBを取ってくる関数（ただし表示される企業情報のURL＝IDが必要）ここからーーーーーーーーーーーーーーーーーーーーここから
const getCompanyDB = async (id) => {
  let { data, error } = await supabase
    .from('企業情報')
    .select('*')
    .eq('id', id);

  // .single();
  if (!error && data) {
    const companyInfo = data[0];
    // console.log(companyInfo);
    // console.log('取ってきたdataだよ');
    ({ data, error } = await supabase
      .from('企業情報補助')
      .select('*')
      .eq('企業情報_id', id));
    if (!error && data) {
      console.log(data);
      console.log('111111111111111');
      return { companyInfo: companyInfo, companySubInfo: data }; // 企業情報DBはある企業情報補助DBある
    } else {
      console.log('222222222222');
      return { companyInfo: companyInfo, companySubInfo: null };
    }
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

    const [companyProf, setCompanyProf] = useState({});
    const router = useRouter();

    // 今開いてる企業情報ページの企業情報IDをURLから取得ーーーーーここから
    let { id } = router.query;
    // console.log(id);
    // console.log('idだよ');
    // 今開いてる企業情報ページの企業情報IDをURLから取得ーーーーーここまで

    // 企業情報を取ってくる関数をコールバックしておくーーーーーーーーーーーーーーーーーーーーここから
    // const getCompany = useCallback(async () => {
    //   const { data, error } = await supabase
    //     .from('企業情報')
    //     .select('*')
    //     .eq('id', id)
    //     .single();
    //   if (!error && data) {
    //     console.log(data.URL);
    //     console.log('取ってきたdataだよ');
    //     return data;
    //   }
    // }, [id]);

    // 企業情報を取ってくる関数をコールバックしておくーーーーーーーーーーーーーーーーーーーーここまで
    // 取得した企業情報DBと企業情報補助DBのデータを利用しやすいように定数に格納する　ここからーーーーーーーーーーーーー
    const getCompanyDBsData = useCallback(async () => {
      if (id) {
        const { companyInfo, companySubInfo } = await getCompanyDB(id);

        if (companyInfo) {
          console.log(companyInfo);
          console.log('companyInfoeeeeeeeeeeeeeeeee');
          setCompanyInfo(companyInfo);
          // console.log(companyInfo);
          // console.log('companyInfoです');
        } else {
          // console.log(companyInfo);
          // console.log('companyInfoです');
          console.log('失敗だダダダだダダダダダダダダd');
          router.push('/');
        }
        if (companySubInfo) {
          console.log(companySubInfo);
          setCompanySubInfo(companySubInfo);
        }

        console.log('到達点じゃいいいいいいいいいいいいいい');
      }
    }, [id, router]);

    // console.log('companySubInfoeeeeeeeeeee');
    // console.log(companyInfo);
    // console.log(companySubInfo);
    // 取得した企業情報DBと企業情報補助DBのデータを利用しやすいように定数に格納する　ここまでーーーーーーーーーーーーー
    // このページが表示される時に必ず実行される様にするーーーーーーーーーここから
    useEffect(() => {
      if (!id) {
        router.push('/');
      }
      getCompanyDBsData();
      // getCompany();
    }, [getCompanyDBsData, id, router]);
    // このページが表示される時に必ず実行される様にするーーーーーーーーーここまで

    // const companyName = companyProf.会社名;
    const address = companyProf.住所;
    console.log(address);
    console.log('addresssssssssssssssss');
    const a = companyInfo.住所;
    console.log(a);
    console.log('aaaaaaaaaaaaaaaaaaaaaaaaa');

    console.log('companyProfのログ');

    {
      /* <useMapGeocode/> */
    }
    useEffect(async () => {
      console.log('マウントされた時');
      const { data, error } = await supabase
        .from('企業情報')
        .select('*')
        .eq('id', id)
        .single();

      setCompanyProf(data);
      // --------------

      // ^^^^^^^^^^^^^^^^
      return () => {
        console.log('アンマウントされた時');
      };
    }, []);
    const ur = 'https://www.tbs.co.jp/anime/dagashi/';
    if (user) {
      return (
        <div>
          <div className="flex justify-end gap-2 my-2 mr-2">
            {/* 右端寄席のCSS */}
            {/* Backボタン表示　ここから */}
            <div className="w-24">
              <Back>
                <Button block size="medium" icon={<IconCornerDownLeft />}>
                  EDIT
                </Button>
              </Back>
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
                    <CommentBoard id={id} />
                  </div>
                  {/* <!-- Col --> */}
                  <div className="w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none">
                    <h3 className="pt-4 text-2xl text-center">
                      <Image
                        width={40}
                        height={40}
                        layout={'intrinsic'}
                        alt="companyicon"
                        src="/company2.png"
                        className="z-1"
                      />
                      {companyProf.会社名}
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
                            id="email"
                            type="email"
                          >
                            {companyProf.住所}
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
                            {companyProf.電話番号}
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
                            id="email"
                            type="email"
                          >
                            {companyProf.資本金}万円
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
                            {companyProf.社員数}人
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
                            id="email"
                            type="email"
                          >
                            {companyProf.設立日}
                          </div>
                        </div>
                      </div>
                      {/* 　項目ここまで */}
                      <button
                        className="w-full px-4 py-2 font-bold text-white
                         bg-blue-500 rounded-full hover:bg-blue-700 
                         focus:outline-none focus:shadow-outline
                         "
                        type="button"
                      >
                        <a href={companyProf.URL} target="_blank">
                          Webサイトへ
                        </a>
                      </button>
                      <hr className="mb-6 border-t" />
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
                    </form>
                  </div>
                </div>
              </div>
              {/* ---------------- */}
              <div className="flex justify-center px-6 my-12　 lg:hidden">
                {/* <!-- Row --> */}
                <div className="w-full xl:w-3/4 lg:w-11/12 flex">
                  <CommentBoard id={id} />
                </div>
              </div>
              {/* -------------------- */}
              <div className="flex justify-center px-6 my-12">
                {/* <!-- Row --> */}
                <div className="w-full xl:w-3/4 lg:w-11/12 flex">
                  {/* <Map
                // address={address}
                /> */}
                  {/* {(console.log(address), console.log('住所'))} */}
                  {/* <Map address={address} /> */}
                </div>
              </div>
            </div>
          </div>
          {/* ここまで追加 */}
          {/* <EditCompany data={companyProf} /> */}
          {/* "http://capture.heartrails.com/free?https://www.tbs.co.jp/anime/dagashi/"
          "https://www.tbs.co.jp/anime/dagashi/" */}

          <img
            // title="TVアニメ『だがしかし2』公式ホームページ｜TBSテレビ"
            // src="http://capture.heartrails.com/free?"
            // src="http://capture.heartrails.com/free?https://www.shogakukan.co.jp/pr/dagashikashi/"
            src="http://capture.heartrails.com/200x150/cool?https://www.tbs.co.jp/anime/dagashi/"
            // width="200"
            // height="300"
          />
          <img
            // この？の先にURL入れる
            // src="http://capture.heartrails.com/free?"
            // サイズがフリー
            // src="http://capture.heartrails.com/free?https://www.shogakukan.co.jp/pr/dagashikashi/"
            // サイズが200X150
            src="http://capture.heartrails.com/200x150/cool?https://www.tbs.co.jp/anime/dagashi/"
          />
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
