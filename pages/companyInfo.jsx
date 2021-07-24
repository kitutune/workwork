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
