<template>
  <div class="row" v-if="project">
    <div class="col-12">
      <div class="card p-2 mt-2">
        <div class="card-body p-4">
          <h2>
            <b> {{ project.name }} </b>
          </h2>
          <div class="d-flex justify-content-between">
            <h5>
              {{ project.description }}
            </h5>
           <button
              class="btn btn-primary"
              data-bs-target="#sprintModal"
              data-bs-toggle="modal"
            >
              Create Sprint
            </button>
          </div>
          <div class="container p-3">
            <div class="row" v-for="s in sprints" :key="s.id">
              <div class="col-12">
                <Sprint :sprint="s" />
              </div>
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
          await projectsService.removeProject(route.params.id)
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
      project: computed(() => AppState.projects.find(p => p.id == route.params.id))
    }
  },
}
</script>
<style scoped>
</style>