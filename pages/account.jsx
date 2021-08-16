import { useRouter } from 'next/router';
import Router from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { supabase } from 'utils/supabaseClient';
import Image from 'next/image';
const Account = () => {
  const router = useRouter();
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [prof, setProf] = useState({});
  let { id } = router.query;

  const getProf = async (id) => {
    console.log(id);
    if (id) {
      const { data, error } = await supabase
        .from('user')
        .select('*')
        .eq('user_id', id)
        .single();

      setProf(data);
    }
  };
  const back = useCallback(() => {
    Router.back();
  }, []);

  async function downloadImage(path) {
    try {
      const { data, error } = await supabase.storage
        .from('avatars')
        .download(path);

      if (error) {
        throw error;
      }
      // const url = URL.createObjectURL(data);
      // console.log(url);
      // console.log('urlurl');

      let reader = new FileReader();
      reader.readAsDataURL(data); // blob を base64 へ変換し onload を呼び出します

      reader.onload = function () {
        // link.href = reader.result; // data url
        setAvatarUrl(reader.result);
        // link.click();
      };

      // setAvatarUrl(url);
    } catch (error) {
      console.log('Error downloading image: ', error.message);
    }
  }

  useEffect(async () => {
    const data = await getProf(id);
  }, [id]);

  useEffect(() => {
    if (prof.avatar_url) {
      downloadImage(prof.avatar_url);
    }
  }, [prof.avatar_url]);
  console.log(prof);
  console.log(prof.avatar_url);
  console.log('prof.avatar_url');
  if (prof && avatarUrl) {
    return (
      // <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div>
        {avatarUrl ? (
          <Image
            src={avatarUrl}
            alt="Avatar"
            // className="w-12 min-w-3rem"
            width={80}
            height={80}
          />
        ) : (
          <Image
            // className="w-12 min-w-3rem "
            src="/human.png"
            alt="NoAvatar"
            width={80}
            height={80}
          />
        )}
        <div className="absolute　w- p-6 bg-white rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all transform duration-500">
          {/* <img
                className="w-64 object-cover rounded-t-md"
                src="https://images.unsplash.com/photo-1509223197845-458d87318791"
                alt=""
              /> */}
          {/* <Image
              src={props.avatar_url}
              alt="Avatar"
              //   className="w-12 min-w-3rem"
              width={80}
              height={80}
            /> */}
          <div className="mt-4">
            <h1 className="text-2xl font-bold text-gray-700">
              {prof.user_name}
            </h1>
            <p className="text-sm mt-2 text-gray-700">{prof.age}</p>
            <div className="mt-3 space-x-4 flex p-1">{prof.remarks}</div>
            <div className="mt-4 mb-2 flex justify-between pl-4 pr-2">
              <button
                onClick={back}
                className="text-lg block font-semibold py-2 px-6 text-white hover:text-green-100 bg-green-400 rounded-lg shadow hover:shadow-md transition duration-300"
              >
                閉じる
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return <></>;
};
export default Account;
