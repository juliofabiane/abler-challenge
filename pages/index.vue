<template>
  <div>
    <div class="banner">
      <div class="overlay">
        <b-container class="banner-container">
          <div class="banner-text">
            <h1>Milhares de Filmes, Séries e muito mais para você descobrir</h1>
            <h2>Explore agora!</h2>
          </div>

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
        </b-container>
      </div>
    </div>

    <b-container class="mt-4">
      <h2 class="text-center text-md-left">Os mais populares</h2>
      <ListMovies v-bind:movies="popularMovies" />
    </b-container>
  </div>
</template>

<script>
export default {  
  head() {
    return {
      title: "The Movie DB",
    };
  },
  data() {
    return {
      searchText: "",
      baseImagesUrl: process.env.BASE_API_IMAGES_URL,
    };
  },
  async asyncData(context) {
    const { data } = await context.$axios.get(
      `/movie/popular?api_key=${process.env.API_KEY}&language=pt-BR`
    );
    return { popularMovies: data.results };
  },
};
</script>

<style lang="scss">
.banner {
  background: url("~@/assets/images/banner.jpg") no-repeat center;
  background-size: cover;
  width: 100%;
  color: var(--light);

  .overlay {
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(25, 25, 25, 0.75);
  }

  .banner-container {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 7rem 0;
    max-width: 700px;
  }

  .banner-text {
    text-align: center;
    h1 {
      font-weight: 700;
    }
  }

  .search-container {
    margin-top: 40px;
    width: 500px;
    max-width: 100%;

    .form-control {
      border-radius: 1.5rem 0 0 1.5rem;
      padding: 1.5rem 1.8rem 1.5rem 1.5rem;

      -webkit-box-shadow: -50px 0px 50px 0px rgba(0, 0, 0, 0.52);
      box-shadow: -50px 0px 50px 0px rgba(0, 0, 0, 0.52);
    }

    button.btn {
      font-weight: 500;
      border-radius: 1.5rem;
      padding: 0 1.5rem;
      margin-left: -22px;
      z-index: 5;

      -webkit-box-shadow: 50px 0px 50px 0px rgba(0, 0, 0, 0.52);
      box-shadow: 50px 0px 50px 0px rgba(0, 0, 0, 0.52);
    }
  }
}

h2 {
  color: var(--light);
  margin-bottom: 20px;
}
</style>