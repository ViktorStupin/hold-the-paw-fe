export const petsKeys = {
  all: ['pets'] as const,
  petById: (id: number) => [...petsKeys.all, id] as const,
  myPets: () => [...petsKeys.all, 'my'] as const,
  myPetsByStatus: (active: boolean) => [...petsKeys.myPets(), { active }] as const,
};
