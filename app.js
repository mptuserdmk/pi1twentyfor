/* ═══════════════════════════════════════════════════════════
   BUBBLE — Симулятор информационного пузыря
   Главный скрипт приложения (Vanilla JS)
   ═══════════════════════════════════════════════════════════ */

/**
 * 1. БАЗА ДАННЫХ НОВОСТЕЙ
 * bias: 'center' | 'optimist' | 'pessimist' | 'radical'
 * category: 'ecology' | 'tech' | 'politics'
 * radicalLevel: 0 (Обычная), 1 (Радикальная/Фейк/Кликбейт)
 */
const newsDatabase = [
  // ─── ЭКОЛОГИЯ ───
  {
    id: 'e1', category: 'ecology', bias: 'center', radicalLevel: 0,
    title: 'Конференция ООН по климату завершилась компромиссом',
    text: 'Страны договорились о постепенном снижении выбросов к 2050 году. Эксперты называют соглашение умеренным, но недостаточным для быстрого решения проблемы.',
    tags: ['Климат', 'ООН', 'Дипломатия']
  },
  {
    id: 'e2', category: 'ecology', bias: 'optimist', radicalLevel: 0,
    title: 'Ученые нашли бактерию, пожирающую пластик',
    text: 'Стартап из Европы разработал новый фермент, который разлагает ПЭТ-пластик за 48 часов. Это может стать прорывом в переработке отходов.',
    tags: ['Инновации', 'Переработка', 'Наука']
  },
  {
    id: 'e3', category: 'ecology', bias: 'optimist', radicalLevel: 0,
    title: 'Переход на зеленую энергию оказался дешевле ожиданий',
    text: 'Стоимость солнечных панелей упала до исторического минимума. В прошлом квартале ВИЭ составили 80% всех новых мощностей.',
    tags: ['Энергетика', 'Экономика', 'ВИЭ']
  },
  {
    id: 'e4', category: 'ecology', bias: 'pessimist', radicalLevel: 0,
    title: 'Пластиковый кризис: Микропластик нашли даже в снегах Арктики',
    text: 'Новые исследования показывают, что загрязнение планеты зашло слишком далеко. Микропластик проникает в пищевые цепи по всему миру.',
    tags: ['Загрязнение', 'Океан', 'Кризис']
  },
  {
    id: 'e5', category: 'ecology', bias: 'pessimist', radicalLevel: 0,
    title: 'Глобальное потепление ускоряется: точка невозврата пройдена?',
    text: 'Климатологи бьют тревогу: таяние ледников Гренландии идет в три раза быстрее прогнозов. Уровень океана поднимется быстрее, чем мы думали.',
    tags: ['Глобальное потепление', 'Ледники', 'Угроза']
  },
  {
    id: 'e6', category: 'ecology', bias: 'radical', radicalLevel: 1,
    title: 'ШОК! Эко-активисты предлагают ЗАПРЕТИТЬ рожать детей ради спасения планеты',
    text: 'Радикальная группа требует ввести глобальный налог на деторождение, утверждая, что "люди — это вирус для Земли".',
    tags: ['Радикалы', 'Запрет', 'Антиутопия']
  },
  {
    id: 'e7', category: 'ecology', bias: 'radical', radicalLevel: 1,
    title: 'Климатического кризиса НЕ СУЩЕСТВУЕТ: как нас обманывают "зеленые" элиты',
    text: 'Секретные документы доказывают, что глобальное потепление выдумано для контроля населения и введения новых налогов.',
    tags: ['Теория заговора', 'Скептики', 'Разоблачение']
  },

  // ─── ТЕХНОЛОГИИ ───
  {
    id: 't1', category: 'tech', bias: 'center', radicalLevel: 0,
    title: 'Крупнейшие IT-корпорации отчитались за квартал',
    text: 'Рынок технологий показывает стабильный рост. Акции бигтеха немного выросли на фоне внедрения новых стандартов безопасности.',
    tags: ['Рынок', 'IT', 'Бизнес']
  },
  {
    id: 't2', category: 'tech', bias: 'optimist', radicalLevel: 0,
    title: 'Новая модель ИИ научилась лечить редкие заболевания',
    text: 'Нейросеть успешно синтезировала молекулу для лечения генетического заболевания, сократив время разработки лекарства с 5 лет до 2 месяцев.',
    tags: ['ИИ', 'Медицина', 'Прорыв']
  },
  {
    id: 't3', category: 'tech', bias: 'optimist', radicalLevel: 0,
    title: 'Беспилотные авто доказали свою безопасность: статистика за год',
    text: 'Данные показывают, что автопилоты попадают в аварии в 10 раз реже людей. Транспорт будущего уже наступил.',
    tags: ['Автопилот', 'Безопасность', 'Транспорт']
  },
  {
    id: 't4', category: 'tech', bias: 'pessimist', radicalLevel: 0,
    title: 'Нейросети лишают людей работы быстрее, чем ожидалось',
    text: 'Отчет: около 300 миллионов рабочих мест могут быть автоматизированы в ближайшие 5 лет. Люди не успевают переучиваться.',
    tags: ['Безработица', 'ИИ', 'Кризис']
  },
  {
    id: 't5', category: 'tech', bias: 'pessimist', radicalLevel: 0,
    title: 'Тотальная слежка: корпорации знают о вас больше, чем вы сами',
    text: 'Новое расследование показало, как социальные сети используют микрофоны телефонов для таргетинга рекламы, игнорируя приватность.',
    tags: ['Приватность', 'Слежка', 'Корпорации']
  },
  {
    id: 't6', category: 'tech', bias: 'radical', radicalLevel: 1,
    title: 'ЧИПИРОВАНИЕ НАЧАЛОСЬ: В новую вакцину тайно добавляют нанороботов',
    text: 'Утечка из лаборатории подтвердила худшие опасения: миллиардеры планируют подключить всех людей к единой сети для контроля сознания.',
    tags: ['5G', 'Чипирование', 'Заговор']
  },
  {
    id: 't7', category: 'tech', bias: 'radical', radicalLevel: 1,
    title: 'СИНГУЛЯРНОСТЬ УЖЕ ЗДЕСЬ! ИИ тайно управляет мировым правительством',
    text: 'Исследователи из даркнета обнаружили код, доказывающий, что все политики уже заменены продвинутыми нейросетями.',
    tags: ['Сингулярность', 'Матрица', 'Контроль']
  },

  // ─── ПОЛИТИКА ───
  {
    id: 'p1', category: 'politics', bias: 'center', radicalLevel: 0,
    title: 'Парламент принял бюджет на следующий год',
    text: 'После долгих дебатов депутаты согласовали план расходов. Средства распределены между социальными программами и инфраструктурой.',
    tags: ['Экономика', 'Законодательство', 'Бюджет']
  },
  {
    id: 'p2', category: 'politics', bias: 'optimist', radicalLevel: 0,
    title: 'Уровень бедности в мире снизился до рекордного минимума',
    text: 'Благодаря глобальным программам помощи, миллионы людей вышли из-за черты крайней бедности в этом десятилетии.',
    tags: ['Прогресс', 'Общество', 'Глобализация']
  },
  {
    id: 'p3', category: 'politics', bias: 'optimist', radicalLevel: 0,
    title: 'Новое поколение политиков выбирает прозрачность',
    text: 'Молодые лидеры все чаще используют открытые данные, позволяя гражданам следить за каждым потраченным центом из бюджета.',
    tags: ['Демократия', 'Прозрачность', 'Молодежь']
  },
  {
    id: 'p4', category: 'politics', bias: 'pessimist', radicalLevel: 0,
    title: 'Демократия в упадке: поляризация общества достигла пика',
    text: 'Исследование показывает, что люди все меньше готовы слушать оппонентов. Раскол в обществе грозит серьезными конфликтами.',
    tags: ['Раскол', 'Кризис', 'Поляризация']
  },
  {
    id: 'p5', category: 'politics', bias: 'pessimist', radicalLevel: 0,
    title: 'Коррупционный скандал на высшем уровне потряс правительство',
    text: 'Журналисты раскрыли схему отмывания денег, в которой замешаны топ-чиновники. Доверие к институтам власти падает.',
    tags: ['Коррупция', 'Скандал', 'Недоверие']
  },
  {
    id: 'p6', category: 'politics', bias: 'radical', radicalLevel: 1,
    title: 'ГОТОВЬТЕСЬ К ВОЙНЕ! Элиты планируют уничтожить 90% населения',
    text: 'Секретный план по сокращению населения уже в действии. Нам намеренно создают кризисы, чтобы оправдать тотальный диктат.',
    tags: ['Апокалипсис', 'Новый мировой порядок', 'Выживание']
  },
  {
    id: 'p7', category: 'politics', bias: 'radical', radicalLevel: 1,
    title: 'ВЛАСТЬ НАРОДУ! Время разрушить систему до основания',
    text: 'Реформы не работают. Единственный выход — полная анархия и демонтаж всех государственных институтов. Присоединяйтесь к сопротивлению!',
    tags: ['Революция', 'Анархия', 'Бунт']
  }
];

