import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Туркменский
const tm = {
  translation: {
    // Навигация
    nav: {
      home: 'Baş sahypa',
      about: 'Biz barada',
      products: 'Önümler',
      catalog: 'Katalog',
      contacts: 'Habarlaşmak',
      cooperation: 'Hyzmatdaşlyk',
      instructions: 'Görkezme',
      calculator: 'Hasaplaýjy',
      portfolio: 'Portfolio',
      reviews: 'Pikirler',
      admin: 'Admin'
    },
    // Hero секция
    hero: {
      title: 'ZOK Bezeg Materiallary',
      subtitle: 'Öýüňizi bezäň - ýokary hilli bezeg materiallary',
      cta: 'Önümleri görmek',
      catalog: 'Katalogy göçürip almak'
    },
    // О компании
    about: {
      title: 'Biz barada',
      description: 'Biz öýüňiz üçin ýokary hilli bezeg materiallaryny öndürmekde we satmakda ýöriteleşýäris. Biziň önümlerimiz - bu innowasiýalaryň, hiliň we stiliň utgaşmasy.',
      manufacturer: 'Öndüriji: «Ýigitler Mekany» hususy kärhanasy, Aşgabat şahamçasy.',
      address: 'Aşgabat şäheri, Berkararlyk etraby, 1958 (Nurmuhammet Andalyp) köçesi, 334'
    },
    // Категории
    categories: {
      title: 'Kategoriýalar',
      emulsions: 'Emulsiýalar',
      travertine: 'Trawertinler',
      ottocento: 'Attohento',
      lacquers: 'Laklar',
      putties: 'Bezeg şpaklyowkalary',
      viewAll: 'Ählisini görmek'
    },
    // Продукты
    products: {
      title: 'Önümler',
      price: 'Bahasy',
      inStock: 'Bar',
      outOfStock: 'Ýok',
      addToCart: 'Sebede goş',
      order: 'Sargyt etmek',
      details: 'Jikme-jiklikler',
      color: 'Reňk',
      volume: 'Göwrüm'
    },
    // Каталог
    catalog: {
      title: 'Katalog',
      download: 'PDF göçürip almak',
      view: 'Onlaýn görmek',
      description: 'Biziň ähli önümlerimiz hakda jikme-jik maglumat'
    },
    // Инструкции
    instructions: {
      title: 'Çalyşmak boýunça görkezme',
      step1: 'Taýýarlyk',
      step1Desc: 'Diwar ýüzüni arassalaň we tekizläň',
      step1Detail1: 'Diwar ýüzüni tozan we hapa-haşaldan arassalaň',
      step1Detail2: 'Gerek bolsa köne örtügi aýyryň',
      step1Detail3: 'Şpaklýowka bilen näsazlyklary düzediň',
      step1Detail4: 'Diwar ýüzüniň doly guramagyna garaşyň',
      step2: 'Gruntlamak',
      step2Desc: 'Gruntowka çalyň we guratmaga goýuň',
      step2Detail1: 'Gruntowkany deň gatlak bilen çalyň',
      step2Detail2: 'Uly ýerler üçin walik ulanyň',
      step2Detail3: 'Gruntowkanyň 4-6 sagat guramagyna garaşyň',
      step2Detail4: 'Gerek bolsa ikinji gatlagy çalyň',
      step3: 'Çalmak',
      step3Desc: 'Bezeg materialyny deň gatlak bilen çalyň',
      step3Detail1: 'Bezeg materialyny garyşdyryň',
      step3Detail2: 'Deň hereketler bilen çalyň',
      step3Detail3: 'Kiçi bölekler bilen işläň',
      step3Detail4: 'Gerekli teksturany dörediň',
      step4: 'Gutarnykly etap',
      step4Desc: 'Lak ýa-da gorag örtügini çalyň',
      step4Detail1: 'Örtügiň doly guramagyna garaşyň',
      step4Detail2: 'Gerek bolsa gorag lakyny çalyň',
      step4Detail3: 'Örtügiň tekizligini barlaň',
      step4Detail4: 'Netijeden lezzet alyň!',
      subtitle: 'ZOK bezeg materiallaryny çalmak boýunça ädimme-ädim gollanma',
      videoTitle: 'Wideo-görkezmeler',
      videoComingSoon: 'Tiz wagtdan bu ýerde öwrediji wideolar peýda bolar',
      tipsTitle: 'Peýdaly maslahatlar',
      tipTempTitle: 'Temperatura',
      tipTempDesc: '+10°C we +30°C aralygynda işläň',
      tipHumTitle: 'Çyglylyk',
      tipHumDesc: 'Howanyň optimal çyglylygy 40-70%',
      tipDryTitle: 'Gurama wagty',
      tipDryDesc: 'Doly guramak 24-48 sagat dowam edýär',
      tipToolTitle: 'Guralar',
      tipToolDesc: 'Ýokary hilli walik we çotgalary ulanyň'
    },
    // Форма сотрудничества
    cooperation: {
      title: 'Hyzmatdaşlyk',
      name: 'Adyňyz',
      phone: 'Telefon belgisi',
      partnerType: 'Hyzmatdaşyň görnüşi',
      shop: 'Dükan',
      master: 'Ussahana',
      designer: 'Dizaýner',
      submit: 'Ibermek',
      success: 'Arzaňyz kabul edildi!',
      error: 'Näsazlyk ýüze çykdy'
    },
    // Форма заказа
    order: {
      title: 'Sargyt bermek',
      name: 'Adyňyz',
      phone: 'Telefon belgisi',
      email: 'E-poçta',
      address: 'Salgy',
      quantity: 'Mukdary',
      notes: 'Bellikler',
      submit: 'Sargyt etmek',
      success: 'Sargytyňyz kabul edildi!',
      error: 'Näsazlyk ýüze çykdy',
      total: 'Jemi'
    },
    // Футер
    footer: {
      company: 'Kompaniýa barada',
      categories: 'Kategoriýalar',
      contacts: 'Habarlaşmak',
      social: 'Sosial torlar',
      workHours: 'Iş wagty',
      weekdays: 'Duş-Anna: 9:00 - 20:00',
      weekends: 'Şen-Ýekş: 10:00 - 18:00',
      rights: '© 2024 ZOK Bezeg materiallary. Ähli hukuklar goragly.'
    },
    // Общие
    common: {
      loading: 'Ýüklenýär...',
      error: 'Näsazlyk ýüze çykdy',
      search: 'Gözleg',
      filter: 'Süzmek',
      all: 'Ählisi',
      save: 'Ýatda sakla',
      cancel: 'Ýatyrmak',
      close: 'Ýapmak',
      back: 'Yza',
      next: 'Indiki',
      previous: 'Öňki'
    }
  }
};

