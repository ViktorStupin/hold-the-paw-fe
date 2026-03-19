import { useState, useRef, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { Menu, X } from 'lucide-react';

import logo from '@/assets/Logo.svg';
import { RoutePath } from '@/routes/root.config';
import { useIsMobile } from '@/utils/helpers/layouts/useIsMobile';

const COMMON_NAV_ITEMS = [
  { label: 'Знайти тваринку', to: RoutePath.Pets },
  { label: 'Мої тваринки', to: RoutePath.MyPets },
  { label: 'Додати тваринку', to: RoutePath.CreatePetProfile },
] as const;

const NAV_ITEMS = COMMON_NAV_ITEMS;

const MOBILE_MENU_ITEMS = [{ label: 'Профіль', to: RoutePath.Profile }, ...COMMON_NAV_ITEMS] as const;

export const Header = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const BASE_URL = import.meta.env.BASE_URL;
  const isHomeRoute = location.pathname === RoutePath.Default || location.pathname === RoutePath.Home;
  const isInnerPage = !isHomeRoute;
  const user = {
    name: 'Бірюкова Вікторія',
    type: 'Приватна особа',
  };

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  useEffect(() => {
    if (!isMenuOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  useEffect(() => {
    const root = document.documentElement;
    const styles = getComputedStyle(root);
    const headerHeight = isMobile
      ? styles.getPropertyValue('--header-height-mobile').trim()
      : styles.getPropertyValue('--header-height-desktop').trim();

    root.style.setProperty('--header-height', headerHeight);
    root.style.setProperty('--spacing-header', headerHeight);
  }, [isMobile]);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    clsx('text-sm font-medium transition-colors duration-200 hover:text-primary-40', {
      'text-primary-40': isActive,
      'text-gray-90': isInnerPage && !isActive,
      'text-white/75': !isInnerPage && !isActive,
    });

  const mobileMenuLinkClass = ({ isActive }: { isActive: boolean }) =>
    clsx('type-main block py-1 transition-colors duration-200 hover:text-primary-40', {
      'text-primary-40': isActive,
      'text-gray-90': !isActive,
    });

  return (
    <header
      className={clsx('top-0 left-0 right-0 z-50 w-full', {
        'absolute bg-header-bg backdrop-blur-sm': isHomeRoute,
        'relative bg-gray-30': isInnerPage,
      })}
      style={{ height: 'var(--header-height)' }}
    >
      <div className='u-container grid h-full grid-cols-4 items-center gap-4 md:grid-cols-12 md:gap-6'>
        <div className='col-span-2 flex items-center md:col-span-2'>
          <NavLink to={RoutePath.Home} className='flex items-center' aria-label='На головну'>
            <img src={logo} alt='Hold The Paw' className='h-8 w-8 shrink-0 md:h-[55px] md:w-[58px]' />
          </NavLink>
        </div>

        {!isMobile && (
          <nav className='col-span-8 hidden justify-center md:flex'>
            <ul className='flex items-center gap-14'>
              {NAV_ITEMS.map((item) => (
                <li key={`${item.to}-${item.label}`}>
                  <NavLink to={item.to} className={navLinkClass}>
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        )}

        <div className='col-span-2 flex justify-end md:col-span-2'>
          {!isMobile ? (
            <NavLink
              to={RoutePath.Profile}
              className={clsx(
                'size-10 overflow-hidden rounded-full transition-opacity hover:opacity-85',
                {
                  'ring-2 ring-white/55': isHomeRoute,
                  'ring-1 ring-gray-70': isInnerPage,
                }
              )}
              aria-label='Перейти в профіль'
            >
              <div className='size-full bg-white' />
            </NavLink>
          ) : (
            <div className='relative' ref={menuRef}>
              <button
                onClick={toggleMenu}
                className={clsx(
                  'inline-flex size-10 items-center justify-center',
                  {
                    'text-white': isHomeRoute,
                    'text-gray-90': isInnerPage,
                  }
                )}
                aria-label={isMenuOpen ? 'Закрити меню' : 'Відкрити меню'}
                aria-expanded={isMenuOpen}
                aria-controls='mobile-menu'
                type='button'
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>

              {isMenuOpen && (
                <nav
                  id='mobile-menu'
                  className='fixed top-[var(--header-height)] left-0 right-0 rounded-b-[24px] bg-gray-30 px-4 pt-4 pb-8 shadow-[0_12px_24px_rgba(0,0,0,0.2)]'
                >
                  <div className='mb-4 flex items-center gap-3'>
                    <img
                      src={`${BASE_URL}photos/close-up-of-a-white-cat-with-blue-eyes.webp`}
                      alt='Аватар користувача'
                      className='size-12 rounded-full object-cover'
                    />
                    <div>
                      <p className='typo-h3 text-gray-100'>{user.name}</p>
                      <p className='type-main mt-1 text-gray-90'>{user.type}</p>
                    </div>
                  </div>

                  <div className='mb-4 border-b border-gray-70/35' />

                  <ul className='flex flex-col gap-4'>
                    {MOBILE_MENU_ITEMS.map((item) => (
                      <li key={`${item.to}-${item.label}`} className='flex gap-4'>
                        <NavLink
                          to={item.to}
                          onClick={() => setIsMenuOpen(false)}
                          className={mobileMenuLinkClass}
                        >
                          {item.label}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </nav>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
