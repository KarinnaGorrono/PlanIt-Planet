<template>
  <div class="row" v-if="project">
    <div class="col-12">
      <div class="card p-2 mt-2">
        <div class="card-body p-4">
          <h1 class="text-secondary text-uppercase">
            <b> {{ project.name }} </b>
          </h1>
          <div class="d-flex justify-content-between pt-2 ps-1">
            <h5>
              {{ project.description }}
            </h5>

            <button
              class="btn btn-outline-secondary text-uppercase fw-bold"
              data-bs-target="#sprintModal"
              data-bs-toggle="modal"
              aria-label="create new sprint"
            >
              Create Sprint
            </button>
          </div>
          <div class="container p-3">
            <div class="row" v-for="s in sprints" :key="s.id">
              <div class="col-12 py-2">
                <Sprint :sprint="s" />
              </div>
            </div>
            <div class="d-flex justify-content-end">
              <button
                v-if="project.creator.id === account.id"
                class="
                  btn
                  text-secondary
                  mdi mdi-delete
                  text-uppercase
                  fw-bold
                  fs-2
                "
                @click="deleteProject"
                :aria-label="'delete' + project.name"
              ></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { computed } from "@vue/reactivity"
import { AppState } from "../AppState"
import { onMounted } from "@vue/runtime-core"
import { sprintsService } from "../services/SprintsService"
import Pop from "../utils/Pop"
import { useRoute } from "vue-router"
import { Modal } from "bootstrap"
import { logger } from "../utils/Logger"
import { projectsService } from "../services/ProjectsService"
import { router } from "../router"
export default {
  setup() {
    const route = useRoute()
    onMounted(async () => {
      try {
        await sprintsService.getSprints(route.params.id)
        logger.log('Sprints', AppState.sprints)
      } catch (error) {
        Pop.toast(error)
      }
    })
    return {
      async deleteProject() {
        try {
          if (window.confirm('Are you sure you want to delete this?')) {
            await projectsService.removeProject(route.params.id)
          }
          router.push({
            name: "Home"
          })
        } catch (error) {
          Pop.toast(error)
        }
      },
      async createSprint() {
        try {
          Modal.getOrCreateInstance(document.getElementById(""))
        } catch (error) {
          Pop.toast(error)
        }
      },
      sprints: computed(() => AppState.sprints),
      project: computed(() => AppState.projects.find(p => p.id == route.params.id)),
      account: computed(() => AppState.account)
    }
  },
}
</script>
<style scoped>
</style>