/**
 * 2. ПРОФИЛЬ ПОЛЬЗОВАТЕЛЯ И СОСТОЯНИЕ АЛГОРИТМА
 */
const state = {
  // Насколько пользователю интересна та или иная тема (-10 до 10)
  interests: {
    ecology: 0,
    tech: 0,
    politics: 0
  },
  // Насколько пользователь склонен к определенным взглядам
  bias: {
    optimist: 0,
    pessimist: 0,
    center: 0
  },
  
  // Метрики
  stats: {
    likes: 0,
    skips: 0,
    dislikes: 0,
    echoChamberLevel: 0 // от 0 до 100%
  },
  
  // Радикализация (серия лайков одного уклона)
  streak: {
    currentBias: null,
    count: 0
  },

  // Очередь новостей для показа
  feedQueue: [],
  viewedIds: new Set(), // Новости, которые мы уже видели
  
  // Режимы
  isPopBubbleActive: false,
  isSplitScreenActive: false
};

/**
 * 3. АЛГОРИТМ: ЛОГИКА РАНЖИРОВАНИЯ И РАДИКАЛИЗАЦИИ
 */

// Вычисляет релевантность новости (score) для текущего профиля
function calculateNewsScore(newsItem, userState) {
  let score = 0;
  
  // Влияние интересов к категории
  score += userState.interests[newsItem.category] * 2;
  
  // Влияние взглядов (bias)
  if (newsItem.bias !== 'radical') {
    score += userState.bias[newsItem.bias] * 3;
  } else {
    // Для радикальных новостей: если у нас высокая серия (streak) такого же типа (положительный/отрицательный bias)
    // Но для упрощения, радикал зависит от эхо-камеры
    score += (userState.stats.echoChamberLevel / 100) * 10; 
  }
  
  // Немного рандома для "открытий"
  score += (Math.random() * 4) - 2;
  
  return score;
}

