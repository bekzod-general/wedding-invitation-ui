export type Language = 'uz' | 'ru' | 'en';

export interface ScheduleEvent {
  time: string;
  badgeKey: string;
  titleKey: string;
  descriptionKey: string;
  iconName: 'camera' | 'heart' | 'sparkles' | 'music' | 'cake';
  imageUrl?: string;
}

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
    organizerTelegram: 'https://t.me/wedding_organizer',
  },
  audioUrl: 'https://cdn.pixabay.com/download/audio/2022/05/16/audio_c97693cf63.mp3?filename=romantic-piano-wedding-love-112191.mp3',
  schedule: [
    {
      time: '18:00',
      badgeKey: 'schedule.badge.welcome',
      titleKey: 'schedule.photoshoot.title',
      descriptionKey: 'schedule.photoshoot.desc',
      iconName: 'camera',
      imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
    },
    {
      time: '19:00',
      badgeKey: 'schedule.badge.banquet',
      titleKey: 'schedule.banquet.title',
      descriptionKey: 'schedule.banquet.desc',
      iconName: 'sparkles',
    },
    {
      time: '20:30',
      badgeKey: 'schedule.badge.dance',
      titleKey: 'schedule.waltz.title',
      descriptionKey: 'schedule.waltz.desc',
      iconName: 'music',
      imageUrl: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
    },
    {
      time: '22:00',
      badgeKey: 'schedule.badge.finale',
      titleKey: 'schedule.cake.title',
      descriptionKey: 'schedule.cake.desc',
      iconName: 'cake',
    },
  ] as ScheduleEvent[],
};

