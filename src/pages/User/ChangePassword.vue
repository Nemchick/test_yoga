<template>
  <main class="main">
    <div class="page page-user">
      <div class="container">
        <div class="form form--change-password" v-if="currentStep === 1">
          <div class="form__heading">
            <h2 class="form__title">Сменить пароль</h2>
          </div>
          <div class="form__description">Для этого введите текущий пароль</div>
          <fieldset class="form__section">
            <div class="form__input form__input--password input">
              <span
                class="pass-switch"
                :class="{
                  'icon-hide': oldPasswordShow === true,
                  'icon-view': oldPasswordShow === false,
                }"
                @click="oldPasswordShow = !oldPasswordShow"
              />
              <input
                :type="oldPasswordShow ? 'text' : 'password'"
                id="pass"
                v-model="$v.oldPassword.$model"
                placeholder="Текущий пароль"
              />
            </div>
          </fieldset>
          <fieldset class="form__section form__section--submit">
            <button
              type="submit"
              :class="{ disabled: $v.oldPassword.$invalid }"
              :disabled="$v.oldPassword.$invalid"
              class="button button--t2"
              @click="currentStep = 2"
            >
              <span>Продолжить</span>
            </button>
          </fieldset>
        </div>
        <div class="form form--change-password" v-if="currentStep === 2">
          <div class="form__heading">
            <h2 class="form__title">Смена пароля</h2>
          </div>
          <div class="form__description">Придумайте новый пароль.</div>
          <fieldset class="form__section">
            <div
              class="form__input form__input--password input"
              :class="{ error: $v.newPassword.$error }"
            >
              <span
                class="pass-switch"
                :class="{
                  'icon-hide': newPasswordShow === true,
                  'icon-view': newPasswordShow === false,
                }"
                @click="newPasswordShow = !newPasswordShow"
              />
              <input
                :type="newPasswordShow ? 'text' : 'password'"
                id="pass"
                v-model.lazy="$v.newPassword.$model"
                placeholder="Новый пароль"
              />
              <div
                class="form__notification form__notification--error"
                v-if="!$v.newPassword.minLength"
              >
                Введите не менее 8 символов
              </div>
            </div>
            <div
              class="form__input form__input--password input"
              :class="{ error: $v.newPasswordConfirm.$error }"
            >
              <span
                class="pass-switch"
                :class="{
                  'icon-hide': newPasswordConfirmShow === true,
                  'icon-view': newPasswordConfirmShow === false,
                }"
                @click="newPasswordConfirmShow = !newPasswordConfirmShow"
              />
              <input
                :type="newPasswordConfirmShow ? 'text' : 'password'"
                id="pass"
                v-model.lazy="$v.newPasswordConfirm.$model"
                placeholder="Новый пароль"
              />
              <div
                class="form__notification form__notification--error"
                v-if="
                  !$v.newPasswordConfirm.sameAsPassword &&
                  newPasswordConfirm !== ''
                "
              >
                Пароли не совпадают
              </div>
            </div>
          </fieldset>
          <fieldset class="form__section form__section--submit">
            <button
              :class="{
                disabled:
                  $v.newPassword.$invalid || $v.newPasswordConfirm.$invalid,
              }"
              :disabled="
                $v.newPassword.$invalid || $v.newPasswordConfirm.$invalid
              "
              class="button button--t2"
              @click="changePassword"
            >
              <span>Сохранить</span>
            </button>
          </fieldset>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { minLength, required, sameAs } from 'vuelidate/lib/validators'
import { mapActions } from 'vuex'

export default {
  name: 'ChangePassword.vue',
  data() {
    return {
      oldPassword: '',
      oldPasswordShow: false,
      newPassword: '',
      newPasswordShow: false,
      newPasswordConfirm: '',
      newPasswordConfirmShow: false,
      currentStep: 1,
    }
  },
  validations: {
    oldPassword: {
      required,
      minLength: minLength(8),
    },
    newPassword: {
      required,
      minLength: minLength(8),
    },
    newPasswordConfirm: {
      required,
      minLength: minLength(8),
      sameAsPassword: sameAs('newPassword'),
    },
  },
  methods: {
    ...mapActions('shared', ['setSuccess']),
    changePassword() {
      const payload = {
        old: this.oldPassword,
        new: this.newPassword,
      }
      this.$http.put('/api/user/password', payload).then(() => {
        this.setSuccess('Пароль успешно изменен')
        this.$router.push('/')
      })
    },
  },
}
</script>

<style scoped></style>
