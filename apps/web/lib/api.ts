import { CharacterDetailResponseSchema, CharactersResponseSchema } from "./types"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message)
    this.name = "ApiError"
  }
}

export async function fetchCharacters(search?: string, page = 1) {
  try {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: "12",
    })

    if (search) {
      params.append("name", search)
    }

    const response = await fetch(`${API_BASE_URL}/api/characters?${params}`, {
      next: { revalidate: 300 }, // Cache for 5 minutes
    })

    if (!response.ok) {
      throw new ApiError(response.status, `Failed to fetch characters: ${response.statusText}`)
    }

    const data = await response.json()
    return data
  } catch (error) {

    console.log("error", error)
    if (error instanceof ApiError) {
      throw error
    }
    throw new ApiError(500, "Network error occurred while fetching characters")
  }
}

export async function fetchCharacterById(id: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/characters/${id}`, {
      next: { revalidate: 300 }, // Cache for 5 minutes
    })

    if (!response.ok) {
      if (response.status === 404) {
        throw new ApiError(404, "Character not found")
      }
      throw new ApiError(response.status, `Failed to fetch character: ${response.statusText}`)
    }

    const data = await response.json()
    return CharacterDetailResponseSchema.parse(data)
  } catch (error) {
    if (error instanceof ApiError) {
      throw error
    }
    throw new ApiError(500, "Network error occurred while fetching character details")
  }
}
