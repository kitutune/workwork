import { useGetAvatar } from './hooks/useGetAvatar';
import Image from 'next/image';

export const AvatarImage = (props) => {
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
};
