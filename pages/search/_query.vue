<template>
  <div>
    <b-container class="mt-4">
      <div class="search-container">
        <b-form :action="'/search/' + searchText">
          <b-input-group>
            <b-form-input
              placeholder="Títulos, gêneros, pessoas..."
              v-model="searchText"
            ></b-form-input>
            <b-input-group-append>
              <b-button type="submit" variant="primary">Buscar</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form>
      </div>
      <ListMovies v-bind:movies="movies" />
    </b-container>
  </div>
</template>

<script>
export default {  
  head() {
    return {
      title: this.query,
    };
  },
  mounted() {
    this.searchText = this.query;
  },
  data() {
    return {
      searchText: "",
      baseImagesUrl: process.env.BASE_API_IMAGES_URL,
    };
  },
  async asyncData(context) {
    const { query } = context.params;
    const { data } = await context.$axios.get(
      `search/movie?api_key=${process.env.API_KEY}&query=${query}&language=pt-BR`
    );

    return {
      movies: data.results,
      query: query,
    };
  },
};
</script>

<style lang="scss">
h2 {
  color: var(--light);
  margin-bottom: 20px;
}

.search-container {
  margin: 30px 0;

  .form-control {
    border-radius: 1.5rem 0 0 1.5rem;
    padding: 1.5rem 1.8rem 1.5rem 1.5rem;
  }

  button.btn {
    font-weight: 500;
    border-radius: 1.5rem;
    padding: 0 1.5rem;
    margin-left: -22px;
    z-index: 5;
  }
}
</style>