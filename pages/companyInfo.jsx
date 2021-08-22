// 一時完成
import { Auth, Button, IconCornerDownLeft } from '@supabase/ui';
import { CommentBoard } from 'components/commentBoard';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { supabase } from 'utils/supabaseClient';
import { EditCompany } from 'components/editCompany';
import { ToolModal } from 'components/atoms/toolModal';
import { FcLikePlaceholder, FcLike } from 'react-icons/fc';
import { Back } from 'components/atoms/back';
import { CompanyInfoList } from 'components/companyInfoList';
import { CompanyInfoSubList } from 'components/companyInfoSubList';

const getCompanyDB = async (id) => {
  let { data, error } = await supabase
    .from('company')
    .select('*')
    .eq('company_id', id);
  if (!error && data) {
    const companyInfo = data[0];
    ({ data, error } = await supabase
      .from('company_info')
      .select('*')
      .eq('company_id', id));
    if (!error && data) {
      const companySubInfo = data[0];
      return { companyInfo: companyInfo, companySubInfo: companySubInfo };
    }
  }
  return { companyInfo: null, companySubInfo: null };
};
const companyInfo = () => {
  const Container = () => {
    const [companyInfo, setCompanyInfo] = useState([]);
    const [companySubInfo, setCompanySubInfo] = useState([]);
    const [likeCompany, setLikeCompany] = useState(false);

    const { user } = Auth.useUser();
    const router = useRouter();
    let { id } = router.query;
    const address = companyInfo.company_address;
    const date = companyInfo.update;
    const date2 = companySubInfo.update_info;
    // map画面のオンオフ
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => {
      setIsOpen((isOpen) => !isOpen);
    };
    // map画面のオンオフ
    // companyOption画面のオンオフ
    const [companyOption, setCompanyOption] = useState(false);
    const companyOptionButton = () => {
      setCompanyOption((companyOption) => !companyOption);
      !companyOption
        ? alert('オプション情報を開きます!')
        : alert('オプション情報を閉じます!');
    };
    // companyOption画面のオンオフ
    // 取得したcompanyDBとcompany_infoDBのデータを利用しやすいように定数に格納するここからーーーーーーーーーーーーー
    const getCompanyDBsData = useCallback(async () => {
      if (id) {
        const { companyInfo, companySubInfo } = await getCompanyDB(id);
        if (companyInfo) {
          setCompanyInfo(companyInfo);
        } else {
          router.push('/');
        }
        if (companySubInfo) {
          setCompanySubInfo(companySubInfo);
        }
      }
    }, [id, router]);
    // 取得したcompanyDBとcompany_infoDBのデータを利用しやすいように定数に格納するここまでーーーーーーーーーーーーー
    // console.log('00');
    const jobLink = () => {
      if (companyInfo.job_url === null) {
        alert('URLが登録されていません');
      } else {
        alert('求人サイトに移動します');
      }
    };
    const hpLink = () => {
      if (companyInfo.URL === null) {
        alert('URLが登録されていません');
      } else {
        alert('ホームページに移動します');
      }
    };
    const bookmarkButton = async () => {
      const { data, error } = await supabase
        .from('flug')
        .update({ bookmark: !likeCompany })
        .eq('company_id', id)
        .eq('user_id', user.id);

      if (error) {
        alert('bookmarkの変更に失敗しました！');
      }
      return setLikeCompany(data[0].bookmark);
    };

    const getFlugDb = useCallback(
      async (user) => {
        try {
          if (!user || !id) {
            return;
          }

          // console.log('flug');
          let { data, error, status } = await supabase
            .from('flug')
            .select('*')
            .eq('company_id', id)
            .eq('user_id', user.id);

          if (data.length === 0) {
            console.log('着てないか？');
            ({ data, error } = await supabase
              .from('flug')
              .insert([{ user_id: user.id, company_id: id }]));
          }

          if (error || status !== 200) {
            throw error;
          } else {
            return setLikeCompany(data[0].bookmark);
          }
        } catch (error) {
          alert('bookmarkの読み込みに失敗しました！');
        }
      },
      [id, user]
    );

    useEffect(() => {
      // eslint-disable-next-line no-unused-vars
      let unmounted = false;

      // clean up関数（Unmount時の処理）
      return () => {
        // console.log('アンマウント');
        unmounted = true;
      };
    }, []);

    useEffect(() => {
      getCompanyDBsData();
      getFlugDb(user);
    }, [user]);
    console.log('companyinfo');
    if (user) {
      return (
        <div>
          <div className="flex justify-end gap-2 my-2 mr-2">
            <div className="w-24">
              <Button block size="medium" icon={<IconCornerDownLeft />}>
                <ToolModal name="EDIT">
                  <EditCompany
                    companyInfo={companyInfo}
                    companySubInfo={companySubInfo}
                    id={id}
                  />
                </ToolModal>
              </Button>
            </div>
            <div className="w-24">
              <Back>
                <Button block size="medium" icon={<IconCornerDownLeft />}>
                  BACK
                </Button>
              </Back>
            </div>
          </div>
          <div className="flex flex-row-reverse">
            <div>update:{date >= date2 ? date : date2}</div>
          </div>
          <div className="font-mono bg-gray-400">
            <div className="container mx-auto">
              <div className="flex justify-center px-6 my-12">
                <div className="w-full xl:w-3/4 lg:w-11/12 flex">
                  <div
                    className="w-full h-auto bg-gray-400 hidden lg:block lg:w-5/12 bg-cover rounded-l-lg"
                    style={{
                      backgroundImage:
                        'url(https://source.unsplash.com/Mv9hjnEUHR4/600x800)',
                    }}
                  >
                    {/* <CommentBoard id={id} /> */}
                  </div>
                  {/* <!-- Col --> */}
                  <div className="w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none">
                    <button className="float-right " onClick={bookmarkButton}>
                      {likeCompany == false ? (
                        <FcLikePlaceholder />
                      ) : (
                        <FcLike />
                      )}
                    </button>
                    <h3 className="pt-4 text-2xl text-center">
                      <Image
                        width={40}
                        height={40}
                        layout={'intrinsic'}
                        alt="companyicon"
                        src="/company2.png"
                        className="z-1"
                      />
                      {companyInfo.company_name}
                    </h3>
                    <form className="px-8 pt-6 pb-8 mb-4　 bg-white rounded">
                      {/* 項目ここから---------------- */}

                      <CompanyInfoList
                        hpLink={hpLink}
                        jobLink={jobLink}
                        companyInfo={companyInfo}
                      />

                      <hr className="mb-6 border-t" />
                      {companyOption === true ? (
                        <div>
                          <CompanyInfoSubList companySubInfo={companySubInfo} />
                        </div>
                      ) : (
                        <div></div>
                      )}
                      <div className="flex">
                        <Image
                          src="/listicon.png"
                          width={40}
                          height={40}
                          alt="listicon"
                          onClick={companyOptionButton}
                        />
                        <Image
                          src="/mapicon.png"
                          width={40}
                          height={40}
                          alt="mapicon"
                          onClick={toggle}
                        />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              {isOpen === false ? (
                <div></div>
              ) : (
                <div style={{ textAlign: '-webkit-center' }}>
                  <div className="relative pt-56.25% w-10/12">
                    <iframe
                      className="absolute inset-y-0  w-full h-full"
                      frameBorder="0"
                      src={`https://maps.google.co.jp/maps?q=${address}&output=embed`}
                      title="map"
                    ></iframe>
                  </div>
                </div>
              )}

              <div className="flex justify-center px-6 my-12　 lg:hidden">
                <div className="w-full xl:w-3/4 lg:w-11/12 flex">
                  <CommentBoard id={id} />
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return <div></div>;
  };

  return (
    <Auth.UserContextProvider supabaseClient={supabase}>
      <Container />
    </Auth.UserContextProvider>
  );
};

export default companyInfo;
