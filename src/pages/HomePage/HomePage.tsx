import { ArrowDownRight } from 'lucide-react';
import { NavLink } from 'react-router-dom';

import { RoutePath } from '@/routes/root.config';

const HOME_PHOTO_BAND_HEADING =
  'Собака, котик або інша пухнаста тварина в добрі руки: як вибрати';

const HOME_PHOTO_BAND_STEP_COPY = {
  catalog:
    'Оберіть пухнастика за темпераментом, розміром та регіоном, скориставшись зручними фільтрами нашого каталогу.',
  card: 'Картка тварини містить дані про щеплення та особливості догляду, що допоможе вам підготуватися до зустрічі з новим другом.',
  shelter:
    'Ви можете взяти тварину з притулку — від маленького мешканця квартири до великого захисника будинку — серед породистих собак чи метисів.',
} as const;

const HOME_CAT_CARD_HEADING = 'Тварини шукають дім: знайди свій комочок щастя';
const HOME_CAT_CARD_BODY =
  'Якщо ваше серце належить муркотунам, обирайте висловухих або рудих котів у добрі руки через наші локальні підбірки. Кожен пухнастик із притулку мріє про ваш теплий дім та люблячі руки.';
const HOME_CAT_CARD_CTA_LABEL = 'Переглянути котиків';

type THomePhotoStepId = '1' | '2' | '3';

const HOME_PHOTO_BAND_MOBILE_STEPS: { id: THomePhotoStepId; copyKey: keyof typeof HOME_PHOTO_BAND_STEP_COPY }[] = [
  { id: '1', copyKey: 'catalog' },
  { id: '2', copyKey: 'card' },
  { id: '3', copyKey: 'shelter' },
];

const HOME_PHOTO_BAND_DESKTOP_STEPS: { id: THomePhotoStepId; copyKey: keyof typeof HOME_PHOTO_BAND_STEP_COPY }[] = [
  { id: '1', copyKey: 'catalog' },
  { id: '2', copyKey: 'shelter' },
  { id: '3', copyKey: 'card' },
];

const HOME_PHOTO_BAND_ICON_TOP: Record<THomePhotoStepId, string> = {
  '1': '--home-photo-band-icon-1-top',
  '2': '--home-photo-band-icon-2-top',
  '3': '--home-photo-band-icon-3-top',
};

type THomeActionCardProps = {
  overline: string;
  title: string;
  description: string;
  buttonLabel: string;
  buttonTo: string;
  imageSrc: string;
  imageAlt: string;
  imageObjectPosition?: string;
};

type THomeAction = THomeActionCardProps;

