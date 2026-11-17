import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectTotalValue,
  selectVisibleCount,
  clearCollection,
} from "../store";

const ArtValue = () => {
  const dispatch = useDispatch();

  const total = useSelector(selectTotalValue);
  const count = useSelector(selectVisibleCount);
  const hasArt = useSelector((state) => state.art.data.length > 0);

  const [confirming, setConfirming] = useState(false);

  const handleClear = () => {
    dispatch(clearCollection());
    setConfirming(false);
  };

  return (
    <>
      <section className="flex items-center justify-between bg-ink px-5 py-3 text-paper">
        <span className="text-xs font-black uppercase tracking-widest">
          Visible Collection
        </span>

        <span className="text-lg font-black">
          {count} {count === 1 ? "piece" : "pieces"}, ${total.toLocaleString()}
        </span>
      </section>

      <section className="p-5">
        {!confirming ? (
          <button
            onClick={() => setConfirming(true)}
            disabled={!hasArt}
            className="border-4 border-ink bg-flat-red px-4 py-2 text-xs font-black uppercase text-paper disabled:opacity-50"
          >
            Clear Collection
          </button>
        ) : (
          <div className="flex flex-wrap items-center gap-3">
            <p>Are you sure you want to delete every artwork?</p>

            <button
              onClick={handleClear}
              className="border-4 border-ink bg-flat-red px-3 py-2 text-paper"
            >
              Yes, delete all
            </button>

            <button
              onClick={() => setConfirming(false)}
              className="border-4 border-ink px-3 py-2"
            >
              Cancel
            </button>
          </div>
        )}
      </section>
    </>
  );
};

export default ArtValue;
