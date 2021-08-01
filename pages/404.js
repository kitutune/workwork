import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Image from 'next/image';
export default function Custom404() {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      router.push('/');
    }, 1000);

    return () => {};
  }, []);

  return (
    <>
      {/* 表示１秒後にホームにリダイレクト */}
      <div className="w-screen h-screen">
        <div className="pt-56">
          <Image
            src="/notfound.png"
            alt="sample"
            width={'473'}
            height={'116'}
            layout={'responsive'}
          />
        </div>
      </div>
    </>
  );
}
