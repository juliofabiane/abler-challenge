<template>
  <header>
    <b-navbar toggleable="lg" type="dark">
      <b-container>
        <nuxt-link to="/" class="logo">
          <img src="~/assets/images/logo.svg" alt="The Movie DB" />
        </nuxt-link>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <div class="d-flex justify-content-between align-items-center w-100">
            <div class="d-flex">
              <b-navbar-nav>
                <nuxt-link class="nav-link" to="/">Início</nuxt-link>
              </b-navbar-nav>
              <b-navbar-nav>
                <nuxt-link class="nav-link" to="/favorites">
                  Favoritos
                </nuxt-link>
              </b-navbar-nav>
            </div>

            <b-navbar-nav v-if="!$store.state.auth">
              <nuxt-link class="nav-link" to="/login">Login</nuxt-link>
            </b-navbar-nav>

            <b-nav-item-dropdown right v-if="$store.state.auth">
              <template #button-content>
                <em>{{ $store.state.auth.username }}</em>
              </template>
              <b-dropdown-item @click="logout()">Logout</b-dropdown-item>
            </b-nav-item-dropdown>
          </div>
        </b-collapse>
      </b-container>
    </b-navbar>
  </header>
</template>

<script>
const Cookie = process.client ? require("js-cookie") : undefined;

export default {
  methods: {
    logout() {
      this.$store.commit("setAuth", null);
      Cookie.remove("auth");
    },
  },
};
</script>

<style lang="scss">
header {
  background: #141414;
  color: #fff;

  .navbar {
    padding-top: 0;
    padding-bottom: 0;

    .logo {
      width: 155px;
      margin: 0 16px 4px 0;
      padding: 14px 0;
    }

    .nav-link {
      padding: 1rem !important;
      font-weight: 500;
      color: var(--light) !important;

      &:hover {
        background: var(--primary);
      }
    }

    li {
      list-style-type: none;
    }
  }
}
</style>