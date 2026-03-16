import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RoutePath } from '@/routes/root.config';
import { logout, useIsAuthenticated } from '@/store/auth.store';

const BASE_URL = import.meta.env.BASE_URL;

export const HomePage = () => {
  return (
    <div className='flex flex-col overflow-x-hidden'>
      {useIsAuthenticated() && <Button onClick={logout}>Logout</Button>}
      {/* Hero */}
      <section className='relative z-0 min-h-[100dvh] w-full overflow-hidden rounded-b-[50px] bg-gray-30'>
        <img
          src={`${BASE_URL}Cat.svg`}
          alt=''
          className='absolute inset-0 h-full w-full object-cover'
          style={{ transform: 'scaleX(-1)', objectPosition: 'right center' }}
          aria-hidden
        />
        <div className='u-container relative flex min-h-[100dvh] items-center py-8 pt-[96px]'>
          <div className='w-full max-w-xl px-6 py-10 text-left lg:px-14 lg:py-14'>
            <h1 className='typo-h1 flex flex-col font-bold text-primary-40 lg:text-[28px]'>
              <span className='[text-shadow:0_0_0_2px_var(--color-primary-80),0_0_12px_var(--color-primary-60)]'>
                АДОПЦІЯ З
              </span>
              <span className='mt-1 text-primary-40 [text-shadow:0_0_0_2px_var(--color-primary-80)] lg:text-[36px]'>
                HOLD THE PAW
              </span>
            </h1>
            <p className='type-main mt-6 max-w-xl text-gray-0'>
              Зроби усвідомлений вибір та прилаштуй чи візьми тварину з притулку в добрі руки.
              Hold The Paw — це спільнота людей, які небайдужі до долі тварин. Наша мета — зробити
              процес усиновлення простим та безпечним. Шукаєте друга? Обирайте серед сотень анкет.
              Рятуєте тваринку з вулиці? Створіть оголошення, і ми допоможемо знайти й найкращі руки.
              Давайте дарувати тепло разом.
            </p>
            <div className='mt-8 flex max-w-md gap-0'>
              <div className='flex flex-1 flex-col items-center border-r border-gray-0/40 pr-8 text-center'>
                <span className='typo-h2 block text-gray-0'>241</span>
                <span className='type-secondary mt-1 text-gray-0/95'>Щасливих хвостів уже вдома</span>
              </div>
              <div className='flex flex-1 flex-col items-center pl-8 text-center'>
                <span className='typo-h2 block text-gray-0'>396</span>
                <span className='type-secondary mt-1 text-gray-0/95'>Друзів чекають на твою ласку</span>
              </div>
            </div>
            <div className='mt-10 flex items-center gap-3'>
              <Button asChild size='lg'>
                <Link to={RoutePath.Pets}>Знайти друга</Link>
              </Button>
              <Button
                variant='transparent'
                size='default'
                className='rounded-full border-2 border-primary-40 text-gray-0 ring-0'
                aria-label='Прокрутити вниз'
              >
                <ChevronDown size={20} className='text-gray-0' />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Для тих, хто */}
      <section className='bg-gray-30 py-12 lg:py-16'>
        <div className='u-container grid gap-6 lg:grid-cols-2 lg:gap-8'>
          <div className='step-block flex flex-col gap-4'>
            <h2 className='typo-h3 text-gray-100'>Для тих, хто шукає</h2>
            <h3 className='typo-h2 text-primary-40'>Візьми тваринку</h3>
            <p className='type-main text-gray-90'>
              Знайди собі пухнастого друга серед тварин, які шукають дім. Обирай за характером,
              розміром та умовами утримання.
            </p>
            <Button asChild>
              <Link to={RoutePath.Pets}>Обрати друга</Link>
            </Button>
            <div className='mt-4 aspect-video overflow-hidden rounded-md bg-gray-50'>
              <img
                src={`${BASE_URL}Cat.svg`}
                alt='Людина з тваринкою'
                className='h-full w-full object-cover'
              />
            </div>
          </div>
          <div className='step-block flex flex-col gap-4'>
            <h2 className='typo-h3 text-gray-100'>Для тих, хто рятує</h2>
            <h3 className='typo-h2 text-primary-40'>Прилаштуй тваринку</h3>
            <p className='type-main text-gray-90'>
              Маєш тваринку, якій потрібна нова сім&apos;я? Розмісти профіль на Hold the Paw і
              допоможи знайти надійних нових господарів.
            </p>
            <Button asChild>
              <Link to={RoutePath.CreatePetProfile}>Розповісти профілю</Link>
            </Button>
            <div className='mt-4 aspect-video overflow-hidden rounded-md bg-gray-50'>
              <img
                src={`${BASE_URL}Cat.svg`}
                alt='Прилаштування тваринки'
                className='h-full w-full object-cover'
              />
            </div>
          </div>
        </div>
      </section>

      {/* Як вибрати */}
      <section className='bg-gray-30 py-12 lg:py-16'>
        <div className='u-container grid gap-8 lg:grid-cols-2 lg:items-center'>
          <div className='flex flex-col gap-6'>
            <h2 className='typo-h1 text-gray-100'>
              Собака, котик або інша пухнаста тварина в добрі руки: як вибрати
            </h2>
            <ol className='flex flex-col gap-4'>
              <li className='flex gap-4'>
                <span className='flex size-8 shrink-0 items-center justify-center rounded-full bg-gray-30 typo-h3 text-gray-90'>
                  1
                </span>
                <span className='type-main text-gray-90'>
                  Обери пухнастика за темпераментом, розміром та ритмом життя — щоб вам було
                  комфортно разом.
                </span>
              </li>
              <li className='flex gap-4'>
                <span className='flex size-8 shrink-0 items-center justify-center rounded-full bg-gray-30 typo-h3 text-gray-90'>
                  2
                </span>
                <span className='type-main text-gray-90'>
                  Заповни анкету та ознайомся з історією тваринки, умовами передачі та правилами
                  платформи.
                </span>
              </li>
              <li className='flex gap-4'>
                <span className='flex size-8 shrink-0 items-center justify-center rounded-full bg-gray-30 typo-h3 text-gray-90'>
                  3
                </span>
                <span className='type-main text-gray-90'>
                  Напиши опікуну, домовтесь про знайомство та підготуй дім до прибуття нового члена
                  сім&apos;ї.
                </span>
              </li>
            </ol>
            <Button asChild>
              <Link to={RoutePath.Pets}>Обрати підтримку</Link>
            </Button>
          </div>
          <div className='aspect-square overflow-hidden rounded-md bg-gray-50 lg:aspect-[4/3]'>
            <img
              src={`${BASE_URL}Cat.svg`}
              alt='Тваринка в добрих руках'
              className='h-full w-full object-cover'
            />
          </div>
        </div>
      </section>

      {/* Тварини шукають дім */}
      <section className='bg-gray-30 py-12 lg:py-16'>
        <div className='u-container grid gap-8 lg:grid-cols-2 lg:items-center'>
          <div className='aspect-square overflow-hidden rounded-md bg-gray-50 lg:aspect-[4/3]'>
            <img
              src={`${BASE_URL}Cat.svg`}
              alt='Тварина шукає дім'
              className='h-full w-full object-cover'
            />
          </div>
          <div className='flex flex-col gap-4'>
            <h2 className='typo-h1 text-gray-100'>Тварини шукають дім: знайди свій комочок щастя</h2>
            <p className='type-main text-gray-90'>
              Переглянь оголошення від притулків та опікунів. Кожен профіль — це історія тваринки,
              яка чекає на тебе. Фільтруй за видом, віком, локацією та характером.
            </p>
            <Button asChild>
              <Link to={RoutePath.Pets}>Переглянути оголошення</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Чому адопція важлива */}
      <section className='bg-gray-30 py-12 lg:py-16'>
        <div className='u-container grid gap-8 lg:grid-cols-2 lg:items-center'>
          <div className='flex flex-col gap-4'>
            <h2 className='typo-h1 text-gray-100'>Чому адопція тварин важлива</h2>
            <p className='type-main text-gray-90'>
              Адопція дає другі шанс тваринкам, які потрапили у складні обставини. Ти отримуєш
              вірного друга, а притулок — можливість врятувати ще більше життів. Разом ми змінюємо
              долі пухнастиків на краще.
            </p>
            <Button asChild>
              <Link to={RoutePath.Pets}>Обрати тваринку</Link>
            </Button>
          </div>
          <div className='aspect-square overflow-hidden rounded-md bg-gray-50 lg:aspect-[4/3]'>
            <img
              src={`${BASE_URL}Cat.svg`}
              alt='Щаслива тваринка'
              className='h-full w-full object-cover'
            />
          </div>
        </div>
      </section>
    </div>
  );
};
