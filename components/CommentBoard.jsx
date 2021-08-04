import cc from 'classcat';
// import { supabase } from '@util/supabase';
import { supabase } from 'utils/supabaseClient';
import { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faStar } from '@fortawesome/free-solid-svg-icons';
import { Auth } from '@supabase/ui';

export const CommentBoard = (props) => {
  //   const { className } = props;
  const comment = useRef(null);
  const [logs, setIlogs] = useState([]);
  const [edit, setEdit] = useState(false);
  const { user } = Auth.useUser();

  const loadDB = useCallback(() => {
    const company_id = props.id;
    return (
      supabase
        .from('company_comment')
        .select('*')
        .eq('company_id', props.id)
        //   .order('createAt', { ascending: false })
        .then((db) => {
          if (db.data && !db.error) {
            // console.log(db.data);
            // console.log('444444444444');
            setIlogs(db.data);
          } else {
            setIlogs([]);
          }
        })
    );
  }, []);

  const insertDB = useCallback(async () => {
    console.log(comment.current.value);
    //   console.log('2222222');
    let { data, error } = await supabase
      .from('user')
      .select('*')
      .eq('id', user.id);

    if (
      !error &&
      data
      // && comment.current.value
    ) {
      // const userName = data[0];
      console.log(comment.current.value);
      // console.log(user);
      // console.log(userName);

      console.log('000000000000');
      if (!comment.current.value || !user || !userName) {
        alert('commentを投稿するには値を入力して下さい！');
        return null;
      }

      return (
        await supabase
          .from('company_comment')
          .insert({
            user_id: user.id,
            //   company_id: props.id,
            comment: comment.current.value,
            //   user名: userName.user_name,
          })
          .eq('company_id', props.id),
        loadDB(),
        alert('commentを投稿しました！')

        // catch((e) => {
        //     alert('エラーが発生したためcommentを投稿出来ませんでした')})
      );
    }
  }, []);

  //   const insertDB = useCallback(async () => {
  //     const { data, error } = await supabase
  //       .from('company_comment')
  //       .select(`user_id,user(id)`);
  //     //   .eq('company_id', props.id);
  //     const comComment = data;
  //     console.log(data);
  //     console.log('comCommentcomComment');
  //     if (!comment.current.value || !user || !comComment) {
  //       alert('commentを投稿するには値を入力して下さい！');
  //       return null;
  //     }
  //     console.log(comComment);
  //     console.log('comCommentcomComment');

  //     return (
  //       await supabase
  //         .from('company_comment')
  //         .insert({
  //           user_id: comComment.id,
  //           company_id: props.id,
  //           comment: comment.current.value,
  //           user名: comComment.user_name,
  //         })
  //         .eq('company_id', props.id),
  //       loadDB(),
  //       alert('commentを投稿しました！')

  //       // catch((e) => {
  //       //     alert('エラーが発生したためcommentを投稿出来ませんでした')})
  //     );
  //   }, []);

  const deleteDB = useCallback((id) => {
    if (!id) return null;
    console.log('deleteDBdeleteDBdeleteDBdeleteDBdeleteDB');
    return supabase
      .from('company_comment')
      .delete()
      .eq('id', id)
      .then(() => {
        loadDB();
      });
  }, []);
  const changeStarDB = useCallback((id, star) => {
    if (!id) return null;
    console.log('changeStarDBchangeStarDBchangeStarDBchangeStarDB');
    return supabase
      .from('company_comment')
      .update({ star: !star })
      .eq('id', id)
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
    loadDB();
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
      {/* <div className={cc(['flex flex-col w-full pt-4', className])}> */}
      <div className="flex flex-col w-full pt-4">
        <div className="py-2">
          {logs &&
            logs.map((val, index) => {
              //   const day = new Date(val.createAt).toLocaleString('ja-JP');
              const day = val.time_stamp;
              return (
                <div key={index} className="p-1 space-y-2">
                  {console.log(val)}
                  {console.log('mapの中に来てる')}
                  <div
                    className={cc([
                      'relative ml-0 mr-auto w-4/5 p-1 rounded-xl',
                      {
                        'bg-gray-50': !val.star,
                        'bg-yellow-100 border-2 border-yellow-500': val.star,
                      },
                    ])}
                  >
                    <div className="text-xs">{day}</div>
                    <div className="text-sm pl-2">{val.commentq}</div>
                    {edit && (
                      <div className="absolute top-0 right-0 flex flex-row space-x-1.5 py-0.5 px-2">
                        <div
                          className={cc([
                            'text-xs  outline-none',
                            {
                              'text-gray-400 hover:text-yellow-400': !val.star,
                              'text-yellow-400': val.star,
                            },
                          ])}
                        >
                          <button
                            onClick={() => {
                              changeStarDB(val.id, val.star);
                            }}
                          >
                            <FontAwesomeIcon icon={faStar} />
                          </button>
                        </div>
                        <div className="text-xs text-gray-400 hover:text-pink-400 outline-none">
                          <button
                            onClick={() => {
                              deleteDB(val.id);
                            }}
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                  {val.comment && (
                    <div className="ml-auto mr-0 w-4/5 p-1 bg-blue-100 rounded-xl">
                      <div className="text-sm pl-2">{val.comment}</div>
                    </div>
                  )}
                </div>
              );
            })}
        </div>
        {/* ---- */}
        <div>comment</div>
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
      </div>
    </>
  );
};
