// pet.labels.ts
import type { PetProfileFormValues } from '@/schemas/pet.schema';
import type {
  AnimalType,
  PetAge,
  PetBreed,
  PetColor,
  PetSex,
  PetSize,
  PetStatus,
} from '../types/PetFileds';

export const PET_STATUS_LABEL_UA: Record<PetStatus, string> = {
  looking_for_a_home: 'Шукає домівку',
  help_needed: 'Потребує допомогу',
};

export const PET_SEX_LABEL_UA: Record<PetSex, string> = {
  male: 'Хлопчик',
  female: 'Дівчинка',
};

export const PET_AGE_LABEL_UA: Record<PetAge, string> = {
  puppy: 'До 1 року',
  junior: '1-2 роки',
  adult: '3-5 років',
  senior: '5+ років',
};

export const PET_BREED_LABEL_UA: Record<PetBreed, string> = {
  no_breed: 'Без породи',
  mongrel: 'Метис',
  purebred: 'Чиста порода',
};

export const PET_SIZE_LABEL_UA: Record<PetSize, string> = {
  s: 'Маленький',
  m: 'Середній',
  l: 'Великий',
};

export const ANIMAL_TYPE_LABEL_UA: Record<AnimalType, string> = {
  dog: 'Собака',
  cat: 'Кіт',
  hamster: 'Гризун',
  bird: 'Птах',
  fish: 'Рибка',
  other: 'Інше',
};

export const PET_COLOR_LABEL_UA: Record<PetColor, string> = {
  white: 'Білий',
  beige: 'Бежевий',
  gray: 'Сірий',
  black: 'Чорний',
  ginger: 'Рудий',
  brown: 'Коричневий',
  brindle: 'Смугастий',
  spotted: 'Плямистий',
  two_color: 'Двоколірний',
  tricolor: 'Триколірний',
  multicolor: 'Різнокольоровий',
  other: 'Інший',
};

export const PET_HAS_PASSPORT_LABEL_UA: Record<string, string> = {
  true: 'Є паспорт',
  false: 'Немає паспорта',
};

export const PET_IS_VACCINATED_LABEL_UA: Record<string, string> = {
  true: 'Є вакцина',
  false: 'Немає вакцини',
};

export const PET_SPECIAL_NEEDS_LABEL_UA: Record<string, string> = {
  true: 'Є потреби',
  false: 'Немає потреб',
};

export const PET_OPTION_LABELS_UA: Record<keyof PetProfileFormValues, string> = {
  status: 'Статус',
  sex: 'Стать',
  age: 'Вік',
  breed: 'Порода',
  size: 'Розмір',
  color: 'Окрас',
  animalType: 'Тип тварини',
  special_needs: 'Особливі потреби',
  has_passport: 'Паспорт',
  is_vaccinated: 'Вакцина',
  story: 'Історія тваринки',
  about: 'Опис тваринки',
  name: "Ім'я",
  location: 'Локація',
  photos: 'Оберіть головне фото та до 5 додаткових',
};
