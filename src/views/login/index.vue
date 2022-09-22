<template>
  <el-container style="height: 100%;">
    <el-aside width="25%" class="login-aside" :style="{ backgroundImage: `url(${ibbIgdasLogo})` }">
      <el-header height="15%" style="position: relative;">
        <h1 class="login-aside-header-title">AEP</h1>
      </el-header>
      <el-main>
        <h2 class="login-aside-main-title">İGDAŞ Acil Eylem Plan Uygulaması</h2>
      </el-main>
    </el-aside>
    <div class="login-container">
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="on" label-position="left">

        <div class="title-container">
          <h3 v-if="false" class="title">AEP</h3>
          <img v-else class="logo" src="@/assets/logo.svg">
        </div>

        <el-form-item prop="username">
          <span class="svg-container">
            <svg-icon icon-class="user" />
          </span>
          <el-input
            ref="username"
            v-model="loginForm.username"
            placeholder="Çalışan Kodu"
            name="username"
            type="text"
            tabindex="1"
            autocomplete="on"
          />
        </el-form-item>

        <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
          <el-form-item prop="password">
            <span class="svg-container">
              <svg-icon icon-class="password" />
            </span>
            <el-input
              :key="passwordType"
              ref="password"
              v-model="loginForm.password"
              :type="passwordType"
              placeholder="Şifre"
              name="password"
              tabindex="2"
              autocomplete="on"
              @keyup.native="checkCapslock"
              @blur="capsTooltip = false"
              @keyup.enter.native="handleLogin"
            />
            <span class="show-pwd" @click="showPwd">
              <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
            </span>
          </el-form-item>
        </el-tooltip>

        <div style="position:relative">
          <el-button
            type="primary"
            class="thirdparty-button"
            :loading="loading"
            @click.native.prevent="handleLogin"
          >
            Giriş Yap
          </el-button>
        </div>
      </el-form>

      <div class="login-footer">© {{ new Date().getFullYear() }} |
        <a href="https://igdas.istanbul" target="_blank">İGDAŞ</a>
      </div>

      <img src="@/assets/millionImage.png" class="millionImageClass">

    </div>
  </el-container>
</template>

<script>
import ibbIgdasLogo from '@/assets/ibb_igdas_logo.png'
export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (value.length === 0) {
        callback(new Error('Çalışan kodu alanı boş bırakılamaz'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length === 0) {
        callback(new Error('Şifre alanı boş bırakılamaz'))
      } else {
        callback()
      }
    }
    return {
      ibbIgdasLogo,
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      redirect: undefined,
      otherQuery: {},
      origin: window.location.origin
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  mounted() {
    if (this.loginForm.username === '') {
      this.$refs.username.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
  },
  methods: {
    checkCapslock(e) {
      const { key } = e
      this.capsTooltip = key && key.length === 1 && (key >= 'A' && key <= 'Z')
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('auth/login', this.loginForm)
            .then(() => {
              this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          return false
        }
      })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    }
  }
}
</script>

<style>

  .login-aside {
    height: 100%;
    background-color: rgb(48, 65, 86);
    background-repeat: no-repeat;
    background-position: bottom 15% center;
    background-size: 75%;
  }

  .login-aside-header-title {
    color: white;
    text-align: center;
    position: absolute;
    left: 50%; bottom: 0px;
    transform: translateX(-50%);
    font-size: xxx-large;
    text-shadow: 2px 3px black;
    font-family: verdana;
  }

  .login-aside-main-title {
    color: white;
    text-align: center;
    font-size: larger;
    text-shadow: 1.5px 2.5px black;
    font-family: verdana;
  }

  .login-footer {
    position: fixed;
    bottom: 0px;
    left: 62.5%;
    transform: translateX(-50%);
    color: #8197A2;
    padding-bottom: 20px;
    font-size: small;
    word-spacing: 10px;
    font-family: verdana;
  }

  .millionImageClass {
    float: right;
    height: 13%;
    bottom: 0;
    right: 0;
    position: fixed;
  }

</style>

<style lang="scss">

$bg:#e5e5e5;
$cursor: #000;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

.login-container {
  .el-input {
    display: inline-block;
    height: 67px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      height: 67px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg:#fff;
$dark_gray:#889aa4;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    top: 50%;
    transform: translateY(-75%);
    margin: 0 auto;
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
    line-height: 55px;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: -50px;
    height: 50px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }

  .logo {
    display: block;
    margin: 0px auto 25px auto;
    width: 25%;
    height: 25%;
  }
}
</style>
