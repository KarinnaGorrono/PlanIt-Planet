<template>
  <div class="container-fluid bg">
    <div
      class="
        home
        flex-grow-1
        d-flex
        flex-column
        align-items-center
        justify-content-center
        pt-5
      "
    >
      <div class="home-card p-3 pt-5 rounded shadow elevation-5">
        <img
          :src="account.picture"
          :alt="account.name + 'picture'"
          class="user-img shadow"
        />
        <h2
          class="
            my-5
            text-secondary text-uppercase text-shadow
            p-3
            rounded
            text-center
            display-2
          "
        >
          Welcome {{ account.name }}
        </h2>

        <i
          class="
            mdi mdi-pencil-outline
            d-flex
            justify-content-end
            fs-2
            text-secondary
            selectable
          "
          data-bs-toggle="modal"
          data-bs-target="#edit-profile-modal"
        ></i>
      </div>
    </div>
  </div>
  <EditProfileModal id="edit-profile-modal" />
</template>


<script>
import { computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import { Modal } from "bootstrap"
export default {
  name: 'Account',
  setup() {
    return {
      user: computed(() => AppState.user),
      account: computed(() => AppState.account)

    }
  }
}
</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;
  .home-card {
    width: 50vw;
    background: rgba(169, 194, 237, 0.5);
    margin-top: 6em;
    > img {
      height: 300px;
      max-width: 300px;
      border-radius: 150px;
      width: 100%;
      object-fit: cover;
      object-position: center;
    }
  }
}

.bg {
  min-height: 100vh;
  background-image: url("https://cutewallpaper.org/21/galaxy-gif-background/Galaxy-Clouds-Tumblr-Free-Blue-Hipster-Backgrounds-With-Cute-.gif");
  background-position: center;
  background-size: cover;
}

.text-shadow {
  text-shadow: 1px 1px 1px rgb(255, 255, 255);
}
</style>