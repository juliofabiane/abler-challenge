<template>
  <div>
    <div
      class="cover"
      v-bind:style="{
        'background-image':
          'url(' +
          baseImagesUrl +
          '/w1920_and_h800_multi_faces' +
          movie.backdrop_path +
          ')',
      }"
    >
      <div class="overlay"></div>
      <div class="container">
        <div class="movie-details">
          <b-row>
            <b-col lg="4">
              <div class="poster">
                <b-img
                  v-if="movie.poster_path"
                  :src="
                    baseImagesUrl + '/w300_and_h450_bestv2' + movie.poster_path
                  "
                  fluid
                  :alt="movie.title"
                ></b-img>
                <b-img
                  v-if="!movie.poster_path"
                  src="~/assets/images/no-image.png"
                  fluid
                  :alt="movie.title"
                ></b-img>
              </div>
            </b-col>
            <b-col lg="8">
              <div class="details">
                <h1>
                  {{ movie.title }}
                </h1>

                <p v-if="movie.tagline">
                  <i>{{ movie.tagline }}</i>
                </p>

                <ul>
                  <li>{{ movie.release_date | formatDate }}</li>
                  <li>
                    <span
                      v-for="(genre, index) in movie.genres"
                      :key="genre.id"
                    >
                      <span v-if="index > 0">,</span> {{ genre.name }}
                    </span>
                  </li>
                  <li>{{ movie.runtime | formatTime }}</li>
                </ul>

                <div class="progress-container">
                  <small
                    >Avaliação dos usuários: {{ movie.vote_average * 10 }}%</small
                  >
                  <b-progress
                    height="3px"
                    :value="movie.vote_average * 10"
                    :max="100"
                    :variant="movie.vote_average > 7 ? 'success' : 'warning'"
                  ></b-progress>
                </div>

                <p>{{ movie.overview }}</p>

                <div
                  class="actions"
                  v-if="$store && $store.state && $store.state.auth"
                >
                  <b-button
                    variant="secondary"
                    v-if="status && status.favorite"
                    @click="toggleFavorite()"
                    :disabled="loading"
                  >
                    <b-spinner
                      small
                      type="grow"
                      class="mr-1"
                      v-if="loading"
                    ></b-spinner>
                    Remover dos favoritos
                  </b-button>
                  <b-button
                    variant="primary"
                    v-if="$store.state.auth.session_id && !status.favorite"
                    @click="toggleFavorite()"
                    :disabled="loading"
                  >
                    <b-spinner
                      small
                      type="grow"
                      class="mr-1"
                      v-if="loading"
                    ></b-spinner>
                    Adicionar aos favoritos
                  </b-button>
                </div>
              </div>
            </b-col>
          </b-row>
        </div>
      </div>
    </div>
    <b-container class="mt-4" v-if="similarMovies.length">
      <h2 class="text-center text-md-left">Títulos similares</h2>
      <ListMovies v-bind:movies="similarMovies" />
    </b-container>
  </div>
</template>

<script>
import moment from "moment";

export default {
  head() {
    return {
      title: this.movie.title,
    };
  },
  data() {
    return {
      baseImagesUrl: process.env.BASE_API_IMAGES_URL,
      loading: false,
    };
  },
  async asyncData(context) {
    const { id } = context.params;
    const movie = await context.$axios.get(
      `/movie/${id}?api_key=${process.env.API_KEY}&language=pt-BR`
    );
    const similar = await context.$axios.get(
      `/movie/${id}/similar?api_key=${process.env.API_KEY}&language=pt-BR`
    );

    let status = {
      data: null,
    };
    if (context.store.state.auth) {
      const { session_id } = context.store.state.auth;
      status = await context.$axios.get(
        `/movie/${id}/account_states?api_key=${process.env.API_KEY}&session_id=${session_id}&language=pt-BR`
      );
    }
    return {
      movie: movie.data,
      similarMovies: similar.data.results.slice(0, 5),
      status: status.data,
    };
  },
  methods: {
    async toggleFavorite() {
      this.loading = true;
      const favorite = !this.status.favorite;
      const { account_id, session_id } = this.$store.state.auth;

      const body = {
        media_type: "movie",
        media_id: this.movie.id,
        favorite: favorite,
      };

      const { data } = await this.$axios.post(
        `/account/${account_id}/favorite?api_key=${process.env.API_KEY}&session_id=${session_id}&language=pt-BR`,
        body
      );

      this.status.favorite = favorite;
      this.loading = false;
    },
  },
  filters: {
    formatDate: function (value) {
      return moment(String(value)).format("MM/DD/YYYY");
    },
    formatYear: function (value) {
      return moment(String(value)).format("YYYY");
    },
    formatTime: function (input) {
      // set minutes to seconds
      let seconds = input * 60;

      // calculate (and subtract) whole hours
      const hours = Math.floor(seconds / 3600) % 24;
      seconds -= hours * 3600;

      // calculate (and subtract) whole minutes
      const minutes = Math.floor(seconds / 60) % 60;

      return hours + "h " + minutes + "m ";
    },
  },
};
</script>

<style lang="scss">
.cover {
  position: relative;
  background-size: cover;
  background-position: center;
  padding-top: 16px;

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgb(0, 0, 0);
    background: radial-gradient(
      circle,
      rgba(0, 0, 0, 0.8) 50%,
      rgba(0, 0, 0, 0.44021358543417366) 100%
    );
  }
}

.movie-details {
  color: var(--light);
  padding: 32px;

  .poster {
    margin-bottom: 16px;
    img {
      border-radius: 10px;
    }
  }

  ul {
    padding-left: 1.2rem;
  }

  .progress-container {
    max-width: 250px;
    margin-bottom: 16px;
  }
}
</style>