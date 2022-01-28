<template>
  <div class="container-fluid bg">
    <div class="row" v-if="account.id">
      <div class="col-1 p-0 d-flex flex-column">
        <LeftControls />
      </div>
      <div class="col-10 text-center mt-5 ms-4">
        <div class="card mt-5 elevation-3">
          <div class="card-body">
            <div class="row justify-content-between">
              <div
                class="
                  col-md-4
                  text-start
                  mx-4
                  text-secondary text-shadow
                  fw-bolder
                "
              >
                <h1>PROJECTS</h1>
              </div>
              <div class="col-md-4 text-end mx-4">
                <button
                  class="btn btn-outline-secondary text-uppercase fw-bold"
                  @click="createModal()"
                  aria-label="create new project"
                >
                  Create Project
                </button>
              </div>
            </div>
            <div class="row justify-content-center pt-4">
              <div class="col-md-10 pt-3">
                <div class="row">
                  <div
                    class="
                      col-md-4
                      text-primary
                      fw-bold
                      fs-5
                      text-shadow
                      border-bottom border-2
                    "
                  >
                    NAME
                  </div>
                  <div
                    class="
                      col-md-4
                      text-primary
                      fw-bold
                      fs-5
                      text-shadow
                      border-bottom border-2
                    "
                  >
                    MEMBERS
                  </div>
                  <div
                    class="
                      col-md-4
                      text-primary
                      fw-bold
                      fs-5
                      text-shadow
                      border-bottom border-2
                    "
                  >
                    STARTED
                    <div class="div"></div>
                  </div>
                </div>
                <div
                  class="row py-3 align-items-center"
                  v-for="p in projects"
                  :key="p.name"
                >
                  <div
                    class="col-md-4 text-dark lighten-25 selectable fs-4 pt-2"
                    @click="Push(p.id)"
                  >
                    <p>{{ p.name }}</p>
                  </div>
                  <div class="col-md-4">
                    <img
                      class="rounded-circle img-fluid user-img"
                      :src="p.creator?.picture"
                      :alt="account.name + 'picture'"
                    />
                  </div>
                  <div
                    class="
                      col-md-4
                      text-dark
                      d-flex
                      justify-content-center
                      align-items-middle
                    "
                  >
                    <p class="align-self-end d-flex mx-3 fs-5">
                      {{ new Date(p.createdAt).toLocaleString() }}
                    </p>
                    <button
                      class="
                        btn
                        mdi mdi-delete
                        selectable
                        text-secondary
                        py-3
                        ps-4
                      "
                      :aria-label="'delete' + p.name"
                      @click="removeProject(p.id)"
                    ></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-1"></div>
    </div>
    <div
      v-else
      class="
        home
        flex-grow-1
        d-flex
        flex-column
        align-items-center
        justify-content-center
      "
    >
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
import { Modal } from "bootstrap"
import { useRouter } from "vue-router"
import { AppState } from "../AppState"
import { computed } from "@vue/reactivity"
import { logger } from "../utils/Logger"
import { projectsService } from "../services/ProjectsService"
import Pop from "../utils/Pop"
export default {
  setup() {
    const router = useRouter()
    return {
      name: "Home",
      Push(id) {
        router.push({
          name: "Project",
          params: { id: id }
        })
      },
      async editModal() {
        const modalElem = document.getElementById("editproj-modal")
        Modal.getOrCreateInstance(modalElem).toggle()
      },
      async createModal() {
        const modalElem = document.getElementById("createproj-modal")
        Modal.getOrCreateInstance(modalElem).toggle()
      },
      async selectorCanvas() {
        const canvasElem = document.getElementById('proj-offcanvas')
        Modal.getOrCreateInstance(canvasElem).toggle()
      },
      async taskCanvas() {
        const canvasElem = document.getElementById('task-details')
        Modal.getOrCreateInstance(canvasElem).toggle()
      },
      async removeProject(id) {
        try {
          if (window.confirm('Are you sure you want to delete this?')) {

            await projectsService.removeProject(id)
          }
        } catch (error) {
          logger.log(error)
          Pop.toast(error.message)
        }
      },
      projects: computed(() => AppState.projects),
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
    > img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
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
.h-10 {
  height: 10%;
}

.text-shadow {
  text-shadow: 1px 1px 1px rgb(255, 255, 255);
}

.user-img {
  height: 45px;
  width: 45px;
  border-radius: 50px;
}
</style>
