const { default: mongoose } = require("mongoose");
const Quiz = require("../model/Quiz.js");
const crypto = require("crypto");

const quizzes = [
  {
    id: 1,
    title: "Quiz 1: Console Investigation",
    description:
      "Open the browser console and enter the secret key to proceed to the next quiz.",
    key: "5b95e",
    action: "CONSOLE_INPUT",
  },
  {
    id: 2,
    title: "Quiz 2: Element Class Challenge",
    description:
      "Inspect this element and enter the CSS class name applied to this description.",
    key: "descr",
    action: "ELEMENT_INSPECTION",
  },
  {
    id: 3,
    title: "Quiz 3: Styling Detective",
    description:
      "Check the computed styles for this element and enter the text style properties.",
    key: "large",
    action: "STYLE_INSPECTION",
  },
  {
    id: 4,
    title: "Quiz 4: Console Function Call",
    description:
      "Run the 'getKey()' function in the console to retrieve the key for the next quiz.",
    key: "26a49",
    action: "CONSOLE_FUNCTION",
  },
  {
    id: 5,
    title: "Quiz 5: Session Storage Hunt",
    description:
      "Retrieve the key stored in session storage and enter it to proceed.",
    key: "f1eb1",
    action: "SESSION_STORAGE",
  },
  {
    id: 6,
    title: "Quiz 6: Payload Exploration",
    description:
      "Click the button below, inspect the network request, and extract the key from the payload to advance.",
    key: "dba84",
    action: "NETWORK_INSPECTION",
  },
  {
    id: 7,
    title: "Quiz 7: Local Storage Lookup",
    description:
      "Find the key stored in local storage and input it here to continue.",
    key: "fe9e0",
    action: "LOCAL_STORAGE",
  },
  {
    id: 8,
    title: "Quiz 8: Loader Secret",
    description:
      "The key for this quiz is hidden within the loader of this page. Discover it and move on.",
    key: "c6526",
    action: "LOADER_INSPECTION",
  },
  {
    id: 9,
    title: "Quiz 9: Token Unlock",
    description:
      "Use the access token stored in local storage as an argument in the 'getKey()' function to reveal the final key.",
    key: "e2324",
    action: "TOKEN_UNLOCK",
  },
];

mongoose
  .connect(
    "mongodb+srv://admin:L2z59TsKtGQHoaRV@cluster0.xsiq7uy.mongodb.net/auth_data",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    quizzes.map((quiz) => {
      console.log(quiz.action);
    });
    // Quiz.insertMany(quizzes)
    //   .then(() => {
    //     console.log("Quizzes inserted successfully!");
    //   })
    //   .catch((error) => {
    //     console.error("Error inserting quizzes:", error);
    //   });
    // Quiz.deleteMany({})
    //   .then(() => {
    //     console.log("deleted");
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //   });
  })
  .catch((err) => console.error("Error connecting to MongoDB:", err));
