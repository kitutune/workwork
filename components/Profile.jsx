import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Button } from '@supabase/ui';
import { supabase } from 'utils/supabaseClient';
import { Auth } from '@supabase/ui';
import Avatar from './Avatar';

export const Profile = () => {
  const { user } = Auth.useUser();

  const uuid = user.id;
  const [avatar_url, setAvatarUrl] = useState('');
  const Container = () => {
    const [loading, setLoading] = useState(true);
    const [username, setUserName] = useState('');
    const [age, setAge] = useState(0);

    const [remarks, setRemarks] = useState('');

    useEffect(() => {
      let unmounted = false;
      // clean up関数（Unmount時の処理）
      return () => {
        console.log('アンマウント');
        unmounted = true;
      };
    }, []);

    async function getProfile() {
      try {
        setLoading(true);
        const user = supabase.auth.user();

        let { data, error, status } = await supabase
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
      } finally {
        setLoading(false);
      }
    }

    async function updateProfile({ username, age, remarks, avatar_url }) {
      try {
        setLoading(true);
        const user = supabase.auth.user();

        const updates = {
          user_id: user.id,
          user_name: username,
          age,
          remarks,
          avatar_url,
        };

        let { error } = await supabase.from('user').upsert(updates, {
          returning: 'minimal', // Don't return the value after inserting
        });

        if (error) {
          throw error;
        }
      } catch (error) {
        alert('年齢は数字で入力してください');
      } finally {
        setLoading(false);
      }
    }

    useEffect(() => {
      getProfile();
    }, []);

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
                  // size={80}
                  onUpload={(url) => {
                    setAvatarUrl(url);
                    updateProfile({ username, avatar_url: url });
                  }}
                />
              </div>
              <div className="grid grid-cols-4 gap-2 mt-4">
                <div className="col-span-1 text-xl text-center">名前</div>
                <input
                  className="w-full h-10 col-span-3 p-2 bg-white border border-gray-300 rounded shadow appearance-none hover:border-gray-700"
                  defaultValue={username}
                  onChange={(e) => {
                    return setUserName(e.target.value);
                  }}
                />
              </div>

              <div className="grid grid-cols-4 gap-2 mt-4">
                <div className="col-span-1 text-xl text-center">年齢</div>
                <input
                  className="w-full h-10 col-span-3 p-2 bg-white border border-gray-300 rounded shadow appearance-none hover:border-gray-700"
                  defaultValue={age}
                  onChange={(e) => {
                    return setAge(e.target.value);
                  }}
                />
              </div>
              <div className="grid grid-cols-4 gap-2 mt-4">
                <div className="col-span-1 text-xl text-center">備考欄</div>
                <textarea
                  className="w-full h-60 col-span-3 p-2 bg-white border border-gray-300 rounded shadow appearance-none hover:border-gray-700"
                  // ref={memo}
                  defaultValue={remarks}
                  onChange={(e) => {
                    return setRemarks(e.target.value);
                  }}
                />
              </div>
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
                  disabled={loading}
                >
                  {loading ? 'Loading ...' : 'Update'}
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
      <div>{uuid ? <Container /> : <></>}</div>
    </div>
  );
};
