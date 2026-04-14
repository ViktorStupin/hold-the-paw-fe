import { ArrowUp, Facebook, Instagram, Twitter } from 'lucide-react';
import { NavLink } from 'react-router-dom';

import { BASE_URL } from '@/constants/env';
import { isPublicRoute } from '@/layouts/Header/Header';
import { ProtectedNavLink } from '@/layouts/Header/ProtectedNavLink';
import { PROTECTED_ROUTES_CONFIG, RoutePath } from '@/routes/root.config';

const FOOTER_TAGLINE =
  'Ми допомагаємо людям і тваринам знайти одне одного. Зручний пошук, перевірені анкети та відповідальна адопція в одному місці.';

const FOOTER_NAV_ITEMS = [
  { label: 'Додати тваринку', to: RoutePath.CreatePetProfile },
  { label: 'Знайти тваринку', to: RoutePath.Pets },
  { label: 'Мої тваринки', to: RoutePath.MyPets },
] as const;

const FOOTER_SOCIAL = [
  { Icon: Facebook, href: 'https://www.facebook.com/', label: 'Facebook' },
  { Icon: Instagram, href: 'https://www.instagram.com/', label: 'Instagram' },
  { Icon: Twitter, href: 'https://twitter.com/', label: 'X (Twitter)' },
] as const;

const footerNavLinkClass = ({ isActive }: { isActive: boolean }) =>
  `block text-[16px] leading-[125%] transition-colors ${isActive ? 'text-primary-40' : 'text-gray-90 hover:text-primary-40'}`;

export const Footer = () => {
  const logoSrc = `${BASE_URL}icons/Logo.svg`;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <footer className='relative mt-[152px] hidden border-t border-gray-30 bg-gray-0 lg:block'>
        <div className='u-container py-10 lg:py-14'>
          <div className='grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8 lg:gap-16'>
            <div className='flex min-w-0 flex-col gap-5'>
              <NavLink to={RoutePath.Home} className='inline-flex w-fit shrink-0' aria-label='На головну'>
                <img src={logoSrc} alt='Hold The Paw' className='h-12 w-auto max-w-[200px] object-contain object-left' />
              </NavLink>
              <p className='text-[16px] leading-[125%] text-gray-100'>{FOOTER_TAGLINE}</p>
              <ul className='flex flex-wrap items-center gap-4'>
                {FOOTER_SOCIAL.map(({ Icon, href, label }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-gray-100 transition-colors hover:text-primary-60'
                      aria-label={label}
                    >
                      <Icon className='size-6' strokeWidth={1.5} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className='min-w-0'>
              <h2 className='text-[16px] font-semibold text-gray-100'>Навігація</h2>
              <ul className='mt-4 flex flex-col gap-3'>
                {FOOTER_NAV_ITEMS.map((item) => {
                  const isPublic = isPublicRoute(item.to);
                  return (
                    <li key={item.to}>
                      <ProtectedNavLink
                        to={item.to}
                        requireAuth={!isPublic}
                        authMessage={PROTECTED_ROUTES_CONFIG[item.to]}
                        className={footerNavLinkClass}
                      >
                        {item.label}
                      </ProtectedNavLink>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className='flex min-w-0 flex-col gap-4'>
              <h2 className='text-[16px] font-semibold text-gray-100'>Допомогти лапкам</h2>
              <p className='text-[16px] leading-[125%] text-gray-90'>Ваш внесок допомагає тваринам знайти дім</p>
              <button
                type='button'
                className='inline-flex h-[50px] w-full max-w-[280px] items-center justify-center rounded-full bg-primary-60 px-8 text-[16px] font-medium text-gray-0 transition-colors hover:bg-primary-80'
              >
                Надіслати підтримку
              </button>
            </div>
          </div>
        </div>
      </footer>

      <button
        type='button'
        onClick={scrollToTop}
        className='fixed right-4 bottom-6 z-30 hidden size-12 items-center justify-center rounded-full border border-gray-30 bg-gray-0 shadow-[0_4px_14px_rgba(31,32,34,0.12)] transition-colors hover:bg-gray-30/40 lg:flex md:right-8 md:bottom-8'
        aria-label='Прокрутити вгору'
      >
        <ArrowUp className='size-5 text-gray-90' strokeWidth={2} />
      </button>
    </>
  );
};
