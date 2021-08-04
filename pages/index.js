import { Auth, Button, IconLogOut } from '@supabase/ui';
import React, { useCallback, useEffect, useState } from 'react';
import { LayoutWrapper } from '../components/layoutWrapper';
import { supabase } from 'utils/supabaseClient';
import { CompanyList } from 'components/companyList';

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
// companyテーブルのみ　ここまで
// companyテーブルと flugのを合わせたテーブル　ここから
// const getCompany = async () => {
//   const { data, error } = await supabase
//     .from('company')
//     .select(
//       `
//     id,
//     flug (
//       "company_id"
//     )
//   `
//     )
//     .order('company_name');
//   if (!error && data) {
//     return data;
//   }
//   return [];
// };

// companyテーブルと flugのを合わせたテーブル　ここまで
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
        <div>aa</div>
        <div className="flex justify-center gap-2 p-4">
          <input
            className="w-full h-12 px-4 bg-white border border-gray-300 rounded shadow appearance-none hover:border-gray-700"
            placeholder="Filtering text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        {console.log(companyNames)}
        {console.log('companyNames')}
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
