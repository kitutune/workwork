import Link from 'next/link';

export const Back = (props) => {
  return (
    <div>
      <Link href="/" passHref>
        <div>{props.children}</div>
      </Link>
    </div>
  );
};
