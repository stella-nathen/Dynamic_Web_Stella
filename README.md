# Dynamic Web Applications

This repository contains my coursework for DM-UY 3193 Dynamic Web Applications.

Throughout the semester, we've been working with React, building reusable components, managing state, working with APIs, and eventually moving into larger applications with Redux.

I've been going back through my projects and catching up on some outstanding work, so I've also been revisiting earlier assignments and building on what we've learned since.

## Week 01: HTML Recipe Page

For Week 01, I made a spaghetti carbonara recipe page using HTML and CSS.

This was mainly about getting back into the basics of structuring a webpage, using semantic HTML, and making the content readable. I kept the recipe fairly straightforward, with ingredients, instructions, and an image.

**[View Week 01](./Week01)**

## Week 02: React Recipe Card

For Week 02, I converted my carbonara recipe into a React application.

I broke the page down into smaller components for the image, ingredients, instructions, and recipe information, rather than keeping everything in one file. I also moved the recipe content into a separate data file and used props to pass information between components.

I used `.map()` to render the ingredient and instruction lists, and added a little interactive rating system using `useState`, where you can give the recipe up to five hearts.

This was a useful introduction to thinking about which parts of a page actually need to be their own components.

**[View Week 02](./Week02/recipe-card)**

## Week 03: Component Library

This week I started working on a reusable component library, beginning with a Button and an Accordion.

The Button uses props for things like its appearance and behaviour, while the Accordion uses state to control which content is visible.

I think the main thing I took from this was the difference between information that gets passed into a component and information the component needs to keep track of itself.

I also worked with conditional rendering, Tailwind, and React Icons.

**[View Week 03](./Week03/comp-lib)**

## Week 04: Routing and More Components

I continued working on the component library, adding a Dropdown, Modal, Alert, and navigation between the different component pages.

I used React Router to give the components their own routes, so the library could work more like an actual application rather than one long page.

This was also where I started using `useEffect` more. For example, I added Escape key functionality to the Dropdown and Modal, and used cleanup functions to remove event listeners when they were no longer needed.

It helped me understand a bit more about why certain interactions need effects and why cleaning them up matters.

**[View Week 04](./Week04/comp-lib)**

## Week 05: Memory Game and Image Search

### Memory Game

For the Memory Game, I built on the matching game from class and replaced the original cards with four of my own photos of animals.

I added a best-score feature that keeps track of the lowest number of turns taken to complete the game. The score updates when you beat your previous record, but doesn't reset when you click New Game.

I used `useEffect` to check when the game had been completed and update the score. I also made some small CSS changes so the photographs fit the cards properly.

The interesting part was figuring out which changes should trigger an effect, rather than trying to do everything directly inside a click handler.

**[View Memory Game](./Week05/memory-game)**

### Image Search

For the second project, I worked with the Unsplash API to build an image search application.

I added photographer credits underneath each photo, linking directly to their Unsplash profiles. I also added a heading showing the current search term and used `useEffect` to run a default search when the app first loads.

This was useful practice with asynchronous requests, loading and error states, and environment variables for API keys.

I also had to be careful about the effect's dependency array, since updating the images after a request could trigger repeated searches if the effect was watching the wrong state.

**[View Image Search](./Week05/image-search)**

## Week 06: Todo List and Filtering

For Week 06, I worked on the server-backed todo list from class, which I later used as the foundation for my midterm.

I revisited that code and added All, Active, and Done filters. The list already supports creating, editing, deleting, and marking items as completed, with the changes saved through `json-server`.

The done checkbox uses a PATCH request because it only needs to change one property rather than replace the entire record.

The filters were actually much simpler than the server-side parts. Since the todos were already stored in state, I could just filter the existing array without making another API request.

I also worked through the difference between updating the UI before a server response and waiting until the request succeeds.

**[View Week 06](./Week06/todo-list)**

## Weeks 07–09: Midterm Project, Practice Room

For my midterm, I decided to take the todo list we had been building and turn it into something I would actually use.

I play bass, and when I'm practising a song or exercise, I often want to remember the tempo I was comfortably playing at last time. So I made **Practice Room**, a simple practice tracker where you can record songs and exercises alongside their current BPM.

The new field is a number input for BPM, and it works throughout the application. You can add a practice item, edit its tempo later, mark it as completed, or delete it. The information is saved to `json-server`, so it persists when the page refreshes.

I initially underestimated how many places I'd need to change just to add one field. I had to update the create form, edit form, API requests, and the component displaying the saved information.

At one point, the BPM was showing up correctly in the edit form but wasn't actually being saved, because I hadn't updated the function passing the edited values back through `App.jsx`.

I also worked on loading, empty, and error states, checked the layout at phone width, and tested that changes persisted after refreshing.

I kept the application using props instead of Context because the component structure was still fairly small, and I found it easier to understand where the data was being passed.

The project folder has my user story, original and revised developer checklists, and a more detailed explanation of the implementation.

**[View Practice Room](./MIDTERM)**

## Week 10: Redux and Bauhaus Prints

For Week 10, I worked with Redux Toolkit, using the Bauhaus Prints class project as my starting point.

The original application already had a catalogue, cart, and colour filters. I added a favourites feature, where you can select individual prints and see how many you've saved in the header.

I created a new `favouritesSlice` to store the selected print IDs and a `favouriteToggled` reducer to add or remove them.

I also added a Show Favourites Only option that works alongside the existing colour filters. I decided that both filters should apply at the same time, so selecting Blue and Favourites Only shows just the blue prints you've favourited.

I put the selected IDs in the favourites slice, but kept the show-only-favourites setting in the UI slice. That made more sense to me because one represents which prints the user has selected, while the other represents how they're choosing to view the catalogue.

I also used selectors to read the favourites count and IDs from the store, rather than duplicating that information in individual components.

This assignment helped me understand why the structure of state matters, particularly when several components need to access the same information.

**[View Bauhaus Prints](./Week10/bauhaus-prints)**

**[Favourites assignment answers](./Week10/bauhaus-prints/ANSWERS.md)**

### Thinking About State for My Final Project

I'm still deciding exactly what I want to do for my final, but I've been considering expanding Practice Room into a more developed music practice tracker.

If I continue with that idea, these are the main pieces of state I'd expect to have:

* **Practice entries:** I would initially keep these in `App` using `useState`, with the saved data coming from the server. I'd pass the entries and update functions to the relevant components through props.
* **Form inputs:** I would keep these in local `useState` inside the form components, since the rest of the application doesn't need to know what someone is typing before they submit.
* **Loading and error states:** These could stay in `App`, where the API requests are handled.
* **Selected filters:** I would use `useState` in whichever parent component controls the list, and pass the relevant information down through props.
* **Editing state:** Whether a particular entry is currently being edited could stay local to that entry's component.

I wouldn't store things like the number of unfinished exercises or a filtered list as separate state, since those values can be calculated from the existing practice entries.

At the moment, I don't think I'd need Redux for all of this. Props and local state seem sufficient for a smaller application. If the final becomes more complex, with lots of components needing access to shared information, I'd consider Context or Redux.

I think one of the more useful things I've learned recently is that just because you *can* use Redux for something doesn't necessarily mean you should.

## Next Steps

I'm continuing to work through the later Redux assignments, including the art collection project, and beginning to plan my final.

I've also been reviewing my earlier projects and documentation to make sure I understand the code I've written, rather than just getting everything running.