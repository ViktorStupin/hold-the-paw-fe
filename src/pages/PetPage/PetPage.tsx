import { useEffect, useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, MapPin, MessageCircle, Phone, Send } from 'lucide-react';
import { useParams } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { FieldMessage } from '@/components/ui/field';
import { Spinner } from '@/components/ui/spinner';
import { ToggleSwitcher } from '@/components/ui/toggle-group';
import { Back } from '@/components/Back/Back';
import { BASE_URL } from '@/constants/env';
import {
  PET_AGE_LABEL_UA,
  PET_BREED_LABEL_UA,
  PET_COLOR_LABEL_UA,
  PET_SIZE_LABEL_UA,
  PET_STATUS_LABEL_UA,
  PET_TYPE_LABEL_UA,
  PET_SEX_LABEL_UA,
} from '@/constants/pet.labes';
import type { TPetProfile } from '@/schemas/pet/pet.response.shema';
import { petsServices } from '@/utils/api/services/pets.services';
import { getServerErrorMessage } from '@/utils/errors/getServerErrorMessage';

const INFO_TABS = ['main', 'details'] as const;
type InfoTab = (typeof INFO_TABS)[number];

const INFO_TAB_LABELS: Record<InfoTab, string> = {
  main: 'Головна',
  details: 'Деталі',
};

const normalizeImageUrl = (value?: string) => {
  if (!value) return '';
  if (value.startsWith('http')) return value;
  return `${BASE_URL}${value.replace(/^\//, '')}`;
};

type TPetWithImageFields = TPetProfile & {
  main_image?: unknown;
  additional_images?: unknown;
  images?: unknown;
  photos?: unknown;
  is_sterilized?: boolean;
};

const imageFromUnknown = (value: unknown): string | null => {
  if (typeof value === 'string' && value.trim().length > 0) return value;
  if (!value || typeof value !== 'object') return null;

  const candidate = value as Record<string, unknown>;
  const nestedValue = candidate.image ?? candidate.url ?? candidate.path ?? candidate.file;
  return typeof nestedValue === 'string' && nestedValue.trim().length > 0 ? nestedValue : null;
};

const imageListFromUnknown = (value: unknown): string[] => {
  if (Array.isArray(value)) {
    return value.map(imageFromUnknown).filter((item): item is string => Boolean(item));
  }

  const single = imageFromUnknown(value);
  return single ? [single] : [];
};

