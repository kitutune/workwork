import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { Avatar, AvatarBadge, AvatarGroup } from '@chakra-ui/react';
import { Auth, Button } from '@supabase/ui';
import { supabase } from 'utils/supabaseClient';

export const Profile = (props) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [icon, setIcon] = useState('');
  const [memo, setMemo] = useState('');
  const [user, setUser] = useState({});
  const uuid = props.uuid;
  console.log(user);
  const handleAdd = useCallback(
    async (uuid) => {
      if (name == '') {
        alert('名前を入力してください!');
        return;
      }

      const { data, error } = await supabase
        .from('ユーザー')
        .insert(
          [{ id: uuid, 名前: name, アイコン: icon, 年齢: age, 備考: memo }],
          { upsert: true }
        );
      alert('登録完了');
      alert(uuid);
      alert(name);
      alert(icon);
      alert(age);
      alert(memo);
    },
    [name, age, icon, memo]
  );
  useEffect(() => {
    supabase
      .from('ユーザー')
      .select('*')
      .eq('id', uuid)
      .then((DB) => setUser(DB.data[0] || {}));
  }, []);
  return (
    <div>
      <div
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        // onClose={closeModal}
      >
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
                value={name}
                onChange={(e) => {
                  return setName(e.target.value);
                }}
              />
            </div>
            <div className="grid grid-cols-4 gap-2 mt-4">
              <div className="col-span-1 text-xl text-center">アイコン</div>
              <input
                className="w-full h-10 col-span-3 p-2 bg-white border border-gray-300 rounded shadow appearance-none hover:border-gray-700"
                value={icon}
                onChange={(e) => {
                  return setIcon(e.target.value);
                }}
              />
            </div>
            <div className="grid grid-cols-4 gap-2 mt-4">
              <div className="col-span-1 text-xl text-center">年齢</div>
              <input
                className="w-full h-10 col-span-3 p-2 bg-white border border-gray-300 rounded shadow appearance-none hover:border-gray-700"
                value={age}
                onChange={(e) => {
                  return setAge(e.target.value);
                }}
              />
            </div>
            <div className="grid grid-cols-4 gap-2 mt-4">
              <div className="col-span-1 text-xl text-center">備考</div>
              <textarea
                className="w-full h-60 col-span-3 p-2 bg-white border border-gray-300 rounded shadow appearance-none hover:border-gray-700"
                value={memo}
                onChange={(e) => {
                  return setMemo(e.target.value);
                }}
              />
            </div>
            <div className="flex justify-center mt-4">
              <div className="w-32 p-2">
                <Button
                  block
                  type="default"
                  size="large"
                  // icon={<IconX />}
                  // onClick={closeModal}
                  onClick={props.logout}
                >
                  Cancel
                </Button>
              </div>
              <div className="w-32 p-2">
                <Button
                  block
                  size="large"
                  // icon={<IconPlus />}
                  onClick={
                    () => handleAdd(uuid)
                    // props.uuid
                  }
                >
                  {user['名前'] ? '更新' : '新規登録'}
                </Button>
              </div>
            </div>
          </div>
          {/* </Transition.Child> */}
        </div>
      </div>
    </div>
  );
};
