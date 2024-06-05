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