export const PetPage = () => {
  const { id } = useParams<{ id: string }>();
  const [pet, setPet] = useState<TPetProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<InfoTab>('main');
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    const numericId = Number(id);
    if (!Number.isFinite(numericId)) {
      setError('Некоректний ідентифікатор тваринки');
      setIsLoading(false);
      return;
    }

    const fetchPet = async () => {
      try {
        setIsLoading(true);
        setError('');
        const data = await petsServices.getPet(numericId);
        setPet(data);
      } catch (err) {
        setError(getServerErrorMessage(err));
      } finally {
        setIsLoading(false);
      }
    };

    fetchPet();
  }, [id]);

  const images = useMemo(() => {
    if (!pet) return [] as string[];

    const petWithImages = pet as TPetWithImageFields;
    const mergedImages = [
      ...imageListFromUnknown(petWithImages.main_image),
      ...imageListFromUnknown(petWithImages.additional_images),
      ...imageListFromUnknown(petWithImages.images),
      ...imageListFromUnknown(petWithImages.photos),
    ];

    if (!mergedImages.length) return [] as string[];

    return Array.from(new Set(mergedImages)).map((image) => normalizeImageUrl(image));
  }, [pet]);

  useEffect(() => {
    setImageIndex(0);
  }, [images.length]);

  if (isLoading) {
    return (
      <div className='u-container flex flex-1 items-center justify-center py-10'>
        <Spinner />
      </div>
    );
  }

  if (error || !pet) {
    return (
      <div className='u-container flex flex-1 items-center justify-center py-10'>
        <FieldMessage message={error || 'Тваринку не знайдено'} />
      </div>
    );
  }

  const previousImage = () => {
    if (images.length <= 1) return;
    setImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    if (images.length <= 1) return;
    setImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const hasImages = images.length > 0;
  const hasCarousel = images.length > 1;
  const isSterilized = Boolean((pet as TPetWithImageFields).is_sterilized);

  const mainRows = [
    ['Стать', PET_SEX_LABEL_UA[pet.gender]],
    ['Вік', PET_AGE_LABEL_UA[pet.age]],
    ['Тип тварини', PET_TYPE_LABEL_UA[pet.pet_type]],
    ['Стерилізація', isSterilized ? 'Стерилізована' : 'Не стерилізована'],
    ['Окрас', PET_COLOR_LABEL_UA[pet.color]],
    ['Розмір', PET_SIZE_LABEL_UA[pet.size]],
    ['Вакцини', pet.is_vaccinated ? 'З вакциною' : 'Без вакцини'],
    ['Порода', PET_BREED_LABEL_UA[pet.breed]],
    ['Паспорт', pet.has_passport ? 'З паспортом' : 'Без паспорта'],
    ['Особливі потреби', pet.special_needs ? 'Є потреби' : 'Немає потреб'],
  ] as const;

  return (
    <section className='u-container py-3 md:py-8'>
      <div className='mb-4 hidden md:block'>
        <Back />
      </div>
      <div className='grid gap-4 lg:grid-cols-[1fr_1fr]'>
        <div className='relative overflow-hidden rounded-[20px] border-[8px] border-gray-0 bg-gray-0 shadow-default'>
          {hasImages ? (
            <img
              src={images[imageIndex]}
              alt={`Фото тваринки ${pet.name}`}
              className='h-[440px] w-full rounded-[12px] object-cover lg:h-[620px]'
            />
          ) : (
            <div className='flex h-[440px] w-full items-center justify-center rounded-[12px] bg-gray-30 text-center text-gray-80 lg:h-[620px]'>
              Користувач не додав фото
            </div>
          )}

          {hasImages && (
            <>
              <button
                type='button'
                onClick={previousImage}
                disabled={!hasCarousel}
                className={`absolute top-1/2 left-4 inline-flex size-13 -translate-y-1/2 items-center justify-center rounded-full bg-gray-0/35 text-gray-0 backdrop-blur-[2px] transition-opacity ${
                  hasCarousel ? 'opacity-100' : 'opacity-45'
                }`}
                aria-label='Попереднє фото'
              >
                <ChevronLeft size={28} strokeWidth={1.75} />
              </button>

              <button
                type='button'
                onClick={nextImage}
                disabled={!hasCarousel}
                className={`absolute top-1/2 right-4 inline-flex size-13 -translate-y-1/2 items-center justify-center rounded-full bg-gray-0/35 text-gray-0 backdrop-blur-[2px] transition-opacity ${
                  hasCarousel ? 'opacity-100' : 'opacity-45'
                }`}
                aria-label='Наступне фото'
              >
                <ChevronRight size={28} strokeWidth={1.75} />
              </button>
            </>
          )}

          {hasImages && (
            <div className='absolute inset-x-0 bottom-6 flex justify-center gap-3'>
              {images.map((image, index) => (
                <button
                  key={`${image}-${index}`}
                  type='button'
                  onClick={() => setImageIndex(index)}
                  aria-label={`Відкрити фото ${index + 1}`}
                  disabled={!hasCarousel}
                  className={`size-3 rounded-full transition-all ${
                    index === imageIndex ? 'bg-gray-0 opacity-100' : 'bg-gray-0/55 opacity-90'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        <div className='rounded-md bg-gray-0 p-4 shadow-default lg:p-6'>
          <div className='mb-4 flex items-start justify-between gap-4'>
            <div>
              <h1 className='typo-h1'>{pet.name}</h1>
              <p className='mt-1 flex items-center gap-1 text-gray-80'>
                <MapPin size={16} />
                <span className='type-main'>{pet.location}</span>
              </p>
            </div>
            <span className='rounded-sm border border-primary-40 bg-primary-0 px-5 py-1 text-primary-80'>
              {PET_STATUS_LABEL_UA[pet.status]}
            </span>
          </div>

          <ToggleSwitcher
            options={INFO_TABS}
            labels={INFO_TAB_LABELS}
            value={activeTab}
            onChange={(value) => setActiveTab(value)}
            className='mb-5 w-full'
          />

          {activeTab === 'main' ? (
            <>
              <div className='grid grid-cols-2 gap-x-6 gap-y-4'>
                {mainRows.map(([label, value]) => (
                  <div key={label}>
                    <p className='type-secondary text-gray-80'>{label}</p>
                    <p className='type-main mt-1 text-gray-100'>{value}</p>
                  </div>
                ))}
              </div>

              <Button className='mt-6 w-full'>Зв&apos;язатися з власником</Button>
            </>
          ) : (
            <div className='grid gap-4'>
              <div>
                <h2 className='typo-h3'>Історія тваринки</h2>
                <p className='type-main mt-2 rounded-sm bg-gray-30 p-4 text-gray-90'>
                  {pet.story || 'Історію ще не додано'}
                </p>
              </div>

              <div>
                <h2 className='typo-h3'>Опис тваринки</h2>
                <p className='type-main mt-2 rounded-sm bg-gray-30 p-4 text-gray-90'>
                  {pet.about || 'Опис ще не додано'}
                </p>
              </div>

              <button
                type='button'
                className='flex h-11 items-center justify-center gap-2 rounded-full border border-gray-80 text-gray-90'
              >
                {pet.author.phone_number || 'Номер не вказано'}
                <Phone size={18} />
              </button>

              <button
                type='button'
                className='flex h-11 items-center justify-center gap-2 rounded-full border border-gray-80 text-gray-90'
              >
                {pet.author.phone_number || 'Номер не вказано'}
                <MessageCircle size={18} />
              </button>

              <button
                type='button'
                className='flex h-11 items-center justify-center gap-2 rounded-full border border-gray-80 text-gray-90'
              >
                @{pet.author.telegram_nickname || 'telegram'}
                <Send size={18} />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