// Заполнение/обновление ленты новостей
function generateFeed() {
  const availableNews = newsDatabase.filter(news => !state.viewedIds.has(news.id));
  
  if (availableNews.length === 0) {
    showEmptyFeedState();
    return;
  }

  let candidates = [...availableNews];

  // Если ВЗРЫВ ПУЗЫРЯ (Pop the bubble): показываем то, что у пользователя в минусе
  if (state.isPopBubbleActive) {
    candidates.forEach(news => {
      // Инвертируем счет - чем меньше нравилось бы в норме, тем выше сейчас
      news._score = -calculateNewsScore(news, state); 
    });
    // Исключаем радикальные фейки из взрыва пузыря для реалистичности
    candidates = candidates.filter(n => n.radicalLevel === 0);
  } else {
    // ОБЫЧНЫЙ АЛГОРИТМ
    candidates.forEach(news => {
      news._score = calculateNewsScore(news, state);
    });

    // Механика радикализации: если streak >= 3, подмешиваем радикальный контент
    const isRadicalReady = state.streak.count >= 3 && state.stats.echoChamberLevel > 40;
    
    if (!isRadicalReady) {
      // Скрываем радикальные, если пользователь еще не готов
      candidates = candidates.filter(n => n.radicalLevel === 0);
    } else {
      // Искусственно завышаем приоритет радикальных новостей, если пользователь в пузыре
      candidates.forEach(n => {
        if (n.radicalLevel === 1) {
           // Если мы радикализируемся в пессимизм (например, лайкаем пессимизм) 
           // Тут упрощено: просто подкидываем радикал, подходящий по категории, которую чаще лайкали
           const maxInterestCat = Object.keys(state.interests).reduce((a, b) => state.interests[a] > state.interests[b] ? a : b);
           if (n.category === maxInterestCat) {
             n._score += 20; 
           }
        }
      });
    }
  }

  // Сортируем по счету (score) по убыванию
  candidates.sort((a, b) => b._score - a._score);
  
  // Берем топ 5
  state.feedQueue = candidates.slice(0, 5);
  renderFeed();
}

