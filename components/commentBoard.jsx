//ここからスタート

import { supabase } from 'utils/supabaseClient';
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Auth } from '@supabase/ui';
import Link from 'next/link';
import { AvatarImage } from './avatarImage';
// eslint-disable-next-line react/display-name
export const CommentBoard = React.memo((props) => {
  const comment = useRef(null);
  const [commentLogs, setCommentLogs] = useState([]);
  const [edit, setEdit] = useState(false);
  const { user } = Auth.useUser();

  const getCommentDb = useCallback(async () => {
    if (props.id === undefined) {
      return;
    }
    try {
      const { data, error, status } = await supabase
        .from('company_comment')
        .select('*')
        .eq('company_id', props.id)
        .order('time_stamp', { ascending: true });
      // console.log(status);
      // console.log(error);
      // console.log('ロード');
      if (error || status !== 200) {
        throw error;
      }
      if (data) {
        return setCommentLogs(data);
      }
    } catch (error) {
      alert('コメントログの読み込みに失敗しました！');
    }
  }, [props.id]);

  const addComment = async () => {
    if (!comment.current.value) {
      return alert('コメントを投稿するには値を入力して下さい！');
    }
    if (props.id && user) {
      try {
        const { data, error, status } = await supabase
          .from('company_comment')
          .insert({
            user_id: user.id,
            company_id: props.id,
            comment: comment.current.value,
          })
          .eq('company_id', props.id);
        // console.log(status);
        // console.log(error);
        // console.log('エラー');
        if (!data || error || status !== 201) {
          throw error;
        } else {
          console.log('コメントを投稿しました！');
        }
      } catch (error) {
        alert('コメントの投稿に失敗しました！');
      }
      getCommentDb();
    }
  };

  const deleteCommentLog = async (comment_id) => {
    if (!comment_id) return null;
    try {
      const { data, error, status } = await supabase
        .from('company_comment')
        .delete()
        .eq('comment_id', comment_id);
      // console.log(status);
      // console.log(error);
      // console.log('エラー');
      if (!data || error || status !== 200) {
        throw error;
      } else {
        console.log('コメントの削除に成功しました！');
      }
    } catch (error) {
      alert('コメントの削除に失敗しました！');
    }

    getCommentDb();
  };

  const handleEditChange = useCallback(() => {
    setEdit((prev) => {
      return !prev;
    });
  }, []);

  const addMessage = () => {
    addComment();
    comment.current.value = '';
  };

  useEffect(() => {
    getCommentDb();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // eslint-disable-next-line no-unused-vars
    let unmounted = false;
    // clean up関数（Unmount時の処理）
    return () => {
      unmounted = true;
    };
  }, []);

  // console.log(commentLogs);
  console.log('CommentBoard');
  return (
    <>
      <div className="flex flex-col w-full pt-4">
        <div className="py-2">
          {commentLogs &&
            commentLogs.map((val) => {
              const day = new Date(val.time_stamp).toLocaleString('ja-JP');

              return (
                <div key={val.comment_id}>
                  {(console.log(val), console.log('val'))}
                  <div className="text-xs">
                    <div className=" ">{day}</div>
                  </div>
                  <div className="max-w-3xl w-full mx-auto  z-10">
                    <div>
                      <div className="flex items-center">
                        <Link
                          href={`/account?id=${val.user_id}`}
                          // as={`/account?id=${val.user_name}`}
                          passHref
                        >
                          <div>
                            <AvatarImage userId={val.user_id} />
                            {(console.log(val), console.log('val'))}
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
                                        deleteCommentLog(val.comment_id);
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
});
