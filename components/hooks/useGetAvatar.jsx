import { useCallback, useEffect, useState } from 'react';
import { supabase } from 'utils/supabaseClient';
// import Image from 'next/image';
export const useGetAvatar = (id) => {
  const [avatar_url, setAvatarUrl] = useState('');
  const [avatarImage, setAvatarImage] = useState('');

  const userId = id;

  const getUserDb = useCallback(async () => {
    if (!userId) {
      return;
    }
    try {
      const { data, error, status } = await supabase
        .from('user')
        .select(`*`)
        .eq('user_id', userId)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      alert(error.message);
    }
  }, []);
  const downloadImage = useCallback(
    async (path) => {
      try {
        const { data, error } = await supabase.storage
          .from('avatars')
          .download(path);
        if (error) {
          throw error;
        }

        let reader = new FileReader();
        reader.readAsDataURL(data); // blob を base64 へ変換し onload を呼び出します

        reader.onload = () => {
          setAvatarImage(reader.result);
        };
      } catch (error) {
        console.log('Error downloading image: ', error.message);
      }
    },
    [avatar_url]
  );

  useEffect(() => {
    // eslint-disable-next-line no-unused-vars
    let unmounted = false;
    return () => {
      unmounted = true;
    };
  }, []);

  useEffect(() => {
    getUserDb(userId);
    if (avatar_url) {
      downloadImage(avatar_url);
    }
  }, [userId, avatar_url]);
  console.log('useGetAvatar');
  return avatarImage;
};
