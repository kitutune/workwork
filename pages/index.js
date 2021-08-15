//　更新します
import { Auth, Button, IconLogOut } from '@supabase/ui';
import React, { useCallback, useEffect, useState } from 'react';
import { supabase } from 'utils/supabaseClient';
import { FcLikePlaceholder, FcLike } from 'react-icons/fc';
import { LayoutWrapper } from 'components/LayoutWrapper';
import { CompanyList } from 'components/companyList';

const getBookmarkWithDb = async () => {
  console.log('22');
  const { data, error } = await supabase
    .from('company_info_flug')
    .select('*')
    .eq('user_id', user.id)
    .eq('bookmark', true);
  return data;
};

const getDb = async () => {
  console.log('44');
  const { data, error } = await supabase.from('company_info_flug').select('*');
  return data;
};

const Container = (props) => {
  const { user } = Auth.useUser();

  const [allData, setAllData] = useState();
  const [bookmark, setBookmark] = useState(false);
  const [text, setText] = useState('');

  const bookmarkButton = () => {
    setBookmark((bookmark) => !bookmark);
  };
  console.log(bookmark);
  const getCompanyList = useCallback(async () => {
    console.log('getCompanyList2');
    console.log(user);
    console.log(bookmark);
    console.log('getCompanyList1');
    if (user) {
      if (bookmark) {
        const data = await getBookmarkWithDb();
        setAllData(data);
      } else {
        const data = await getDb();
        setAllData(data);
      }
    }
  }, [user]);

  useEffect(async () => {
    await getCompanyList();
  }, [user, getCompanyList, bookmark]);

  useEffect(() => {
    let unmounted = false;
    //クリーンアップ関数を返す
    return () => {
      unmounted = true;
    };
  });

  console.log('index');
  if (user && allData) {
    return (
      <div>
        {console.log(allData)}
        {console.log('indexのallData')}
        <div className="flex justify-center gap-2 p-4">
          <input
            className="w-full h-12 px-4 bg-white border border-gray-300 rounded shadow appearance-none hover:border-gray-700"
            placeholder="Filtering text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <button onClick={bookmarkButton}>
            {bookmark ? <FcLike /> : <FcLikePlaceholder />}
          </button>
        </div>
        {/* {loading ? <div>loading...</div> : <>aa</>} */}
        <CompanyList
          allData={allData}
          // companyNames={companyNames}
          uuid={user.id}
          getCompanyList={getCompanyList}
          filterText={text}
        />
        <div className="flex justify-end mx-2 my-4">
          <Button
            size="medium"
            icon={<IconLogOut />}
            onClick={() => supabase.auth.signOut()}
          >
            Sign out
          </Button>
        </div>
      </div>
    );
  }
  return <>{props.children}</>;
};

const Home = () => {
  return (
    <LayoutWrapper>
      <Auth.UserContextProvider supabaseClient={supabase}>
        <Container>
          <div className="flex justify-center pt-8">
            <div className="w-full sm:w-96">
              <Auth
                supabaseClient={supabase}
                providers={['github']}
                socialColors={true}
              />
            </div>
          </div>
        </Container>
      </Auth.UserContextProvider>
    </LayoutWrapper>
  );
};

export default Home;
