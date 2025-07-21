import { z } from "zod"

export const HomeworldSchema = z.object({
  id: z.string(),
  name: z.string(),
  climate: z.string(),
  terrain: z.string(),
  population: z.string(),
  diameter: z.string(),
  gravity: z.string(),
  orbital_period: z.string(),
  rotation_period: z.string(),
  surface_water: z.string(),
  url: z.string(),
  created: z.string(),
  edited: z.string(),
})

export const FilmSchema = z.object({
  id: z.string(),
  title: z.string(),
  episode_id: z.number(),
  opening_crawl: z.string(),
  director: z.string(),
  producer: z.string(),
  release_date: z.string(),
  url: z.string(),
  created: z.string(),
  edited: z.string(),
})

export const SpeciesSchema = z.object({
  id: z.string(),
  name: z.string(),
  classification: z.string(),
  designation: z.string(),
  average_height: z.string(),
  skin_colors: z.string(),
  hair_colors: z.string(),
  eye_colors: z.string(),
  average_lifespan: z.string(),
  homeworld: z.string().nullable(),
  language: z.string(),
  url: z.string(),
  created: z.string(),
  edited: z.string(),
})

export const VehicleSchema = z.object({
  id: z.string(),
  name: z.string(),
  model: z.string(),
  manufacturer: z.string(),
  cost_in_credits: z.string(),
  length: z.string(),
  max_atmosphering_speed: z.string(),
  crew: z.string(),
  passengers: z.string(),
  cargo_capacity: z.string(),
  consumables: z.string(),
  vehicle_class: z.string(),
  url: z.string(),
  created: z.string(),
  edited: z.string(),
})

export const StarshipSchema = z.object({
  id: z.string(),
  name: z.string(),
  model: z.string(),
  manufacturer: z.string(),
  cost_in_credits: z.string(),
  length: z.string(),
  max_atmosphering_speed: z.string(),
  crew: z.string(),
  passengers: z.string(),
  cargo_capacity: z.string(),
  consumables: z.string(),
  hyperdrive_rating: z.string(),
  MGLT: z.string(),
  starship_class: z.string(),
  url: z.string(),
  created: z.string(),
  edited: z.string(),
})

export const BasicInfoSchema = z.object({
  gender: z.string(),
  birthYear: z.string(),
  height: z.string(),
  mass: z.string(),
  hairColor: z.string(),
  skinColor: z.string(),
  eyeColor: z.string(),
})

export const RelationsSchema = z.object({
  homeworld: HomeworldSchema.nullable(),
  films: z.array(FilmSchema),
  species: z.array(SpeciesSchema),
  vehicles: z.array(VehicleSchema),
  starships: z.array(StarshipSchema),
})

export const MetaSchema = z.object({
  created: z.string(),
  edited: z.string(),
  url: z.string(),
})

export const CharacterSchema = z
  .object({
    id: z.string(),
    name: z.string(),
    description: z.string().optional(),
    basicInfo: BasicInfoSchema,
    relations: RelationsSchema,
    meta: MetaSchema,
  })
  .or(
    z.object({
      id: z.string(),
      name: z.string(),
      error: z.string(),
      basicInfo: z.any(),
    }),
  )

export const PaginationSchema = z.object({
  totalRecords: z.number(),
  currentPage: z.number(),
  perPage: z.number(),
})

export const MetadataSchema = z.object({
  apiVersion: z.string().optional(),
  timestamp: z.string().optional(),
})

export const CharactersResponseSchema = z.object({
  data: z.array(CharacterSchema),
  pagination: PaginationSchema,
  metadata: MetadataSchema.optional(),
})

// Keep the old schema for the individual character endpoint
export const CharacterDetailResponseSchema = z.object({
  uid: z.string(),
  properties: z.object({
    name: z.string(),
    gender: z.string(),
    skin_color: z.string(),
    hair_color: z.string(),
    height: z.string(),
    eye_color: z.string(),
    mass: z.string(),
    birth_year: z.string(),
    url: z.string(),
    created: z.string(),
    edited: z.string(),
    homeworld: z.string().optional(),
    films: z.array(z.string()).default([]),
    species: z.array(z.string()).default([]),
    vehicles: z.array(z.string()).default([]),
    starships: z.array(z.string()).default([]),
  }),
  enhancedProperties: z.object({
    name: z.string(),
    gender: z.string(),
    skin_color: z.string(),
    hair_color: z.string(),
    height: z.string(),
    eye_color: z.string(),
    mass: z.string(),
    birth_year: z.string(),
    url: z.string(),
    created: z.string(),
    edited: z.string(),
    homeworld: HomeworldSchema.nullable(),
    films: z.array(z.string()).default([]),
    species: z.array(z.string()).default([]),
    vehicles: z.array(z.string()).default([]),
    starships: z.array(z.string()).default([]),
  }),
  description: z.string().optional(),
  _id: z.string().optional(),
  __v: z.number().optional(),
})

export type Character = z.infer<typeof CharacterSchema>
export type BasicInfo = z.infer<typeof BasicInfoSchema>
export type Relations = z.infer<typeof RelationsSchema>
export type Homeworld = z.infer<typeof HomeworldSchema>
export type Film = z.infer<typeof FilmSchema>
export type Species = z.infer<typeof SpeciesSchema>
export type Vehicle = z.infer<typeof VehicleSchema>
export type Starship = z.infer<typeof StarshipSchema>
export type Pagination = z.infer<typeof PaginationSchema>
export type Metadata = z.infer<typeof MetadataSchema>
export type CharactersResponse = z.infer<typeof CharactersResponseSchema>
export type CharacterDetailResponse = z.infer<typeof CharacterDetailResponseSchema>