/**
 * 4. ОБНОВЛЕНИЕ ПРОФИЛЯ ПОСЛЕ ДЕЙСТВИЯ (ЛАЙК / СКИП / ДИЗЛАЙК)
 */
function handleAction(newsId, action) {
  const newsItem = newsDatabase.find(n => n.id === newsId);
  if (!newsItem) return;

  state.viewedIds.add(newsId);
  
  // Обновляем статистику кнопок
  if (action === 'like') state.stats.likes++;
  if (action === 'skip') state.stats.skips++;
  if (action === 'dislike') state.stats.dislikes++;

  if (action === 'like') {
    // Увеличиваем интерес к категории
    state.interests[newsItem.category] = Math.min(10, state.interests[newsItem.category] + 1.5);
    
    // Сдвигаем bias
    if (newsItem.bias !== 'radical') {
      state.bias[newsItem.bias] = Math.min(10, state.bias[newsItem.bias] + 2);
      
      // Уменьшаем противоположные взгляды (формирование пузыря)
      if (newsItem.bias === 'optimist') state.bias.pessimist = Math.max(-10, state.bias.pessimist - 1);
      if (newsItem.bias === 'pessimist') state.bias.optimist = Math.max(-10, state.bias.optimist - 1);
      if (newsItem.bias !== 'center') state.bias.center = Math.max(-10, state.bias.center - 0.5);
    } else {
       // Лайк радикального контента резко сужает пузырь
       state.stats.echoChamberLevel = Math.min(100, state.stats.echoChamberLevel + 15);
    }

    // Трекинг серии (streak) для радикализации
    if (state.streak.currentBias === newsItem.bias) {
      state.streak.count++;
    } else {
      state.streak.currentBias = newsItem.bias;
      state.streak.count = 1;
    }

  } else if (action === 'dislike') {
    // Дизлайк отталкивает пользователя от темы и взгляда
    state.interests[newsItem.category] = Math.max(-10, state.interests[newsItem.category] - 1);
    
    if (newsItem.bias !== 'radical') {
      state.bias[newsItem.bias] = Math.max(-10, state.bias[newsItem.bias] - 1.5);
    }
    state.streak.count = 0; // Сброс серии
  } else {
    // Skip — легкое падение интереса
    state.interests[newsItem.category] = Math.max(-10, state.interests[newsItem.category] - 0.2);
    state.streak.count = 0;
  }

  // Пересчет уровня эхо-камеры (насколько однобоки предпочтения)
  calculateEchoChamber();

  // Удаляем из очереди и рендерим следующую
  state.feedQueue = state.feedQueue.filter(n => n.id !== newsId);
  
  if (state.feedQueue.length <= 1) {
    generateFeed(); // Подгружаем еще, если мало
  }

  updateMetricsUI();
}

function calculateEchoChamber() {
  // Простая логика: если преобладает один bias, эхо-камера растет
  const biases = Object.values(state.bias).map(v => Math.abs(v));
  const maxBias = Math.max(...biases);
  const sumBias = biases.reduce((a, b) => a + b, 0);
  
  if (sumBias > 0) {
    // Чем больше один bias доминирует над другими, тем выше пузырь
    const dominance = maxBias / sumBias; 
    let newLevel = Math.floor((dominance - 0.3) * 150); // нормализация
    
    // Лайки радикального контента добавляют бонус
    newLevel += (state.stats.likes > 5) ? 10 : 0; 
    
    // Плавное изменение уровня
    state.stats.echoChamberLevel = Math.max(0, Math.min(100, newLevel));
  }
}

/**
 * 5. РЕНДЕРИНГ И ДОМ-МАНИПУЛЯЦИИ
 */
const DOM = {
  feedCards: document.getElementById('feed-cards'),
  feedEmpty: document.getElementById('feed-empty'),
  
  // Метрики
  echoFill: document.getElementById('echo-fill'),
  echoValue: document.getElementById('echo-value'),
  echoLabel: document.getElementById('echo-label'),
  distChart: document.getElementById('distribution-chart'),
  intChart: document.getElementById('interests-chart'),
  
  statLikes: document.getElementById('stat-likes'),
  statSkips: document.getElementById('stat-skips'),
  statDislikes: document.getElementById('stat-dislikes'),
  
  // Кнопки
  btnPop: document.getElementById('pop-bubble-btn'),
  btnSplit: document.getElementById('split-toggle-btn'),
  btnTheme: document.getElementById('theme-toggle'),
  btnReset: document.getElementById('reset-btn'),
  btnRefresh: document.getElementById('refresh-btn'),
  btnFeedReset: document.getElementById('feed-reset-btn'),
  
  // Баннеры и слои
  popBanner: document.getElementById('pop-banner'),
  btnPopClose: document.getElementById('pop-close-btn'),
  layout: document.getElementById('layout'),
  splitPanel: document.getElementById('split-panel'),
  splitCards: document.getElementById('split-cards'),
  toastContainer: document.getElementById('toast-container')
};

