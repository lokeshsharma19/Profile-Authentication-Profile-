export const quizzes = [
  {
    id: 1,
    title: "Quiz 1: Console Investigation",
    description:
      "Open the browser console and enter the secret key to proceed to the next quiz.",
  },
  {
    id: 2,
    title: "Quiz 2: Element Class Challenge",
    description:
      "Inspect this element and enter the CSS class name applied to this description.",
  },
  {
    id: 3,
    title: "Quiz 3: Styling Detective",
    description:
      "Check the computed styles for this element and enter the text style properties.",
  },
  {
    id: 4,
    title: "Quiz 4: Console Function Call",
    description:
      "Run the 'getKey()' function in the console to retrieve the key for the next quiz.",
  },
  {
    id: 5,
    title: "Quiz 5: Session Storage Hunt",
    description:
      "Retrieve the key stored in session storage and enter it to proceed.",
  },
  {
    id: 6,
    title: "Quiz 6: Payload Exploration",
    description:
      "Click the button below, inspect the network request, and extract the key from the payload to advance.",
  },
  {
    id: 7,
    title: "Quiz 7: Local Storage Lookup",
    description:
      "Find the key stored in local storage and input it here to continue.",
  },
  {
    id: 8,
    title: "Quiz 8: Loader Secret",
    description:
      "The key for this quiz is hidden within the loader of this page. Discover it and move on.",
  },
  {
    id: 9,
    title: "Quiz 9: Token Unlock",
    description:
      "Use the access token stored in local storage as an argument in the 'getKey()' function to reveal the final key.",
  },
];

const dev = {
  url: {
    API_URL: "http://localhost:3500",
  },
};

const prod = {
  url: {
    API_URL: "",
  },
};

export const config = process.env.NODE_ENV === "development" ? dev : prod;
