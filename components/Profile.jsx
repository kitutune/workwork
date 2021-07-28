import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Button } from '@supabase/ui';
import { supabase } from 'utils/supabaseClient';

// const { user } = Auth.useUser();
// <Profile uuid={user.id} />
// これらを入れる必要あり

export const Profile = (props) => {
  const [userProf, setUserProf] = useState({});
  const name = useRef(null);
  const age = useRef(null);
  const icon = useRef(null);
  const memo = useRef(null);

  const uuid = props.uuid;
  console.log(userProf);
  console.log('useProfのログ');
  const handleAdd = useCallback(
    async (uuid) => {
      if (name.current.value == '') {
        alert('名前を入力してください!');
        return;
      }

      const { data, error } = await supabase.from('ユーザー').insert(
        [
          {
            id: uuid,
            名前: name.current.value,
            アイコン: icon.current.value,
            年齢: age.current.value,
            備考: memo.current.value,
          },
        ],
        { upsert: true }
      );
      alert('登録完了');
      alert(uuid);
      alert(name.current.value);
      alert(icon.current.value);
      alert(age.current.value);
      alert(memo.current.value);
    },
    [name, age, icon, memo]
  );
  useEffect(async () => {
    const { data, error } = await supabase
      .from('ユーザー')
      .select('*')
      .eq('id', uuid)
      .single();
    // console.log(data);
    setUserProf(data);
    // setUserProf(data[0] || {});
  }, []);
  useEffect(() => {
    name.current.value = userProf['名前'];
    icon.current.value = userProf['アイコン'];
    age.current.value = userProf['年齢'];
    memo.current.value = userProf['備考'];
  }, [userProf]);
  // console.log(!!{});
  return (
    <div>
      <div as="div" className="fixed inset-0 z-10 overflow-y-auto">
        <div className="min-h-screen px-4 text-center border-2">
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform border border-gray-300 shadow-xl bg-gray-50 rounded-xl">
            <header className="w-20 mx-auto mb-5">
              <Image src="/favicon.ico" width={80} height={80} />
            </header>

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
                ref={name}
              />
            </div>
            <div className="grid grid-cols-4 gap-2 mt-4">
              <div className="col-span-1 text-xl text-center">アイコン</div>
              <input
                className="w-full h-10 col-span-3 p-2 bg-white border border-gray-300 rounded shadow appearance-none hover:border-gray-700"
                ref={icon}
              />
            </div>
            <div className="grid grid-cols-4 gap-2 mt-4">
              <div className="col-span-1 text-xl text-center">年齢</div>
              <input
                className="w-full h-10 col-span-3 p-2 bg-white border border-gray-300 rounded shadow appearance-none hover:border-gray-700"
                ref={age}
              />
            </div>
            <div className="grid grid-cols-4 gap-2 mt-4">
              <div className="col-span-1 text-xl text-center">備考</div>
              <textarea
                className="w-full h-60 col-span-3 p-2 bg-white border border-gray-300 rounded shadow appearance-none hover:border-gray-700"
                ref={memo}
              />
            </div>
            <div className="flex justify-center mt-4">
              {/* 自由に機能をつけれるボタンを作成 */}
              {/* {props.button1 && (
                <div className="w-32 p-2">
                  <Button
                    block
                    type="default"
                    size="large"
                    onClick={props.button1osita}
                  >
                    {props.button1}
                  </Button>
                </div>
              )} */}
              <div className="w-32 p-2">
                {/* <CloseModal> */}
                {/* <Button
                  block
                  type="default"
                  size="large"
                  // onClick={props.close}
                >
                  Cancel
                </Button> */}
                {/* </CloseModal> */}
              </div>
              <div className="w-32 p-2">
                <Button block size="large" onClick={() => handleAdd(uuid)}>
                  {userProf['名前'] ? '更新' : '新規登録'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