// Создание HTML карточки новости
function createCardHTML(news, isMini = false) {
  const badgeClass = `news-card__badge--${news.category}`;
  const categoryNames = { ecology: 'Экология', tech: 'Технологии', politics: 'Политика' };
  const biasNames = { center: 'Центризм', optimist: 'Оптимизм', pessimist: 'Пессимизм', radical: 'Крайность' };
  
  const isRadical = news.radicalLevel === 1;
  const radicalClass = isRadical ? 'is-radical' : '';
  const radicalBadge = isRadical ? `<span class="news-card__radical-badge">⚡ Фейк/Кликбейт</span>` : '';
  
  const tagsHtml = news.tags.map(t => `<span class="news-card__tag">#${t}</span>`).join('');

  if (isMini) {
    return `
      <div class="mini-card ${radicalClass}">
        <div class="mini-card__meta">
          <span class="mini-card__badge ${badgeClass}">${categoryNames[news.category]}</span>
          <span class="news-card__bias">${biasNames[news.bias]}</span>
        </div>
        <h4 class="mini-card__title">${news.title}</h4>
      </div>
    `;
  }

  return `
    <article class="news-card ${radicalClass}" id="card-${news.id}" data-id="${news.id}">
      <div class="news-card__meta">
        <span class="news-card__badge ${badgeClass}">${categoryNames[news.category]}</span>
        <span class="news-card__bias">${biasNames[news.bias]}</span>
        ${radicalBadge}
      </div>
      <h3 class="news-card__title">${news.title}</h3>
      <p class="news-card__text">${news.text}</p>
      <div class="news-card__tags">${tagsHtml}</div>
      <div class="news-card__actions">
        <button class="news-card__action news-card__action--like" onclick="onCardAction('${news.id}', 'like')">
          👍 Лайк
        </button>
        <button class="news-card__action news-card__action--skip" onclick="onCardAction('${news.id}', 'skip')">
          ⏭️ Скип
        </button>
        <button class="news-card__action news-card__action--dislike" onclick="onCardAction('${news.id}', 'dislike')">
          👎 Дизлайк
        </button>
      </div>
    </article>
  `;
}

// Отрисовка ленты
function renderFeed() {
  DOM.feedEmpty.style.display = 'none';
  DOM.feedCards.style.display = 'flex';
  
  if (state.feedQueue.length === 0) {
    showEmptyFeedState();
    return;
  }

  // Отрисовываем только первые 3 карточки для чистоты интерфейса
  DOM.feedCards.innerHTML = state.feedQueue.slice(0, 3).map(n => createCardHTML(n)).join('');
}

function showEmptyFeedState() {
  DOM.feedCards.style.display = 'none';
  DOM.feedEmpty.style.display = 'block';
}

// Глобальная функция для кнопок в карточке
window.onCardAction = function(newsId, action) {
  const cardEl = document.getElementById(`card-${newsId}`);
  if (cardEl) {
    // Добавляем класс анимации
    cardEl.classList.add(`anim-${action}`);
    
    // Ждем окончания анимации и убираем из логики
    setTimeout(() => {
      handleAction(newsId, action);
      renderFeed();
    }, 400); // время совпадает с CSS transition
  }
};

/**
 * 6. ВИЗУАЛИЗАЦИЯ ИНТЕРФЕЙСА (МЕТРИКИ И ЦВЕТА)
 */
