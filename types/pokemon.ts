export type NamedAPIResource = { name: string; url: string };

export type PokemonListResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: NamedAPIResource[];
};

export type Pokemon = {
  id: number;
  name: string;
  sprites?: {
    front_default?: string | null;
    back_default?: string | null;
  };
  types?: { slot: number; type: { name: string } }[];
  abilities?: { ability: { name: string } }[];
  height?: number;
  weight?: number;
  stats?: { base_stat: number; effort: number; stat: { name: string } }[];
  // Local-only fields
  __local?: boolean;
  __spriteOverride?: string;
};
