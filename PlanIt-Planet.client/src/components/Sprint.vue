<template>
  <div class="row">
    <div class="col-12">
      <div class="card p-3 elevation-2 m-1">
        <div class="card-text">
          <div class="row justify-content-between">
            <div class="col-12">
              <div
                class="
                  row
                  selectable
                  d-flex
                  align-items-center
                  accordian-button
                  collapsed
                "
                id="accordianFlushParent"
                data-bs-toggle="collapse"
                :data-bs-target="'#flush' + sprint.id"
              >
                <div class="col-12 d-flex justify-content-between">
                  <div class="d-flex p-1">
                    <h3 class="text-primary text-uppercase fw-bold pt-2">
                      {{ sprint.name }}
                    </h3>
                  </div>
                  <div class="d-flex p-1">
                    <p class="mdi mdi-weight fs-2 text-primary">
                      {{ totalWeight }}
                    </p>
                  </div>
                </div>
              </div>
              <div class="d-flex justify-content-start">
                <button
                  :aria-label="'add task for' + sprint.name"
                  class="btn btn-outline-primary text-uppercase"
                  data-bs-toggle="modal"
                  :data-bs-target="'#createtask-modal-' + sprint.id"
                >
                  Add Task
                </button>
              </div>
            </div>
          </div>
          <div class="row pt-4" :id="'flush' + sprint.id">
            <div class="col-12 py-3" v-for="t in tasks" :key="t">
              <Task :task="t" />
            </div>
          </div>
        </div>
        <TaskOffCanvas :sprint="sprint" />
      </div>
      <CreateTaskModal
        :sprintId="sprint.id"
        :id="'createtask-modal-' + sprint.id"
      />
    </div>
  </div>
</template>
<script>
import { computed, onMounted } from "@vue/runtime-core"
import { logger } from "../utils/Logger"
import { sprintsService } from "../services/SprintsService"
import Pop from "../utils/Pop"
import { useRoute } from "vue-router"
import { AppState } from "../AppState"
export default {
  props: { sprint: { type: Object, required: true } },
  setup(props) {
    const route = useRoute()
    onMounted(() => {
      logger.log('prop', props.sprint)
    })
    return {
      async deleteSprint() {
        if (window.confirm('Are you sure you want to delete this')) {

          await sprintsService.deleteSprint(route.params.id, props.sprint.id)
          Pop.toast('Deleted')
        }
      },
      projects: computed(() => AppState.projects),
      tasks: computed(() => AppState.tasks.filter(t => t.sprintId == props.sprint.id)),
      completedTasks: computed(() => AppState.tasks.filter(t => t.sprintId == props.sprint.id && t.isCompleted)),
      uncompletedTasks: computed(() => AppState.tasks.filter(t => t.sprintId == props.sprint.id && !t.isCompleted)),

      totalWeight: computed(() => {
        let count = 0
        AppState.tasks.forEach(t => {
          if (t.sprintId == props.sprint.id) {
            count += t.weight
          }
        })
        return count
      }),


    }
  }
}

</script>
<style scoped>
</style>



