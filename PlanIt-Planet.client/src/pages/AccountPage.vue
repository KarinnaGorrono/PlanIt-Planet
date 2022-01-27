<template>
  <div class="container-fluid">
    <div class="row">
      <div class="home-card p-5 rounded shadow elevation-5 mt-5">
        <img
          src="https://www.freeiconspng.com/thumbs/planet-icon/planet-icon-8.png"
          alt="PlanIt Icon"
          class="rounded-circle"
        />
        <h3 class="my-5 text-white p-3 rounded text-center">
          Welcome to Plan-It! <br />
          Please Log In To Get Started
        </h3>
        <button
          class="btn selectable text-white text-uppercase fs-3"
          @click="login"
          v-if="!user.isAuthenticated"
        >
          Login
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { AppState } from '../AppState'
export default {
  name: 'Account',
  setup() {
    return {

    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>