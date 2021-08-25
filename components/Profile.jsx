import { useEffect, useState } from 'react';
import { Button } from '@supabase/ui';
import { supabase } from 'utils/supabaseClient';
import { Auth } from '@supabase/ui';
import { Avatar } from './avatar';

export const Profile = () => {
  const { user } = Auth.useUser();
  const user_id = user.id;
  const [avatar_url, setAvatarUrl] = useState('');

  const Container = () => {
    const [username, setUserName] = useState('');
    const [age, setAge] = useState('');
    const [remarks, setRemarks] = useState('');

    const getUserDb = async () => {
      try {
        const user = supabase.auth.user();

        const { data, error, status } = await supabase
          .from('user')
          .select(`*`)
          .eq('user_id', user.id)
          .single();

        if (error && status !== 406) {
          throw error;
        }

        if (data) {
          setUserName(data.user_name);
          setAge(data.age);
          setAvatarUrl(data.avatar_url);
          setRemarks(data.remarks);
        }
      } catch (error) {
        alert(error.message);
      }
    };

    const updateProfile = async ({ username, age, remarks, avatar_url }) => {
      try {
        const { error, status } = await supabase
          .from('user')
          .update({
            user_name: username,
            age: age,
            remarks: remarks,
            avatar_url: avatar_url,
          })
          .eq('user_id', user.id);
        if (error || status !== 200) {
          throw error;
        } else {
          alert('プロフィールを更新しました！');
        }
      } catch (error) {
        alert('プロフィールの更新に失敗しました');
      }
    };

    useEffect(() => {
      getUserDb();
    }, []);

    useEffect(() => {
      // eslint-disable-next-line no-unused-vars
      let unmounted = false;
      return () => {
        unmounted = true;
      };
    }, []);

    const nameSet = (e) => {
      return setUserName(e.target.value);
    };
    const ageSet = (e) => {
      return setAge(e.target.value);
    };
    const remarkSet = (e) => {
      return setRemarks(e.target.value);
    };
    const lists = ['名前', '年齢', '自己紹介'];
    const method = [username, age, remarks];
    const setMethod = [nameSet, ageSet, remarkSet];
    // console.log('Profile');
    return (
      <div>
        <div as="div">
          <div className="min-h-screen px-4 text-center border-2">
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform border border-gray-300 shadow-xl bg-gray-50 rounded-xl">
              <div className="w-20 mx-auto mb-5">
                <Avatar
                  url={avatar_url}
                  onUpload={(url) => {
                    setAvatarUrl(url);
                    updateProfile({ username, avatar_url: url });
                  }}
                />
              </div>
              {lists.map((list, i) => (
                <div className="grid grid-cols-4 gap-2 mt-4" key={list}>
                  <div className="col-span-1 text-xl text-center">{list}</div>
                  <input
                    className="w-full h-10 col-span-3 p-2 bg-white border border-gray-300 rounded shadow appearance-none hover:border-gray-700"
                    defaultValue={`${method[i]}` == null ? ' ' : `${method[i]}`}
                    onChange={setMethod[i]}
                  />
                </div>
              ))}
              <div className="w-20 p-2 mx-auto mb-5">
                <Button
                  size="large"
                  className="button block primary"
                  onClick={() =>
                    updateProfile({
                      username,
                      age,
                      remarks,
                      avatar_url,
                    })
                  }
                >
                  Update
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div>
      <div>{user_id ? <Container /> : <>loading・・・</>}</div>
    </div>
  );
};
