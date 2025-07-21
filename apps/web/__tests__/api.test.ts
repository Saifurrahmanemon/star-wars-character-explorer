/**
 * @jest-environment jsdom
 */

import { fetchCharacters, fetchCharacterById, ApiError } from "@/lib/api"

// Mock fetch globally
global.fetch = jest.fn()

const mockFetch = fetch as jest.MockedFunction<typeof fetch>

describe("API functions", () => {
  beforeEach(() => {
    mockFetch.mockClear()
  })

  describe("fetchCharacters", () => {
    it("fetches characters successfully", async () => {
      const mockResponse = {
        data: [
          {
            id: "1",
            name: "Luke Skywalker",
            description: "A person within the Star Wars universe",
            basicInfo: {
              gender: "male",
              birthYear: "19BBY",
              height: "172",
              mass: "77",
              hairColor: "blond",
              skinColor: "fair",
              eyeColor: "blue",
            },
            relations: {
              homeworld: {
                id: "1",
                name: "Tatooine",
                climate: "arid",
                terrain: "desert",
                population: "200000",
                diameter: "10465",
                gravity: "1 standard",
                orbital_period: "304",
                rotation_period: "23",
                surface_water: "1",
                url: "https://www.swapi.tech/api/planets/1",
                created: "2025-07-20T20:08:24.108Z",
                edited: "2025-07-20T20:08:24.108Z",
              },
              films: [],
              species: [],
              vehicles: [],
              starships: [],
            },
            meta: {
              created: "2025-07-20T20:08:24.106Z",
              edited: "2025-07-20T20:08:24.106Z",
              url: "https://www.swapi.tech/api/people/1",
            },
          },
        ],
        pagination: {
          totalRecords: 1,
          currentPage: 1,
          perPage: 12,
        },
        metadata: {
          apiVersion: "1.0",
          timestamp: "2025-07-20T20:08:24.106Z",
        },
      }

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      } as Response)

      const result = await fetchCharacters()

      expect(result).toEqual(mockResponse)
      expect(mockFetch).toHaveBeenCalledWith("http://localhost:5000/api/characters?page=1&limit=12", {
        next: { revalidate: 300 },
      })
    })

    it("includes search parameter when provided", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ data: [], pagination: { totalRecords: 0, currentPage: 2, perPage: 12 } }),
      } as Response)

      await fetchCharacters("Luke", 2)

      expect(mockFetch).toHaveBeenCalledWith("http://localhost:5000/api/characters?page=2&limit=12&name=Luke", {
        next: { revalidate: 300 },
      })
    })

    it("throws ApiError on HTTP error", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: "Internal Server Error",
      } as Response)

      await expect(fetchCharacters()).rejects.toThrow(ApiError)
      await expect(fetchCharacters()).rejects.toThrow("Failed to fetch characters: Internal Server Error")
    })

    it("handles API error in response", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ error: "Failed to fetch characters", details: "Network timeout" }),
      } as Response)

      await expect(fetchCharacters()).rejects.toThrow(ApiError)
      await expect(fetchCharacters()).rejects.toThrow("Failed to fetch characters")
    })
  })

  describe("fetchCharacterById", () => {
    it("fetches character by ID successfully", async () => {
      const mockResponse = {
        uid: "1",
        properties: {
          name: "Luke Skywalker",
          gender: "male",
          skin_color: "fair",
          hair_color: "blond",
          height: "172",
          eye_color: "blue",
          mass: "77",
          birth_year: "19BBY",
          url: "https://www.swapi.tech/api/people/1",
          created: "2025-07-20T20:08:24.106Z",
          edited: "2025-07-20T20:08:24.106Z",
          homeworld: "https://www.swapi.tech/api/planets/1",
          films: [],
          species: [],
          vehicles: [],
          starships: [],
        },
        enhancedProperties: {
          name: "Luke Skywalker",
          gender: "male",
          skin_color: "fair",
          hair_color: "blond",
          height: "172",
          eye_color: "blue",
          mass: "77",
          birth_year: "19BBY",
          url: "https://www.swapi.tech/api/people/1",
          created: "2025-07-20T20:08:24.106Z",
          edited: "2025-07-20T20:08:24.106Z",
          homeworld: {
            id: "1",
            name: "Tatooine",
            climate: "arid",
            terrain: "desert",
            population: "200000",
            diameter: "10465",
            gravity: "1 standard",
            orbital_period: "304",
            rotation_period: "23",
            surface_water: "1",
            url: "https://www.swapi.tech/api/planets/1",
            created: "2025-07-20T20:08:24.108Z",
            edited: "2025-07-20T20:08:24.108Z",
          },
          films: [],
          species: [],
          vehicles: [],
          starships: [],
        },
      }

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      } as Response)

      const result = await fetchCharacterById("1")

      expect(result).toEqual(mockResponse)
      expect(mockFetch).toHaveBeenCalledWith("http://localhost:5000/api/characters/1", { next: { revalidate: 300 } })
    })

    it("throws 404 ApiError when character not found", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: "Not Found",
      } as Response)

      await expect(fetchCharacterById("999")).rejects.toThrow(ApiError)
      await expect(fetchCharacterById("999")).rejects.toThrow("Character not found")
    })
  })
})
