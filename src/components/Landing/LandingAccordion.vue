<template>
  <section class="section section--07">
    <div class="container kirill_section_accordion">
      <h2 class="section__title">Частые вопросы</h2>
    </div>
    <div class="kirill_accordion">
      <div class="kirill_accordion_item">
        <div class="kirill_accordion_header" @click="toggleItem(0)">
          Что такое Кундалини-йога?
          <img
            :src="
              isActive(0)
                ? '/img/Arrow-up.28062b53.svg'
                : '/img/Arrow-down.1fb02fa3.svg'
            "
            class="kirill_accordion_icon"
            :class="{ active: isActive(0) }"
            alt="arrow"
          />
        </div>
        <div class="kirill_accordion_content" v-show="isActive(0)">
          Кундалини йога — это одно из направлений йоги, охватившее сердца
          миллионов людей благодаря своей эффективности. Особенно стоит выделить
          скорость, с которой происходит трансформация и гармонизация
          практикующего человека. Результат достигается за счет уникального
          сочетания динамических асан, пранаям, медитаций и мантр – древних
          техник, адаптированных под нужды современного человека.
          <br />
          &nbsp;
          <br />
          Интересный факт: действенное влияние практик использовали в клинике
          Маршака для избавления людей от пагубных зависимостей и привычек.
          <br />
          &nbsp;
          <br />
          В чем помогает?
          <br />
          &nbsp;
          <br />
          1.Физическое благополучие: Практика кундалини-йоги укрепляет мышцы,
          улучшает гибкость и выносливость, улучшает осанку и поддерживает общую
          физическую форму.
          <br />
          2.Эмоциональное благополучие: Кундалини-йога помогает снять напряжение
          и стресс, улучшает настроение, способствует расслаблению и повышает
          уровень счастья.
          <br />
          3.Улучшение концентрации и осознанности: Практика кундалини-йоги
          включает в себя медитацию и дыхательные упражнения, которые помогают
          улучшить концентрацию, осознанность и ясность ума.
          <br />
          4.Укрепление иммунной системы: Регулярная практика кундалини-йоги
          помогает укрепить иммунную систему, делая организм более устойчивым к
          болезням и инфекциям.
          <br />
          5.Повышение самосознания: Кундалини-йога помогает развить самосознание
          и внутреннюю гармонию, что способствует улучшению качества жизни и
          межличностных отношений.
          <br />
          6.Улучшение сна: Практика кундалини-йоги помогает расслабиться и снять
          напряжение, что может привести к улучшению качества сна и более
          глубокому отдыху.
          <br />
          7.Повышение энергии и жизненности: Кундалини-йога помогает
          активизировать энергию кундалини, что может привести к повышению
          уровня энергии и жизненности.
          <br />
          8.Улучшение пищеварения: Практика кундалини-йоги включает в себя
          упражнения, которые могут помочь улучшить пищеварение и облегчить
          проблемы с желудком и кишечником.
          <br />
          &nbsp;
          <br />
          Каждый человек может испытывать индивидуальные изменения и
          преимущества от регулярной практики.
        </div>
      </div>

      <div class="kirill_accordion_item">
        <div class="kirill_accordion_header" @click="toggleItem(1)">
          Кто разработал ваши программы?
          <img
            :src="
              isActive(1)
                ? '/img/Arrow-up.28062b53.svg'
                : '/img/Arrow-down.1fb02fa3.svg'
            "
            class="kirill_accordion_icon"
            :class="{ active: isActive(1) }"
            alt="arrow"
          />
        </div>
        <div class="kirill_accordion_content" v-show="isActive(1)">
          Наша команда экспертов по кундалини-йоге, возглавляемая признанными
          тренерами Лией Соколовой и Юлией Чай: специалисты в области
          психосоматики, психологи и опытные мастера различных техник йоги. Мы
          разработали уникальные анкеты и программы, которые помогут вам достичь
          физического и эмоционального благополучия. Они включают в себя не
          только асаны, но и полноценную тренировку на основе техник дыхания
          (пранаям), медитации и пения мантр.
        </div>
      </div>
      <div class="kirill_accordion_item">
        <div class="kirill_accordion_header" @click="toggleItem(2)">
          На какой уровень владения йогой рассчитаны ваши программы?
          <img
            :src="
              isActive(2)
                ? '/img/Arrow-up.28062b53.svg'
                : '/img/Arrow-down.1fb02fa3.svg'
            "
            class="kirill_accordion_icon"
            :class="{ active: isActive(2) }"
            alt="arrow"
          />
        </div>
        <div class="kirill_accordion_content" v-show="isActive(2)">
          Наши программы по кундалини-йоге разработаны таким образом, чтобы быть
          доступными и полезными как для новичков, так и для тех, кто уже знаком
          с основами йоги. Для новичков мы предлагаем вводные курсы, которые
          помогут им освоить основы кундалини-йоги и научиться правильно
          выполнять асаны, дыхательные упражнения и медитации. Для опытных
          практиков подготовлены продвинутые программы, которые помогут им
          углубить свою практику. Независимо от вашего уровня подготовки, вы
          можете быть уверены, что наши программы по кундалини-йоге будут
          полезны и эффективны для вас.
        </div>
      </div>
      <div class="kirill_accordion_item">
        <div class="kirill_accordion_header" @click="toggleItem(3)">
          Безопасно ли заниматься по вашим программам самостоятельно, без
          мастера?
          <img
            :src="
              isActive(3)
                ? '/img/Arrow-up.28062b53.svg'
                : '/img/Arrow-down.1fb02fa3.svg'
            "
            class="kirill_accordion_icon"
            :class="{ active: isActive(3) }"
            alt="arrow"
          />
        </div>
        <div class="kirill_accordion_content" v-show="isActive(3)">
          Yoga Care предоставляет поддержку, что позволяет нашим клиентам
          получить помощь и ответы на свои вопросы в любое время. Наши программы
          позволяют практиковать кундалини-йогу из удобного места, не требуя
          физического присутствия на занятиях в студии. Важно отметить, что при
          занятиях необходимо соблюдать правильную технику выполнения упражнений
          и следовать инструкциям тренера. Таким образом, вы сможете получить
          все преимущества кундалини-йоги без очного присутствия тренера, не
          теряя в безопасности и эффективности.
        </div>
      </div>
      <div class="kirill_accordion_item">
        <div class="kirill_accordion_header" @click="toggleItem(4)">
          Что я получу в подписке?
          <img
            :src="
              isActive(4)
                ? '/img/Arrow-up.28062b53.svg'
                : '/img/Arrow-down.1fb02fa3.svg'
            "
            class="kirill_accordion_icon"
            :class="{ active: isActive(4) }"
            alt="arrow"
          />
        </div>
        <div class="kirill_accordion_content" v-show="isActive(4)">
          &#183; Доступ к 38 индивидуальным программам йоги в виде анимированных
          роликов, которые мы отобрали из из сотни тысяч комплексов<br />
          &#183; Чуткую команду поддержки, которая поможет помощь и даст ответы
          на вопросы в любое время. <br />
          &#183; Отслеживание динамики и информативную статистику <br />
          &#183; Гибкий режим занятий<br />
        </div>
      </div>
      <div class="kirill_accordion_item">
        <div class="kirill_accordion_header" @click="toggleItem(5)">
          Сколько стоит подписка?
          <img
            :src="
              isActive(5)
                ? '/img/Arrow-up.28062b53.svg'
                : '/img/Arrow-down.1fb02fa3.svg'
            "
            class="kirill_accordion_icon"
            :class="{ active: isActive(5) }"
            alt="arrow"
          />
        </div>
        <div class="kirill_accordion_content" v-show="isActive(5)">
          <div v-if="subscriptions.length">
            <div v-for="sub in subscriptions" :key="sub.id">
              &#183; {{ sub.title }} — {{ formatPrice(sub.discountPrice) }}
              <span v-if="sub.badgeDiscount"
                >Скидка {{ sub.badgeDiscount }}</span
              >
              <br />
            </div>
          </div>
          <div v-else>Загрузка данных подписки...</div>
        </div>
      </div>
      <div class="kirill_accordion_item">
        <div class="kirill_accordion_header" @click="toggleItem(6)">
          Как мне выбрать программу?
          <img
            :src="
              isActive(6)
                ? '/img/Arrow-up.28062b53.svg'
                : '/img/Arrow-down.1fb02fa3.svg'
            "
            class="kirill_accordion_icon"
            :class="{ active: isActive(6) }"
            alt="arrow"
          />
        </div>
        <div class="kirill_accordion_content" v-show="isActive(6)">
          Заполните небольшую
          <router-link to="/survey/" class="kirill_test"> Анкету</router-link> и
          мы подберем для вас наилучшую программу. Также, вы можете
          воспользоваться чатом с нашей службой поддержки для более детальной
          презентации наших курсов.
        </div>
      </div>
      <div class="kirill_accordion_item">
        <div class="kirill_accordion_header" @click="toggleItem(7)">
          Кому стоить быть особенно осторожным при занятиях?
          <img
            :src="
              isActive(7)
                ? '/img/Arrow-up.28062b53.svg'
                : '/img/Arrow-down.1fb02fa3.svg'
            "
            class="kirill_accordion_icon"
            :class="{ active: isActive(7) }"
            alt="arrow"
          />
        </div>
        <div class="kirill_accordion_content" v-show="isActive(7)">
          Кундалини-йога в целом считается безопасной практикой, однако, как и
          любая физическая активность, она имеет некоторые противопоказания.
          Перед началом практики кундалини-йоги рекомендуется
          проконсультироваться с врачом, особенно при наличии каких-либо
          существующих медицинских проблем. Более детально о противопоказаниях
          вы можете ознакомиться
          <router-link to="/article/67" class="kirill_test"> здесь</router-link>
        </div>
      </div>
      <div class="kirill_accordion_item">
        <div class="kirill_accordion_header" @click="toggleItem(8)">
          Как добавить иконку yogacare на главный экран смартфона?
          <img
            :src="
              isActive(8)
                ? '/img/Arrow-up.28062b53.svg'
                : '/img/Arrow-down.1fb02fa3.svg'
            "
            class="kirill_accordion_icon"
            :class="{ active: isActive(8) }"
            alt="arrow"
          />
        </div>
        <div class="kirill_accordion_content" v-show="isActive(8)">
          Чтобы всегда иметь быстрый доступ к нашему сервису с вашего смартфона,
          зарегистрируйтесь на нашем сайте и проделайте простые действия:
          <br />
          &nbsp;
          <br />
          Для iPhone:
          <br />
          1.В браузере Safari откройте yogacare.ru
          <br />
          2.Нажмите на кнопку “Поделиться”
          <br />
          3.Выберете опцию “На экран домой”
          <br />
          4.При желании измените название иконки и нажмите “Добавить” для
          подтверждения
          <br />
          &nbsp;
          <br />
          Для Android:
          <br />
          1.В браузере Chrome откройте yogacare.ru
          <br />
          2.Нажать на «три точки» в правом верхнем углу
          <br />
          3.Выбрать опцию «Добавить на главный экран».
          <br />
          4.При желании измените название иконки и нажмите “Добавить” для
          подтверждения
        </div>
      </div>

      <!-- Добавьте остальные вопросы в подобном формате -->
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      activeItem: null,
      subscriptions: [],
    }
  },
  methods: {
    toggleItem(index) {
      this.activeItem = this.activeItem === index ? null : index
    },
    isActive(index) {
      return this.activeItem === index
    },
    async fetchSubscriptions() {
      try {
        const response = await fetch('/api/purchase/subscriptions') // поменяй на prod URL если нужно
        const data = await response.json()
        this.subscriptions = data
      } catch (e) {
        console.error('Ошибка при загрузке подписок:', e)
      }
    },
    formatPrice(price) {
      const rub = price / 100
      return new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'RUB',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(rub)
    },
  },
  mounted() {
    this.fetchSubscriptions()
  },
}
</script>
