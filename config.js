var config = {};
if (process.env.NODE_ENV === "production") {
  config = {
    STATS_API: "https://dotabetstats.herokuapp.com"
  };
} else {
  config = {
    STATS_API: "https://dotabetstats.herokuapp.com"
  };
}

export default config;
