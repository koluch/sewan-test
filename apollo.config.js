require("dotenv-defaults").config();

module.exports = {
  client: {
    service: {
      name: "Rick And Morty API",
      url: process.env.GRAPHQL_SCHEMA_URL,
    },
  },
};
