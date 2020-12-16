<template>
  <div>
    <b-container class="mt-4">
      <div class="favorites" v-if="favoriteMovies.length">
        <h2 class="text-center text-md-left">Meus filmes favoritos</h2>
        <ListMovies v-bind:movies="favoriteMovies" />
      </div>
      <div v-if="!favoriteMovies.length">
        <h5 class="text-center text-md-left text-white">
          Você ainda não adicionou nenhum filme à lista de favoritos.
          <nuxt-link to="/">Voltar ao início</nuxt-link>
        </h5>
      </div>
    </b-container>
  </div>
</template>

<script>
export default {
  middleware: "authenticated",
  data() {
    return {
      baseImagesUrl: process.env.BASE_API_IMAGES_URL,
    };
  },
  async asyncData(context) {
    const { account_id, session_id } = context.store.state.auth;

    const { data } = await context.$axios.get(
      `account/${account_id}/favorite/movies?api_key=${process.env.API_KEY}&session_id=${session_id}&language=pt-BR`
    );

    return {
      favoriteMovies: data.results,
    };
  },
};
</script>