import { Auth, Button, IconLogOut } from '@supabase/ui';
import React, { useCallback, useEffect, useState } from 'react';
import { LayoutWrapper } from '../components/layoutWrapper';
import { supabase } from 'utils/supabaseClient';
import { CompanyList } from 'components/companyList';
import { FcLikePlaceholder, FcLike } from 'react-icons/fc';
// companyテーブルのみ　ここから
const getCompany = async () => {
  const { data, error } = await supabase
    .from('company')
    .select('*')
    .order('company_name');
  if (!error && data) {
    return data;
  }
  return [];
};

const Container = (props) => {
  const { user } = Auth.useUser();
  const [allData, setAllData] = useState({});
  const [bookmark, setBookmark] = useState(false);
  // console.log(user);
  // console.log('indexのuser');
  // console.log(allData.length);
  // console.log('indexのallData');
  const [text, setText] = useState('');
  const [companyNames, setCompanyNames] = useState([]);

  const getCompanyList = useCallback(async () => {
    const data = await getCompany();
    setCompanyNames(data);
  }, []);
  const bookmarkButton = useCallback(async () => {
    // if (user) {
    //   const { data, error } = await supabase
    //     .ftom('company_info_flug')
    //     .eq('user_id', user.id)
    //     .eq('bookmark', true);
    //   return setAllData(data);
    // }
    setBookmark((bookmark) => !bookmark);
  }, []);
  console.log(bookmark);
  console.log('bookmark');
  useEffect(() => {
    getCompanyList();
  }, [user, getCompanyList]);

  useEffect(async () => {
    if (user && bookmark) {
      const { data, error } = await supabase
        .from('company_info_flug')
        .select('*')
        .eq('user_id', user.id)
        .eq('bookmark', true);
      setAllData(data);
      // console.log(data);
      // console.log('ALLdata');
    } else {
      const { data, error } = await supabase
        .from('company_info_flug')
        .select('*')
        .eq('user_id', user.id);
      setAllData(data);
      // console.log(data);
      // console.log('ALLdata');
    }
  }, [user, bookmark]);

  if (user) {
    return (
      <div>
        <div className="flex justify-center gap-2 p-4">
          <input
            className="w-full h-12 px-4 bg-white border border-gray-300 rounded shadow appearance-none hover:border-gray-700"
            placeholder="Filtering text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <button
            // className="float-right "
            onClick={bookmarkButton}
          >
            <FcLike />
          </button>
        </div>
        {/* {console.log(bookmark)}
        {console.log('bookmark')}
        {console.log(allData)}
        {console.log('allData')} */}
        {allData.length === undefined ? (
          <div></div>
        ) : (
          <CompanyList
            allData={allData}
            companyNames={companyNames}
            uuid={user.id}
            // getCompanyList={getCompanyList}
            filterText={text}
          />
        )}

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
