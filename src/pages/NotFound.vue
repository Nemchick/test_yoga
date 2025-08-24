<template>
  <main class="main">
    <div class="page page-error">
      <div class="container">
        <div class="page-error__content">
          <h2 class="page-error__title">Ошибка 404</h2>
          <p class="page-error__description">Страница не найдена.</p>
          <a class="button button--s1 button--t1" @click="$router.push('/')">
            Вернуться назад
          </a>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: 'NotFound',
}
</script>

<style scoped></style>
