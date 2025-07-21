import express from "express";
import cors from "cors";
import axios from "axios";
const app = express();

app.use(cors());
const port = process.env.PORT || 5000;


app.get("/", (_req, res) => {
  res.send("Health Check: API is running!");
});

app.get("/api/characters", async (req, res) => {
  try {
    const { name, page = 1, limit = 10 } = req.query;

    if (!name) {
      const swapiRes = await axios.get(
        `https://www.swapi.tech/api/people?page=${page}&limit=${limit}`
      );

      // Fetch additional details for each character
      const charactersWithDetails = await Promise.all(
        swapiRes.data.results?.map(async (character: any) => {
          return await getEnhancedCharacter(character);
        })
      );

      return res.json({
        data: charactersWithDetails,
        pagination: {
          totalRecords:
            swapiRes.data.total_records || charactersWithDetails.length,
          currentPage: parseInt(String(page)),
          perPage: parseInt(String(limit)),
        },
        metadata: {
          apiVersion: swapiRes.data.apiVersion,
          timestamp: swapiRes.data.timestamp,
        },
      });
    }

    if (typeof name !== "string") {
      return res.status(400).json({ error: "Name must be a string" });
    }

    const swapiRes = await axios.get(
      `https://www.swapi.tech/api/people?name=${encodeURIComponent(name)}&page=${page}&limit=${limit}`
    );

    const charactersWithDetails = await Promise.all(
      swapiRes.data.result.map(async (character: any) => {
        return await getEnhancedCharacter(character);
      })
    );

    res.json({
      data: charactersWithDetails,
      pagination: {
        totalRecords:
          swapiRes.data.total_records || charactersWithDetails.length,
        currentPage: parseInt(String(page)),
        perPage: parseInt(String(limit)),
      },
      metadata: {
        apiVersion: swapiRes.data.apiVersion,
        timestamp: swapiRes.data.timestamp,
      },
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      error: "Failed to fetch characters",
      details: error?.message,
    });
  }
});

async function getEnhancedCharacter(character: {
  properties: any;
  url: string;
  uid: any;
  _id: any;
  description: any;
}) {
  const properties =
    character.properties ||
    (await axios.get(character.url)).data.result.properties;

  try {
    const details = properties;

    const homeworld = details.homeworld
      ? (await axios.get(details.homeworld)).data.result.properties
      : null;

    const fetchRelated = async (urls: any[]) => {
      if (!urls || urls.length === 0) return [];
      return Promise.all(
        urls.map((url: string) =>
          axios.get(url).then((res) => res.data.result.properties)
        )
      );
    };

    return {
      id: character.uid || character._id,
      name: details.name,
      description: character.description || "Star Wars character",
      basicInfo: {
        gender: details.gender,
        birthYear: details.birth_year,
        height: details.height,
        mass: details.mass,
        hairColor: details.hair_color,
        skinColor: details.skin_color,
        eyeColor: details.eye_color,
      },
      relations: {
        homeworld,
        films: await fetchRelated(details.films),
        species: await fetchRelated(details.species),
        vehicles: await fetchRelated(details.vehicles),
        starships: await fetchRelated(details.starships),
      },
    };
  } catch (error) {
    console.error(
      `Error enhancing character ${character.properties?.name || character.uid}:`,
      error
    );
    return {
      id: character.uid || character._id,
      name: character.properties?.name || "Unknown",
      error: "Failed to load some details",
      basicInfo: {
        ...(character.properties || {}),
      },
    };
  }
}
app.get("/api/characters/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const swapiRes = await axios.get(`https://www.swapi.tech/api/people/${id}`);

    const character = swapiRes.data.result;
    const details = character.properties;

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
