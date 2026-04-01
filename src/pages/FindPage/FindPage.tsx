import { Check, ChevronDown, MapPin, Menu, Search, X } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';

import {
  PET_AGE_LABEL_UA,
} from '@/constants/pet.labes';
import { GeneralPetCard, type IGeneralPetCard } from '@/components/PetsCards/GeneralPetCard';
import { BASE_URL } from '@/constants/env';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import type { TPetProfile } from '@/schemas/pet/pet.response.shema';
import { petsServices } from '@/utils/api/services/pets.services';
import { getServerErrorMessage } from '@/utils/errors/getServerErrorMessage';
import { useDebounce } from '@/utils/helpers/dom/useDebounce';
import { FILTER_SECTIONS } from './findPage.mock';

const PAGE_SIZE = 8;

type TFilterSectionKey =
  | 'gender'
  | 'age'
  | 'breed'
  | 'size'
  | 'color'
  | 'special_needs'
  | 'has_passport'
  | 'is_sterilized'
  | 'is_vaccinated'
  | 'status';

type TFilters = {
  [key in TFilterSectionKey]: string | boolean | null;
};

type TMappedPet = IGeneralPetCard & {
  breed: string;
  size: string;
  color: string;
  special_needs: boolean;
  has_passport: boolean;
  is_sterilized: boolean;
  is_vaccinated: boolean;
  status: string;
};

const INITIAL_FILTERS: TFilters = {
  gender: null,
  age: null,
  breed: null,
  size: null,
  color: null,
  special_needs: null,
  has_passport: null,
  is_sterilized: null,
  is_vaccinated: null,
  status: null,
};

const normalizeComparable = (value: unknown) => String(value ?? '').trim().toLowerCase();
const toBoolean = (value: unknown) => {
  if (typeof value === 'boolean') return value;
  const normalized = normalizeComparable(value);
  if (normalized === 'true') return true;
  if (normalized === 'false') return false;
  return null;
};

