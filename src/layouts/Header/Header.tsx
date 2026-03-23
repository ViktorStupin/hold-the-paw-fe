import { useState, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { Menu, X } from 'lucide-react';

import logo from '@/assets/Logo.svg';
import { BASE_URL } from '@/constants/env';
import { RoutePath } from '@/routes/root.config';
import { useClickOutside } from '@/utils/helpers/dom/useClickOutside';
import { useIsMobile } from '@/utils/helpers/layouts/useIsMobile';

export type HeaderUser = {
  name: string;
  type: string;
};

type HeaderProps = {
  user: HeaderUser;
};

const COMMON_NAV_ITEMS = [
  { label: 'Знайти тваринку', to: RoutePath.Pets },
  { label: 'Додати тваринку', to: RoutePath.CreatePetProfile },
  { label: 'Мої тваринки', to: RoutePath.MyPets },
] as const;

const MOBILE_MENU_ITEMS = [{ label: 'Профіль', to: RoutePath.Profile }, ...COMMON_NAV_ITEMS] as const;

export const Header = ({ user }: HeaderProps) => {
  const { pathname } = useLocation();
  const isHomeRoute = pathname === RoutePath.Default || pathname === RoutePath.Home;
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  useClickOutside(menuRef, closeMenu, isMenuOpen);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    clsx('type-secondary whitespace-nowrap text-gray-90 transition-colors duration-200', {
      'text-primary-40': isActive,
      'hover:text-primary-40': !isActive,
    });

  const mobileMenuTop = isMobile ? 'var(--header-height-mobile)' : 'var(--header-height-desktop)';

  return (
    <header
      className={clsx('sticky top-0 left-0 right-0 z-50 w-full shadow-header', {
        'bg-header-bg backdrop-blur-md': isHomeRoute,
        'bg-header-bg-wt': !isHomeRoute,
      })}
      style={{
        height: isMobile ? 'var(--header-height-mobile)' : 'var(--header-height-desktop)',
      }}
    >
      <div className='u-container grid h-full grid-cols-4 items-center gap-4 md:grid-cols-12 md:gap-6'>
        <div className='col-span-2 flex items-center md:col-span-2'>
          <NavLink to={RoutePath.Home} className='flex items-center' aria-label='На головну'>
            <img
              src={logo}
              alt='Hold The Paw'
              className='h-(--header-logo-height) w-(--header-logo-width) shrink-0'
            />
          </NavLink>
        </div>

        {!isMobile && (
          <nav className='col-span-8 hidden justify-center md:flex'>
            <ul className='flex items-center gap-14'>
              {COMMON_NAV_ITEMS.map((item) => (
                <li key={item.to}>
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
              className={({ isActive }) =>
                clsx('type-secondary whitespace-nowrap transition-colors duration-200', {
                  'text-primary-40': isActive,
                  'text-gray-90 hover:text-primary-40': !isActive,
                })
              }
              aria-label='Перейти в профіль'
            >
              Профіль
            </NavLink>
          ) : (
            <div className='relative' ref={menuRef}>
              <button
                onClick={toggleMenu}
                className='inline-flex size-10 items-center justify-center text-gray-90'
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
                  className='fixed left-0 right-0 rounded-b-3xl bg-gray-30 px-4 pt-4 pb-8 shadow-[0_12px_24px_rgba(0,0,0,0.2)]'
                  style={{ top: mobileMenuTop }}
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
                      <li key={item.to} className='flex gap-4'>
                        <NavLink
                          to={item.to}
                          onClick={closeMenu}
                          className={({ isActive }) =>
                            clsx(
                              'type-main block py-1 transition-colors duration-200 hover:text-primary-40',
                              {
                                'text-primary-40': isActive,
                                'text-gray-90': !isActive,
                              }
                            )
                          }
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
