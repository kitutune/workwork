import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Button } from '@supabase/ui';
import { supabase } from 'utils/supabaseClient';
import { Auth } from '@supabase/ui';
import Avatar from './Avatar';

export const Profile = (props) => {
  const { user } = Auth.useUser();

  const uuid = user.id;
  const [avatar_url, setAvatarUrl] = useState(null);
  const Container = (props) => {
    const [loading, setLoading] = useState(true);
    const [username, setUserName] = useState(null);
    const [age, setAge] = useState(null);

    const [remarks, setRemarks] = useState(null);
    // const [uploadedFile, setUploadedFile] = useState({});
    // const [userProf, setUserProf] = useState({});
    // const [preview, setPreview] = useState('');
    // const name = useRef(null);
    // const age = useRef(null);
    // const iconData = useRef(null);
    // const [iconUrl, setIconUrl] = useState('');
    // const memo = useRef(null);

    // const handleAdd = useCallback(
    //   async () => {
    //     // if (name.current.value == '') {
    //     //   alert('名前を入力してください!');
    //     //   return;
    //     // }

    //     const { data, error } = await supabase.from('user').insert(
    //       [
    //         {
    //           user_id: uuid,
    //           // user_name: name.current.value,
    //           // age: age.current.value,
    //           // remarks: memo.current.value,

    //           // user_name: name.current.value,

    //           // icon: iconUrl,

    //           // age: age.current.value,

    //           // remarks: memo.current.value,
    //         },
    //       ],
    //       { upsert: true }
    //     );
    //     alert('登録完了');
    //   },
    //   [
    //     // name, age, preview, memo, iconUrl
    //   ]
    // );

    useEffect(() => {
      let unmounted = false;
      // clean up関数（Unmount時の処理）
      return () => {
        console.log('アンマウント');
        unmounted = true;
      };
    }, []);

    // useEffect(async () => {
    //   const { data, error } = await supabase
    //     .from('user')
    //     .select('*')
    //     .eq('user_id', uuid)
    //     .single();
    //   console.log(uuid);
    //   console.log(data);
    //   console.log('ユーザーを読み込んでいます');
    //   setUserProf(data);
    // }, [uuid]);

    // useEffect(() => {
    //   if (userProf) {
    //     name.current.value = userProf['user_name'];
    //     // iconは直接srcにuserProf.iconとして入る
    //     age.current.value = userProf['age'];
    //     memo.current.value = userProf['remarks'];
    //   }
    // }, [userProf]);

    // -----------------------------------------------

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
    console.log(username);
    console.log(age);
    console.log(remarks);
    console.log(avatar_url);
    console.log('更新できているか？');
    async function updateProfile({ username, age, remarks, avatar_url }) {
      try {
        setLoading(true);
        const user = supabase.auth.user();

        const updates = {
          // user_id: user.id,
          // user_name: username,
          // age: age,
          // remarks: remarks,
          // avatar_url: avatar_url,
          user_id: user.id,
          user_name: username,
          age,
          remarks,
          avatar_url,
          // updated_at: new Date(),
        };

        let { error } = await supabase.from('user').upsert(updates, {
          returning: 'minimal', // Don't return the value after inserting
        });

        if (error) {
          throw error;
        }
      } catch (error) {
        alert(error.message);
      } finally {
        setLoading(false);
      }
    }

    useEffect(() => {
      getProfile();
    }, []);

    // -----------------------------------------------
    return (
      <div>
        <div
          as="div"
          // className="fixed inset-0 z-10 overflow-y-auto"
        >
          <div className="min-h-screen px-4 text-center border-2">
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform border border-gray-300 shadow-xl bg-gray-50 rounded-xl">
              <div className="w-20 mx-auto mb-5">
                {/* <img src={userProf.icon} width={80} height={80} /> */}
                <Avatar
                  url={avatar_url}
                  size={80}
                  onUpload={(url) => {
                    setAvatarUrl(url);
                    updateProfile({ username, avatar_url: url });
                  }}
                />{' '}
              </div>
              <div
                as="h3"
                className="text-2xl font-medium leading-6 text-center text-gray-900"
              >
                Profile
              </div>
              <div className="grid grid-cols-4 gap-2 mt-4">
                <div className="col-span-1 text-xl text-center">名前</div>
                <input
                  className="w-full h-10 col-span-3 p-2 bg-white border border-gray-300 rounded shadow appearance-none hover:border-gray-700"
                  // ref={name}
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
                  // ref={age}
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
              {/* ------------------------------------------------- */}
              {/* <div> */}
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
              {/* ------------------------------------------------- */}
              <div className="flex justify-center mt-4">
                <div className="w-32 p-2"></div>
                {/* <div className="w-32 p-2">
                  {userProf ? (
                    <Button block size="large" onClick={() => handleAdd()}>
                      {userProf['user_name'] ? '更新' : '新規登録'}
                    </Button>
                  ) : (
                    <></>
                  )}
                </div> */}
                <div className="w-32 p-2">
                  {/* {userProf ? ( */}
                  <Button block size="large" onClick={() => handleAdd()}>
                    {username ? '更新' : '新規登録'}
                  </Button>
                  {/* ) : (
                    <></>
                  )} */}
                </div>
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
