# Practice Room

**DM-UY 3193 Dynamic Web Applications | Midterm**

## About the project

For my midterm, I decided to turn the todo list we built in class into a practice tracker for musicians.

I play bass, and something I wanted to keep track of was the tempo I could comfortably play a song or exercise at. When I'm practising something over multiple sessions, I don't always remember exactly where I left off, especially when I've been gradually increasing the BPM.

Practice Room is a pretty simple way of keeping track of that. You can add songs or exercises, record your current BPM, change it as you improve, and mark things as done.

I wanted to keep the idea fairly straightforward and focus on making the functionality work properly rather than adding a bunch of features I wouldn't necessarily use.

## User story

As a bassist, I want to keep track of the songs and exercises I'm practising, along with the BPM I can currently play them at, so I know where to start the next time I practise.

## Original checklist

What I initially thought I'd need to do:

* [x] Use the todo list from class as a starting point
* [x] Change the app into a music practice list
* [x] Add a number input for BPM
* [x] Save songs and their BPM
* [x] Keep the ability to edit, delete, and mark items as done
* [ ] Make sure everything works on mobile

## Revised checklist

Once I started working on it, I realised adding BPM meant making changes in more places than I originally expected.

* [x] Add BPM state and an input in `TodoCreate.jsx`
* [x] Pass BPM through `App.jsx` to the API
* [x] Update the POST request to save BPM in `db.json`
* [x] Display the saved BPM in `TodoItem.jsx`
* [x] Update `TodoEdit.jsx` so both the title and BPM can be edited
* [x] Update the edit function in `App.jsx` to actually save the new BPM
* [x] Keep the existing delete and done functionality
* [x] Add loading, empty, and error messages
* [x] Fix the server connection and run both servers separately
* [x] Run `npm run build` successfully
* [ ] Finish testing persistence after refreshing
* [ ] Check the layout at phone size

## Components, props, and state

I kept most of the component structure from the original todo list.

`App.jsx` holds the main list of songs and handles the API requests. `TodoCreate` has its own state for the form inputs, and `TodoEdit` has separate state for the values being edited. `TodoList` uses `.map()` to render each song through `TodoItem`.

I decided to keep using props rather than move everything into Context. We covered Context in class, but for this project the component structure is still fairly small, and I found it easier to follow where the data was going using props. The title and BPM are passed up through callback functions, while the list itself is managed in `App`.

For the database, I used Axios and json-server. The BPM is converted from the input's string value into a number before saving. I also kept the distinction between PUT and PATCH from class, using PUT when editing a song and PATCH when changing whether something is done.

## Challenges and changes

The main thing I underestimated was how much needed changing to add one new field. Initially I thought adding the BPM input would be the majority of the work, but I then needed to make sure it was being passed through the components, saved in the database, displayed, and editable.

I also ran into an issue where I could change the BPM in the edit form, but the new value wasn't actually saving. The edit function in `App.jsx` was still only accepting the title, so I needed to update it to accept both values.

Another issue was getting the React app and json-server running at the same time. Once I had them in separate terminals, the app could fetch the saved records properly.

I think the most useful part of this project was seeing how the components and API requests actually work together, rather than just following the individual steps from class.

## Running the project

From the `MIDTERM` folder:

1. Run `npm install` if dependencies aren't already installed.
2. In one terminal, run `npm run server`.
3. In another terminal, run `npm run dev`.
4. Open the local URL Vite provides.

json-server runs at `http://localhost:3001` and saves the practice list in `db.json`.

## What I'd add next

If I continued working on this, I'd probably add a notes section for each song. It would be useful to write down specific things I want to work on, rather than only recording a tempo. For this version, I wanted to focus on making the BPM tracking work properly first.
