import express from "express";
import cors from "cors";
import axios from "axios";
const app = express();

app.use(cors());
const port = process.env.PORT || 5000;

async function getCharacterDetails(character: { url: string; name: string }) {
  try {
    const characterRes = await axios.get(character.url);
    const details = characterRes.data.result.properties;

    let homeworld = null;
    if (details.homeworld) {
      const homeworldRes = await axios.get(details.homeworld);
      homeworld = homeworldRes.data.result.properties;
    }

    let films = [];
    if (details.films && details.films.length > 0) {
      films = await Promise.all(
        details.films.map(async (filmUrl: string) => {
          const filmRes = await axios.get(filmUrl);
          return filmRes.data.result.properties;
        })
      );
    }

    let species = [];
    if (details.species && details.species.length > 0) {
      species = await Promise.all(
        details.species.map(async (speciesUrl: string) => {
          const speciesRes = await axios.get(speciesUrl);
          return speciesRes.data.result.properties;
        })
      );
    }

    let vehicles = [];
    if (details.vehicles && details.vehicles.length > 0) {
      vehicles = await Promise.all(
        details.vehicles.map(async (vehicleUrl: string) => {
          const vehicleRes = await axios.get(vehicleUrl);
          return vehicleRes.data.result.properties;
        })
      );
    }

    let starships = [];
    if (details.starships && details.starships.length > 0) {
      starships = await Promise.all(
        details.starships.map(async (starshipUrl: string) => {
          const starshipRes = await axios.get(starshipUrl);
          return starshipRes.data.result.properties;
        })
      );
    }

    return {
      ...character,
      details: {
        ...details,
        homeworld,
        films,
        species,
        vehicles,
        starships,
      },
    };
  } catch (error) {
    console.error(`Error fetching details for ${character.name}:`, error);
    return {
      ...character,
      error: "Failed to load some details",
    };
  }
}

app.get("/", (_req, res) => {
  res.send("Health Check: API is running!");
});

// Search characters with pagination and default top 10
app.get("/api/characters", async (req, res) => {
  try {
    const { name, page = 1, limit = 10 } = req.query;

    if (!name) {
      const swapiRes = await axios.get(
        `https://www.swapi.tech/api/people?page=${page}&limit=${limit}`
      );

      // Fetch additional details for each character
      const charactersWithDetails = await Promise.all(
        swapiRes.data.results.map(
          async (character: { url: string; name: string }) => {
            return await getCharacterDetails(character);
          }
        )
      );

      return res.json({
        data: charactersWithDetails,
        pagination: {
          totalRecords: swapiRes.data.total_records,
          totalPages: swapiRes.data.total_pages,
          currentPage: parseInt(String(page)),
          perPage: parseInt(String(limit)),
          next: swapiRes.data.next,
          previous: swapiRes.data.previous,
        },
      });
    }

    if (typeof name !== "string") {
      return res.status(400).json({ error: "Name must be a string" });
    }

    const swapiRes = await axios.get(
      `https://www.swapi.tech/api/people/?name=${encodeURIComponent(name)}&page=${page}&limit=${limit}`
    );

    // Fetch additional details for each character in search results
    const charactersWithDetails = await Promise.all(
      swapiRes.data.results.map(
        async (character: { url: string; name: string }) => {
          return await getCharacterDetails(character);
        }
      )
    );

    res.json({
      data: charactersWithDetails,
      pagination: {
        totalRecords: swapiRes.data.total_records,
        totalPages: swapiRes.data.total_pages,
        currentPage: parseInt(String(page)),
        perPage: parseInt(String(limit)),
        next: swapiRes.data.next,
        previous: swapiRes.data.previous,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch characters" });
  }
});

app.get("/api/characters/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const swapiRes = await axios.get(`https://www.swapi.tech/api/people/${id}`);

    // Enhance response with additional details
    const character = swapiRes.data.result;
    const details = character.properties;

    // Fetch homeworld details if available
    let homeworld = null;
    if (details.homeworld) {
      const homeworldRes = await axios.get(details.homeworld);
      homeworld = homeworldRes.data.result.properties;
    }

    res.json({
      ...character,
      enhancedProperties: {
        ...details,
        homeworld,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch character details" });
  }
});

app.get("/api/resource", async (req, res) => {
  try {
    const { url } = req.query;
    if (!url) return res.status(400).json({ error: "URL query is required" });

    if (typeof url !== "string") {
      return res.status(400).json({ error: "URL must be a string" });
    }

    const swapiRes = await axios.get(url);
    res.json(swapiRes.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch resource" });
  }
});

app.listen(port, () => {
  console.log(`API server running at http://localhost:${port}`);
});