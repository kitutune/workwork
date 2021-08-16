//ここからスタート

// import cc from 'classcat';
import { supabase } from 'utils/supabaseClient';
import { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Auth } from '@supabase/ui';
import Image from 'next/image';
// import { ProfCard } from './ProfCard';
import Link from 'next/link';
export const CommentBoard = (props) => {
  const comment = useRef(null);
  const [logs, setIlogs] = useState([]);
  const [edit, setEdit] = useState(false);
  const { user } = Auth.useUser();
  const [avatarUrl, setAvatarUrl] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  // const [uploading, setUploading] = useState(false);
  const [url, setUrl] = useState('');

  const profButton = () => {
    setIsOpen((prev) => {
      !prev;
    });
  };
  console.log(isOpen);
  const loadDB = useCallback(async () => {
    if (props.id === undefined) {
      return;
    } else {
      return await supabase
        .from('company_comment')
        .select('*')
        .eq('company_id', props.id)
        .order('time_stamp', { ascending: true })
        .then((db) => {
          if (db.data && !db.error) {
            setIlogs(db.data);
          } else {
            setIlogs([]);
          }
        });
    }
  }, [props.id]);

  const insertDB = useCallback(async () => {
    if (!comment.current.value) {
      alert('コメントを投稿するには値を入力して下さい！');
      return null;
    }
    if (props.id && user) {
      return (
        await supabase
          .from('company_comment')
          .insert({
            user_id: user.id,
            company_id: props.id,
            comment: comment.current.value,
          })
          .eq('company_id', props.id),
        loadDB(),
        alert('コメントを投稿しました！')
      );
    }
  }, [loadDB, props.id, user]);

  const deleteDB = useCallback(
    (comment_id) => {
      if (!comment_id) return null;
      return supabase
        .from('company_comment')
        .delete()
        .eq('comment_id', comment_id)
        .then(() => {
          loadDB();
        });
    },
    [loadDB]
  );
  const handleEditChange = useCallback(() => {
    setEdit((prev) => {
      return !prev;
    });
  }, []);

  const addMessage = useCallback(() => {
    insertDB();
    comment.current.value = '';
  }, [insertDB]);

  // const getURL = useCallback(async () => {
  //   let { data, error } = await supabase
  //     .from('user')
  //     .select(`*`)
  //     .eq('user_id', val.user_id)
  //     .single();
  //   console.log(data);
  //   console.log('datadata');
  //   if (data) {
  //     setUrl(data.avatar_url);
  //   }
  // }, [val.user_id]);

  async function downloadImage(path) {
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

  // useEffect(() => {
  //   getURL();
  //   if (url) downloadImage(url);
  // }, [url, getURL]);

  useEffect(() => {
    loadDB();
  }, [loadDB]);

  useEffect(() => {
    let unmounted = false;
    // clean up関数（Unmount時の処理）
    return () => {
      // console.log('アンマウント');
      unmounted = true;
    };
  }, []);

  // console.log(avatarUrl);
  console.log('12');
  return (
    <>
      <div className="flex flex-col w-full pt-4">
        <div className="py-2">
          {logs &&
            logs.map((val, index) => {
              const day = new Date(val.time_stamp).toLocaleString('ja-JP');
              // ---------------------------------------------
              const getURL = async () => {
                let { data, error } = await supabase
                  .from('user')
                  .select(`*`)
                  .eq('user_id', val.user_id)
                  .single();
                console.log(data);
                console.log('datadata');
                if (data) {
                  setUrl(data.avatar_url);
                }
              };
              getURL(val.user_id);
              if (url) {
                downloadImage(url);
              }
              // ------------------------------------------------
              return (
                <div key={val.comment_id}>
                  {/* {isOpen ? (
                    <ProfCard profButton={profButton} avatarUrl={avatarUrl} />
                  ) : (
                    <></>
                  )} */}
                  <div className="text-xs">
                    <div className=" ">{day}</div>
                  </div>
                  <div className="max-w-3xl w-full mx-auto  z-10">
                    <div>
                      <div className="flex items-center">
                        <Link
                          //  key={title.id}
                          href={`/account?id=${val.user_id}`}
                          // as={`/account?id=${val.user_name}`}
                          passHref
                        >
                          <div onClick={profButton}>
                            {avatarUrl ? (
                              <Image
                                src={avatarUrl}
                                alt="Avatar"
                                // className="w-12 min-w-3rem"
                                width={80}
                                height={80}
                              />
                            ) : (
                              <Image
                                // className="w-12 min-w-3rem "
                                src="/human.png"
                                alt="NoAvatar"
                                width={80}
                                height={80}
                              />
                            )}
                          </div>
                        </Link>
                        <div className=" flex-auto bg-white border  border-white shadow-lg  rounded-3xl p-4 m-4">
                          <div className="relative ml-0 mr-auto  p-1 rounded-xl">
                            <div className="text-right">
                              {edit && (
                                <div className="absolute top-0 right-0 flex flex-row space-x-1.5 py-0.5 px-2">
                                  <div className="text-xs text-gray-400 hover:text-pink-400 outline-none">
                                    <button
                                      onClick={() => {
                                        deleteDB(val.comment_id);
                                      }}
                                    >
                                      <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="flex-none  sm:flex">
                            <div className="flex-auto sm:ml-5 justify-evenly">
                              <div className="flex items-center justify-between sm:mt-2">
                                <div className="flex items-center">
                                  <div className="flex flex-col break-normal">
                                    <div
                                      className="w-full break-all 
                                  flex-none
                                   text-lg text-gray-800 font-bold　leading-none"
                                    >
                                      {val.comment && (
                                        <div className=" "> {val.comment}</div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
        <div>コメント</div>
        <div className="w-full flex flex-col">
          <div className="w-full">
            <textarea
              ref={comment}
              className="w-full h-16 p-2 rounded shadow-inner"
            ></textarea>
          </div>
          <div className="p-1">
            <button
              onClick={addMessage}
              className="w-full py-2 bg-gray-100 border border-gray-300 rounded shadow"
            >
              送信
            </button>
          </div>
          <div className="p-1 text-right">
            <label>
              <span className="px-2 text-sm">編集</span>
              <input type="checkbox" onClick={handleEditChange} className="" />
            </label>
          </div>
        </div>
      </div>
    </>
  );
};
