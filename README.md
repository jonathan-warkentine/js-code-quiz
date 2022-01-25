# JS Code Quiz

👉 [This application is live!](https://jonathan-warkentine.github.io/js-code-quiz/)

---

## Description
This project seeks to provide the user with an enjoyable way to test and grow their knowledge of JavaScript. The project is deployed at https://jonathan-warkentine.github.io/js-code-quiz/

## Usage
![Screenshot]()

The app can be accessed via the above-listed URL.

When the app is loaded, the user is presented with a description of the gameplay. When the "New Game!" button is selected, the user is presented with the first of several coding questions to answer, and a countdown timer is displayed. If the "View High Scores" button is selected, previous scores with their respective initials are displayed, called from local storage.

For gameplay, the countdown timer continues to decrement. If an incorrect answer is selected by the user, the timer decrements 10 seconds as a penalty. A message pops up for 2 seconds to inform the user of their incorrect selection, and the next question is displayed. If the user selects the correct question, a message pops up for 2 seconds to inform them of their correct selection. No time is penalized, and the next question is displayed.

If all questions have been attempted, or if the time remaining gets to 0, then gameover screen appears with the user's score (which is simply the time remaining at the time of completion). The user has the option of submitting their score with their initials. The user can also click "Play Again" which starts the game over, or click "View High Scores," which displays the same scoring page that the button in the top left links to.


## Features

The CSS styling is responsive, adapting for viewing on mobile devices.

## Tests
If the user attempts to copy the password by clicking *before* a password has been generated, the copy-by-clicking mechanism is short circuited and nothing happens.

If the user attempts to generate a password *without* uppercase, lowercase, symbols, or numbers, an error alert notifies the user that at least one option must be selected.

## License
This project is fully open source.