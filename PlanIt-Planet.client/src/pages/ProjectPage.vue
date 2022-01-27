<template>
  <div class="project container-fluid bg">
    <div class="row" v-if="account.id">
      <div class="col-1 p-0 d-flex flex-column">
        <LeftControls />
      </div>
      <div class="col-10 flex-column project-card ms-4">
        <Project />
      </div>
      <div class="col-1"></div>
    </div>
  </div>
  <SprintModal />
</template>


<script>
import { computed, onMounted } from "@vue/runtime-core"
import { projectsService } from "../services/ProjectsService"
import { useRoute, useRouter } from "vue-router"
import { logger } from "../utils/Logger"
import { AppState } from "../AppState"
import { tasksService } from "../services/TasksService"
export default {
  setup() {
    const route = useRoute();
    onMounted(async () => {
      // projectsService.setActive(route.params.id)
      tasksService.getTasks(route.params.id)
    })
    return {
      tasks: computed(() => AppState.tasks),
      projects: computed(() => AppState.projects),
      sprints: computed(() => AppState.sprints),
      notes: computed(() => AppState.notes),
      activeProject: computed(() => AppState.projects.find(p => p.id == route.params.id)),
      account: computed(()=> AppState.account)
    }
  }
}
</script>


<style lang="scss" scoped>
.bg {
  min-height: 100vh;
  background-image: url("https://cutewallpaper.org/21/galaxy-gif-background/Galaxy-Clouds-Tumblr-Free-Blue-Hipster-Backgrounds-With-Cute-.gif");
  background-position: center;
  background-size: cover;
}

.project-card{
  margin-top: 6em;
}
</style>