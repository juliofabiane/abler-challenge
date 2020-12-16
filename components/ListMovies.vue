<template>
  <div class="list-movies">
    <div
      class="d-flex flex-wrap justify-content-center justify-content-md-start"
    >
      <nuxt-link
        class="card-container"
        :to="'/movie/' + movie.id"
        v-for="movie in movies"
        :key="movie.id"
      >
        <div class="overlay"></div>
        <b-card
          bg-variant="dark"
          text-variant="white"
          :img-src="
            movie.poster_path
              ? baseImagesUrl + '/w220_and_h330_face' + movie.poster_path
              : ''
          "
          :img-alt="movie.title"
          img-top
          tag="article"
        >
          <b-card-img
            class="no-image"
            img-top
            v-if="!movie.poster_path"
            src="~/assets/images/no-image.png"
            :alt="movie.title"
          ></b-card-img>

          <div class="year">
            <b-badge variant="primary" class="mb-3">
              {{ movie.release_date | formatYear }}
            </b-badge>
          </div>

          <b-card-title>
            {{ movie.title }}
          </b-card-title>

          <div class="progress-container">
            <small>{{ movie.vote_average * 10 }}%</small>

            <b-progress
              height="3px"
              :value="movie.vote_average * 10"
              :max="100"
              :variant="movie.vote_average > 7 ? 'success' : 'warning'"
            ></b-progress>
          </div>
        </b-card>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  data() {
    return {
      baseImagesUrl: process.env.BASE_API_IMAGES_URL,
      currentYear: new Date().getFullYear(),
    };
  },
  filters: {
    formatYear: function (value) {
      return moment(String(value)).format("YYYY");
    },
  },
  props: {
    movies: Array,
  },
};
</script>

<style lang="scss">
.list-movies {
  margin: 0 -8px;

  .card-container {
    display: flex;
    position: relative;
    margin: 0 8px 16px;

    &:hover {
      text-decoration: none;
      .overlay {
        display: block;
      }
    }

    .overlay {
      display: none;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
      background: rgba(100, 100, 100, 0.1);
    }

    .card {
      width: 209px;

      .card-title {
        font-size: 1rem;
      }

      .year {
        text-align: right;
        margin-top: -38px;
        position: relative;
        bottom: 8px;

        .badge {
          -webkit-box-shadow: 0px 0px 50px 0px #000000;
          box-shadow: 0px 0px 50px 0px #000000;
        }
      }

      .card-body {
        padding: 1rem;
        padding-bottom: 2.5rem;
      }

      .progress-container {
        text-align: right;
        position: absolute;
        bottom: 1rem;
        width: calc(100% - 2.5rem);
      }

      .no-image {
        margin: -19px -19px 30px;
        width: calc(100% + 38px);
      }
    }
  }
}

@media screen and (max-width: 1199px) {
  .list-movies {
    .card-container {
      .card {
        width: 220px;
      }
    }
  }
}
@media screen and (max-width: 991px) {
  .list-movies {
    .card-container {
      .card {
        width: 219px;
      }
    }
  }
}
@media screen and (max-width: 767px) {
  .list-movies {
    .card-container {
      .card {
        width: 247px;
      }
    }
  }
}

@media screen and (max-width: 539px) {
  .list-movies {
    .card-container {
      width: 100%;
      .card {
        width: 100%;
      }
    }
  }
}
</style>