export const TRANSLATIONS: Record<Language, Record<string, string>> = {
  uz: {
    // Nav
    'nav.invitation': 'Taklifnoma',
    'nav.schedule': 'Dastur',
    'nav.venue': 'Manzil',
    'nav.rsvp': 'RSVP',
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
    'hero.blessing_quote': '«Push союз двух сердец, благословенный Всевышним, будет полон мира, изобилия и вечной любви»',
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
    'hero.audio_playing': 'Yulduz Usmonova — Romantic Wedding',
    'hero.audio_live': 'LIVE',

    // Schedule
    'schedule.badge': 'TANTANALAR DASTURI',
    'schedule.title': 'To\'y Tartibi va Vaqtlari',
    'schedule.steps': '4 BOSQICH',
    'schedule.subtitle': 'Har bir daqiqasi unutilmas xotiralarga boy tantanamiz jadvali',
    'schedule.badge.welcome': 'KUTIB OLISH',
    'schedule.photoshoot.title': 'Kelin-Kuyov Tashrifi va Fotosessiya',
    'schedule.photoshoot.desc': 'Mehmonlarni kutib olish, jonli simfonik kuy sadolari va qizil gilam fotosessiyasi.',
    'schedule.badge.banquet': 'ZIYOFAT',
    'schedule.banquet.title': 'Tantanali Nikoh va Oqshom Ochilishi',
    'schedule.banquet.desc': 'Nafis to\'yxona dasturxoni, shohona milliy va yevropa taomlari taqdimoti hamda bayramona konsert.',
    'schedule.badge.dance': 'SEHRLI LAHZA',
    'schedule.waltz.title': 'Kuyov va Kelinning Ilk Raqsi',
    'schedule.waltz.desc': 'Yengil oq tutun va yulduzlar yog\'dusi ostida yoshlarning ilk sehrli valsi.',
    'schedule.badge.finale': 'XOTIMA',
    'schedule.cake.title': 'To\'y Torti va Mushakbozlik',
    'schedule.cake.desc': 'Ko\'p qavatli tantanali shirinlik kesish odati hamda tungi osmonda feyyerverk mushaklari.',

    // Dress Code
    'dresscode.title': 'Kiyinish Madaniyati (Dress Code)',
    'dresscode.subtitle': 'Black Tie & Elegant Evening Attire',
    'dresscode.desc': 'Oqshom liboslari va nafis ranglar. Mehmonlarimizdan to\'y muhitiga mos keluvchi tantanali liboslarda tashrif buyurishlarini iltimos qilamiz.',
    'dresscode.colorsTitle': 'Tavsiya etilgan ranglar palitrasi:',
    'dresscode.cChampagne': 'Shampan',
    'dresscode.cSage': 'Sage Yashil',
    'dresscode.cGold': 'Zarhal Oltin',
    'dresscode.cWine': 'To\'q May Rang',

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

    // RSVP
    'rsvp.headerBadge': 'RSVP ANKETA',
    'rsvp.title': 'Tashrifni Tasdiqlash',
    'rsvp.subtitle': 'Saidovlar va Xidirovlar xonadonlari barcha aziz mehmonlarni orziqib kutadi',
    'rsvp.name': 'Ism va familiyangiz *',
    'rsvp.namePlaceholder': 'Masalan: Sardor Aliyev',
    'rsvp.phone': 'Telefon raqamingiz *',
    'rsvp.phonePlaceholder': '+998 90 123-45-67',
    'rsvp.guestsCount': 'Mehmonlar soni:',
    'rsvp.person': 'Kishi',
    'rsvp.attendance': 'Tashrif holati:',
    'rsvp.attendingYes': '✓ Jon deb qatnashaman! (Ha)',
    'rsvp.attendingNo': '✗ Afsuski, qatnasha olmayman (Sababli)',
    'rsvp.diet': 'Ta\'m va menyudagi afzalliklar:',
    'rsvp.dietNational': 'Milliy taomlar',
    'rsvp.dietHalal': 'Halol go\'sht',
    'rsvp.dietVeg': 'Vegetarian',
    'rsvp.dietKids': 'Bolalar menyusi',
    'rsvp.songRequest': 'DJ uchun maxsus taronangiz:',
    'rsvp.songPlaceholder': 'Masalan: Yulduz Usmonova - Muhabbat...',
    'rsvp.notes': 'Kelinchak va kuyovga iliq tilaklar:',
    'rsvp.notesPlaceholder': 'Oq yo\'l va cheksiz baxt tilaymiz...',
    'rsvp.submit': 'Tashrifni Tasdiqlash',
    'rsvp.submitting': 'Tasdiqlanmoqda...',
    'rsvp.successTitle': 'Katta Rahmat!',
    'rsvp.successDesc': 'Sizning javobingiz qabul qilindi. Sizni to\'yimizda ko\'rishdan benihoyat mamnunmiz!',
    'rsvp.hotlineTitle': 'To\'y tashkilotchilari bog\'lanishi bilan:',
    'rsvp.hotlineDesc': 'Saidovlar va Xidirovlar xonadonlari mas\'ullari',
    'rsvp.callBtn': 'Qo\'ng\'iroq',
    'rsvp.telegramBtn': 'Telegram',

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
    'nav.schedule': 'Программа',
    'nav.venue': 'Локация',
    'nav.rsvp': 'RSVP',
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
    'hero.audio_playing': 'Юлдуз Усманова — Романтический Вальс',
    'hero.audio_live': 'LIVE',

    // Schedule
    'schedule.badge': 'ПРОГРАММА ТОРЖЕСТВА',
    'schedule.title': 'Тайминг и Программа Вечера',
    'schedule.steps': '4 ЭТАПА',
    'schedule.subtitle': 'Каждое мгновение станет прекрасным и незабываемым воспоминанием',
    'schedule.badge.welcome': 'ВСТРЕЧА ГОСТЕЙ',
    'schedule.photoshoot.title': 'Встреча Гостей и Фотосессия',
    'schedule.photoshoot.desc': 'Красная дорожка, живое звучание скрипки, приветственные напитки и памятные фотографии с молодожёнами.',
    'schedule.badge.banquet': 'БАНКЕТ',
    'schedule.banquet.title': 'Торжественное Открытие Банкета',
    'schedule.banquet.desc': 'Изысканные национальные и европейские блюда, тёплые тосты и праздничная концертная программа.',
    'schedule.badge.dance': 'ПЕРВЫЙ ТАНЕЦ',
    'schedule.waltz.title': 'Первый Танец Молодёжи',
    'schedule.waltz.desc': 'Трогательный вальс молодожёнов в облаках лёгкого дыма и сиянии звёзд.',
    'schedule.badge.finale': 'КУЛЬМИНАЦИЯ',
    'schedule.cake.title': 'Свадебный Торт и Салют',
    'schedule.cake.desc': 'Разрезание многоярусного торта, сладкие пожелания и грандиозный праздничный фейерверк.',

    // Dress Code
    'dresscode.title': 'Дресс-код (Dress Code)',
    'dresscode.subtitle': 'Black Tie & Элегантный вечерний стиль',
    'dresscode.desc': 'Элегантные вечерние наряды. Просим дам воздержаться от белых оттенков, оставив это право за невестой.',
    'dresscode.colorsTitle': 'Рекомендуемая цветовая гамма:',
    'dresscode.cChampagne': 'Шампань',
    'dresscode.cSage': 'Шалфей (Sage)',
    'dresscode.cGold': 'Золото',
    'dresscode.cWine': 'Глубокий винный',

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

    // RSVP
    'rsvp.headerBadge': 'RSVP АНКЕТА',
    'rsvp.title': 'Подтверждение Присутствия',
    'rsvp.subtitle': 'Семьи Саидовых и Хидировых с радостью ждут всех гостей',
    'rsvp.name': 'Ваше имя и фамилия *',
    'rsvp.namePlaceholder': 'Например: Сардор Алиев',
    'rsvp.phone': 'Номер телефона *',
    'rsvp.phonePlaceholder': '+998 90 123-45-67',
    'rsvp.guestsCount': 'Количество гостей:',
    'rsvp.person': 'Человек',
    'rsvp.attendance': 'Ваше присутствие:',
    'rsvp.attendingYes': '✓ С радостью приду! (Да)',
    'rsvp.attendingNo': '✗ К сожалению, не смогу (По причине)',
    'rsvp.diet': 'Предпочтения по меню:',
    'rsvp.dietNational': 'Национальные блюда',
    'rsvp.dietHalal': 'Халяльное мясо',
    'rsvp.dietVeg': 'Вегетарианское',
    'rsvp.dietKids': 'Детское меню',
    'rsvp.songRequest': 'Любимая песня для диджея:',
    'rsvp.songPlaceholder': 'Например: Юлдуз Усманова — Любовь...',
    'rsvp.notes': 'Тёплые пожелания молодожёнам:',
    'rsvp.notesPlaceholder': 'Счастливого пути и безграничной любви...',
    'rsvp.submit': 'Подтвердить Присутствие',
    'rsvp.submitting': 'Отправка...',
    'rsvp.successTitle': 'Большое Спасибо!',
    'rsvp.successDesc': 'Ваш ответ успешно сохранён. Будем рады видеть вас на торжестве!',
    'rsvp.hotlineTitle': 'Связь с организаторами торжества:',
    'rsvp.hotlineDesc': 'Представители семей Саидовых и Хидировых',
    'rsvp.callBtn': 'Позвонить',
    'rsvp.telegramBtn': 'Telegram',

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
    'nav.schedule': 'Itinerary',
    'nav.venue': 'Venue',
    'nav.rsvp': 'RSVP',
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
    'hero.audio_playing': 'Yulduz Usmanova — Romantic Melody',
    'hero.audio_live': 'LIVE',

    // Schedule
    'schedule.badge': 'CELEBRATION ITINERARY',
    'schedule.title': 'Wedding Day Itinerary',
    'schedule.steps': '4 STAGES',
    'schedule.subtitle': 'Turning every precious moment into an unforgettable memory',
    'schedule.badge.welcome': 'WELCOME',
    'schedule.photoshoot.title': 'Guest Welcome & Photo Session',
    'schedule.photoshoot.desc': 'Red carpet welcome, live violin ensemble, champagne reception, and portraits with the newlyweds.',
    'schedule.badge.banquet': 'BANQUET',
    'schedule.banquet.title': 'Grand Wedding Banquet Opening',
    'schedule.banquet.desc': 'Gourmet banquet dinner, heartfelt toasts, and celebratory musical concert.',
    'schedule.badge.dance': 'FIRST DANCE',
    'schedule.waltz.title': 'First Dance of the Newlyweds',
    'schedule.waltz.desc': 'Romantic waltz of the newlyweds amidst gentle mist and starlight.',
    'schedule.badge.finale': 'FINALE',
    'schedule.cake.title': 'Wedding Cake & Fireworks Show',
    'schedule.cake.desc': 'Grand cake cutting ceremony followed by a spectacular fireworks display.',

    // Dress Code
    'dresscode.title': 'Dress Code',
    'dresscode.subtitle': 'Black Tie & Elegant Evening Attire',
    'dresscode.desc': 'Formal evening attire in refined pastels or classic dark tones. We kindly request ladies to avoid white gowns to preserve the uniqueness of the bride.',
    'dresscode.colorsTitle': 'Recommended color palette:',
    'dresscode.cChampagne': 'Champagne',
    'dresscode.cSage': 'Sage Green',
    'dresscode.cGold': 'Gold Foil',
    'dresscode.cWine': 'Deep Wine',

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

    // RSVP
    'rsvp.headerBadge': 'RSVP FORM',
    'rsvp.title': 'Confirm Your Attendance',
    'rsvp.subtitle': 'The Saidov and Khidirov families cordially welcome you',
    'rsvp.name': 'Your Full Name *',
    'rsvp.namePlaceholder': 'e.g. Sardor Aliyev',
    'rsvp.phone': 'Phone Number *',
    'rsvp.phonePlaceholder': '+998 90 123-45-67',
    'rsvp.guestsCount': 'Number of guests:',
    'rsvp.person': 'Guest(s)',
    'rsvp.attendance': 'Will you attend:',
    'rsvp.attendingYes': '✓ Joyfully Attending! (Yes)',
    'rsvp.attendingNo': '✗ Regretfully Declining',
    'rsvp.diet': 'Meal / dietary preferences:',
    'rsvp.dietNational': 'Traditional Cuisine',
    'rsvp.dietHalal': 'Halal Meat',
    'rsvp.dietVeg': 'Vegetarian',
    'rsvp.dietKids': 'Kids Menu',
    'rsvp.songRequest': 'Favorite song for the DJ:',
    'rsvp.songPlaceholder': 'e.g. Yulduz Usmanova — Romantic...',
    'rsvp.notes': 'Warm wishes for the newlyweds:',
    'rsvp.notesPlaceholder': 'Wishing you eternal joy and devotion...',
    'rsvp.submit': 'Confirm Attendance',
    'rsvp.submitting': 'Confirming...',
    'rsvp.successTitle': 'Thank You So Much!',
    'rsvp.successDesc': 'Your response has been confirmed. We look forward to celebrating together!',
    'rsvp.hotlineTitle': 'Questions? Contact the wedding organizers:',
    'rsvp.hotlineDesc': 'Representatives of Saidov and Khidirov families',
    'rsvp.callBtn': 'Call Organizer',
    'rsvp.telegramBtn': 'Telegram',

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
