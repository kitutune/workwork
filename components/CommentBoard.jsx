import { supabase } from 'utils/supabaseClient';
import { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faStar } from '@fortawesome/free-solid-svg-icons';
import { Auth } from '@supabase/ui';
export const CommentBoard = (props) => {
  const { user } = Auth.useUser();
  const user_id = user.id;
  const id = props.id;
  const messageEl = useRef(null);
  const [userDb, setUserDb] = useState({});
  const insertDB = useCallback(async () => {
    if (userDb) {
    if (!messageEl.current.value) {
      alert('コメントを投稿するには値を入力して下さい！');
      return null;
    }
      console.log(userDb.id);
      console.log('userDb');
    console.log(messageEl.current.value);
    console.log('messageEl.current.value');
    console.log('送信しました');
    console.log(id);
    console.log(user_id);
    console.log('user_id');

      return await supabase.from('企業コメント').insert([
        {
          企業情報_id: id,
        user_id: user_id,
          コメント欄: messageEl.current.value,
        },
      ]);
  }, []);
  const addMessage = useCallback(() => {
    insertDB();
    messageEl.current.value = '';
  }, []);

  // 認証関連ーーーーーーーーーーーーーーこれより下
  //   企業情報のDBからidを取ってくる
  //   useEffect(async () => {
  //     console.log('マウントされた時');
  //     const { data, error } = await supabase
  //       .from('企業情報')
  //       .select('id')
  //       .eq('id', id)
  //       .single();

  //     setCompanyProf(data);
  //     return;
  //   }, []);

  //   ユーザーのDBからidを取ってくる
  useEffect(async () => {
    console.log('マウントされた時');
    const { data, error } = await supabase
      .from('ユーザー')
      .select('id')
      //   .eq('id', id)
      .single();

    setUserDb(data);
    return;
  }, []);

  // 認証関連ーーーーーーーーーーーーーーーーーーここまで
  return (
    <>
      <div
      >
        <div>コメント</div>
        <div className="w-full flex flex-col">
          <div className="w-full">
            <textarea
              ref={messageEl}
              className="w-full h-16 p-2 rounded shadow-inner"
            >
              aaaaaa
            </textarea>
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
              <input
                type="checkbox"
                className=""
              />
            </label>
          </div>
        </div>
      >
        <div className="py-2">
          <div className="p-1 space-y-2">
            <div className="ml-auto mr-0 w-4/5 p-1 bg-blue-100 rounded-xl">
              <div
                className="relative ml-0 mr-auto w-4/5 p-1 rounded-xl　bg-gray-50"
              >
                <div className="text-xs">
                  日付
                </div>
                <div className="text-sm pl-2">
                </div>
                <div className="absolute top-0 right-0 flex flex-row space-x-1.5 py-0.5 px-2">
                  <div
                    className="text-xs  outline-none　text-gray-400 hover:text-yellow-400"
                  >
                    <button
                    >
                      <FontAwesomeIcon icon={faStar} />
                    </button>
                  </div>
                  <div className="text-xs text-gray-400 hover:text-pink-400 outline-none">
                    <button
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                </div>
                </div>
                </div>
              <div className="text-sm pl-2">コメント</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
