import { Back } from './back';
import { Profile } from './Profile';
import { ToolModal } from './ToolModal';
import { Auth } from '@supabase/ui';
import { useState } from 'react';
import Image from 'next/image';
import cc from 'classcat';
export const Header = () => {
  const { user } = Auth.useUser();

  const [open, setOpen] = useState(false);

  const toggle = () => {
    setOpen((prevState) => !prevState);
  };
  return (
    <>
      <header className="text-gray-600 bg-gray-200">
        <nav className="flex items-center justify-between flex-wrap bg-teal p-6">
          <div className="flex items-center flex-no-shrink text-white mr-6">
            <Back>
              <Image
                width={250}
                height={64}
                alt="jobicon"
                src="/workwork.png"
              />
            </Back>
          </div>
          {!user ? (
            <div></div>
          ) : (
            <>
              <div className="block lg:hidden">
                <button
                  onClick={toggle}
                  className="flex items-center px-3 py-2 border rounded text-teal-lighter border-teal-light hover:text-white hover:border-white"
                >
                  {!open ? (
                    <Image
                      width={20}
                      height={20}
                      alt="menuicon"
                      src="/menu.png"
                    />
                  ) : (
                    <Image
                      width={20}
                      height={20}
                      alt="batuicon"
                      src="/batu.png"
                    />
                  )}
                </button>
              </div>

              <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
                <div
                  className={cc([
                    'text-sm lg:flex-grow  lg:block',
                    {
                      hidden: !open,
                    },
                  ])}
                >
                  <a
                    href="#responsive-header"
                    className="block mt-4 lg:inline-block lg:mt-0 text-teal-lighter hover:text-white mr-4"
                  >
                    Docs
                  </a>

                  <a
                    href="#responsive-header"
                    className="block mt-4 lg:inline-block lg:mt-0 text-teal-lighter hover:text-white mr-4"
                  >
                    Examples
                  </a>
                  <ToolModal
                    style="block mt-4 lg:inline-block lg:mt-0 text-teal-lighter hover:text-white mr-4"
                    name="Profile"
                  >
                    <Profile
                      // button1osita={() => {
                      //   alert('cancel');
                      // }}
                      // button1="sugoi"
                      uuid={user.id}
                    />
                  </ToolModal>
                  <a
                    href="#responsive-header"
                    className="block mt-4 lg:inline-block lg:mt-0 text-teal-lighter hover:text-white"
                  >
                    Blog
                  </a>
                </div>
              </div>
            </>
          )}
        </nav>
      </header>
    </>
  );
};
