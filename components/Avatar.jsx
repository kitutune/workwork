import { useEffect, useState } from 'react';
import Image from 'next/image';
import { supabase } from 'utils/supabaseClient';

export const Avatar = ({ url, onUpload }) => {
  const [avatarUrl, setAvatarUrl] = useState('');
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (url) downloadImage(url);
  }, [url]);

  const downloadImage = async (path) => {
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
        setAvatarUrl(reader.result);
      };
    } catch (error) {
      console.log('Error downloading image: ', error.message);
    }
  };

  const uploadAvatar = async (event) => {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.');
      }

      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      onUpload(filePath);
    } catch (error) {
      alert(error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="hover:opacity-50">
      <div className="text-center　">
        <label className="button primary block 　" htmlFor="single">
          {avatarUrl ? (
            <Image src={avatarUrl} alt="Avatar" width={80} height={80} />
          ) : (
            <Image src="/human.png" alt="NoAvatar" width={80} height={80} />
          )}
        </label>
        <input
          className="hidden"
          type="file"
          id="single"
          accept="image/*"
          onChange={uploadAvatar}
          disabled={uploading}
        />
      </div>
    </div>
  );
};
