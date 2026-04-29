import {
  PET_AGE_LABEL_UA,
  PET_BREED_LABEL_UA,
  PET_COLOR_LABEL_UA,
  PET_SEX_LABEL_UA,
  PET_SIZE_LABEL_UA,
  PET_TYPE_LABEL_UA,
} from '@/constants/pet.labes';
import { PET_AGE, PET_BREED, PET_COLOR, PET_GENDER, PET_SIZE, PET_TYPE } from '@/types/PetFileds';

export type FindFilter = {
  id: string;
  label: string;
};

export const FIND_FILTERS: FindFilter[] = [
  { id: 'gender', label: 'Стать' },
  { id: 'pet_type', label: 'Тип тваринки' },
  { id: 'breed', label: 'Порода' },
  { id: 'age', label: 'Вік' },
  { id: 'size', label: 'Розмір' },
  { id: 'color', label: 'Окрас' },
  { id: 'special_needs', label: 'Особливі потреби' },
  { id: 'passport', label: 'Паспорт' },
  { id: 'sterilization', label: 'Стерилізація' },
  { id: 'vaccination', label: 'Вакцина' },
  { id: 'status', label: 'Статус' },
];

export type FilterSection = {
  key:
    | 'gender'
    | 'pet_type'
    | 'age'
    | 'breed'
    | 'size'
    | 'color'
    | 'special_needs'
    | 'has_passport'
    | 'is_sterilized'
    | 'is_vaccinated'
    | 'status';
  label: string;
  options: Array<{
    value: string | boolean;
    label: string;
  }>;
};

export const FILTER_SECTIONS: FilterSection[] = [
  {
    key: 'gender',
    label: 'Стать',
    options: PET_GENDER.map((value) => ({ value, label: PET_SEX_LABEL_UA[value] })),
  },
  {
    key: 'pet_type',
    label: 'Тип тваринки',
    options: PET_TYPE.map((value) => ({ value, label: PET_TYPE_LABEL_UA[value] })),
  },
  {
    key: 'age',
    label: 'Вік',
    options: PET_AGE.map((value) => ({ value, label: PET_AGE_LABEL_UA[value] })),
  },
  {
    key: 'breed',
    label: 'Порода',
    options: PET_BREED.map((value) => ({ value, label: PET_BREED_LABEL_UA[value] })),
  },
  {
    key: 'size',
    label: 'Розмір',
    options: PET_SIZE.map((value) => ({ value, label: PET_SIZE_LABEL_UA[value] })),
  },
  {
    key: 'color',
    label: 'Окрас',
    options: PET_COLOR.map((value) => ({ value, label: PET_COLOR_LABEL_UA[value] })),
  },
  {
    key: 'special_needs',
    label: 'Особливі потреби',
    options: [
      { value: true, label: 'Є потреби' },
      { value: false, label: 'Немає потреб' },
    ],
  },
  {
    key: 'has_passport',
    label: 'Паспорт',
    options: [
      { value: true, label: 'Є паспорт' },
      { value: false, label: 'Немає паспорту' },
    ],
  },
  {
    key: 'is_sterilized',
    label: 'Стерилізація',
    options: [
      { value: true, label: 'Стерилізована' },
      { value: false, label: 'Не стерилізована' },
    ],
  },
  {
    key: 'is_vaccinated',
    label: 'Вакцина',
    options: [
      { value: true, label: 'Є вакцина' },
      { value: false, label: 'Немає вакцини' },
    ],
  },
  {
    key: 'status',
    label: 'Статус',
    options: [
      { value: 'looking_for_a_home', label: 'Шукає домівку' },
      { value: 'help_needed', label: 'Потребує допомоги' },
    ],
  },
];
