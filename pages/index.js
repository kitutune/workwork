import { Auth, Button, IconLogOut } from '@supabase/ui';
import React, { ReactNode, useCallback, useEffect, useState } from 'react';
import { LayoutWrapper } from '../components/layoutWrapper';
import { supabase } from 'utils/supabaseClient';
import { CompanyList } from 'components/companyList';
import { CompanyEdit } from 'components/CompanyEdit';
import { Profile } from 'components/Profile';

const getCompany = async () => {
  const { data, error } = await supabase
    .from('企業情報')
    .select('*')
    .order('会社名');
  if (!error && data) {
    return data;
  }
  return [];
};

const Container = (props) => {
  const { user } = Auth.useUser();
  console.log(user);
  console.log('indexのuser');
  const [text, setText] = useState('');
  const [companyNames, setCompanyNames] = useState([]);

  const getCompanyList = useCallback(async () => {
    const data = await getCompany();
    setCompanyNames(data);
  }, []);

  useEffect(() => {
    getCompanyList();
  }, [user, getCompanyList]);

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
          {/* <CompanyEdit /> */}
          {/* <Profile /> */}
        </div>
        <CompanyList
          companyNames={companyNames}
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
