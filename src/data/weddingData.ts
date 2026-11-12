export type Language = 'uz' | 'ru' | 'en';

export interface Wish {
  id: string;
  name: string;
  initials: string;
  relationship?: string;
  message: string;
  date: string;
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

export const TRANSLATIONS: Record<Language, Record<string, string>> = {
  uz: {
    // Nav
    'nav.invitation': 'Taklifnoma',
    'nav.venue': 'Manzil',
    'nav.wishes': 'Ezgu Tilaklar',

    // Wax seal intro
    'intro.title': 'Nikoh To\'yi Taklifnomasi',
    'intro.names': 'Bekzod Murotboyev & Parvina Qosimova',
    'intro.seal': 'B & P',
    'intro.button': 'Taklifnomani Ochish',
    'intro.hint': 'Sizni tantanamizda ko\'rishdan mamnunmiz',

    // Hero
    'hero.badge': 'Bismillahir Rohmanir Rohiym',
    'hero.subheading': 'Ikki qalbning muqaddas rishtasi',
    'hero.city_badge': 'TO\'Y TANTANASI • BUXORO',
    'hero.names_sub': 'MUROTBOYEV • QOSIMOVA',
    'hero.blessing_quote': '«Qodir Tangrining marhamati bilan ikki qalbning birlashishi tinchlik, mo\'l-ko\'lchilik va abadiy sevgiga to\'la bo\'lsin.»',
    'hero.invitation_dear': 'Hurmatli va Aziz Mehmonimiz!',
    'hero.invitation_text': 'Sizni hayotimizdagi eng quvonchli va unutilmas kunimiz — nikoh to\'yimiz munosabati bilan yoziladigan dasturxonimizga lutfan taklif etamiz. Tashrifingiz to\'yimizning eng go\'zal ko\'rki bo\'ladi.',
    'hero.family_hosts': 'Saidovlar va Xidirovlar xonadonlari',
    'hero.family_hosts_desc': 'Saidovlar va Xidirovlar xonadonlari barcha aziz mehmonlarni orziqib kutadi',
    'hero.date': '10-YANVAR, 2027',
    'hero.day_time': 'Yakshanba • 18:00',
    'hero.countdown_title': 'Tantanagacha Qolgan Vaqt',
    'hero.days': 'Kun',
    'hero.hours': 'Soat',
    'hero.minutes': 'Daqiqa',
    'hero.seconds': 'Soniya',
    'hero.addToCalendar': 'Taqvimga Saqlash',
    'hero.calendarGoogle': 'Google Calendar',
    'hero.calendarIcs': 'Apple / Outlook (.ics)',
    'hero.viewVenue': 'To\'yxona Manzilini Ko\'rish',
    'hero.audio_playing': 'Rustam Fayziyev — Dunyadan Uzak',
    'hero.audio_live': 'LIVE',

    // Venue
    'venue.title': 'To\'yxona Manzili',
    'venue.subtitle': 'Buxoro shahridagi muhtasham to\'yxonada sizni kutamiz',
    'venue.gps': 'GPS: 39.7408, 64.4333',
    'venue.badge': 'TANTANALAR MAJMUASI | Bepul avtoturargoh',
    'venue.disclaimer': 'Банкетный зал "Havas Premium" (г. Бухара, ул. Алпомыш, 333 - Координаты: 39.740825, 64.433365). Начало торжества ровно в 18:00. Добро пожаловать!',
    'venue.btnYandexGo': 'Yandex Go orqali chaqirish',
    'venue.btnYandexMaps': 'Yandex Xarita',
    'venue.btnGoogle': 'Google Maps',
    'venue.copyAddress': 'Nusxalash',
    'venue.addressCopied': 'Manzil nusxalandi!',
    'venue.transport': 'Avtoturargoh va qatnov:',
    'venue.adminTitle': 'Havas Premium Ma\'muriyati',
    'venue.adminDesc': 'Manzil yoki tashrif bo\'yicha qiyinchilik tug\'ilsa, marosim ma\'murlariga bog\'laning',
    'venue.callAdmin': '+998 (93) 687-08-50',

    // Wishes
    'wishes.badge': '10.01.2027 • BUXORO',
    'wishes.title': 'Ezgu Tilaklar va Tabriklar',
    'wishes.subtitle': 'Yuragingizdagi eng samimiy so\'zlar bilan Bekzodbek va Parvinaning yangi oilaviy sahifasini bezang',
    'wishes.boxTitle': 'Tilak Yo\'llash',
    'wishes.boxBadge': 'ESDALIK KITOB',
    'wishes.namePlaceholder': 'Ismingiz va familiyangiz (Masalan: Dilshod va Madina)',
    'wishes.relation': 'Kim bo\'lasiz? / Munosabat:',
    'wishes.relGroom': 'Kuyov tomoni',
    'wishes.relBride': 'Kelin tomoni',
    'wishes.relFriends': 'Qadrdon do\'stlar',
    'wishes.relRelatives': 'Qarindoshlar',
    'wishes.relColleagues': 'Hamkasblar',
    'wishes.messageLabel': 'Samimiy tilaklaringiz:',
    'wishes.messagePlaceholder': 'Yurakdan chiqqan samimiy tilaklaringizni yozing...',
    'wishes.virtualGift': 'Tabrik belgisi (Virtual hadya):',
    'wishes.sendButton': 'Tilakni Yuborish',
    'wishes.empty': 'Hozircha tilaklar yo\'q. Birinchi bo\'lib ezgu tilak qoldiring!',
    'wishes.justNow': 'Bugun, hozirgina',
    'wishes.voiceTeaser': 'Ovozli tabrik qoldirish (30 soniyalik audio tilak)',
    'wishes.wallTitle': 'Mehmonlar Tilaklari',
    'wishes.wallBadge': 'Og\'yo\'l tilaklari',

    // Footer
    'footer.thankYou': 'Tashrifingiz biz uchun katta baxt va sharafdir!',
    'footer.familyHonor': 'Saidovlar va Xidirovlar oilasi hurmat bilan:',
    'footer.quote': '«Muhabbatimiz tongi sizning tabassumingiz ila nurafshon bo\'lsin»',
    'footer.copyright': 'Bekzod Murotboyev & Parvina Qosimova | 2027',
  },

  ru: {
    // Nav
    'nav.invitation': 'Приглашение',
    'nav.venue': 'Локация',
    'nav.wishes': 'Пожелания',

    // Wax seal intro
    'intro.title': 'Свадебное Приглашение',
    'intro.names': 'Бекзод Муротбоев & Парвина Косимова',
    'intro.seal': 'B & P',
    'intro.button': 'Открыть Приглашение',
    'intro.hint': 'Будем искренне рады видеть вас на нашем торжестве',

    // Hero
    'hero.badge': 'С Именем Всевышнего',
    'hero.subheading': 'Священный союз двух любящих сердец',
    'hero.city_badge': 'СВАДЕБНОЕ ТОРЖЕСТВО • БУХАРА',
    'hero.names_sub': 'MUROTBOYEV • QOSIMOVA',
    'hero.blessing_quote': 'Пусть союз двух сердец, благословенный Всевышним, будет полон мира, изобилия и вечной любви.',
    'hero.invitation_dear': 'Дорогие и Уважаемые Гости!',
    'hero.invitation_text': 'Приглашаем вас разделить с нами радость и счастье в самый особенный день нашей жизни — день нашей свадьбы. Ваше присутствие и добрые пожелания станут главным украшением нашего праздника.',
    'hero.family_hosts': 'Семьи Саидовых и Хидировых',
    'hero.family_hosts_desc': 'Семьи Саидовых и Хидировых с радостью ждут всех дорогих гостей',
    'hero.date': '10 ЯНВАРЯ, 2027',
    'hero.day_time': 'Воскресенье • 18:00',
    'hero.countdown_title': 'До Торжества Осталось',
    'hero.days': 'Дней',
    'hero.hours': 'Часов',
    'hero.minutes': 'Минут',
    'hero.seconds': 'Секунд',
    'hero.addToCalendar': 'Сохранить в Календарь',
    'hero.calendarGoogle': 'Google Календарь',
    'hero.calendarIcs': 'Apple / Outlook (.ics)',
    'hero.viewVenue': 'Посмотреть Локацию',
    'hero.audio_playing': 'Рустам Файзиев — Dunyadan Uzak',
    'hero.audio_live': 'LIVE',

    // Venue
    'venue.title': 'Банкетный Зал и Локация',
    'venue.subtitle': 'Будем счастливы приветствовать вас в зале «Havas Premium»',
    'venue.gps': 'GPS: 39.7408, 64.4333',
    'venue.badge': 'БАНКЕТНЫЙ ЗАЛ | Бесплатная парковка',
    'venue.disclaimer': 'Банкетный зал "Havas Premium" (г. Бухара, ул. Алпомыш, 333 - Координаты: 39.740825, 64.433365). Начало торжества ровно в 18:00. Добро пожаловать!',
    'venue.btnYandexGo': 'Вызвать через Yandex Go',
    'venue.btnYandexMaps': 'Яндекс Карты',
    'venue.btnGoogle': 'Google Maps',
    'venue.copyAddress': 'Скопировать',
    'venue.addressCopied': 'Адрес скопирован!',
    'venue.transport': 'Парковка и подъезд:',
    'venue.adminTitle': 'Администрация Havas Premium',
    'venue.adminDesc': 'По вопросам проезда или встречи обращайтесь к координаторам',
    'venue.callAdmin': '+998 (93) 687-08-50',

    // Wishes
    'wishes.badge': '10.01.2027 • БУХАРА',
    'wishes.title': 'Пожелания и Поздравления',
    'wishes.subtitle': 'Напишите самые тёплые слова для Бекзода и Парвины',
    'wishes.boxTitle': 'Оставить Пожелание',
    'wishes.boxBadge': 'ПАМЯТНАЯ КНИГА',
    'wishes.namePlaceholder': 'Ваше имя (Например: Дилшод и Мадина)',
    'wishes.relation': 'Кем вы приходитесь? / Связь:',
    'wishes.relGroom': 'Со стороны жениха',
    'wishes.relBride': 'Со стороны невесты',
    'wishes.relFriends': 'Близкие друзья',
    'wishes.relRelatives': 'Родственники',
    'wishes.relColleagues': 'Коллеги',
    'wishes.messageLabel': 'Ваше поздравление:',
    'wishes.messagePlaceholder': 'Искренние пожелания от всего сердца...',
    'wishes.virtualGift': 'Символ поздравления (Виртуальный подарок):',
    'wishes.sendButton': 'Отправить Пожелание',
    'wishes.empty': 'Пока нет пожеланий. Будьте первыми!',
    'wishes.justNow': 'Сегодня, только что',
    'wishes.voiceTeaser': 'Голосовое поздравление (30 сек аудио)',
    'wishes.wallTitle': 'Пожелания Гостей',
    'wishes.wallBadge': 'Добрые напутствия',

    // Footer
    'footer.thankYou': 'Ваше присутствие — величайшая радость и честь для нас!',
    'footer.familyHonor': 'Семьи Саидовых и Хидировых с уважением:',
    'footer.quote': '«Пусть союз двух сердец, благословенный Всевышним, будет полон мира, изобилия и вечной любви»',
    'footer.copyright': 'Бекзод Муротбоев & Парвина Косимова | 2027',
  },

  en: {
    // Nav
    'nav.invitation': 'Invitation',
    'nav.venue': 'Venue',
    'nav.wishes': 'Wishes',

    // Wax seal intro
    'intro.title': 'Wedding Invitation',
    'intro.names': 'Bekzod Murotboyev & Parvina Qosimova',
    'intro.seal': 'B & P',
    'intro.button': 'Open Invitation',
    'intro.hint': 'We would be honored by your gracious presence',

    // Hero
    'hero.badge': 'In the Name of God',
    'hero.subheading': 'The sacred union of two loving souls',
    'hero.city_badge': 'WEDDING CELEBRATION • BUKHARA',
    'hero.names_sub': 'MUROTBOYEV • QOSIMOVA',
    'hero.blessing_quote': 'May the sacred union of two loving souls, blessed by the Almighty, be filled with everlasting peace and love.',
    'hero.invitation_dear': 'Dearly Respected & Beloved Guests!',
    'hero.invitation_text': 'We joyfully invite you to celebrate our love and wedding banquet as we begin our new life together. Your presence and heartfelt blessings will be our greatest honor.',
    'hero.family_hosts': 'Saidov & Khidirov Families',
    'hero.family_hosts_desc': 'The Saidov and Khidirov families cordially welcome all esteemed guests',
    'hero.date': 'JANUARY 10, 2027',
    'hero.day_time': 'Sunday • 6:00 PM',
    'hero.countdown_title': 'Countdown to the Celebration',
    'hero.days': 'Days',
    'hero.hours': 'Hours',
    'hero.minutes': 'Minutes',
    'hero.seconds': 'Seconds',
    'hero.addToCalendar': 'Add to Calendar',
    'hero.calendarGoogle': 'Google Calendar',
    'hero.calendarIcs': 'Apple / Outlook (.ics)',
    'hero.viewVenue': 'View Venue Location',
    'hero.audio_playing': 'Rustam Fayziyev — Dunyadan Uzak',
    'hero.audio_live': 'LIVE',

    // Venue
    'venue.title': 'Celebration Palace & Location',
    'venue.subtitle': 'We await your gracious arrival at the grand "Havas Premium" ballroom',
    'venue.gps': 'GPS: 39.7408, 64.4333',
    'venue.badge': 'GRAND BALLROOM | Free Guest Parking',
    'venue.disclaimer': 'Grand Palace "Havas Premium" (Bukhara, 333 Alpomish Street - Coordinates: 39.740825, 64.433365). Starts at 18:00 sharp. Welcome!',
    'venue.btnYandexGo': 'Call with Yandex Go',
    'venue.btnYandexMaps': 'Yandex Maps',
    'venue.btnGoogle': 'Google Maps',
    'venue.copyAddress': 'Copy Address',
    'venue.addressCopied': 'Address copied to clipboard!',
    'venue.transport': 'Parking & transportation:',
    'venue.adminTitle': 'Havas Premium Administration',
    'venue.adminDesc': 'For questions regarding directions, contact the wedding coordinators',
    'venue.callAdmin': '+998 (93) 687-08-50',

    // Wishes
    'wishes.badge': '10.01.2027 • BUKHARA',
    'wishes.title': 'Wishes & Blessings Guestbook',
    'wishes.subtitle': 'Bless Bekzod and Parvina with your most heartfelt words',
    'wishes.boxTitle': 'Send a Blessing',
    'wishes.boxBadge': 'GUESTBOOK',
    'wishes.namePlaceholder': 'Your Name (e.g. Dilshod & Madina)',
    'wishes.relation': 'Guest relation:',
    'wishes.relGroom': 'Groom\'s side',
    'wishes.relBride': 'Bride\'s side',
    'wishes.relFriends': 'Dear Friends',
    'wishes.relRelatives': 'Relatives',
    'wishes.relColleagues': 'Colleagues',
    'wishes.messageLabel': 'Your warm wishes:',
    'wishes.messagePlaceholder': 'Write your heartfelt congratulations...',
    'wishes.virtualGift': 'Virtual gift / Celebration badge:',
    'wishes.sendButton': 'Send Blessing',
    'wishes.empty': 'No wishes yet. Be the first to congratulate the newlyweds!',
    'wishes.justNow': 'Today, just now',
    'wishes.voiceTeaser': 'Voice note greeting (30 sec audio greeting)',
    'wishes.wallTitle': 'Guestbook Messages',
    'wishes.wallBadge': 'Blessings',

    // Footer
    'footer.thankYou': 'Your presence is our greatest joy and honor!',
    'footer.familyHonor': 'With respect from Saidov & Khidirov families:',
    'footer.quote': '«May the dawn of our love be radiant with your joyous smiles»',
    'footer.copyright': 'Bekzod Murotboyev & Parvina Qosimova | 2027',
  },
};

export const INITIAL_WISHES: Wish[] = [
  {
    id: 'wish-1',
    name: 'Sardor & Nilufar',
    initials: 'S&N',
    relationship: 'Qadrdon do\'stlar',
    message: 'Ikki yosh baxtli bo\'lsin! Qalbingizdagi sevgi va o\'zaro hurmat hech qachon so\'nmasin. Har bir kuningiz to\'ydagidek shodlik va shukronalik bilan to\'lsin!',
    date: 'Bugun, 18:42',
    hearts: 34,
  },
  {
    id: 'wish-2',
    name: 'Семья Каримовых',
    initials: 'CK',
    relationship: 'Qarindoshlar',
    message: 'Совет да любовь! Пусть каждый день совместной жизни будет наполнен нежностью, гармонией и улыбками. Крепкого вам семейного очага и безграничного счастья!',
    date: 'Bugun, 16:15',
    hearts: 28,
  },
  {
    id: 'wish-3',
    name: 'Alex & Family',
    initials: 'AF',
    relationship: 'Hamkasblar',
    message: 'Wishing you both a lifetime of endless joy, radiant love, and harmonious companionship! Congratulations on building such a beautiful family together.',
    date: 'Bugun, 14:02',
    hearts: 45,
  },
  {
    id: 'wish-4',
    name: 'Akmal aka',
    initials: 'AA',
    relationship: 'Kuyov tomoni',
    message: 'To\'ylar muborak! Ostonangizdan qut-baraka va fayz arimasin! Bekzodbek va Parvinaning xonadoni hamisha yaxshi kunlar, go\'zal to\'ylar bilan to\'lsin!',
    date: 'Kecha, 21:40',
    hearts: 53,
  },
];

// Google Calendar URL generator helper
export const getGoogleCalendarUrl = (): string => {
  const startTime = '20270110T130000Z'; // 18:00 Tashkent/Bukhara (UTC+5) is 13:00 UTC
  const endTime = '20270110T180000Z';
  const title = encodeURIComponent("Bekzod & Parvina — Nikoh To'yi");
  const details = encodeURIComponent(
    `Saidovlar va Xidirovlar xonadonlari sizni Bekzod Murotboyev va Parvina Qosimovalarning nikoh to'yiga lutfan taklif etadi.\nTo'yxona: "Havas Premium" Tantanalari Saroyi (Buxoro shahri, Alpomish ko'chasi, 333-uy).\nGPS: 39.740825, 64.433365`
  );
  const location = encodeURIComponent('"Havas Premium" Tantanalari Saroyi, Buxoro shahri, Alpomish ko\'chasi, 333-uy');
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startTime}/${endTime}&details=${details}&location=${location}`;
};

// Download .ics file helper
export const downloadIcsFile = (): void => {
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
    'SUMMARY:Bekzod & Parvina — Nikoh To\'yi',
    'DESCRIPTION:Saidovlar va Xidirovlar xonadonlari sizni Bekzod Murotboyev va Parvina Qosimovalarning nikoh to\'yiga lutfan taklif etadi.\\nManzil: "Havas Premium" Tantanalari Saroyi (Buxoro, Alpomish 333). GPS: 39.740825, 64.433365',
    'LOCATION:"Havas Premium" Tantanalari Saroyi\\, Buxoro\\, Alpomish 333',
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'bekzod-parvina-wedding.ics';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
};
