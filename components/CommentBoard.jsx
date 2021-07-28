import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faStar } from '@fortawesome/free-solid-svg-icons';

export const CommentBoard = (props) => {
  return (
    <>
      <div
      >
        <div>コメント</div>
        <div className="w-full flex flex-col">
          <div className="w-full">
            <textarea
              className="w-full h-16 p-2 rounded shadow-inner"
            ></textarea>
          </div>
          <div className="p-1">
            <button
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
