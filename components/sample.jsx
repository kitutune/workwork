import cc from 'classcat';
// import { supabase } from '@util/supabase';
import { supabase } from 'utils/supabaseClient';
import { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faStar } from '@fortawesome/free-solid-svg-icons';
import { Auth } from '@supabase/ui';

export const Sample = (props) => {
  const comment = useRef(null);
  const [logs, setIlogs] = useState([]);
  const [edit, setEdit] = useState(false);
  const { user } = Auth.useUser();

  const loadDB = useCallback(() => {
    console.log(props?.id);
    console.log('props.idprops.idprops.id');
    return (
      supabase
        .from('company_comment')
        .select('*')
        .eq('company_id', props.id)
        //   .order('createAt', { ascending: false })
        .then((db) => {
          if (db.data && !db.error) {
            setIlogs(db.data);
          } else {
            setIlogs([]);
          }
        })
    );
  }, []);

  const insertDB = useCallback(async () => {
    console.log(comment.current.value);
    console.log('2222222');

    if (!comment.current.value || !user) {
      alert('コメントを投稿するには値を入力して下さい！');
      return null;
    }

    return (
      await supabase
        .from('company_comment')
        .insert({
          user_id: user.id,
          company_id: props.id,
          comment: comment.current.value,
          //   user名: userName.user_name,
        })
        .eq('company_id', props.id),
      loadDB(),
      alert('コメントを投稿しました！')

      // catch((e) => {
      //     alert('エラーが発生したためコメントを投稿出来ませんでした')})
    );
  }, []);

  const deleteDB = useCallback((comment_id) => {
    if (!comment_id) return null;
    return supabase
      .from('company_comment')
      .delete()
      .eq('comment_id', comment_id)
      .then(() => {
        loadDB();
      });
  }, []);
  const changeStarDB = useCallback((comment_id, star) => {
    if (!comment_id) return null;

    return supabase
      .from('company_comment')
      .update({ star: !star })
      .eq('comment_id', comment_id)
      .then(() => {
        loadDB();
      });
  }, []);
  const handleEditChange = useCallback(() => {
    setEdit((prev) => {
      return !prev;
    });
  }, []);
  useEffect(() => {
    loadDB(); //エラーはここで出ている
    let subscribe = supabase
      .from('company_comment')
      .on('*', () => {
        loadDB();
      })
      .subscribe();

    return () => {
      subscribe.unsubscribe();
    };
  }, []);
  const addMessage = useCallback(() => {
    insertDB();
    comment.current.value = '';
  }, []);

  return (
    <>
      {' '}
      <div className="flex flex-col w-full pt-4">
        <div className="py-2">
          {logs &&
            logs.map((val, index) => {
              // const day = new Date(val.createAt).toLocaleString('ja-JP');
              const day = val.time_stamp;
              return (
                <div key={val.comment_id}>
                  {/* <!-- defualt theme --> */}{' '}
                  <div className="text-xs">
                    {/* {day} */}

                    <div
                      className="bg-gray-50  w-2/5"
                      //   className={cc([
                      //     // 'relative ml-0 mr-auto w-4/5 p-1 rounded-xl',
                      //     '',
                      //     {
                      //       'bg-gray-50': !val.star,
                      //       'bg-yellow-100 border-2 border-yellow-500': val.star,
                      //     },
                      //   ])}
                    >
                      {day}
                      <div className="text-right">
                        {edit && (
                          <div className="absolute top-0 right-0 flex flex-row space-x-1.5 py-0.5 px-2">
                            <div
                              className={cc([
                                'text-xs  outline-none',
                                {
                                  'text-gray-400 hover:text-yellow-400':
                                    !val.star,
                                  'text-yellow-400': val.star,
                                },
                              ])}
                            >
                              <button
                                onClick={() => {
                                  changeStarDB(val.comment_id, val.star);
                                }}
                              >
                                <FontAwesomeIcon icon={faStar} />
                              </button>
                            </div>
                            <div className="text-xs text-gray-400 hover:text-pink-400 outline-none">
                              <button
                                onClick={() => {
                                  // console.log(val.comment_id);
                                  // console.log('1111111111111111111');
                                  deleteDB(val.comment_id);
                                }}
                              >
                                <FontAwesomeIcon icon={faTrash} />
                              </button>
                            </div>
                          </div>
                        )}
                        {/* <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="h-5 w-5 text-yellow-500 "
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg> */}
                      </div>
                    </div>
                  </div>
                  <div className="max-w-3xl w-full mx-auto z-10">
                    aa
                    {/* <div className="flex flex-col"> */}
                    <div>
                      bb
                      {/* 木下がそう */}
                      {/* <div className="bg-white border  border-white shadow-lg  rounded-3xl p-4 m-4"> */}
                      <div
                        className={cc([
                          // 'relative ml-0 mr-auto w-4/5 p-1 rounded-xl',
                          'bg-white border  border-white shadow-lg  rounded-3xl p-4 m-4',
                          {
                            'bg-gray-50': !val.star,
                            'bg-yellow-100 border-2 border-yellow-500':
                              val.star,
                          },
                        ])}
                      >
                        cca
                        <div
                          className={cc([
                            // 'relative ml-0 mr-auto w-4/5 p-1 rounded-xl',
                            'relative ml-0 mr-auto  p-1 rounded-xl',
                            {
                              'bg-gray-50': !val.star,
                              'bg-yellow-100  ': val.star,
                            },
                          ])}
                        >
                          <div className="text-right">
                            {edit && (
                              <div className="absolute top-0 right-0 flex flex-row space-x-1.5 py-0.5 px-2">
                                <div
                                  className={cc([
                                    'text-xs  outline-none',
                                    {
                                      'text-gray-400 hover:text-yellow-400':
                                        !val.star,
                                      'text-yellow-400': val.star,
                                    },
                                  ])}
                                >
                                  <button
                                    onClick={() => {
                                      changeStarDB(val.comment_id, val.star);
                                    }}
                                  >
                                    <FontAwesomeIcon icon={faStar} />
                                  </button>
                                </div>
                                <div className="text-xs text-gray-400 hover:text-pink-400 outline-none">
                                  <button
                                    onClick={() => {
                                      // console.log(val.comment_id);
                                      // console.log('1111111111111111111');
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
                                  <div className="w-full break-all flex-none text-lg text-gray-800 font-bold　leading-none">
                                    {val.comment && (
                                      //   <div className="ml-auto mr-0 w-4/5 p-1 bg-blue-100 rounded-xl">
                                      //   <div className="text-sm pl-2">
                                      <div className=" "> {val.comment}</div>
                                      //   </div>
                                      //   </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* <div className="flex flex-row items-center">
                              <div>aaaaa</div>
                            </div> */}
                          </div>
                        </div>
                        aaa{' '}
                      </div>
                      bbb
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
        {/* ---- */}
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
        {/* ---- */}
      </div>{' '}
    </>
  );
};
