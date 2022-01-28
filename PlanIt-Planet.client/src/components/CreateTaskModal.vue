<template>
  <div
    class="modal fade"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <form @submit.prevent="createTask">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5
              class="modal-title text-secondary fw-bolder text-uppercase"
              id="exampleModalLabel"
            >
              Create Task
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body container-fluid">
            <div class="row">
              <div class="col-md-6">
                <h6 class="text-secondary fw-bolder text-uppercase">
                  Task Name
                </h6>
                <input
                  v-model="state.editable.name"
                  type="text"
                  class="form-text rounded w-100 border-1 border-light"
                  required="true"
                  aria-label="task name input"
                />
              </div>
              <div class="col-md-6">
                <h6 class="text-secondary fw-bolder text-uppercase">
                  Task Weight
                </h6>
                <input
                  v-model="state.editable.weight"
                  type="text"
                  class="form-text rounded w-100 border-1 border-light"
                  required="true"
                  aria-label="task weight input"
                />
              </div>
            </div>
          </div>
          <div class="d-flex justify-content-between my-3 px-3">
            <button
              type="button"
              data-bs-dismiss="modal"
              aria-label="Close"
              class="btn text-dark lighten-20 text-uppercase selectable"
            >
              <b> cancel </b>
            </button>
            <button
              type="submit"
              class="btn text-primary text-uppercase selectable"
              aria-label="Submit New Task"
            >
              <b> submit </b>
            </button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { computed, reactive } from "@vue/reactivity"
import { AppState } from "../AppState"
import { useRoute } from "vue-router"
import { tasksService } from "../services/TasksService"
import { Modal } from "bootstrap"
import { onMounted } from "@vue/runtime-core"
import { logger } from "../utils/Logger"
export default {
  props: { sprintId: { type: String, required: true } },
  setup(props) {
    onMounted(() => {
      logger.log(state)
    })
    const state = reactive({ editable: {} })
    const route = useRoute()
    return {
      state,
      tasks: computed(() => AppState.tasks),
      activeProject: computed(() => AppState.activeProject),

      async createTask() {
        await tasksService.createTask(state.editable, props.sprintId, route.params.id)
        const modalElem = document.getElementById('createtask-modal-' + props.sprintId)
        Modal.getOrCreateInstance(modalElem).toggle()
        state.editable = {}
      }

    }
  }
}
</script>


<style lang="scss" scoped>
</style>