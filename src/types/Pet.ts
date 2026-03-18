import type {
  PetAge,
  PetBreed,
  PetColor,
  PetGender,
  PetSize,
  PetStatus,
  PetType,
} from './PetFileds';
import type { TUserRole } from './UserRole';

interface IPetBase {
  name: string;
  location: string;
  pet_type: PetType;
  gender: PetGender;
  age: PetAge;
  color: PetColor;
  breed: PetBreed;
  size: PetSize;
  is_sterilized: boolean;
  is_vaccinated: boolean;
  special_needs: boolean;
  has_passport: boolean;
  story?: string;
  about?: string;
  status: PetStatus;
}

export interface ICreateEditPetRequest<TImage = File> extends IPetBase {
  main_image: TImage;
  additional_images?: TImage[];
}

export type ICreateEditPetResponse = ICreateEditPetRequest<string> & { id: number };

export interface IPetProfile extends IPetBase {
  id: number;
  images: string[];
  author: {
    id: number;
    email: string;
    phone_number: string;
    telegram_nickname: string;
    role: TUserRole;
  };
}

export interface IPetCard {
  id: number;
  name: string;
  gender: PetGender;
  age: PetAge;
  main_image: string;
}

export interface IMyPetCard {
  id: number;
  name: string;
  main_image: string;
  status: PetStatus;
  location: string;
}
