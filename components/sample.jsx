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
      <div className="flex flex-col w-full pt-4">
        <div className="py-2">
          {logs &&
            logs.map((val, index) => {
              const day = val.time_stamp;
              return (
                <div key={val.comment_id}>
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
                  </div>
                  <div className="max-w-3xl w-full mx-auto z-10">
                    <div>
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