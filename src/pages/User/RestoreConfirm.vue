<template>
  <div class="helper-simple">
    <main class="main">
      <div class="page page-form">
        <div class="logo">
          <router-link to="/">
            <i class="icon-logo" />
          </router-link>
        </div>
        <div class="form-wrapper">
          <form method="post" action="#" class="form form--confirm">
            <div class="form__heading">
              <h2 class="form__title">Восстановление пароля</h2>
              <div class="form__subtitle">
                Мы отправили ссылку для<br />восстановления пароля на ваш
                e-mail.
              </div>
            </div>
          </form>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'RestoreConfirm',
}
</script>
