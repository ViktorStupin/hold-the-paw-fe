import { useEffect, useState, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { Menu, X } from 'lucide-react';

import logo from '@/assets/Logo.svg';
import { PROTECTED_ROUTES_CONFIG, RoutePath } from '@/routes/root.config';
import { useClickOutside } from '@/utils/helpers/dom/useClickOutside';
import { useIsMobile } from '@/utils/helpers/layouts/useIsMobile';
import { ProtectedNavLink } from './ProtectedNavLink';
import { scrollTop } from '@/utils/helpers/layouts/layouts';
// import { useMe } from '@/queries/user/user.queries';

export const PUBLIC_ROUTES = [RoutePath.Pets, RoutePath.Home, RoutePath.Default] as const;

export const isPublicRoute = (path: string) =>
  PUBLIC_ROUTES.includes(path as (typeof PUBLIC_ROUTES)[number]);

export type HeaderUser = {
  name: string;
  type: string;
};

const COMMON_NAV_ITEMS = [
  { label: 'Знайти тваринку', to: RoutePath.Pets },
  { label: 'Додати тваринку', to: RoutePath.CreatePetProfile },
  { label: 'Мої тваринки', to: RoutePath.MyPets },
] as const;

const MOBILE_MENU_ITEMS = [
  { label: 'Профіль', to: RoutePath.Profile },
  ...COMMON_NAV_ITEMS,
] as const;

export const Header = () => {
  const { pathname } = useLocation();
  const isHomeRoute = pathname === RoutePath.Default || pathname === RoutePath.Home;
  const [isHomeScrolled, setIsHomeScrolled] = useState(false);
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // const { data: user, isFetching, error } = useMe();

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  useClickOutside(menuRef, closeMenu, isMenuOpen);

  useEffect(() => {
    if (!isHomeRoute) {
      setIsHomeScrolled(false);
      return;
    }

    const onScroll = () => {
      setIsHomeScrolled(window.scrollY > 24);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isHomeRoute]);

  const useDarkHeaderContent = !isHomeRoute || isHomeScrolled;

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    clsx('type-secondary whitespace-nowrap transition-colors duration-200', {
      'text-primary-40': isActive,
      'text-gray-90 hover:text-primary-40': useDarkHeaderContent && !isActive,
      'text-gray-0 hover:text-primary-20': !useDarkHeaderContent && !isActive,
    });

  const mobileMenuTop = isMobile ? 'var(--header-height-mobile)' : 'var(--header-height-desktop)';

  return (
    <header
      className={clsx('sticky top-0 left-0 right-0 z-50 w-full shadow-header', {
        'bg-gray-100/20 backdrop-blur-md': isHomeRoute && !isHomeScrolled,
        'bg-header-bg-wt': !isHomeRoute || isHomeScrolled,
      })}
      style={{
        height: isMobile ? 'var(--header-height-mobile)' : 'var(--header-height-desktop)',
      }}
    >
      <div className='u-container grid h-full grid-cols-4 items-center gap-4 md:grid-cols-12 md:gap-6'>
        <div className='col-span-2 flex items-center md:col-span-2'>
          <NavLink
            onClick={() => scrollTop()}
            to={RoutePath.Home}
            className='flex items-center'
            aria-label='На головну'
          >
            <img
              src={logo}
              alt='Hold The Paw'
              className={clsx('h-(--header-logo-height) w-(--header-logo-width) shrink-0', {
                'brightness-0 invert': !useDarkHeaderContent,
              })}
            />
          </NavLink>
        </div>

        {!isMobile && (
          <nav className='col-span-8 hidden justify-center md:flex'>
            <ul className='flex items-center gap-14'>
              {COMMON_NAV_ITEMS.map((item) => {
                const isPublic = isPublicRoute(item.to);
                return (
                  <li key={item.to}>
                    <ProtectedNavLink
                      authMessage={PROTECTED_ROUTES_CONFIG[item.to]}
                      to={item.to}
                      requireAuth={!isPublic}
                      className={navLinkClass}
                    >
                      {item.label}
                    </ProtectedNavLink>
                  </li>
                );
              })}
            </ul>
          </nav>
        )}

        <div className='col-span-2 flex justify-end md:col-span-2'>
          {!isMobile ? (
            <ProtectedNavLink
              to={RoutePath.Profile}
              authMessage={PROTECTED_ROUTES_CONFIG[RoutePath.Profile]}
              requireAuth
              className={({ isActive }) =>
                clsx('type-secondary whitespace-nowrap transition-colors duration-200', {
                  'text-primary-40': isActive,
                  'text-gray-90 hover:text-primary-40': useDarkHeaderContent && !isActive,
                  'text-gray-0 hover:text-primary-20': !useDarkHeaderContent && !isActive,
                })
              }
            >
              Профіль
            </ProtectedNavLink>
          ) : (
            <div className='relative' ref={menuRef}>
              <button
                onClick={toggleMenu}
                className={clsx('inline-flex size-10 items-center justify-center', {
                  'text-gray-90': useDarkHeaderContent,
                  'text-gray-0': !useDarkHeaderContent,
                })}
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
                  <ul className='flex flex-col gap-4'>
                    {MOBILE_MENU_ITEMS.map((item) => {
                      const isPublic = isPublicRoute(item.to);

                      return (
                        <li key={item.to} className='flex gap-4'>
                          <ProtectedNavLink
                            authMessage={PROTECTED_ROUTES_CONFIG[item.to]}
                            to={item.to}
                            requireAuth={!isPublic}
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
                          </ProtectedNavLink>
                        </li>
                      );
                    })}
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