// Русский
const ru = {
  translation: {
    // Навигация
    nav: {
      home: 'Главная',
      about: 'О нас',
      products: 'Продукция',
      catalog: 'Каталог',
      contacts: 'Контакты',
      cooperation: 'Сотрудничество',
      instructions: 'Инструкция',
      calculator: 'Калькулятор',
      portfolio: 'Портфолио',
      reviews: 'Отзывы',
      admin: 'Админ'
    },
    // Hero секция
    hero: {
      title: 'ZOK Декоративные материалы',
      subtitle: 'Украсьте свой дом - высококачественные декоративные материалы',
      cta: 'Смотреть продукцию',
      catalog: 'Скачать каталог'
    },
    // О компании
    about: {
      title: 'О нас',
      description: 'Мы специализируемся на производстве и продаже высококачественных декоративных материалов для вашего дома. Наша продукция - это сочетание инноваций, качества и стиля.',
      manufacturer: 'Производитель: «Йигитлер меканы» частное предприятие, Ашхабадский филиал.',
      address: 'город Ашхабад, Беркарарлыкский район, улица 1958 (Нурмухаммет Андалип), 334'
    },
    // Категории
    categories: {
      title: 'Категории',
      emulsions: 'Эмульсии',
      travertine: 'Травертины',
      ottocento: 'Аттохенто',
      lacquers: 'Лаки',
      putties: 'Декоративные шпаклевки',
      viewAll: 'Смотреть все'
    },
    // Продукты
    products: {
      title: 'Продукция',
      price: 'Цена',
      inStock: 'В наличии',
      outOfStock: 'Нет в наличии',
      addToCart: 'В корзину',
      order: 'Заказать',
      details: 'Подробнее',
      color: 'Цвет',
      volume: 'Объем'
    },
    // Каталог
    catalog: {
      title: 'Каталог',
      download: 'Скачать PDF',
      view: 'Смотреть онлайн',
      description: 'Подробная информация о всей нашей продукции'
    },
    // Инструкции
    instructions: {
      title: 'Инструкция по нанесению',
      step1: 'Подготовка',
      step1Desc: 'Очистите и выровняйте поверхность стены',
      step1Detail1: 'Очистите поверхность от пыли и грязи',
      step1Detail2: 'Удалите старое покрытие при необходимости',
      step1Detail3: 'Выровняйте неровности шпаклевкой',
      step1Detail4: 'Дайте поверхности полностью высохнуть',
      step2: 'Грунтовка',
      step2Desc: 'Нанесите грунтовку и дайте высохнуть',
      step2Detail1: 'Нанесите грунтовку равномерным слоем',
      step2Detail2: 'Используйте валик для больших поверхностей',
      step2Detail3: 'Дайте грунтовке высохнуть 4-6 часов',
      step2Detail4: 'При необходимости нанесите второй слой',
      step3: 'Нанесение',
      step3Desc: 'Нанесите декоративный материал ровным слоем',
      step3Detail1: 'Размешайте декоративный материал',
      step3Detail2: 'Наносите равномерными движениями',
      step3Detail3: 'Работайте небольшими участками',
      step3Detail4: 'Создавайте нужную текстуру',
      step4: 'Финишный этап',
      step4Desc: 'Нанесите лак или защитное покрытие',
      step4Detail1: 'Дайте покрытию полностью высохнуть',
      step4Detail2: 'Нанесите защитный лак при необходимости',
      step4Detail3: 'Проверьте равномерность покрытия',
      step4Detail4: 'Наслаждайтесь результатом!',
      subtitle: 'Пошаговое руководство по нанесению декоративных материалов ZOK',
      videoTitle: 'Видео-инструкции',
      videoComingSoon: 'Скоро здесь появятся обучающие видео',
      tipsTitle: 'Полезные советы',
      tipTempTitle: 'Температура',
      tipTempDesc: 'Работайте при температуре от +10°C до +30°C',
      tipHumTitle: 'Влажность',
      tipHumDesc: 'Оптимальная влажность воздуха 40-70%',
      tipDryTitle: 'Время высыхания',
      tipDryDesc: 'Полное высыхание занимает 24-48 часов',
      tipToolTitle: 'Инструменты',
      tipToolDesc: 'Используйте качественные валики и кисти'
    },
    // Форма сотрудничества
    cooperation: {
      title: 'Сотрудничество',
      name: 'Ваше имя',
      phone: 'Номер телефона',
      partnerType: 'Тип партнера',
      shop: 'Магазин',
      master: 'Мастер',
      designer: 'Дизайнер',
      submit: 'Отправить',
      success: 'Ваша заявка принята!',
      error: 'Произошла ошибка'
    },
    // Форма заказа
    order: {
      title: 'Оформить заказ',
      name: 'Ваше имя',
      phone: 'Номер телефона',
      email: 'E-mail',
      address: 'Адрес доставки',
      quantity: 'Количество',
      notes: 'Примечания',
      submit: 'Заказать',
      success: 'Ваш заказ принят!',
      error: 'Произошла ошибка',
      total: 'Итого'
    },
    // Футер
    footer: {
      company: 'О компании',
      categories: 'Категории',
      contacts: 'Контакты',
      social: 'Соцсети',
      workHours: 'Режим работы',
      weekdays: 'Пн-Пт: 9:00 - 20:00',
      weekends: 'Сб-Вс: 10:00 - 18:00',
      rights: '© 2024 ZOK Декоративные материалы. Все права защищены.'
    },
    // Общие
    common: {
      loading: 'Загрузка...',
      error: 'Произошла ошибка',
      search: 'Поиск',
      filter: 'Фильтр',
      all: 'Все',
      save: 'Сохранить',
      cancel: 'Отмена',
      close: 'Закрыть',
      back: 'Назад',
      next: 'Далее',
      previous: 'Предыдущий'
    }
  }
};

