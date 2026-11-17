# Favourites Slice: Answers

### 1. What is the action type string, and where do its two halves come from?

The action type in Redux DevTools is `favourites/favouriteToggled`. The first part comes from the name I gave the slice, and the second comes from the reducer I wrote. Redux Toolkit basically puts those together automatically, so I didn't have to define the action type separately.

### 2. Why store a list of IDs rather than a favourite flag on each print?

The prints are already stored in `prints.js`, and that data doesn't really need to change just because someone favourites something. If I added a favourite flag to each print, I'd have to bring the catalogue into Redux and manage changes to the prints themselves. It makes more sense to me to keep the actual print information separate and just store which IDs the user has selected.

### 3. What happens if a favourited print is removed from the catalogue?

If a print gets removed from the catalogue, its ID could still be sitting in the favourites array, even though the print itself isn't available anymore. This could make the favourite count inaccurate, since it's counting saved IDs rather than checking which prints still exist. In a real app, I'd probably make sure those old IDs get cleaned up when the catalogue changes, or at least exclude them from the count.
