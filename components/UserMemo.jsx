import { supabase } from 'utils/supabaseClient';
import { Auth } from '@supabase/ui';
import { useCallback, useEffect, useState } from 'react';
import { Button } from '@supabase/ui';
export const UserMemo = () => {
  const [memoValue, setMemoValue] = useState('');
  const { user } = Auth.useUser();

  const getProfile = useCallback(async () => {
    const { data } = await supabase
      .from('user')
      .select('*')
      .eq('user_id', user.id)
      .single();
    setMemoValue(data.user_memo);
    console.log(data.user_memo);
  }, [user.id]);

  const saveButton = useCallback(async () => {
    await supabase
      .from('user')
      .update({ user_memo: memoValue })
      .eq('user_id', user.id);
  }, [memoValue, user.id]);
  useEffect(() => {
    getProfile();
  }, [getProfile]);
  return (
    <div>
      <div as="div">
        <div className="min-h-screen px-4 text-center border-2">
          {/* <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span> */}
          <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform border border-gray-300 shadow-xl bg-gray-50 rounded-xl">
            <div className="w-20 mx-auto mb-5">memo</div>
            <div className=" mx-auto mb-5">
              <textarea
                className="w-full h-60 col-span-3 p-2 bg-white border border-gray-300 rounded shadow appearance-none hover:border-gray-700"
                defaultValue={memoValue}
                onChange={(e) => {
                  return setMemoValue(e.target.value);
                }}
              />
            </div>
            <div className="w-20 p-2 mx-auto mb-5">
              <Button
                size="large"
                className="button block primary"
                onClick={saveButton}
              >
                save
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
