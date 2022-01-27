<template>
  <div class="row">
    <div class="col-12">
      <div class="card p-3 elevation-2 m-1">
        <div class="card-text">
          <div class="row justify-content-between">
            <div class="col-8">
              <div
                class="
                  row
                  selectable
                  d-flex
                  align-items-center
                  accordian-button
                  colapsed
                "
                id="accordianFlushParent"
                data-bs-toggle="collapse"
                :data-bs-target="'#flush' + sprint.id"
              >
                <div class="col-1"></div>
                <div class="col-7">
                  <h3>
                    {{ sprint.name }}
                  </h3>
                </div>
                <div class="col-4">
                  <h4>Weight: {{ totalWeight }}</h4>
                </div>
              </div>
            </div>
            <div class="col-2 d-flex justify-content-end">
              <button
                class="btn btn-primary"
                data-bs-toggle="modal"
                :data-bs-target="'#createtask-modal-' + sprint.id"
               
              >
                Add Task
              </button>
            </div>
            <div class="col-1 d-flex justify-content-end">
              <button
                class="btn btn-danger"
                
            @click="deleteSprint"
              >
               Delete Sprint
              </button>
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