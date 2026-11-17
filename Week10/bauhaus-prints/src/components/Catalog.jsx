import { useSelector, useDispatch } from "react-redux";
import { PRINTS } from "../data/prints";
import { itemAdded } from "../features/cartSlice";
import {
  filterChanged,
  favouritesOnlyToggled,
  selectColourFilter,
  selectShowOnlyFavourites,
} from "../features/uiSlice";
import {
  favouriteToggled,
  selectFavouriteIds,
} from "../features/favouritesSlice";

const SWATCH = {
  red: "bg-flat-red",
  blue: "bg-flat-blue",
  yellow: "bg-flat-yellow",
};

const FILTERS = ["all", "red", "blue", "yellow"];

/*
  I put the show-only-favourites setting in uiSlice
  because it's about how the catalogue is displayed.
  The favourites slice stores which prints are saved.

  I chose to combine the two filters, so selecting Blue
  and Favourites shows only blue prints I've favourited.

  I combined them in Catalog because this is the only
  component that needs the filtered list right now.
  If other components needed it, a selector might make
  more sense.
*/

const Catalog = () => {
  const dispatch = useDispatch();
  const colourFilter = useSelector(selectColourFilter);
  const favouriteIds = useSelector(selectFavouriteIds);
  const showOnlyFavourites = useSelector(selectShowOnlyFavourites);

  const visible = PRINTS.filter((print) => {
    const matchesColour =
      colourFilter === "all" || print.colour === colourFilter;

    const matchesFavourite =
      !showOnlyFavourites || favouriteIds.includes(print.id);

    return matchesColour && matchesFavourite;
  });

  return (
    <section>
      <div className="flex border-b-4 border-ink">
        {FILTERS.map((filter) => {
          const isActive = filter === colourFilter;

          return (
            <button
              key={filter}
              type="button"
              onClick={() => dispatch(filterChanged(filter))}
              className={`flex-1 border-r-4 border-ink px-2 py-2 text-xs font-black uppercase ${
                isActive ? "bg-ink text-paper" : "bg-paper"
              }`}
            >
              {filter}
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={() => dispatch(favouritesOnlyToggled())}
        aria-pressed={showOnlyFavourites}
        className={`w-full border-b-4 border-ink px-4 py-3 text-left text-xs font-black uppercase ${
          showOnlyFavourites ? "bg-flat-yellow text-ink" : "bg-paper text-ink"
        }`}
      >
        {showOnlyFavourites
          ? "★ Showing Favourites Only"
          : "☆ Show Favourites Only"}
      </button>

      {visible.length === 0 && (
        <p className="p-5 text-sm">No prints match these filters.</p>
      )}

      <ul className="grid grid-cols-2">
        {visible.map((print) => {
          const isFavourite = favouriteIds.includes(print.id);

          return (
            <li key={print.id} className="border-b-4 border-r-4 border-ink">
              <div className={`h-28 ${SWATCH[print.colour]}`} />

              <div className="flex items-center justify-between gap-2 px-3 py-3">
                <div>
                  <p className="text-sm font-black uppercase">{print.title}</p>
                  <p className="text-xs">${print.price}</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => dispatch(favouriteToggled(print.id))}
                    aria-label={`Toggle favourite for ${print.title}`}
                    aria-pressed={isFavourite}
                    className={`border-4 border-ink px-3 py-1 font-black ${
                      isFavourite
                        ? "bg-flat-red text-paper"
                        : "bg-paper text-ink"
                    }`}
                  >
                    {isFavourite ? "★" : "☆"}
                  </button>

                  <button
                    type="button"
                    onClick={() => dispatch(itemAdded(print))}
                    className="border-4 border-ink bg-flat-yellow px-3 py-1 text-xs font-black uppercase"
                  >
                    Add
                  </button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Catalog;
