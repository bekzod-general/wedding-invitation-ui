export type Language = 'uz' | 'ru' | 'en';

export interface Wish {
  id: string;
  name: string;
  initials: string;
  relationship?: string;
  relationshipKey?: string;
  message: string;
  date?: string;
  dateType?: 'today' | 'yesterday' | 'justNow';
  time?: string;
  hearts: number;
}

export const WEDDING_CONFIG = {
  groom: 'Bekzod',
  bride: 'Parvina',
  groomFullName: 'Bekzod Murotboyev',
  brideFullName: 'Parvina Qosimova',
  coupleTitle: 'Bekzod & Parvina',
  families: 'Saidovlar va Xidirovlar',
  city: 'Buxoro',
  // Target date for countdown (January 10, 2027 at 18:00)
  targetDate: new Date('2027-01-10T18:00:00+05:00'),
  venue: {
    nameUz: '"Havas Premium" Tantanalari Saroyi',
    nameRu: 'Банкетный зал «Havas Premium»',
    nameEn: '"Havas Premium" Grand Palace',
    addressUz: 'Buxoro shahri, Alpomish ko\'chasi, 333-uy',
    addressRu: 'г. Бухара, ул. Алпомыш, дом 333',
    addressEn: '333 Alpomish Street, Bukhara, Uzbekistan',
    landmarkUz: 'Mo\'ljal: Havas Premium tantanalar majmuasi',
    landmarkRu: 'Ориентир: Банкетный комплекс «Havas Premium»',
    landmarkEn: 'Landmark: Havas Premium Grand Banquet Complex',
    parkingUz: 'Bepul avtoturargoh mavjud',
    parkingRu: 'Бесплатная парковка для гостей',
    parkingEn: 'Free guest parking available',
    lat: 39.740825,
    lng: 64.433365,
    gpsText: 'GPS: 39.7408, 64.4333',
    yandexGoUrl: 'https://3.redirect.app.link/yandexgo?end-lat=39.740825&end-lon=64.433365',
    yandexMapsUrl: 'https://yandex.uz/maps/-/CXqJnWoO',
    googleMapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=39.740825,64.433365',
    organizerPhone: '+998 (93) 687-08-50',
    organizerTelegram: 'https://t.me/bekzodmurotboyev',
  },
  audioUrl: '/audio/dunyadan-uzak.mp3',
};

const CALENDAR_INFO: Record<Language, { title: string; details: string; location: string }> = {
  uz: {
    title: "Bekzod & Parvina — Nikoh To'yi",
    details: 'Saidovlar va Xidirovlar xonadonlari sizni Bekzod Murotboyev va Parvina Qosimovalarning nikoh to\'yiga lutfan taklif etadi.\nTo\'yxona: "Havas Premium" Tantanalari Saroyi (Buxoro shahri, Alpomish ko\'chasi, 333-uy).\nGPS: 39.740825, 64.433365',
    location: '"Havas Premium" Tantanalari Saroyi, Buxoro shahri, Alpomish ko\'chasi, 333-uy',
  },
  ru: {
    title: 'Бекзод & Парвина — Свадебное Торжество',
    details: 'Семьи Саидовых и Хидировых приглашают вас на свадебное торжество Бекзода Муротбоева и Парвины Косимовой.\nБанкетный зал: «Havas Premium» (г. Бухара, ул. Алпомыш, дом 333).\nGPS: 39.740825, 64.433365',
    location: 'Банкетный зал «Havas Premium», г. Бухара, ул. Алпомыш, дом 333',
  },
  en: {
    title: 'Bekzod & Parvina — Wedding Celebration',
    details: 'The Saidov and Khidirov families cordially invite you to the wedding celebration of Bekzod Murotboyev and Parvina Qosimova.\nVenue: "Havas Premium" Grand Palace (333 Alpomish Street, Bukhara).\nGPS: 39.740825, 64.433365',
    location: '"Havas Premium" Grand Palace, 333 Alpomish Street, Bukhara, Uzbekistan',
  },
};

export const INITIAL_WISHES: Wish[] = [
  {
    id: 'wish-1',
    name: 'Sardor & Nilufar',
    initials: 'S&N',
    relationshipKey: 'friends',
    message: 'Ikki yosh baxtli bo\'lsin! Qalbingizdagi sevgi va o\'zaro hurmat hech qachon so\'nmasin. Har bir kuningiz to\'ydagidek shodlik va shukronalik bilan to\'lsin!',
    dateType: 'today',
    time: '18:42',
    hearts: 34,
  },
  {
    id: 'wish-2',
    name: 'Семья Каримовых',
    initials: 'CK',
    relationshipKey: 'relatives',
    message: 'Совет да любовь! Пусть каждый день совместной жизни будет наполнен нежностью, гармонией и улыбками. Крепкого вам семейного очага и безграничного счастья!',
    dateType: 'today',
    time: '16:15',
    hearts: 28,
  },
  {
    id: 'wish-3',
    name: 'Alex & Family',
    initials: 'AF',
    relationshipKey: 'colleagues',
    message: 'Wishing you both a lifetime of endless joy, radiant love, and harmonious companionship! Congratulations on building such a beautiful family together.',
    dateType: 'today',
    time: '14:02',
    hearts: 45,
  },
  {
    id: 'wish-4',
    name: 'Akmal aka',
    initials: 'AA',
    relationshipKey: 'groom',
    message: 'To\'ylar muborak! Ostonangizdan qut-baraka va fayz arimasin! Bekzodbek va Parvinaning xonadoni hamisha yaxshi kunlar, go\'zal to\'ylar bilan to\'lsin!',
    dateType: 'yesterday',
    time: '21:40',
    hearts: 53,
  },
];

// Localized Google Calendar URL generator helper
export const getGoogleCalendarUrl = (lang: Language = 'uz'): string => {
  const info = CALENDAR_INFO[lang] || CALENDAR_INFO.uz;
  const startTime = '20270110T130000Z'; // 18:00 Tashkent/Bukhara (UTC+5) is 13:00 UTC
  const endTime = '20270110T180000Z';
  const title = encodeURIComponent(info.title);
  const details = encodeURIComponent(info.details);
  const location = encodeURIComponent(info.location);
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startTime}/${endTime}&details=${details}&location=${location}`;
};

// Localized .ics file download helper
export const downloadIcsFile = (lang: Language = 'uz'): void => {
  const info = CALENDAR_INFO[lang] || CALENDAR_INFO.uz;
  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Bekzod & Parvina Wedding//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    'UID:wedding-bekzod-parvina-20270110@wedding.uz',
    'DTSTAMP:20261008T000000Z',
    'DTSTART:20270110T130000Z',
    'DTEND:20270110T180000Z',
    `SUMMARY:${info.title}`,
    `DESCRIPTION:${info.details.replace(/\n/g, '\\n')}`,
    `LOCATION:${info.location.replace(/,/g, '\\,')}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `bekzod-parvina-wedding-${lang}.ics`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
};
