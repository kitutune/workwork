import { Auth, Button, IconCornerDownLeft } from '@supabase/ui';
import { Back } from 'components/back';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState, VFC } from 'react';
import { supabase } from 'utils/supabaseClient';
// import { EditTitle } from '../components/editTitle';
import { LayoutWrapper } from '../components/layoutWrapper';
// import { SubtitleList } from '../components/subtitleList';

const companyInfo = () => {
  const Container = () => {
    const { user } = Auth.useUser();
    const [companyProf, setCompanyProf] = useState({});
    const router = useRouter();
    let { id } = router.query;
    const companyName = companyProf.会社名;
    console.log(companyProf);
    console.log('companyProfのログ');
    console.log(companyName);
    // console.log(user);
    // console.log('companyinfoのuser');

    // console.log(router);

    // console.log(id);
    // console.log('ここまで');

    // -----------------A
    // const sample = async () => {
    //   let { data, error } = await supabase
    //     .from('企業情報')
    //     .select('*')
    //     .eq('id', id);
    //   // .single();
    //   // console.log(data);
    //   return data;
    // };

    // const data = useCallback(async () => await sample(), []);
    // console.log(sample());
    // console.log('別バージョンのsample');
    // console.log(sample);
    // -------------------AA
    // ------------------B
    useEffect(async () => {
      console.log('マウントされた時');
      const { data, error } = await supabase
        .from('企業情報')
        .select('*')
        .eq('id', id)
        .single();
      // console.log(data);
      setCompanyProf(data);
      // setCompanyProf(data[0] || {});
      // console.log(setCompanyProf(data));
      return () => {
        console.log('アンマウントされた時');
      };
    }, []);

    // ----------------------BB
    if (user) {
      return (
        <div>
          {/* {console.log(sample())} */}
          {/* {console.log({ data })} */}
          {/* {console.log(user)}
          {console.log('companyinfoのuser')}
         
          {console.log('sampleの中身')} */}
          {/* {console.log(data.最寄駅)} */}
          {/* {console.log('companyinfoのinfo　次にdata')} */}
          <div className="flex justify-end gap-2 my-2 mr-2">
            {/* 右端寄席のCSS */}

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

          <h1>aaaaa</h1>
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
                  ></div>
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
                            {companyProf.資本金}
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
                            {companyProf.社員数}
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

                      {/* 長い奴　ここから */}
                      {/* <div className="mb-4">
                        <label
                          className="block mb-2 text-sm font-bold text-gray-700"
                          // for="email"
                        >
                          Email{companyProf.電話番号}
                        </label>
                        <input
                          className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                          id="email"
                          type="email"
                          placeholder="Email"
                        />
                      </div> */}
                      {/* 長い奴　ここまで */}
                      {/* ーーーーー */}
                      {/* <Link href={companyProf.URL}>
                        <a target="_blank">HPに飛ぶ</a>
                      </Link> */}

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
                      <div className="text-center">
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
                      </div>
                    </form>
                  </div>
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
