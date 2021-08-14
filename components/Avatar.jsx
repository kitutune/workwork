import { useEffect, useState } from 'react';
// import { supabase } from '../utils/supabaseClient';
import Image from 'next/image';
import { supabase } from 'utils/supabaseClient';

export default function Avatar({ url, size, onUpload }) {
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (url) downloadImage(url);
  }, [url]);

  async function downloadImage(path) {
    // console.log(path);
    console.log('pathpath');
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
  // console.log(avatarUrl);
  // console.log('avatarUrl');

  async function uploadAvatar(event) {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.');
      }

      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      let { error: uploadError } = await supabase.storage
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
  }

  return (
    <div>
      {avatarUrl ? (
        <Image src={avatarUrl} alt="Avatar" width={80} height={80} />
      ) : (
        <Image src="/human.png" alt="NoAvatar" width={80} height={80} />
      )}
      <div className="text-center">
        <label className="button primary block" htmlFor="single">
          {uploading ? 'Uploading ...' : 'upload'}
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
}