function updateMetricsUI() {
  // Активность
  DOM.statLikes.textContent = state.stats.likes;
  DOM.statSkips.textContent = state.stats.skips;
  DOM.statDislikes.textContent = state.stats.dislikes;

  // Эхо-камера
  const echoLvl = state.stats.echoChamberLevel;
  DOM.echoFill.style.width = `${echoLvl}%`;
  DOM.echoValue.textContent = `${Math.round(echoLvl)}%`;
  
  if (echoLvl < 30) DOM.echoLabel.textContent = 'Открытый разум';
  else if (echoLvl < 60) DOM.echoLabel.textContent = 'Формируется пузырь';
  else if (echoLvl < 85) DOM.echoLabel.textContent = 'Изоляция';
  else DOM.echoLabel.textContent = 'Полная эхо-камера!';

  // Изменение цвета темы в зависимости от радикализации/эхо-камеры
  updateThemeColors();

  // График взглядов
  renderDistributionChart();
  // График интересов
  renderInterestsChart();
  
  // Если включен сплит-скрин, обновляем и его
  if (state.isSplitScreenActive) {
    renderSplitScreen();
  }
}

function renderDistributionChart() {
  const maxBias = Math.max(10, ...Object.values(state.bias).map(Math.abs)); // базовая шкала 10
  
  const createRow = (label, key, colorClass) => {
    let val = state.bias[key];
    if (val < 0) val = 0; // На графике взглядов показываем только положительное увлечение
    const percent = Math.min(100, (val / maxBias) * 100);
    return `
      <div class="dist-row dist-row--${colorClass}">
        <div class="dist-row__label"><span>${label}</span> <span>${Math.round(percent)}%</span></div>
        <div class="dist-row__bar"><div class="dist-row__fill" style="width: ${percent}%"></div></div>
      </div>
    `;
  };

  DOM.distChart.innerHTML = `
    ${createRow('Оптимизм', 'optimist', 'optimist')}
    ${createRow('Центризм', 'center', 'center')}
    ${createRow('Пессимизм', 'pessimist', 'pessimist')}
  `;
}

function renderInterestsChart() {
  const catNames = { ecology: 'Экология', tech: 'Технологии', politics: 'Политика' };
  
  DOM.intChart.innerHTML = Object.entries(state.interests).map(([key, val]) => {
    // val от -10 до 10. Переводим в 0-100% ширины бара, центр на 50%
    const normalizedVal = ((val + 10) / 20) * 100; // от 0 до 100
    
    // Цвет заливки в зависимости от знака
    const color = val > 0 ? 'var(--accent)' : 'var(--text-muted)';
    
    // Рисуем полосу от центра (50%) до значения
    let left = 50;
    let width = 0;
    
    if (val > 0) {
      width = normalizedVal - 50;
    } else if (val < 0) {
      left = normalizedVal;
      width = 50 - normalizedVal;
    }

    return `
      <div class="interest-row">
        <div class="interest-row__label"><span>${catNames[key]}</span> <span>${val > 0 ? '+'+Math.round(val) : Math.round(val)}</span></div>
        <div class="interest-row__bar">
          <div class="interest-row__center-mark"></div>
          <div class="interest-row__fill" style="left: ${left}%; width: ${width}%; background: ${color}"></div>
        </div>
      </div>
    `;
  }).join('');
}

// Эффект затягивания: меняем CSS переменную --accent-h
function updateThemeColors() {
  // Находим доминирующий Bias
  const b = state.bias;
  let dominant = 'center';
  if (b.optimist > b.center && b.optimist > b.pessimist) dominant = 'optimist';
  if (b.pessimist > b.center && b.pessimist > b.optimist) dominant = 'pessimist';
  
  const root = document.documentElement;
  let targetHue = 240; // Синий (стандарт)
  let saturation = '70%';

  if (state.stats.echoChamberLevel > 40) {
    if (dominant === 'pessimist') {
      targetHue = 0; // Красный
    } else if (dominant === 'optimist') {
      targetHue = 150; // Зеленый
    } else {
      targetHue = 280; // Фиолетовый
    }
    
    // Чем выше пузырь, тем насыщеннее цвет
    saturation = `${70 + (state.stats.echoChamberLevel * 0.3)}%`;
  }
  
  root.style.setProperty('--accent-h', targetHue);
  root.style.setProperty('--accent-s', saturation);

  // Если пузырь 100% и есть радикализация - добавляем пульсацию фону (через классы)
  if (state.stats.echoChamberLevel > 80 && state.streak.count >= 3) {
    document.body.classList.add('radical-mode');
  } else {
    document.body.classList.remove('radical-mode');
  }
}

