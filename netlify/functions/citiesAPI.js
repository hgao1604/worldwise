const fs = require("fs");
const path = require("path");

const dataPath = path.join(__dirname, "..", "..", "data", "cities.json");

exports.handler = async function (event, context) {
  const { httpMethod, body } = event;

  switch (httpMethod) {
    case "GET":
      const rawData = fs.readFileSync(dataPath);
      const cities = JSON.parse(rawData);
      return {
        statusCode: 200,
        body: JSON.stringify(cities),
      };

    case "POST":
      const newCity = JSON.parse(body);
      const currentData = JSON.parse(fs.readFileSync(dataPath));
      currentData.push(newCity);
      fs.writeFileSync(dataPath, JSON.stringify(currentData));
      return {
        statusCode: 200,
        body: JSON.stringify(newCity),
      };

    case "DELETE":
      const cityToDelete = JSON.parse(body);
      const citiesToKeep = JSON.parse(fs.readFileSync(dataPath)).filter(
        (city) => city.id !== cityToDelete.id
      );
      fs.writeFileSync(dataPath, JSON.stringify(citiesToKeep));
      return {
        statusCode: 200,
        body: JSON.stringify(cityToDelete),
      };

    default:
      return {
        statusCode: 400,
        body: "Unsupported request method!",
      };
  }
};
