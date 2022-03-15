<template>
  <footer class="footer container">
    <div class="footer__wrapper">
      <ul class="footer__links">
        <li>
          <router-link :to="{ name: 'main' }"
                       class="footer__link"
                       href="#"
          >
            Каталог
          </router-link>
        </li>
        <li>
          <a class="footer__link"
             href="tel:88006009009"
          >
            8 800 600 90 09
          </a>
        </li>
        <li>
          <a class="footer__link"
             href="mailto:hi@technozavrrr.com"
          >
            hi@moire.com
          </a>
        </li>
        <li>
          <a class="footer__link"
             href="#"
          >
            Распродажа
          </a>
        </li>
        <li>
          <a class="footer__link footer__link--medium"
             href="#"
          >
            Заказать звонок
          </a>
        </li>
      </ul>

      <ul class="footer__social social">
        <li class="social__item">
          <a class="social__link"
             href="#"
             aria-label="Вконтакте"
          >
            <img src="../assets/img/svg/VK.svg"
                 alt="Вконтакте"
                 width="20"
                 height="11"
            >
          </a>
        </li>
        <li class="social__item">
          <a class="social__link"
             href="#"
             aria-label="Инстаграм"
          >
            <img src="../assets/img/svg/Instagram.svg"
                 alt="Инстаграм"
                 width="17"
                 height="17"
            >
          </a>
        </li>
        <li class="social__item">
          <a class="social__link"
             href="#"
             aria-label="Facebook"
          >
            <img src="../assets/img/svg/Facebook.svg"
                 alt="Фейсбук"
                 width="17"
                 height="17"
            >
          </a>
        </li>
        <li class="social__item">
          <a class="social__link"
             href="#"
             aria-label="Twitter"
          >
            <img src="../assets/img/svg/Twitter.svg"
                 alt="Твиттер"
                 width="17"
                 height="14"
            >
          </a>
        </li>
        <li class="social__item">
          <a class="social__link"
             href="#"
             aria-label="Telegram"
          >
            <img src="../assets/img/svg/tg.svg"
                 alt="Телеграмм"
                 width="19"
                 height="17"
            >
          </a>
        </li>
      </ul>

      <p class="footer__desc">
        Все права на&nbsp;материалы, находящиеся на&nbsp;сайте,
        охраняются в&nbsp;соответствии с&nbsp;законодательством&nbsp;РФ,
        в&nbsp;том числе об&nbsp;авторском праве и&nbsp;смежных правах.
      </p>

      <ul class="footer__data">
        <li>
          <a class="footer__link" href="#"
             target="_blank"
             rel="noopener"
             type="application/pdf"
          >
            Политика конфиденциальности
          </a>
        </li>
        <li>
          <a class="footer__link"
             href="#"
             target="_blank"
             rel="noopener"
             type="application/pdf"
          >
            Публичная оферта
          </a>
        </li>
      </ul>

      <span class="footer__copyright">
        © 2022 Moire
      </span>
    </div>
  </footer>
</template>
