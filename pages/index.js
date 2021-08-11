import { Auth, Button, IconLogOut } from '@supabase/ui';
import React, { useCallback, useEffect, useState } from 'react';
import { supabase } from 'utils/supabaseClient';
import { CompanyList } from 'components/CompanyList';
import { FcLikePlaceholder, FcLike } from 'react-icons/fc';
import { LayoutWrapper } from 'components/LayoutWrapper';
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
  const [text, setText] = useState('');
  const [companyNames, setCompanyNames] = useState([]);

  const getCompanyList = useCallback(async () => {
    const data = await getCompany();
    setCompanyNames(data);
  }, []);
  const bookmarkButton = useCallback(async () => {
    setBookmark((bookmark) => !bookmark);
  }, []);
  useEffect(() => {
    getCompanyList();
  }, [user, getCompanyList]);

  useEffect(async () => {
    if (user) {
      if (bookmark) {
        const { data, error } = await supabase
          .from('company_info_flug')
          .select('*')
          .eq('user_id', user.id)
          .eq('bookmark', true);
        setAllData(data);
      } else {
        const { data, error } = await supabase
          .from('company_info_flug')
          .select('*');
        setAllData(data);
      }
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

          <button onClick={bookmarkButton}>
            <FcLike />
          </button>
        </div>
        {allData.length === undefined ? (
          <div></div>
        ) : (
          <CompanyList
            allData={allData}
            companyNames={companyNames}
            uuid={user.id}
            getCompanyList={getCompanyList}
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