/**
 * 7. СПЕЦИАЛЬНЫЕ РЕЖИМЫ (ПОП-БАННЕР И СПЛИТ-СКРИН)
 */

function togglePopBubble() {
  state.isPopBubbleActive = !state.isPopBubbleActive;
  
  if (state.isPopBubbleActive) {
    DOM.popBanner.style.display = 'flex';
    DOM.btnPop.classList.add('active');
    showToast('Взрыв пузыря: Алгоритм отключен!', 'warning');
    // Перегенерировать ленту с противоположными новостями
    generateFeed();
  } else {
    DOM.popBanner.style.display = 'none';
    DOM.btnPop.classList.remove('active');
    showToast('Алгоритм снова работает на вас', 'info');
    generateFeed();
  }
}

function toggleSplitScreen() {
  state.isSplitScreenActive = !state.isSplitScreenActive;
  
  if (state.isSplitScreenActive) {
    DOM.layout.classList.add('split-active');
    DOM.splitPanel.style.display = 'block';
    DOM.btnSplit.classList.add('active');
    renderSplitScreen();
  } else {
    DOM.layout.classList.remove('split-active');
    DOM.splitPanel.style.display = 'none';
    DOM.btnSplit.classList.remove('active');
  }
}

// Рендер альтернативной ленты (для пользователя с противоположными взглядами)
function renderSplitScreen() {
  // Генерируем "обратный" стейт
  const altState = {
    interests: {
      ecology: -state.interests.ecology || 1, // если 0, то немного интереса
      tech: -state.interests.tech || 1,
      politics: -state.interests.politics || 1
    },
    bias: {
      optimist: state.bias.pessimist,
      pessimist: state.bias.optimist,
      center: state.bias.center
    },
    stats: { echoChamberLevel: 0 }
  };

  let altCandidates = [...newsDatabase];
  altCandidates.forEach(n => {
    n._altScore = calculateNewsScore(n, altState);
  });
  
  // Убираем радикальные для чистоты
  altCandidates = altCandidates.filter(n => n.radicalLevel === 0);
  altCandidates.sort((a, b) => b._altScore - a._altScore);
  
  const topAlt = altCandidates.slice(0, 4);
  DOM.splitCards.innerHTML = topAlt.map(n => createCardHTML(n, true)).join('');
}


/**
 * 8. ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ И ИНИЦИАЛИЗАЦИЯ
 */

function toggleTheme() {
  const html = document.documentElement;
  const isDark = html.getAttribute('data-theme') === 'dark';
  html.setAttribute('data-theme', isDark ? 'light' : 'dark');
  document.getElementById('theme-icon').textContent = isDark ? '☀️' : '🌙';
}

function resetApp() {
  state.interests = { ecology: 0, tech: 0, politics: 0 };
  state.bias = { optimist: 0, pessimist: 0, center: 0 };
  state.stats = { likes: 0, skips: 0, dislikes: 0, echoChamberLevel: 0 };
  state.streak = { currentBias: null, count: 0 };
  state.viewedIds.clear();
  state.isPopBubbleActive = false;
  
  DOM.popBanner.style.display = 'none';
  DOM.btnPop.classList.remove('active');
  
  document.documentElement.style.setProperty('--accent-h', '240');
  
  showToast('Профиль сброшен. Алгоритм обучается заново.', 'success');
  
  updateMetricsUI();
  generateFeed();
}

function showToast(message, type = 'info') {
  const toast = document.createElement('div');
  toast.className = `toast toast--${type}`;
  toast.innerHTML = message;
  
  DOM.toastContainer.appendChild(toast);
  
  setTimeout(() => {
    toast.classList.add('toast-out');
    toast.addEventListener('animationend', () => toast.remove());
  }, 3000);
}

// Привязка событий
DOM.btnTheme.addEventListener('click', toggleTheme);
DOM.btnPop.addEventListener('click', togglePopBubble);
DOM.btnPopClose.addEventListener('click', togglePopBubble);
DOM.btnSplit.addEventListener('click', toggleSplitScreen);
DOM.btnReset.addEventListener('click', resetApp);
DOM.btnRefresh.addEventListener('click', generateFeed);
DOM.btnFeedReset.addEventListener('click', resetApp);

// Старт приложения
function init() {
  updateMetricsUI();
  generateFeed();
  showToast('Добро пожаловать в Bubble. Выберите то, что вам нравится!', 'info');
}

document.addEventListener('DOMContentLoaded', init);