const HomeActionCard = ({
  overline,
  title,
  description,
  buttonLabel,
  buttonTo,
  imageSrc,
  imageAlt,
  imageObjectPosition = 'center',
}: THomeActionCardProps) => {
  return (
    <article className='h-[var(--home-action-card-height-mobile)] w-full max-w-[var(--home-action-card-width-mobile)] overflow-hidden rounded-[var(--home-action-card-radius-mobile)] border border-[5px] border-gray-0 bg-gray-0 shadow-home-action-card lg:h-[var(--home-action-card-height)] lg:max-w-[var(--home-action-card-width)] lg:rounded-[var(--home-action-card-radius)] lg:border-[10px]'>
      <div className='grid h-full grid-cols-[1fr_var(--home-action-card-image-column-width-mobile)] lg:grid-cols-[1fr_var(--home-action-card-image-column-width)]'>
        <div className='relative z-10 -mr-[var(--home-action-card-text-overlay-right-mobile)] flex w-[var(--home-action-card-text-card-width-mobile)] flex-col rounded-tr-[var(--home-action-card-radius-mobile)] rounded-br-[var(--home-action-card-radius-mobile)] bg-gray-0 px-[var(--home-action-card-content-px-mobile)] pt-[var(--home-action-card-content-pt-mobile)] pb-[var(--home-action-card-content-pb-mobile)] lg:-mr-[var(--home-action-card-text-overlay-right)] lg:w-[var(--home-action-card-text-card-width)] lg:rounded-tr-[var(--home-action-card-radius)] lg:rounded-br-[var(--home-action-card-radius)] lg:px-[var(--home-action-card-content-px)] lg:pt-[var(--home-action-card-content-pt)] lg:pb-[var(--home-action-card-content-pb)]'>
          <p className='text-[16px] leading-[100%] text-gray-90'>{overline}</p>
          <h2 className='mt-6 text-[22px] leading-[90%] font-semibold text-gray-100 lg:text-[32px]'>{title}</h2>
          <p className='mt-2 h-[var(--home-action-card-text-height-mobile)] w-[var(--home-action-card-text-width-mobile)] text-[16px] leading-[125%] text-gray-100 lg:h-[var(--home-action-card-text-height)] lg:w-[var(--home-action-card-text-width)] lg:text-[13px]'>
            {description}
          </p>

          <NavLink
            to={buttonTo}
            className='mt-4 inline-flex h-[50px] w-full max-w-[var(--home-action-card-button-max-width-mobile)] items-center justify-center rounded-full bg-primary-60 px-8 text-[18px] leading-none font-medium text-gray-0 transition-colors hover:bg-primary-80 lg:mt-auto lg:max-w-[var(--home-action-card-button-max-width)]'
          >
            {buttonLabel}
          </NavLink>
        </div>

        <div className='relative ml-0 h-full w-full overflow-hidden'>
          <img
            src={imageSrc}
            alt={imageAlt}
            className='ml-auto h-full w-[var(--home-action-card-image-width-mobile)] rounded-r-[var(--home-action-card-radius-mobile)] object-cover lg:w-[var(--home-action-card-image-width)] lg:rounded-r-[var(--home-action-card-radius)]'
            style={{
              objectPosition: imageObjectPosition,
            }}
          />
        </div>
      </div>
    </article>
  );
};

const StatDivider = () => <span className='h-[207px] w-[2px] shrink-0 bg-gray-0/60' />;


