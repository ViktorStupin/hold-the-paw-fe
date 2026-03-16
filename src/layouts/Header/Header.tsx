import { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

import { Menu, User, X } from 'lucide-react';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { cn } from '@/lib/utils';

import { RoutePath } from '@/routes/root.config';
import { useIsMobile } from '@/utils/helpers/layouts/useIsMobile';

const NAV_ITEMS = [
  { label: 'Знайти тваринку', to: RoutePath.Pets },
  { label: 'Мої тваринки', to: RoutePath.MyPets },
  { label: 'Додати тваринку', to: RoutePath.CreatePetProfile },
] as const;

const MOBILE_MENU_ITEMS = [
  { label: 'Профіль', to: RoutePath.Profile },
  { label: 'Знайти тваринку', to: RoutePath.Pets },
  { label: 'Мої тваринки', to: RoutePath.MyPets },
  { label: 'Додати тваринку', to: RoutePath.CreatePetProfile },
] as const;

const navLinkClass = (isAboutPage: boolean, isActive: boolean) =>
  cn(
    'typo-main transition-colors hover:text-primary-40',
    isAboutPage ? 'text-gray-0' : 'text-gray-90',
    isActive && 'text-primary-40'
  );

const mobileNavLinkClass = (isActive: boolean) =>
  cn(
    'typo-main py-2 text-gray-90 transition-colors',
    isActive && 'text-primary-40'
  );

export const Header = () => {
  const isMobile = useIsMobile();
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const isAboutPage = pathname === RoutePath.Default;

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      className={cn(
        'absolute top-0 left-0 right-0 z-50 flex h-[76px] w-full items-center justify-between',
        'bg-[#3F3F3F]/15 px-4 py-4 text-gray-0 backdrop-blur-[15px] lg:px-12'
      )}
    >
      <Link
        to={RoutePath.Default}
        className='flex shrink-0 transition-opacity hover:opacity-90'
        aria-label='На головну'
      >
        <img
          src={`${import.meta.env.BASE_URL}Logo.svg`}
          alt='Hold The Paw'
          className='h-9 w-[46px] object-contain lg:h-[55px] lg:w-[58px]'
        />
      </Link>

      {isMobile ? (
        <>
          <div className='flex items-center'>
            <Button
              variant='transparent'
              size='default'
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Закрити меню' : 'Відкрити меню'}
              className='text-gray-0'
            >
              <Icon icon={menuOpen ? X : Menu} size={24} color='var(--gray-0)' />
            </Button>
          </div>

          {menuOpen && (
            <nav
              className='absolute left-0 right-0 top-[76px] z-40 flex flex-col rounded-b-[24px] bg-nature px-6 pb-6 pt-5 shadow-default'
              aria-hidden={!menuOpen}
            >
              <div className='mb-4 flex items-center gap-4'>
                <Avatar size='lg' className='size-12 shrink-0 ring-1 ring-gray-70/50'>
                  <AvatarFallback className='bg-gray-30 text-gray-70' />
                </Avatar>
                <div className='flex min-w-0 flex-col'>
                  <span className='typo-h3 truncate text-gray-100'>
                    Ім&apos;я користувача
                  </span>
                  <span className='type-secondary text-gray-80'>
                    Індивідуальна особа
                  </span>
                </div>
              </div>
              <div className='border-t border-gray-50 pt-4' />
              <div className='mt-2 flex flex-col gap-4'>
                {MOBILE_MENU_ITEMS.map(({ label, to }) => (
                  <NavLink
                    key={label}
                    to={to}
                    onClick={closeMenu}
                    className={({ isActive }) => mobileNavLinkClass(isActive)}
                  >
                    {label}
                  </NavLink>
                ))}
              </div>
            </nav>
          )}
        </>
      ) : (
        <>
          <nav className='absolute left-1/2 flex -translate-x-1/2 items-center gap-8'>
            {NAV_ITEMS.map(({ label, to }) => (
              <NavLink
                key={label}
                to={to}
                className={({ isActive }: { isActive: boolean }) => navLinkClass(isAboutPage, isActive)}
              >
                {label}
              </NavLink>
            ))}
          </nav>

          <Link
            to={RoutePath.Profile}
            className='flex shrink-0 items-center transition-opacity hover:opacity-90'
            aria-label='Профіль'
          >
            <Avatar size='default' className='size-10 ring-1 ring-gray-70/50'>
              <AvatarFallback className='bg-gray-70/50 text-gray-0'>
                <User size={20} strokeWidth={2} />
              </AvatarFallback>
            </Avatar>
          </Link>
        </>
      )}
    </header>
  );
};
