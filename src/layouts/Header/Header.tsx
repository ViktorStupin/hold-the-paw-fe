import { useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import { Menu, X } from 'lucide-react';

import { RoutePath } from '@/routes/root.config';
import { useIsMobile } from '@/utils/helpers/layouts/useIsMobile';

export const Header = () => {
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const BASE_URL = import.meta.env.BASE_URL;
  const headerHeight = isMobile ? 64 : 76;
  const navItems = [
    { to: RoutePath.Pets, label: 'Знайти тваринку' },
    { to: RoutePath.CreatePetProfile, label: 'Додати тваринку' },
    { to: RoutePath.MyPets, label: 'Мої тваринки' },
  ] as const;

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty('--header-height', `${headerHeight}px`);
  }, [headerHeight]);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    clsx('text-sm font-medium transition-colors duration-200 hover:text-white', {
      'text-white': isActive,
      'text-white/75': !isActive,
    });

  const mobileMenuLinkClass = ({ isActive }: { isActive: boolean }) =>
    clsx('block py-2 text-sm font-medium transition-colors duration-200 hover:text-primary-40', {
      'text-primary-40': isActive,
      'text-gray-100': !isActive,
    });

  return (
    <header
      className='absolute top-0 left-0 right-0 z-50 w-full bg-header-bg backdrop-blur-sm'
      style={{ height: 'var(--header-height)' }}
    >
      <div className='u-container flex h-full items-center justify-between'>
        <NavLink to={RoutePath.Home} className='flex items-center' aria-label='На головну'>
          <img src={`${BASE_URL}Logo.svg`} alt='Hold The Paw' className='h-[55px] w-[58px] shrink-0' />
        </NavLink>

        {!isMobile && (
          <nav>
            <ul className='flex items-center gap-14'>
              {navItems.map((item) => (
                <li key={item.to}>
                  <NavLink to={item.to} className={navLinkClass}>
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        )}

        {!isMobile ? (
          <NavLink
            to={RoutePath.Profile}
            className='size-10 overflow-hidden rounded-full ring-2 ring-white/55 transition-opacity hover:opacity-85'
            aria-label='Перейти в профіль'
          >
            <div className='size-full bg-white' />
          </NavLink>
        ) : (
          <div className='relative' ref={menuRef}>
            <button
              onClick={toggleMenu}
              className='inline-flex size-10 items-center justify-center rounded-full border border-white/65 text-white'
              aria-label={isMenuOpen ? 'Закрити меню' : 'Відкрити меню'}
              type='button'
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            {isMenuOpen && (
              <nav className='absolute right-0 top-12 w-72 rounded-2xl bg-white px-4 py-4 shadow-default'>
                <ul className='flex flex-col gap-1'>
                  <li>
                    <NavLink
                      to={RoutePath.Profile}
                      onClick={() => setIsMenuOpen(false)}
                      className={mobileMenuLinkClass}
                    >
                      Профіль
                    </NavLink>
                  </li>
                  {navItems.map((item) => (
                    <li key={item.to}>
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
    </header>
  );
};
