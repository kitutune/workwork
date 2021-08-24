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
  const [companyJobUrl, setCompanyJobUrl] = useState('');
  const getCompanyList = props.getCompanyList;

  // ダイアログを開く
  const openModal = useCallback(() => {
    setIsOpen(true);
  }, []);
  // ダイアログを閉じる
  const closeModal = useCallback(() => {
    setCompanyName('');
    setCompanyUrl('');
    setCompanyJobUrl('');
    setIsOpen(false);
  }, []);
  // 会社データの登録
  const addCompanyData = useCallback(async () => {
    let { data, error } = await supabase.from('company').insert([
      {
        company_name: companyName,
        URL: companyUrl,
        job_url: companyJobUrl,
      },
    ]);
    const company_id = data[0].company_id;

    ({ data, error } = await supabase.from('company_info').insert([
      {
        company_id: company_id,
        company_name: companyName,
      },
    ]));
    if (error) {
      alert('新しい会社データの追加に失敗しました！');
    }
  }, [companyName, companyUrl, companyJobUrl]);
  // 会社データを追加する際に重複のチェック
  const getCompanyDB = useCallback(async () => {
    try {
      if (companyName == '') {
        alert('会社名を記入してください！');
        return;
      }
      // primarykeyを２つ登録する（user_name）ことができなかったので重複阻止のために追加
      const { data, error, status } = await supabase
        .from('company')
        .select('*')
        .eq('company_name', companyName);
      if (data.length === 1) {
        return alert('既に登録されている会社名です！');
      } else {
        await addCompanyData();
      }

      if (error || status !== 200) {
        throw error;
      } else {
        alert('会社データを追加しました！');
        getCompanyList();
        closeModal();
      }
    } catch (error) {
      alert('会社データの追加に失敗しました');
    }
  }, [companyName, closeModal, getCompanyList, addCompanyData]);

  // map関数の値
  const lists = ['企業名', '企業URL', '求人URL'];
  const value = [companyName, companyUrl, companyJobUrl];

  const targetName = (e) => {
    return setCompanyName(e.target.value);
  };
  const targetUrl = (e) => {
    return setCompanyUrl(e.target.value);
  };
  const targetJobUrl = (e) => {
    return setCompanyJobUrl(e.target.value);
  };
  const setMethod = [targetName, targetUrl, targetJobUrl];
  // console.log('Addcompany');
  return (
    <>
      <button className="p-2 border cursor-pointer" onClick={openModal}>
        <div className="flex justify-center">
          <Image src={add} alt="thumbnail" width={126} height={126} />
        </div>
        <div className="mt-2 text-center">企業追加</div>
      </button>

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

                {lists.map((list, i) => (
                  <div className="grid grid-cols-4 gap-2 mt-4" key={[i]}>
                    <div className="col-span-1 text-xl text-center">{list}</div>
                    <input
                      className="w-full h-10 col-span-3 p-2 bg-white border border-gray-300 rounded shadow appearance-none hover:border-gray-700"
                      value={value[i]}
                      onChange={setMethod[i]}
                    />
                  </div>
                ))}

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
                      onClick={() => getCompanyDB()}
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
