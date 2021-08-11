import { Dialog, Transition } from '@headlessui/react';
import { Button, IconPlus, IconX } from '@supabase/ui';
import Image from 'next/image';
import add from 'public/add.png';
import { Fragment, useCallback, useState } from 'react';
import { supabase } from 'utils/supabaseClient';

export const Addcompany = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [companyUrl, setCompanyUrl] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');

  // ダイアログを開く
  const openModal = useCallback(() => {
    setIsOpen(true);
  }, []);
  // ダイアログを閉じる
  const closeModal = useCallback(() => {
    setCompanyName('');
    setCompanyUrl('');
    setCompanyAddress('');
    setIsOpen(false);
  }, []);
  // 企業名の追加
  const handleAdd = useCallback(async () => {
    if (companyName == '') {
      alert('Input companyName.');
      return;
    }
    let { data, error } = await supabase.from('company').insert([
      {
        company_name: companyName,
        URL: companyUrl,
        company_address: companyAddress,
      },
    ]);
    const company_uuid = data[0].company_id;

    ({ data, error } = await supabase.from('company_info').insert([
      {
        company_id: company_uuid,
      },
    ]));

    if (error) {
      alert(error);
    } else {
      if (data) {
        props.getCompanyList();
        closeModal();
      }
    }
  }, [companyName, companyUrl, companyAddress, props, closeModal]);

  return (
    <>
      <div className="p-2 border cursor-pointer" onClick={openModal}>
        <div className="flex justify-center">
          <Image src={add} alt="thumbnail" width={126} height={200} />
        </div>
        <div className="mt-2 text-center">企業追加</div>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center border-2">
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform border border-gray-300 shadow-xl bg-gray-50 rounded-xl">
                <Dialog.Title
                  as="h3"
                  className="text-2xl font-medium leading-6 text-center text-gray-900"
                >
                  企業名を追加してください
                </Dialog.Title>
                <div className="grid grid-cols-4 gap-2 mt-4">
                  <div className="col-span-1 text-xl text-center">企業名</div>
                  <input
                    className="w-full h-10 col-span-3 p-2 bg-white border border-gray-300 rounded shadow appearance-none hover:border-gray-700"
                    value={companyName}
                    onChange={(e) => {
                      return setCompanyName(e.target.value);
                    }}
                  />
                </div>
                <div className="grid grid-cols-4 gap-2 mt-4">
                  <div className="col-span-1 text-xl text-center">企業URL</div>
                  <input
                    className="w-full h-10 col-span-3 p-2 bg-white border border-gray-300 rounded shadow appearance-none hover:border-gray-700"
                    value={companyUrl}
                    onChange={(e) => {
                      return setCompanyUrl(e.target.value);
                    }}
                  />
                </div>
                <div className="grid grid-cols-4 gap-2 mt-4">
                  <div className="col-span-1 text-xl text-center">所在地</div>
                  <input
                    className="w-full h-10 col-span-3 p-2 bg-white border border-gray-300 rounded shadow appearance-none hover:border-gray-700"
                    value={companyAddress}
                    onChange={(e) => {
                      return setCompanyAddress(e.target.value);
                    }}
                  />
                </div>
                <div className="flex justify-center mt-4">
                  <div className="w-32 p-2">
                    <Button
                      block
                      type="default"
                      size="large"
                      icon={<IconX />}
                      onClick={closeModal}
                    >
                      戻る
                    </Button>
                  </div>
                  <div className="w-32 p-2">
                    <Button
                      block
                      size="large"
                      icon={<IconPlus />}
                      onClick={() => handleAdd()}
                    >
                      追加
                    </Button>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
