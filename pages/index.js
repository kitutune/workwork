import { Auth, Button, IconLogOut } from '@supabase/ui';
import React, { useCallback, useEffect, useState } from 'react';
import { supabase } from 'utils/supabaseClient';
import { FcLikePlaceholder, FcLike } from 'react-icons/fc';
import { CompanyList } from 'components/companyList';

const getBookmarkWithDb = async (user) => {
  // console.log('indexのbookmarkある方');
  // console.log(bookmark);
  // console.log(user);
  // console.log('indexのbookmarkある方2');
  try {
    const { data, error, status } = await supabase
      .from('company_info_flug')
      .select('*')
      .eq('user_id', user.id)
      .eq('bookmark', true);
    if (error && status !== 406) {
      throw error;
    }
    if (data) {
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

const getDb = async () => {
  try {
    // console.log('indexのbookmarkないほう');
    const { data, error, status } = await supabase
      .from('company_info_flug')
      .select('*');

    if (error && status !== 406) {
      throw error;
    }
    if (data) {
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

const getuser = async (user) => {
  if (!user) {
    return;
  }
  try {
    const { data, error } = await supabase
      .from('user')
      .select('*')
      .eq('user_id', user.id);
    if (data.length === 0) {
      setuser(user);
      console.log('userをDBに登録します');
    }
    if (error) {
      throw error;
    }
  } catch (error) {
    console.log('userの読み込みに失敗しました！');
  }
};

const setuser = async (user) => {
  if (!user) {
    return;
  }
  try {
    const { data, error, status } = await supabase
      .from('user')
      .insert([{ user_id: user.id }]);
    if (status === 409) {
      console.log('既に登録されているuserです！');
      return;
    }
    if (error && status !== 406) {
      throw error;
    }
    if (data) {
      return data;
    }
  } catch (error) {
    console.log('userの読み込みに失敗しました！');
  }
};

const Container = (props) => {
  const { user } = Auth.useUser();

  const [allData, setAllData] = useState({});
  const [bookmark, setBookmark] = useState(false);
  const [text, setText] = useState('');

  const bookmarkButton = () => {
    setBookmark((bookmark) => !bookmark);
  };

  const getCompanyList = useCallback(async () => {
    // console.log('indexのgetCompanyList');
    if (user) {
      console.log('1');
      if (bookmark) {
        console.log('2');
        const data = await getBookmarkWithDb(user, bookmark);
        setAllData(data);
      } else {
        console.log('3');
        const data = await getDb(user);
        setAllData(data);
      }
    }
  }, [user, bookmark]);

  useEffect(() => {
    getuser(user);
    getCompanyList();
  }, [user, getCompanyList, bookmark]);

  useEffect(() => {
    // eslint-disable-next-line no-unused-vars
    let unmounted = false;
    //クリーンアップ関数を返す
    return () => {
      unmounted = true;
    };
  });
  console.log('index');
  if (user && allData.length !== undefined) {
    return (
      <div>
        {/* {console.log(allData.length)} */}
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
  );
};

export default Home;
