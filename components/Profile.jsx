import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Button } from '@supabase/ui';
import { supabase } from 'utils/supabaseClient';

// const { user } = Auth.useUser();
// <Profile uuid={user.id} />
// これらを入れる必要あり

export const Profile = (props) => {
  const [userProf, setUserProf] = useState({});
  const [preview, setPreview] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const name = useRef(null);
  const age = useRef(null);
  const icon = useRef(null);
  const memo = useRef(null);

  const uuid = props.uuid;
  // console.log(userProf);
  // console.log('useProfのログ');
  const handleAdd = useCallback(
    async (uuid) => {
      if (name.current.value == '') {
        alert('名前を入力してください!');
        return;
      }

      const { data, error } = await supabase.from('user').insert(
        [
          {
            user_id: uuid,
            user_name: name.current.value,
            icon: icon.current.value,
            age: age.current.value,
            remarks: memo.current.value,
          },
        ],
        { upsert: true }
      );
      alert('登録完了');
      // alert(uuid);
      // alert(name.current.value);
      // alert(icon.current.value);
      // alert(age.current.value);
      // alert(memo.current.value);
    },
    [name, age, icon, memo]
  );
  useEffect(async () => {
    const { data, error } = await supabase
      .from('user')
      .select('*')
      .eq('user_id', uuid)
      .single();
    console.log(uuid);
    console.log(data);
    console.log('ユーザーを読み込んでいます');
    setUserProf(data);
    // setUserProf(data[0] || {});
  }, [uuid]);
  useEffect(() => {
    name.current.value = userProf['user_name'];
    icon.current.value = userProf['icon'];
    age.current.value = userProf['age'];
    memo.current.value = userProf['remarks'];
  }, [userProf]);
  // console.log(!!{});
  console.log('画像');
  console.log(preview);
  console.log('画像イメージはあるか？');
  const handleChangeFile = (e) => {
    const { files } = e.target;
    setPreview(window.URL.createObjectURL(files[0]));
  };
  const iconChangeButton = () => {
    setIsOpen((isOpen) => !isOpen);
  };
  console.log(isOpen);

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

          <div
            onClick={iconChangeButton}
            // onChange={handleChangeFile}
            className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform border border-gray-300 shadow-xl bg-gray-50 rounded-xl"
          >
            <header className="w-20 mx-auto mb-5">
              {preview == '' ? (
                <Image
                  src="/favicon.ico"
                  // src={preview}
                  width={80}
                  height={80}
                />
              ) : (
                <img
                  // src="/favicon.ico"
                  src={preview}
                  width={80}
                  height={80}
                />
              )}
              {/* <Image
                // src="/favicon.ico"
                src={preview}
                width={80}
                height={80}
              /> */}
            </header>
            {isOpen === false ? (
              <></>
            ) : (
              <div className="text-center">
                <input type="file" onChange={handleChangeFile} />
              </div>
            )}
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
              <div className="col-span-1 text-xl text-center">備考欄</div>
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
                  {userProf['user_name'] ? '更新' : '新規登録'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