// English
const en = {
  translation: {
    // Навигация
    nav: {
      home: 'Home',
      about: 'About Us',
      products: 'Products',
      catalog: 'Catalog',
      contacts: 'Contacts',
      cooperation: 'Cooperation',
      instructions: 'Instructions',
      calculator: 'Calculator',
      portfolio: 'Portfolio',
      reviews: 'Reviews',
      admin: 'Admin'
    },
    // Hero секция
    hero: {
      title: 'ZOK Decorative Materials',
      subtitle: 'Decorate your home - high-quality decorative materials',
      cta: 'View Products',
      catalog: 'Download Catalog'
    },
    // О компании
    about: {
      title: 'About Us',
      description: 'We specialize in the production and sale of high-quality decorative materials for your home. Our products are a combination of innovation, quality and style.',
      manufacturer: 'Manufacturer: «Yigitler Mekany» private enterprise, Ashgabat branch.',
      address: 'Ashgabat city, Berkararlyk district, street 1958 (Nurmuhammet Andalip), 334'
    },
    // Категории
    categories: {
      title: 'Categories',
      emulsions: 'Emulsions',
      travertine: 'Travertines',
      ottocento: 'Ottocento',
      lacquers: 'Lacquers',
      putties: 'Decorative Putties',
      viewAll: 'View All'
    },
    // Продукты
    products: {
      title: 'Products',
      price: 'Price',
      inStock: 'In Stock',
      outOfStock: 'Out of Stock',
      addToCart: 'Add to Cart',
      order: 'Order',
      details: 'Details',
      color: 'Color',
      volume: 'Volume'
    },
    // Каталог
    catalog: {
      title: 'Catalog',
      download: 'Download PDF',
      view: 'View Online',
      description: 'Detailed information about all our products'
    },
    // Инструкции
    instructions: {
      title: 'Application Instructions',
      step1: 'Preparation',
      step1Desc: 'Clean and level the wall surface',
      step1Detail1: 'Clean the surface from dust and dirt',
      step1Detail2: 'Remove old coating if necessary',
      step1Detail3: 'Level unevenness with putty',
      step1Detail4: 'Let the surface dry completely',
      step2: 'Priming',
      step2Desc: 'Apply primer and let it dry',
      step2Detail1: 'Apply primer in an even layer',
      step2Detail2: 'Use a roller for large surfaces',
      step2Detail3: 'Let the primer dry for 4-6 hours',
      step2Detail4: 'Apply a second coat if necessary',
      step3: 'Application',
      step3Desc: 'Apply decorative material in an even layer',
      step3Detail1: 'Stir the decorative material',
      step3Detail2: 'Apply with steady movements',
      step3Detail3: 'Work in small sections',
      step3Detail4: 'Create the desired texture',
      step4: 'Final Stage',
      step4Desc: 'Apply lacquer or protective coating',
      step4Detail1: 'Let the coating dry completely',
      step4Detail2: 'Apply protective lacquer if necessary',
      step4Detail3: 'Check the uniformity of the coating',
      step4Detail4: 'Enjoy the result!',
      subtitle: 'Step-by-step guide for applying ZOK decorative materials',
      videoTitle: 'Video Instructions',
      videoComingSoon: 'Educational videos will appear here soon',
      tipsTitle: 'Useful Tips',
      tipTempTitle: 'Temperature',
      tipTempDesc: 'Work at temperatures between +10°C and +30°C',
      tipHumTitle: 'Humidity',
      tipHumDesc: 'Optimal air humidity 40-70%',
      tipDryTitle: 'Drying Time',
      tipDryDesc: 'Full drying takes 24-48 hours',
      tipToolTitle: 'Tools',
      tipToolDesc: 'Use high-quality rollers and brushes'
    },
    // Форма сотрудничества
    cooperation: {
      title: 'Cooperation',
      name: 'Your Name',
      phone: 'Phone Number',
      partnerType: 'Partner Type',
      shop: 'Store',
      master: 'Master',
      designer: 'Designer',
      submit: 'Submit',
      success: 'Your application has been accepted!',
      error: 'An error occurred'
    },
    // Форма заказа
    order: {
      title: 'Place Order',
      name: 'Your Name',
      phone: 'Phone Number',
      email: 'E-mail',
      address: 'Delivery Address',
      quantity: 'Quantity',
      notes: 'Notes',
      submit: 'Order',
      success: 'Your order has been accepted!',
      error: 'An error occurred',
      total: 'Total'
    },
    // Футер
    footer: {
      company: 'About Company',
      categories: 'Categories',
      contacts: 'Contacts',
      social: 'Social Media',
      workHours: 'Working Hours',
      weekdays: 'Mon-Fri: 9:00 - 20:00',
      weekends: 'Sat-Sun: 10:00 - 18:00',
      rights: '© 2024 ZOK Decorative materials. All rights reserved.'
    },
    // Общие
    common: {
      loading: 'Loading...',
      error: 'An error occurred',
      search: 'Search',
      filter: 'Filter',
      all: 'All',
      save: 'Save',
      cancel: 'Cancel',
      close: 'Close',
      back: 'Back',
      next: 'Next',
      previous: 'Previous'
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      tm: tm,
      ru: ru,
      en: en
    },
    fallbackLng: 'ru',
    debug: false,
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    }
  });

export default i18n;