export const FindPage = () => {
  const [pets, setPets] = useState<TPetProfile[]>([]);
  const [petDetailsById, setPetDetailsById] = useState<Record<number, TPetProfile>>({});
  const [loading, setLoading] = useState(true);
  const [isDetailsLoading, setIsDetailsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('');
  const [filters, setFilters] = useState<TFilters>(INITIAL_FILTERS);
  const [expandedSections, setExpandedSections] = useState<Record<TFilterSectionKey, boolean>>({
    gender: true,
    age: true,
    breed: false,
    size: false,
    color: false,
    special_needs: false,
    has_passport: false,
    is_sterilized: false,
    is_vaccinated: false,
    status: false,
  });

  const loaderRef = useRef<HTMLDivElement | null>(null);
  const debouncedSearch = useDebounce(search, 300);
  const debouncedLocation = useDebounce(location, 300);

  // Fetch pets
  useEffect(() => {
    const fetchPets = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await petsServices.getPets();
        const normalizedData = Array.isArray(data) ? data : data.results;
        setPets(Array.isArray(normalizedData) ? normalizedData : []);
      } catch (err) {
        setError(getServerErrorMessage(err));
      } finally {
        setLoading(false);
      }
    };
    fetchPets();
  }, []);

  useEffect(() => {
    if (!pets.length) return;

    const missingIds = pets.map((pet) => pet.id).filter((id) => !petDetailsById[id]);
    if (!missingIds.length) return;

    let isMounted = true;

    const fetchPetDetails = async () => {
      try {
        setIsDetailsLoading(true);
        const results = await Promise.allSettled(missingIds.map((id) => petsServices.getPet(id)));
        if (!isMounted) return;

        const nextDetails: Record<number, TPetProfile> = {};
        results.forEach((result) => {
          if (result.status === 'fulfilled') {
            nextDetails[result.value.id] = result.value;
          }
        });

        if (Object.keys(nextDetails).length) {
          setPetDetailsById((prev) => ({ ...prev, ...nextDetails }));
        }
      } finally {
        if (isMounted) setIsDetailsLoading(false);
      }
    };

    fetchPetDetails();

    return () => {
      isMounted = false;
    };
  }, [pets, petDetailsById]);

  // Map pets for display
  const mappedPets = useMemo<TMappedPet[]>(() => {
    return pets.map((pet) => {
      const detailedPet = petDetailsById[pet.id] ?? pet;
      const maybeMainImage = (detailedPet as TPetProfile & { main_image?: string }).main_image;
      const firstImage = maybeMainImage ?? detailedPet.images?.[0];
      const imageUrl = firstImage
        ? firstImage.startsWith('http')
          ? firstImage
          : `${BASE_URL}${firstImage.replace(/^\//, '')}`
        : undefined;

      return {
        id: detailedPet.id,
        name: detailedPet.name,
        location: detailedPet.location,
        age: detailedPet.age,
        ageLabel:
          detailedPet.age === 'junior'
            ? '1-3 роки'
            : detailedPet.age === 'adult'
            ? '3-5 років'
            : PET_AGE_LABEL_UA[detailedPet.age],
        gender: detailedPet.gender,
        breed: detailedPet.breed,
        size: detailedPet.size,
        color: detailedPet.color,
        special_needs: detailedPet.special_needs,
        has_passport: detailedPet.has_passport,
        is_sterilized: detailedPet.is_sterilized,
        is_vaccinated: detailedPet.is_vaccinated,
        status: detailedPet.status,
        image: imageUrl,
      };
    });
  }, [pets, petDetailsById]);

  // Apply filters
  const filteredPets = useMemo(() => {
    const normalizedSearch = debouncedSearch.trim().toLowerCase();
    const normalizedLocation = debouncedLocation.trim().toLowerCase();

    return mappedPets.filter((pet) => {
      const searchMatch =
        !normalizedSearch ||
        normalizeComparable(pet.name).includes(normalizedSearch) ||
        String(pet.id).includes(normalizedSearch);
      const locationMatch =
        !normalizedLocation || normalizeComparable(pet.location).includes(normalizedLocation);

      const genderMatch =
        !filters.gender || normalizeComparable(pet.gender) === normalizeComparable(filters.gender);
      const breedMatch =
        !filters.breed || normalizeComparable(pet.breed) === normalizeComparable(filters.breed);
      const ageMatch = !filters.age || normalizeComparable(pet.age) === normalizeComparable(filters.age);
      const sizeMatch =
        !filters.size || normalizeComparable(pet.size) === normalizeComparable(filters.size);
      const colorMatch =
        !filters.color || normalizeComparable(pet.color) === normalizeComparable(filters.color);
      const specialNeedsMatch =
        filters.special_needs === null || toBoolean(pet.special_needs) === filters.special_needs;
      const passportMatch =
        filters.has_passport === null || toBoolean(pet.has_passport) === filters.has_passport;
      const sterilizedMatch =
        filters.is_sterilized === null || toBoolean(pet.is_sterilized) === filters.is_sterilized;
      const vaccinatedMatch =
        filters.is_vaccinated === null || toBoolean(pet.is_vaccinated) === filters.is_vaccinated;
      const statusMatch =
        !filters.status || normalizeComparable(pet.status) === normalizeComparable(filters.status);

      return (
        searchMatch &&
        locationMatch &&
        genderMatch &&
        breedMatch &&
        ageMatch &&
        sizeMatch &&
        colorMatch &&
        specialNeedsMatch &&
        passportMatch &&
        sterilizedMatch &&
        vaccinatedMatch &&
        statusMatch
      );
    });
  }, [debouncedSearch, debouncedLocation, mappedPets, filters]);

  // Infinite scroll
  useEffect(() => {
    const target = loaderRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (!entry?.isIntersecting) return;
        setVisibleCount((prev) => Math.min(prev + PAGE_SIZE, filteredPets.length));
      },
      { rootMargin: '200px 0px' }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [filteredPets.length]);

  // Reset visible count on search/filter change
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [debouncedSearch, debouncedLocation, filters]);

  // Lock scroll when mobile filters open
  useEffect(() => {
    if (!isMobileFiltersOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [isMobileFiltersOpen]);

  // Handlers
  const handleFilterChange = (key: TFilterSectionKey, value: string | boolean) => {
    setFilters((prev) => ({
      ...prev,
      [key]: prev[key] === value ? null : value,
    }));
  };

  const toggleSection = (key: TFilterSectionKey) => {
    setExpandedSections((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const resetFilters = () => setFilters(INITIAL_FILTERS);

  const visiblePets = filteredPets.slice(0, visibleCount);

  const renderFiltersContent = (isMobile: boolean) => (
    <>
      {FILTER_SECTIONS.map((section) => {
        const isExpanded = expandedSections[section.key];
        const selectedCount = filters[section.key] === null ? 0 : 1;

        return (
          <div key={`${isMobile ? 'mobile' : 'desktop'}-${section.key}`} className='border-b border-gray-70/25'>
            <button
              type='button'
              className='flex w-full items-center justify-between py-2.5 text-left text-[18px] leading-[120%] text-gray-90'
              onClick={() => toggleSection(section.key)}
            >
              <span className={selectedCount > 0 ? 'font-semibold text-primary-60' : ''}>
                {section.label}
                {selectedCount > 0 ? ` (${selectedCount})` : ''}
              </span>
              <ChevronDown size={20} className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
            </button>

            {isExpanded && (
              <div className='pb-3'>
                <div className='grid gap-2'>
                  {section.options.map((option) => {
                    const isSelected = filters[section.key] === option.value;
                    return (
                      <button
                        key={`${section.key}-${String(option.value)}-${isMobile ? 'm' : 'd'}`}
                        type='button'
                        onClick={() => handleFilterChange(section.key, option.value)}
                        className='flex items-center gap-3 text-left'
                      >
                        <span
                          className={`inline-flex size-6 items-center justify-center rounded-[4px] border ${
                            isSelected
                              ? 'border-primary-60 bg-primary-60 text-gray-0'
                              : 'border-primary-60 bg-transparent text-transparent'
                          }`}
                        >
                          {isSelected ? (
                            <Check size={20} color='var(--gray-0)' strokeWidth={1.75} />
                          ) : null}
                        </span>
                        <span className='type-main text-gray-90'>{option.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </>
  );

  // Render
  if (loading)
    return (
      <div className='u-container flex flex-1 items-center justify-center py-8'>
        <Spinner />
      </div>
    );
  if (error) return <div className='u-container py-8'>{error}</div>;

  const hasAdvancedFilters = Boolean(
    filters.breed ||
      filters.size ||
      filters.color ||
      filters.status ||
      filters.special_needs !== null ||
      filters.has_passport !== null ||
      filters.is_sterilized !== null ||
      filters.is_vaccinated !== null
  );

  if (hasAdvancedFilters && isDetailsLoading) {
    return (
      <div className='u-container flex flex-1 items-center justify-center py-8'>
        <Spinner />
      </div>
    );
  }

  return (
    <section className='u-container py-3 md:py-8'>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-[var(--find-filters-width-md)_1fr] lg:grid-cols-[var(--find-filters-width-lg)_1fr]'>
        {/* Desktop Filters */}
        <aside className='hidden rounded-md bg-gray-0 p-4 shadow-default md:block'>
          <div className='mb-3 border-b border-gray-70/30 pb-3'>
            <h2 className='typo-h3 text-gray-100'>Фільтри</h2>
          </div>
          <div className='max-h-[680px] overflow-y-auto pr-1'>{renderFiltersContent(false)}</div>
          <button
            type='button'
            onClick={resetFilters}
            className='mt-6 h-12 w-full rounded-full border border-gray-70/60 px-4 text-[20px] leading-[100%] text-gray-70 transition-colors hover:border-primary-40 hover:text-primary-40'
          >
            Очистити фільтри
          </button>
        </aside>

        {/* Pet List */}
        <div>
          <div className='grid grid-cols-1 gap-3 md:grid-cols-[1fr_var(--find-location-width)]'>
            <div className='relative'>
              <Input
                size='sm'
                bg='white'
                className='type-main h-11 border-none pr-12 leading-[22px] text-gray-100 placeholder:text-gray-70 md:h-12'
                placeholder="Пошук за ID чи ім'ям тваринки"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Search size={20} className='pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-gray-80' />
            </div>
            <div className='grid grid-cols-[1fr_auto] gap-2 md:block'>
              <div className='relative'>
                <Input
                  size='sm'
                  bg='white'
                  className='type-main h-11 border-none pr-12 leading-[22px] text-gray-100 placeholder:text-gray-80 md:h-12'
                  placeholder='Локація'
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
                <MapPin
                  size={20}
                  color='var(--gray-90)'
                  className='pointer-events-none absolute top-1/2 right-4 -translate-y-1/2'
                />
              </div>
              <button
                type='button'
                className='inline-flex h-11 w-11 items-center justify-center rounded-full bg-gray-0 text-gray-80 shadow-default md:hidden'
                aria-label='Відкрити фільтри'
                onClick={() => setIsMobileFiltersOpen(true)}
              >
                <Menu size={20} color='var(--gray-90)' strokeWidth={1.75} />
              </button>
            </div>
          </div>

          {/* Pet Cards */}
          <ul className='mt-4 grid grid-cols-2 justify-between gap-2 md:gap-4 lg:grid-cols-[repeat(4,var(--find-card-width))]'>
            {visiblePets.map((pet) => (
              <li key={pet.id} className='flex justify-center lg:block'>
                <GeneralPetCard pet={pet} />
              </li>
            ))}
          </ul>

          {visiblePets.length < filteredPets.length && <div ref={loaderRef} className='h-10' aria-hidden='true' />}
        </div>
      </div>

      {/* Mobile Filters */}
      {isMobileFiltersOpen && (
        <div
          className='fixed inset-0 z-50 bg-gray-100/25 backdrop-blur-[4px] md:hidden'
          onClick={() => setIsMobileFiltersOpen(false)}
        >
          <div
            role='dialog'
            aria-modal='true'
            aria-label='Фільтри'
            className='rounded-b-[20px] bg-gray-0 px-4 pt-5 pb-6'
            onClick={(e) => e.stopPropagation()}
          >
            <div className='mb-3 flex items-center justify-between border-b border-gray-70/25 pb-3'>
              <h2 className='typo-h3 text-gray-100'>Фільтри</h2>
              <button
                type='button'
                className='inline-flex size-8 items-center justify-center text-gray-80'
                aria-label='Закрити фільтри'
                onClick={() => setIsMobileFiltersOpen(false)}
              >
                <X size={22} />
              </button>
            </div>

            <div className='max-h-[60vh] overflow-y-auto pr-1'>{renderFiltersContent(true)}</div>

            <button
              type='button'
              onClick={resetFilters}
              className='mt-5 h-11 w-full rounded-full border border-gray-70/60 text-[20px] leading-[100%] text-gray-70'
            >
              Очистити фільтри
            </button>
          </div>
        </div>
      )}
    </section>
  );
};