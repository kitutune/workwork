import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useCallback, useState } from 'react';
import Image from 'next/image';
export const ToolModal = (props) => {
  let [isOpen, setIsOpen] = useState(false);
  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);
  const openModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  return (
    <div className={props.style}>
      <div>
        <div type="button" onClick={openModal}>
          {props.name}
        </div>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0  z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen   px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 opacity-90 bg-gray-600" />
            </Transition.Child>

            <span
              className="inline-block h-screen align-middle static"
              aria-hidden="true"
            >
              <div className="fixed inset-0 z-10 overflow-y-auto">
                {props.children}
              </div>
              <div className="absolute right-0 z-20 top-0 p-4">
                <button type="button" onClick={closeModal}>
                  <Image
                    width={54}
                    height={54}
                    alt="batuicon"
                    src="/batu.png"
                  />
                </button>
              </div>
              &#8203;
            </span>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};
