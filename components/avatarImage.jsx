import { useGetAvatar } from './hooks/useGetAvatar';
import Image from 'next/image';
import React from 'react';

// eslint-disable-next-line react/display-name
export const AvatarImage = React.memo((props) => {
  const Container = () => {
    const avatarImage = useGetAvatar(props.userId);

    console.log('AvatarImage');
    return (
      <div>
        <div>
          {avatarImage ? (
            <Image src={avatarImage} alt="Avatar" width={80} height={80} />
          ) : (
            <Image src="/human.png" alt="NoAvatar" width={80} height={80} />
          )}
        </div>
      </div>
    );
  };

  return <div>{props.userId ? <Container /> : <></>}</div>;
});
