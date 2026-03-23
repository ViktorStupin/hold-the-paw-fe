import { ChevronDown, MapPinned, Search } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

import { GeneralPetCard, type IGeneralPetCard } from '../../components/PetsCards/GeneralPetCard';
import { Input } from '../../components/ui/input';
import { BASE_URL } from '../../constants/env';

const FILTERS = [
  'Стать',
  'Порода',
  'Вік',
  'Розмір',
  'Окрас',
  'Особливі потреби',
  'Паспорт',
  'Стерилізація',
  'Вакцина',
  'Статус',
] as const;

const PETS: IGeneralPetCard[] = [
  {
    id: 1,
    name: 'Зірочка',
    gender: 'male',
    location: 'Київ',
    ageLabel: 'До 1 року',
  },
  {
    id: 2,
    name: 'Василій',
    gender: 'female',
    location: 'Переяслав',
    ageLabel: '1-3 роки',
  },
  {
    id: 3,
    name: 'Пінні',
    gender: 'male',
    location: 'Миколаїв',
    ageLabel: 'До 1 року',
  },
  {
    id: 4,
    name: 'Арчі',
    gender: 'female',
    location: 'Яготин',
    ageLabel: '3-5 років',
  },
  {
    id: 5,
    name: 'Луна',
    gender: 'male',
    location: 'Березань',
    ageLabel: 'До 1 року',
  },
  {
    id: 6,
    name: 'Ліза',
    gender: 'female',
    location: 'Київ',
    ageLabel: '5+ років',
  },
  {
    id: 7,
    name: 'Рікі',
    gender: 'female',
    location: 'Тернопіль',
    ageLabel: 'До 1 року',
  },
  {
    id: 8,
    name: 'Нява',
    gender: 'female',
    location: 'Бориспіль',
    ageLabel: '3-5 років',
  },
  {
    id: 9,
    name: 'Річард',
    gender: 'female',
    location: 'Київ',
    ageLabel: '1-3 роки',
  },
  {
    id: 10,
    name: 'Туча',
    gender: 'female',
    location: 'Бровари',
    ageLabel: 'До 1 року',
  },
  {
    id: 11,
    name: 'Ремі',
    gender: 'male',
    location: 'Бориспіль',
    ageLabel: '1-3 роки',
  },
  {
    id: 12,
    name: 'Мурзік',
    gender: 'female',
    location: 'Київ',
    ageLabel: '5+ років',
  },
];

export const FindPage = () => {
  const PAGE_SIZE = 8;
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const locationIconSrc = `${BASE_URL}icons/location.svg`;

  useEffect(() => {
    const target = loaderRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (!entry?.isIntersecting) return;

        setVisibleCount((prev) => {
          return prev + PAGE_SIZE;
        });
      },
      { rootMargin: '200px 0px' }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  const visiblePets = Array.from({ length: visibleCount }, (_, index) => {
    const pet = PETS[index % PETS.length];

    return {
      ...pet,
      id: index + 1,
    };
  });

  return (
    <section className='u-container py-6 md:py-8'>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-[var(--find-filters-width-md)_1fr] lg:grid-cols-[var(--find-filters-width-lg)_1fr]'>
        <aside className='rounded-md bg-gray-0 p-4 shadow-default'>
          <div className='mb-4 border-b border-gray-70/30 pb-3'>
            <h2 className='typo-h3 text-gray-100'>Фільтри</h2>
          </div>

          <ul className='space-y-1'>
            {FILTERS.map((filter) => (
              <li key={filter}>
                <button
                  type='button'
                  className='flex w-full items-center justify-between border-b border-gray-70/25 py-2.5 text-left text-[18px] leading-[120%] text-gray-90 transition-colors hover:text-primary-40'
                >
                  <span>{filter}</span>
                  <ChevronDown size={18} />
                </button>
              </li>
            ))}
          </ul>

          <button
            type='button'
            className='mt-6 h-12 w-full rounded-lg border border-gray-70/60 text-[20px] leading-[100%] text-gray-70 transition-colors hover:border-primary-40 hover:text-primary-40'
          >
            Очистити фільтри
          </button>
        </aside>

        <div>
          <div className='grid grid-cols-1 gap-3 md:grid-cols-[1fr_var(--find-location-width)]'>
            <div className='relative'>
              <Input
                size='sm'
                bg='white'
                className='h-12 border-none pr-12 text-[20px] leading-[100%] text-gray-80 placeholder:text-gray-70'
                placeholder="Пошук за ID чи ім'ям тваринки"
              />
              <Search
                size={20}
                className='pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-gray-80'
              />
            </div>

            <div className='relative'>
              <Input
                size='sm'
                bg='white'
                className='h-12 border-none pr-12 text-[20px] leading-[100%] text-gray-80 placeholder:text-gray-80'
                placeholder='Локація'
              />
              <img
                src={locationIconSrc}
                alt=''
                aria-hidden='true'
                className='pointer-events-none absolute top-1/2 right-4 size-5 -translate-y-1/2 object-contain'
              />
            </div>
          </div>

          <ul className='mt-4 grid grid-cols-1 justify-center gap-4 sm:grid-cols-[repeat(2,var(--find-card-width))] sm:justify-between lg:grid-cols-[repeat(4,var(--find-card-width))]'>
            {visiblePets.map((pet) => (
              <li key={pet.id} className='flex justify-center sm:block'>
                <GeneralPetCard pet={pet} />
              </li>
            ))}
          </ul>

          <div ref={loaderRef} className='h-10' aria-hidden='true' />
        </div>
      </div>
    </section>
  );
};
