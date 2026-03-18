export const PET_STATUS = ["looking_for_a_home", "help_needed"] as const;
export type PetStatus = (typeof PET_STATUS)[number];

export const PET_GENDER = ["male", "female"] as const;
export type PetGender = (typeof PET_GENDER)[number];

export const PET_AGE = ["puppy", "junior", "adult", "senior"] as const;
export type PetAge = (typeof PET_AGE)[number];

export const PET_BREED = ["no_breed", "mongrel", "purebred"] as const;
export type PetBreed = (typeof PET_BREED)[number];

export const PET_SIZE = ["s", "m", "l"] as const;
export type PetSize = (typeof PET_SIZE)[number];

export const PET_TYPE = ["dog", "cat", "hamster", "bird", "fish", "other"] as const;
export type PetType = (typeof PET_TYPE)[number];

export const PET_COLOR = [
  "white",
  "beige",
  "gray",
  "black",
  "ginger",
  "brown",
  "brindle",
  "spotted",
  "two_color",
  "tricolor",
  "multicolor",
  "other",
] as const;
export type PetColor = (typeof PET_COLOR)[number];

export const PET_BOOLEAN_FIELDS = [true, false] as const;
// export type PetBooleanFields = (typeof PET_BOOLEAN_FIELDS)[number];
