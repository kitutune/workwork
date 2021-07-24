import { Auth, Button, IconCornerDownLeft } from '@supabase/ui';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState, VFC } from 'react';
import { supabase } from 'utils/supabaseClient';
// import { EditTitle } from '../components/editTitle';
import { LayoutWrapper } from '../components/layoutWrapper';
// import { SubtitleList } from '../components/subtitleList';
// import { Title as TitleType } from '../components/titleList';
// import { supabase } from '../libs/supabase';
// export type subtitle = {
//   id: number;
//   user_id: string;
//   title_id: number;
//   volume: number;
//   isbn: number;
//   image_url: string;
//   possession: boolean;
// };

const getCompanyInfo = async (id) => {
  let { data, error } = await supabase
    .from('企業情報')
    .select('*')
    .eq('id', id)
    .single(); //data[0]ではなくdataで良くなる
  // console.log(data);
  if (!error && data) {
    // const info = data[0];
    const info = data;
    ({ data, error } = await supabase
      .from('企業情報補助')
      .select('*')
      //   .order('volume', { ascending: true }) //{小さい方から大き方へ:true}
      .eq('企業情報', id)); //title_idはmanga_titleのid
    // console.log(info);
    // console.log(data);
    if (!error && data) {
      return { 会社名: data[0].会社名 || null, 最寄駅: 最寄駅 };
    } else {
      return { 会社名: data[0].会社名 || null, 最寄駅: null };
    }
  }
  return { 会社名: null, 最寄駅: null };
};

const companyInfo = () => {
  const Container = () => {
    const { user } = Auth.useUser();

    const [subtitles, setSubtitles] = useState([]);
    const [title, setTitle] = useState();

    const router = useRouter();
    console.log(router);
    let { id } = router.query;
    console.log(router.query);
    const getCompanyList = useCallback(async () => {
      if (id) {
        const { title, subtitles } = await getCompanyInfo(id.toString());
        console.log(title);
        console.log(subtitles);
        if (title) {
          setTitle(title);
        } else {
          router.push('/');
        }
        // ここから　追加したファイル表示（①がないと読みこれまない）
        if (subtitles) {
          setSubtitles(subtitles);
        }
        // ここまで　追加したファイル表示（①がないと読みこれまない）
      }
    }, [id, router]);
    // ここから　ファイルの表示
    useEffect(() => {
      if (!id) {
        router.push('/');
      }
      getCompanyList();
    }, [user, getCompanyList, id, router]);
    // ここまで　ファイルの表示①
    if (user) {
      return (
        <div>
          <div className="flex justify-end gap-2 my-2 mr-2">
            {' '}
            {/* 右端寄席のCSS */}
            {/* Editボタン表示　ここから */}
            {title && (
              <div className="w-24">
                {/* <EditTitle title={title} getCompanyList={getCompanyList} /> */}
              </div>
            )}
            {/* Editボタン表示　ここまで */}
            {/* Backボタン表示　ここから */}
            <div className="w-24">
              <Link href="/" passHref>
                <Button block size="medium" icon={<IconCornerDownLeft />}>
                  BACK
                </Button>
              </Link>
            </div>
            {/* Backボタン表示　ここまで */}
          </div>
          {/* このページフォルダのタイトル表示　ここから */}
          {/* {title && (
            <>
              <h2 className="pb-4 text-4xl font-bold text-center">
                {title.title}
              </h2>
              <p className="pb-4 text-2xl font-semibold text-center">
                {title.author}
              </p>
            </>
          )} */}
          {/* このページフォルダのタイトル表示　ここまで */}
          {/* {title && (
            <SubtitleList
              subtitles={subtitles}
              title={title}
              uuid={user.id}
              getCompanyList={getCompanyList}
            />
          )} */}
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
                    // style={{"backgroundImage: url('https://source.unsplash.com/Mv9hjnEUHR4/600x800')"}}
                  ></div>
                  {/* <!-- Col --> */}
                  <div className="w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none">
                    <h3 className="pt-4 text-2xl text-center">
                      Create an Account!
                    </h3>
                    <form className="px-8 pt-6 pb-8 mb-4 bg-white rounded">
                      <div className="mb-4 md:flex md:justify-between">
                        <div className="mb-4 md:mr-2 md:mb-0">
                          <label
                            className="block mb-2 text-sm font-bold text-gray-700"
                            for="firstName"
                          >
                            First Name
                          </label>
                          <input
                            className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                            id="firstName"
                            type="text"
                            placeholder="First Name"
                          />
                        </div>
                        <div className="md:ml-2">
                          <label
                            className="block mb-2 text-sm font-bold text-gray-700"
                            for="lastName"
                          >
                            Last Name
                          </label>
                          <input
                            className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                            id="lastName"
                            type="text"
                            placeholder="Last Name"
                          />
                        </div>
                      </div>
                      <div className="mb-4">
                        <label
                          className="block mb-2 text-sm font-bold text-gray-700"
                          for="email"
                        >
                          Email
                        </label>
                        <input
                          className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                          id="email"
                          type="email"
                          placeholder="Email"
                        />
                      </div>
                      <div className="mb-4 md:flex md:justify-between">
                        <div className="mb-4 md:mr-2 md:mb-0">
                          <label
                            className="block mb-2 text-sm font-bold text-gray-700"
                            for="password"
                          >
                            Password
                          </label>
                          <input
                            className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border border-red-500 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                            id="password"
                            type="password"
                            placeholder="******************"
                          />
                          <p className="text-xs italic text-red-500">
                            Please choose a password.
                          </p>
                        </div>
                        <div className="md:ml-2">
                          <label
                            className="block mb-2 text-sm font-bold text-gray-700"
                            for="c_password"
                          >
                            Confirm Password
                          </label>
                          <input
                            className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                            id="c_password"
                            type="password"
                            placeholder="******************"
                          />
                        </div>
                      </div>
                      <div className="mb-6 text-center">
                        <button
                          className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                          type="button"
                        >
                          Register Account
                        </button>
                      </div>
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
        <Container />
      </Auth.UserContextProvider>
    </LayoutWrapper>
  );
};

export default companyInfo;
