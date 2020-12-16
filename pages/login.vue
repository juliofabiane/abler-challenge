<template>
  <div class="login-container">
    <div class="overlay"></div>
    <b-card bg-variant="dark" text-variant="white">
      <div class="text-center mb-4">
        <h2>Login</h2>
      </div>

      <b-form @submit="onSubmit" action="">
        <b-form-group label="Nome de usuário" label-for="username" class="mb-4">
          <b-form-input
            id="username"
            v-model="form.username"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group label="Senha" label-for="password">
          <b-form-input
            id="password"
            v-model="form.password"
            type="password"
            required
          ></b-form-input>
        </b-form-group>

        <div class="text-right">
          <b-button type="submit" variant="primary" :disabled="loading">
            <b-spinner
              small
              type="grow"
              class="mr-1"
              v-if="loading"
            ></b-spinner>
            Entrar
          </b-button>
        </div>
      </b-form>
    </b-card>
  </div>
</template>

<script>
const Cookie = process.client ? require("js-cookie") : undefined;

export default {
  layout: "blank",
  head() {
    return {
      title: "Login",
    };
  },
  data() {
    return {
      form: {
        username: "",
        password: "",
        request_token: "",
      },
      loading: false,
    };
  },
  methods: {
    async onSubmit(event) {
      event.preventDefault();
      this.loading = true;
      const { data } = await this.$axios.get(
        `authentication/token/new?api_key=${process.env.API_KEY}`
      );
      if (data.success) {
        const { request_token } = data;
        this.form.request_token = request_token;
        const loginResult = await this.$axios
          .post(
            `authentication/token/validate_with_login?api_key=${process.env.API_KEY}`,
            this.form
          )
          .catch((error) => {
            console.log(error);
            this.$bvToast.toast(
              "Não foi possível efetuar o login, verifique os dados e tente novamente.",
              {
                title: "Oops :(",
                variant: "danger",
              }
            );
          });
        if (loginResult && loginResult.data && loginResult.data.success) {
          const { request_token } = loginResult.data;

          const session = await this.$axios.post(
            `authentication/session/new?api_key=${process.env.API_KEY}`,
            { request_token: request_token }
          );

          if (session && session.data) {
            const { session_id } = session.data;

            const account = await this.$axios.get(
              `account?api_key=${process.env.API_KEY}&session_id=${session_id}`
            );

            if (account && account.data) {
              const auth = {
                username: this.form.username,
                account_id: account.data.id,
                request_token: this.form.request_token,
                session_id: session_id,
              };

              this.$store.commit("setAuth", auth);
              Cookie.set("auth", auth);
              this.$router.push("/");

              this.$bvToast.toast(`Seja bem vindo, ${auth.username}!`, {
                title: "Sucesso :)",
                variant: "success",
              });
            }
          }
        }
        this.loading = false;
      }
    },
  },
};
</script>

<style lang="scss">
html,
body,
#__nuxt,
#__layout,
#__layout > div {
  height: 100%;
}
.login-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  background: url("~@/assets/images/banner.jpg") no-repeat center;
  background-size: cover;

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(25, 25, 25, 0.75);
  }

  .card {
    padding: 2rem;
    -webkit-box-shadow: 0px 0px 50px 0px #000000;
    box-shadow: 0px 0px 50px 0px #000000;
  }
}
</style>