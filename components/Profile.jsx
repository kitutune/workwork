import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Button } from '@supabase/ui';
import { supabase } from 'utils/supabaseClient';

export const Profile = (props) => {
  const [uploadedFile, setUploadedFile] = useState({});

  const [userProf, setUserProf] = useState({});
  const [preview, setPreview] = useState('');

  const name = useRef(null);
  const age = useRef(null);
  const imgData = useRef(null);
  const memo = useRef(null);

  const onChange = async (e) => {
    setUploadedFile(e.target.files[1]);
    const selectedFile = e.target.files[0];
    const reader = new FileReader();

    const imgtag = imgData.current;
    // imgtag.title = selectedFile.name;
    reader.onload = function (event) {
      imgtag.src = event.target.result;
    };
    reader.readAsDataURL(selectedFile);
  };
  // console.log(userProf);
  // console.log('userProfの情報来てる？');
  // console.log(imgData.src);
  // console.log('現在のimgData');
  // console.log(imgData);
  // console.log('現在のimgData');
  // console.log(imgtag.src);
  // console.log('画像の正体はその２？');
  const handleAdd = useCallback(async () => {
    if (name.current.value == '') {
      alert('名前を入力してください!');
      return;
    }

    const { data, error } = await supabase.from('user').insert(
      [
        {
          user_id: props.uuid,
          user_name: name.current.value,
          // icon: icon.current.value,
          // icon: preview,
          icon: imgtag.length === undefined ? userProf.icon : imageSrc,
          age: age.current.value,
          remarks: memo.current.value,
        },
      ],
      { upsert: true }
    );
    alert('登録完了');
  }, [name, age, preview, memo, imgData]);

  useEffect(() => {
    let unmounted = false;
    // clean up関数（Unmount時の処理）
    return () => {
      console.log('アンマウント');
      unmounted = true;
    };
  }, []);
  useEffect(async () => {
    const { data, error } = await supabase
      .from('user')
      .select('*')
      .eq('user_id', props.uuid)
      .single();
    console.log(props.uuid);
    console.log(data);
    console.log('ユーザーを読み込んでいます');
    setUserProf(data);
  }, [props.uuid]);
  useEffect(() => {
    if (userProf) {
      name.current.value = userProf['user_name'];
      // icon.current.value = userProf['icon'];
      // setPreview(userProf.icon);
      age.current.value = userProf['age'];
      memo.current.value = userProf['remarks'];
    }
  }, [userProf]);

  // console.log(!!{});
  // console.log(icon.current.value);
  // console.log(icon);
  console.log('画像');
  console.log(preview);
  console.log('画像イメージはあるか？');
  const handleChangeFile = (e) => {
    const { files } = e.target;
    setPreview(window.URL.createObjectURL(files[0]));
  };

  return (
    <div>
      {/* <img
        ref={imgData}
        // id="myimage"
        width={30}
        height={30}
        // className="z-negative"
      /> */}
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
            <div
              // onClick={iconChangeButton}
              className="w-20 mx-auto mb-5"
            >
              {!imgData.src ? (
                <Image src="/favicon.ico" width={80} height={80} />
              ) : (
                <img id="myimage" ref={imgData} width={80} height={80} />
              )}

              {/* <img src={userProf.icon} width={80} height={80} /> */}
            </div>

            <div className="text-center">
              <input
                //  ref={icon}
                type="file"
                onChange={onChange}
              />
            </div>
            {/* )} */}
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
            {/* <div className="grid grid-cols-4 gap-2 mt-4">
              <div className="col-span-1 text-xl text-center">アイコン</div>
              <input
                className="w-full h-10 col-span-3 p-2 bg-white border border-gray-300 rounded shadow appearance-none hover:border-gray-700"
                // ref={icon}
              />
            </div> */}
            {/* <div className="z-negative absolute border-none"> */}
            <img
              src={userProf.icon}
              width={0}
              height={0}
              // className="z-negative"
            />
            <img src={userProf.icon} width={80} height={80} />
            <img src={imgData.src} width={80} height={80} />
            {/* </div> */}
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
                <Button block size="large" onClick={() => handleAdd()}>
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
