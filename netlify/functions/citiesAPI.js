let cities = [
  {
    cityName: "Lisbon",
    country: "Portugal",
    emoji: "🇵🇹",
    date: "2027-10-31T15:59:59.138Z",
    notes: "My favorite city so far!",
    position: {
      lat: 38.727881642324164,
      lng: -9.140900099907554,
    },
    id: 73930385,
  },
  {
    cityName: "Madrid",
    country: "Spain",
    emoji: "🇪🇸",
    date: "2027-07-15T08:22:53.976Z",
    notes: "",
    position: {
      lat: 40.46635901755316,
      lng: -3.7133789062500004,
    },
    id: 17806751,
  },
  {
    cityName: "Berlin",
    country: "Germany",
    emoji: "🇩🇪",
    date: "2027-02-12T09:24:11.863Z",
    notes: "Amazing 😃",
    position: {
      lat: 52.53586782505711,
      lng: 13.376933665713324,
    },
    id: 98443197,
  },
  {
    cityName: "Quintanar de la Sierra",
    country: "Spain",
    emoji: "🇪🇸",
    date: "2023-07-24T00:17:06.471Z",
    notes: "123",
    position: {
      lat: "42.032974332441405",
      lng: "-3.0322265625000004",
    },
    id: 98443198,
  },
];

exports.handler = async function (event) {
  switch (event.httpMethod) {
    case "GET":
      if (event.path.endsWith("/cities")) {
        return {
          statusCode: 200,
          body: JSON.stringify(cities),
        };
      }

      const cityId = event.path.split("/").pop();
      const city = cities.find((c) => c.id === parseInt(cityId));
      return {
        statusCode: 200,
        body: JSON.stringify(city),
      };

    case "POST":
      const newCity = JSON.parse(event.body);
      cities.push(newCity);
      return {
        statusCode: 201,
        body: JSON.stringify(newCity),
      };

    case "DELETE":
      const idToDelete = event.path.split("/").pop();
      cities = cities.filter((c) => c.id !== parseInt(idToDelete));
      return {
        statusCode: 204, // No Content
      };

    default:
      return {
        statusCode: 405,
        body: "Method Not Allowed",
      };
  }
};
