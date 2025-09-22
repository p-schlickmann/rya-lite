export type NewAudience = {
  name: string;
  brand_description: string;
  age_min?: string | null;
  age_max?: string | null;
  birth_sex?: string;
  state?: string;
  city?: string;
  income?: string;
  interests: string[];
};

export type Audience = {
  id: number;
  created_at: string;
} & NewAudience;

export type Concept = {
  id: number;
  created_at: string;
  audience_id: number;
  name: string;
  description: string;
  parent_id?: number;
};