const HomeHero = () => {
  const catHeroSrc = `${import.meta.env.BASE_URL}photos/CatHome.webp`;

  return (
    <section className='-mt-(--header-height-mobile) mb-(--home-hero-to-actions-gap-mobile) w-full md:-mt-(--header-height-desktop) md:mb-(--home-hero-bottom-space) md:h-screen'>
      <div className='relative h-(--home-hero-height-mobile) w-full overflow-hidden rounded-b-(--home-hero-radius-mobile) bg-gray-30 md:h-screen md:rounded-b-(--home-hero-radius)'>
        <img
          src={catHeroSrc}
          alt='Кіт на головному банері'
          className='absolute inset-0 h-full w-full object-cover object-[20%_38%] [transform:scaleX(-1)] md:object-center'
        />

        <div className='absolute inset-0 left-0 flex w-full items-start px-4 pt-(--home-hero-mobile-content-top) pb-34 md:inset-y-0 md:items-center md:px-5 md:pt-0 md:pb-0 md:max-w-[560px] md:px-14'>
          <div className='w-full md:w-auto'>
            <h1 className='w-full text-center text-[48px] leading-[95%] text-primary-40 drop-shadow-[0_4px_14px_rgba(0,0,0,0.35)] [font-family:"Airfool","SF_Pro_Rounded"] [font-weight:700] [-webkit-text-stroke:1px_var(--gray-0)] md:w-auto md:text-left md:text-[62px]'>
              Прихисток з
              <br />
              Hold The Paw
            </h1>

            <p className='mt-[5px] hidden max-w-[620px] text-[20px] leading-[130%] text-gray-0 md:block'>
              Зроби усвідомлений вибір та прилаштуй чи візьми тварину з притулку в добрі руки.
            </p>

            <p className='absolute right-4 bottom-(--home-hero-mobile-desc-bottom) left-4 text-left text-[10px] leading-[120%] text-gray-0 md:static md:right-auto md:bottom-auto md:left-auto md:mx-0 md:mt-[5px] md:w-auto md:max-w-[620px] md:text-left md:text-[16px] md:leading-[132%] md:font-extralight'>
              Hold The Paw — це спільнота людей, які небайдужі до долі тварин. Наша мета — зробити процес
              усиновлення простим та безпечним. Шукаєте друга? Обирайте серед сотень анкет. Рятуєте тваринку
              з вулиці? Створіть оголошення, і ми допоможемо знайти їй найкращі руки. Давайте дарувати тепло
              разом.
            </p>

            <div className='mt-7 hidden h-[207px] w-[432px] max-w-full items-stretch md:flex'>
              <StatDivider />
              <div className='flex flex-1 items-center justify-center px-4'>
                <div className='text-center'>
                  <p className='text-[50px] leading-[95%] font-semibold text-gray-0'>241</p>
                  <p className='mt-2 text-[13px] leading-[120%] text-gray-0/90'>
                    Щасливих хвостів
                    <br />
                    уже вдома
                  </p>
                </div>
              </div>
              <StatDivider />
              <div className='flex flex-1 items-center justify-center px-4'>
                <div className='text-center'>
                  <p className='text-[50px] leading-[95%] font-semibold text-gray-0'>396</p>
                  <p className='mt-2 text-[13px] leading-[120%] text-gray-0/90'>
                    Друзів чекають
                    <br />
                    на твою ласку
                  </p>
                </div>
              </div>
              <StatDivider />
            </div>

            <div className='mt-6 hidden w-full max-w-[436px] items-center gap-3 md:flex'>
              <NavLink
                to={RoutePath.Pets}
                className='inline-flex h-[50px] w-full max-w-[374px] flex-1 items-center justify-center rounded-full border border-gray-0 bg-primary-60 px-8 text-[16px] font-medium text-gray-0 transition-colors hover:bg-primary-80'
              >
                Знайти друга
              </NavLink>
              <NavLink
                to={RoutePath.Pets}
                aria-label='Перейти до пошуку тварин'
                className='inline-flex size-[50px] shrink-0 items-center justify-center rounded-full border border-gray-0 bg-primary-60 text-[18px] text-gray-0 transition-colors hover:bg-primary-80'
              >
                <ArrowDownRight size={20} />
              </NavLink>
            </div>
          </div>
        </div>
        <div
          className='absolute left-1/2 z-40 h-px w-(--home-hero-mobile-stats-width) max-w-full -translate-x-1/2 bg-gray-0 md:hidden'
          style={{
            top: 'calc(var(--home-hero-mobile-stats-block-top) - var(--home-hero-mobile-stats-line-gap) - 1px)',
          }}
          aria-hidden
        />
        <div className='absolute top-(--home-hero-mobile-stats-block-top) right-0 left-0 z-40 flex h-[185px] w-full gap-2 overflow-hidden rounded-(--home-hero-mobile-stats-radius) border border-gray-70/20 bg-gray-0 shadow-[0_8px_20px_rgba(31,32,34,0.12)] md:hidden'>
          <span
            className='pointer-events-none absolute top-1/2 left-[16px] h-(--home-hero-mobile-stats-divider-height) w-px -translate-y-1/2 bg-gray-50'
            aria-hidden
          />
          <div className='flex min-h-0 min-w-0 flex-1 flex-col items-start justify-center pl-[calc(16px+1px+8px)] text-left'>
            <p className='text-[36px] leading-[95%] font-semibold text-primary-40'>241</p>
            <p className='mt-1 text-[12px] leading-[120%] text-gray-90'>
              Щасливих хвостів
              <br />
              уже вдома
            </p>
          </div>
          <div className='flex min-h-0 min-w-0 flex-1 items-center gap-2 pr-4'>
            <span className='h-(--home-hero-mobile-stats-divider-height) w-px shrink-0 bg-gray-50' aria-hidden />
            <div className='flex min-w-0 flex-col items-start justify-center text-left'>
              <p className='text-[36px] leading-[95%] font-semibold text-primary-40'>396</p>
              <p className='mt-1 text-[12px] leading-[120%] text-gray-90'>
                Друзів чекають
                <br />
                на твою ласку
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const HomeActions = () => {
  const findFriendCardSrc = `${import.meta.env.BASE_URL}photos/Card-1.webp`;
  const createProfileCardSrc = `${import.meta.env.BASE_URL}photos/Card-2.webp`;

  const actions: THomeAction[] = [
    {
      overline: 'Для тих, хто шукає',
      title: 'Знайди свого хвостика',
      description:
        'Переглядай анкети пухнастиків, що мріють про дім. Ми зібрали перевірені профілі від притулків та волонтерів, щоб твій шлях до нового друга був безпечним.',
      buttonLabel: 'Обрати друга',
      buttonTo: RoutePath.Pets,
      imageSrc: findFriendCardSrc,
      imageAlt: 'Людина обіймає тваринку',
      imageObjectPosition: 'var(--home-action-card-1-image-position)',
    },
    {
      overline: 'Для тих, хто рятує',
      title: "Подаруй шанс на сім'ю",
      description:
        'Рятуєш тваринку та шукаєш їй люблячі руки? Створи детальний профіль на нашій платформі. Ми допоможемо твоїй історії знайти відгук у серцях майбутніх власників.',
      buttonLabel: 'Розмістити профіль',
      buttonTo: RoutePath.CreatePetProfile,
      imageSrc: createProfileCardSrc,
      imageAlt: 'Дитина тримає кролика',
      imageObjectPosition: 'var(--home-action-card-2-image-position)',
    },
  ];

  return (
    <section className='u-container pb-(--home-actions-to-photo-band-gap) lg:px-12'>
      <div className='grid grid-cols-1 justify-items-center gap-(--home-action-cards-gap-mobile) lg:grid-cols-2 lg:justify-between lg:justify-items-stretch lg:gap-(--home-action-cards-gap)'>
        {actions.map((action) => (
          <HomeActionCard key={action.title} {...action} />
        ))}
      </div>

    </section>
  );
};

const HomePhotoBand = () => {
  const base = import.meta.env.BASE_URL;
  const bandSrc = `${base}photos/people.webp`;
  const iconSrc = (n: THomePhotoStepId) => `${base}icons/${n}.svg`;

  return (
    <section className='box-border w-full'>
      <div className='relative flex h-(--home-photo-band-height) w-full flex-col overflow-hidden rounded-(--home-photo-band-radius) bg-gray-70 lg:hidden'>
        <div className='relative z-0 flex flex-col px-4 pt-(--home-photo-band-image-top)'>
          <div className='box-border h-(--home-photo-band-image-height) w-full max-w-full shrink-0 overflow-hidden rounded-(--radius-lg) border-[5px] border-solid border-gray-0'>
            <img
              src={bandSrc}
              alt='Люди'
              className='h-full w-full max-w-full object-cover'
              loading='lazy'
              decoding='async'
            />
          </div>
          <h2 className='relative z-20 mt-(--home-photo-band-heading-gap) text-balance text-[20px] leading-[110%] font-semibold text-gray-0'>
            {HOME_PHOTO_BAND_HEADING}
          </h2>
        </div>

        {HOME_PHOTO_BAND_MOBILE_STEPS.map(({ id, copyKey }) => (
          <div
            key={id}
            className='absolute right-4 z-20 flex items-start gap-(--home-photo-band-icon-text-gap)'
            style={{
              top: `var(${HOME_PHOTO_BAND_ICON_TOP[id]})`,
              left: 'var(--home-photo-band-icon-inset)',
            }}
          >
            <img
              src={iconSrc(id)}
              alt={`Крок ${id}`}
              className='pointer-events-none h-[35px] w-[35px] shrink-0'
              width={35}
              height={35}
              loading='lazy'
              decoding='async'
            />
            <p className='min-w-0 flex-1 text-[16px] leading-[125%] text-gray-0'>
              {HOME_PHOTO_BAND_STEP_COPY[copyKey]}
            </p>
          </div>
        ))}
      </div>

      <div className='hidden min-h-(--home-photo-band-height-desktop) w-full min-w-0 flex-row items-center gap-(--home-photo-band-text-image-gap-desktop) overflow-hidden rounded-(--home-photo-band-radius-desktop) bg-gray-70 px-8 py-10 lg:flex lg:px-12 lg:py-12'>
        <div className='flex min-h-0 min-w-0 flex-1 flex-col justify-center'>
          <h2 className='text-balance text-[32px] leading-[110%] font-semibold text-gray-0 lg:max-w-[38rem]'>
            {HOME_PHOTO_BAND_HEADING}
          </h2>
          <div className='mt-8 flex flex-col gap-(--home-photo-band-steps-gap-desktop)'>
            {HOME_PHOTO_BAND_DESKTOP_STEPS.map(({ id, copyKey }) => (
              <div
                key={id}
                className={`flex items-start gap-(--home-photo-band-icon-text-gap)${id === '1' || id === '3'
                  ? ' min-[1411px]:ml-(--home-photo-band-step-1-3-from-left-1411)'
                  : ' min-[1071px]:max-[1409px]:ml-(--home-photo-band-step-2-indent-from-1300) min-[1410px]:max-[1485px]:ml-(--home-photo-band-step-2-from-left-1410-1485) min-[1486px]:ml-(--home-photo-band-step-2-from-left-1411)'
                  }`}
              >
                <img
                  src={iconSrc(id)}
                  alt={`Крок ${id}`}
                  className='h-[35px] w-[35px] shrink-0'
                  width={35}
                  height={35}
                  loading='lazy'
                  decoding='async'
                />
                <div className='h-(--home-photo-band-step-text-box-height) w-(--home-photo-band-step-text-box-width) shrink-0 overflow-hidden bg-transparent'>
                  <p className='text-[16px] leading-[125%] text-gray-0'>{HOME_PHOTO_BAND_STEP_COPY[copyKey]}</p>
                </div>
              </div>
            ))}
          </div>
          <NavLink
            to={RoutePath.Pets}
            className='mt-(--home-photo-band-step3-to-cta-desktop) self-start inline-flex h-(--home-photo-band-cta-height-desktop) w-(--home-photo-band-cta-width-desktop) shrink-0 items-center justify-center rounded-full bg-primary-60 text-[16px] font-medium text-gray-0 transition-colors hover:bg-primary-80'
          >
            Обрати тваринку
          </NavLink>
        </div>
        <div className='flex min-h-0 min-w-0 w-full max-w-[min(100%,546px)] shrink-0 flex-col justify-center lg:max-w-[min(48%,546px)]'>
          <div className='relative aspect-[546/449] w-full overflow-hidden rounded-(--radius-lg) border-[5px] border-solid border-gray-0'>
            <img
              src={bandSrc}
              alt='Люди з тваринами'
              className='absolute inset-0 h-full w-full object-cover object-top'
              loading='lazy'
              decoding='async'
            />
          </div>
        </div>
      </div>
    </section>
  );
};

type THomeCatShowcaseSectionProps = {
  imageFile: string;
  /** `true` — зображення зліва на десктопі (перше в сітці); `false` — текст зліва */
  imageLeading: boolean;
  sectionClassName: string;
  mobileImageAboveText?: boolean;
  mobileTextWithoutBg?: boolean;
  /** Мобільний варіант: заголовок і текст поверх зображення (без окремого блоку під картинкою) */
  mobileTextOnImage?: boolean;
  desktopHeading?: string;
  mobileHeading?: string;
  desktopBody?: string;
  mobileBody?: string;
};

const HomeCatShowcaseSection = ({
  imageFile,
  imageLeading,
  sectionClassName,
  mobileImageAboveText = false,
  mobileTextWithoutBg = false,
  mobileTextOnImage = false,
  desktopHeading,
  mobileHeading,
  desktopBody,
  mobileBody,
}: THomeCatShowcaseSectionProps) => {
  const base = import.meta.env.BASE_URL;
  const imageSrc = `${base}photos/${imageFile}`;
  const resolvedDesktopHeading = desktopHeading ?? HOME_CAT_CARD_HEADING;
  const resolvedMobileHeading = mobileHeading ?? resolvedDesktopHeading;
  const resolvedDesktopBody = desktopBody ?? HOME_CAT_CARD_BODY;
  const resolvedMobileBody = mobileBody ?? resolvedDesktopBody;

  const catShowcaseCtaClassName =
    'inline-flex h-[50px] shrink-0 items-center justify-center self-start rounded-full bg-primary-60 px-8 text-[16px] font-medium text-gray-0 transition-colors hover:bg-primary-80';

  const renderCatShowcaseCta = (extraClassName?: string) => (
    <NavLink
      to={RoutePath.Pets}
      className={[catShowcaseCtaClassName, extraClassName].filter(Boolean).join(' ')}
    >
      {HOME_CAT_CARD_CTA_LABEL}
    </NavLink>
  );

  const mobileStackedContent = (
    <div className='lg:hidden'>
      <div className='overflow-hidden rounded-(--home-cat-card-image-radius-mobile) border-[5px] border-solid border-gray-0'>
        <img
          src={imageSrc}
          alt='Картка тварини'
          className='block h-auto w-full'
          loading='lazy'
          decoding='async'
        />
      </div>
      <div className={mobileTextWithoutBg ? 'mt-4 px-4 py-1' : 'mt-4 rounded-(--radius-lg) bg-gray-0 px-4 py-5'}>
        <h2 className='text-balance text-[20px] leading-[110%] font-semibold text-gray-100'>
          {resolvedMobileHeading}
        </h2>
        <p className='mt-3 text-[16px] leading-[125%] text-gray-100'>{resolvedMobileBody}</p>
        <div className='mt-5'>{renderCatShowcaseCta()}</div>
      </div>
    </div>
  );

  const mobileOverlayContent = (
    <div className='lg:hidden'>
      <div className='relative overflow-hidden rounded-(--home-cat-card-image-radius-mobile) border-[5px] border-solid border-gray-0'>
        <img
          src={imageSrc}
          alt='Картка тварини'
          className='block h-auto w-full'
          loading='lazy'
          decoding='async'
        />
        <div className='pointer-events-none absolute inset-0 flex flex-col justify-between gap-4 bg-gradient-to-b from-black/55 via-black/15 to-black/55 p-4 pt-5 pb-5'>
          <div className='min-w-0'>
            <h2 className='text-balance text-[20px] leading-[110%] font-semibold text-gray-0 drop-shadow-[0_2px_10px_rgba(0,0,0,0.45)]'>
              {resolvedMobileHeading}
            </h2>
            <p className='mt-3 text-[16px] leading-[125%] text-gray-0 drop-shadow-[0_1px_6px_rgba(0,0,0,0.4)]'>
              {resolvedMobileBody}
            </p>
          </div>
          <div className='pointer-events-auto'>{renderCatShowcaseCta()}</div>
        </div>
      </div>
    </div>
  );

  const mobileTextOnImageContent = (
    <div className='lg:hidden'>
      <div className='relative overflow-hidden rounded-(--home-cat-card-image-radius-mobile)'>
        <img
          src={imageSrc}
          alt='Картка тварини'
          className='block h-auto w-full'
          loading='lazy'
          decoding='async'
        />
        <div className='pointer-events-none absolute inset-0 flex flex-col justify-between gap-4 p-4 pt-5 pb-5'>
          <div className='min-w-0'>
            <h2 className='text-balance text-[20px] leading-[110%] font-semibold text-gray-100 [text-shadow:0_1px_0_var(--gray-0),0_0_12px_rgba(255,255,255,0.85),0_0_24px_rgba(255,255,255,0.55)]'>
              {resolvedMobileHeading}
            </h2>
            <p className='mt-3 text-[16px] leading-[125%] text-gray-100 [text-shadow:0_1px_0_var(--gray-0),0_0_10px_rgba(255,255,255,0.8),0_0_20px_rgba(255,255,255,0.45)]'>
              {resolvedMobileBody}
            </p>
          </div>
          <div className='pointer-events-auto mt-auto w-full shrink-0'>
            {renderCatShowcaseCta('w-full max-w-none self-stretch')}
          </div>
        </div>
      </div>
    </div>
  );

  const desktopTextCol = (
    <div className='relative z-10 flex h-full min-h-0 min-w-0 flex-col justify-center overflow-x-clip'>
      <h2 className='text-balance text-[32px] leading-[110%] font-semibold text-gray-100'>
        {resolvedDesktopHeading}
      </h2>
      <p className='mt-6 text-[16px] leading-[125%] text-gray-100'>
        {resolvedDesktopBody}
      </p>
      <div className='mt-(--home-cat-card-body-to-button-gap)'>{renderCatShowcaseCta()}</div>
    </div>
  );

  const desktopImageCol = (
    <div
      className={`relative z-0 flex h-full min-h-0 w-full min-w-0 items-center ${imageLeading ? 'justify-start' : 'justify-end'}`}
    >
      <div className='relative aspect-[546/571] w-full max-w-(--home-cat-card-desktop-image-width) shrink-0 overflow-hidden rounded-(--home-cat-card-image-radius-desktop) border-[5px] border-solid border-gray-0'>
        <img
          src={imageSrc}
          alt='Картка тварини'
          className='absolute inset-0 h-full w-full object-cover object-bottom'
          width={546}
          height={571}
          loading='lazy'
          decoding='async'
        />
      </div>
    </div>
  );

  return (
    <section className={sectionClassName}>
      {mobileTextOnImage
        ? mobileTextOnImageContent
        : mobileImageAboveText
          ? mobileStackedContent
          : mobileOverlayContent}

      <div className='hidden min-w-0 gap-(--home-cat-card-text-image-gap) lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-stretch'>
        {imageLeading ? (
          <>
            {desktopImageCol}
            {desktopTextCol}
          </>
        ) : (
          <>
            {desktopTextCol}
            {desktopImageCol}
          </>
        )}
      </div>
    </section>
  );
};

export const HomePage = () => {
  return (
    <>
      <HomeHero />
      <HomeActions />
      <HomePhotoBand />
      <HomeCatShowcaseSection
        imageFile='Cat-Card.webp'
        imageLeading
        sectionClassName='u-container pt-(--home-photo-band-to-cat-card-gap) pb-16 lg:pb-20'
        mobileImageAboveText
        mobileTextWithoutBg
      />
      <HomeCatShowcaseSection
        imageFile='Cat-Card-2.webp'
        imageLeading={false}
        sectionClassName='u-container pt-(--home-cat-card-stack-gap) pb-16 lg:pt-24 lg:pb-20'
        mobileTextOnImage
        desktopHeading='Чому адопція тварин важлива'
        mobileHeading='Дім для тварин з Hold the Paw'
        desktopBody="Кожна тварина на Hold the Paw має детальну історію та фото, щоб ви могли серцем обрати свого улюбленця. Ми робимо адопцію та прилаштування тварин у сім'ю максимально безпечними й прозорими."
        mobileBody="Кожна тварина на Hold the Paw має детальну історію та фото, щоб ви могли серцем обрати свого улюбленця. Ми робимо адопцію та прилаштування тварин у сім'ю максимально безпечними й прозорими."
      />
    </>
  );
};

export default HomePage;
