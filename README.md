# Rainbow Explorer

A **20kb** Preact & Redux based Progressive Web App that translates real life color to digital color.

[Click here for a demo!](https://use-the-platform.com/rainbow-explorer)

## Structure
To keep performance high and application size small this application is powered by [Preact](https://github.com/developit/preact/). A 3kb React alternative that works with the same ES6 API. Together with Redux for keeping state it's really fast.

* Based on [Preact Redux Example](https://github.com/developit/preact-redux-example) by [developit](https://github.com/developit).

* Preact based components manage input of color through the camera and save them.

* Redux is used to store the state of the application (colors, current target and UI state).

* UI is adjusted based on state (opening modal, fancy background colors and video pause / play).

* There's a fallback message if javascript isn't available or getUserMedia() is
not supported.

* The application works offline, can be saved to the home screen (on android) and stores all the saved colors in local storage.

## What's missing?
This application was made as a side project in a few days. For following structure changes and functionality updates improvements can be made:

* Automated minify of CSS and inline in head.

* Share of saved colors.

* Adjusted text contrast for light colors.

* Support for more browsers (currently Chrome on desktop and mobile).

## License

MIT
