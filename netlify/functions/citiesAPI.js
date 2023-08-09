const express = require("express");
const axios = require("axios");
const serverless = require("netlify-lambda");

const app = express();

const BASE_URL = "http://44.228.182.177:9001";

app.get("/cities", async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/cities`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch cities" });
  }
});

app.get("/cities/:id", async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/cities/${req.params.id}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch city" });
  }
});

app.post("/cities", express.json(), async (req, res) => {
  try {
    const response = await axios.post(`${BASE_URL}/cities`, req.body);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Unable to create city" });
  }
});

app.delete("/cities/:id", async (req, res) => {
  try {
    await axios.delete(`${BASE_URL}/cities/${req.params.id}`);
    res.json({ id: req.params.id });
  } catch (error) {
    res.status(500).json({ error: "Unable to delete city" });
  }
});

module.exports.handler = serverless(app);
