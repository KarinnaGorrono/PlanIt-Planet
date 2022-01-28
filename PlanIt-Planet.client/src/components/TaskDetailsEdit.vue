<template>
  <div class="taskdetails-edit">
    <form @submit.prevent="editTask">
      <div class="col-md-12">
        <div class="row my-3">
          <div class="col-md-11">
            <p class="p-0 fs-4 text-uppercase text-secondary fw-bold">Name</p>
            <input
              type="text"
              placeholder="Name"
              class="w-100 p-0"
              v-model="state.editable.name"
            />
          </div>
        </div>
        <div class="row my-3">
          <div class="d-flex justify-content-around p">
            <div class="col-md-3">
              <p class="mb-2 fs-4 text-uppercase text-secondary fw-bold">
                Weight
                <i class="mdi mdi-weight" />
              </p>
              <input
                type="number"
                placeholder="1"
                min="1"
                class="w-75"
                v-model="state.editable.weight"
              />
            </div>
            <div class="col-md-8">
              <div class="dropdown">
                <p class="mb-2 fs-4 text-uppercase text-secondary fw-bold">
                  Sprint<i class="mdi mdi-walk ps-1"></i>
                </p>
                <div class="dropdown">
                  <button
                    class="btn btn-outline-dark dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Sprints
                  </button>
                  <ul
                    class="dropdown-menu"
                    aria-labelledby="dropdownMenuButton1"
                  >
                    <li>
                      <a
                        class="dropdown-item"
                        @click="moveTasks(s, s.id)"
                        v-for="s in sprints"
                        :key="s.id"
                        >{{ s.name }}</a
                      >
                    </li>
                  </ul>
                </div>

                <div class="row my-3">
                  <div class="col-md-12 d-flex justify-content-end">
                    <button
                      type="submit"
                      class="btn btn-outline-primary mx-1 text-uppercase"
                      aria-label="save"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>


<script>
import { computed, reactive } from "@vue/reactivity"
import { useRoute } from "vue-router"
import { tasksService } from "../services/TasksService"
import { AppState } from "../AppState"
import { Dropdown } from "bootstrap"
export default {
  props: { task: { type: Object, required: true }, sprint: { type: Object, required: true } },
  setup(props) {
    const route = useRoute()
    const state = reactive({ editable: {} })
    return {
      state,
      async editTask() {
        await tasksService.editTask(route.params.id, props.task.id, state.editable)
      },
      async dropToggle() {
        let dropElem = document.getElementById('dropdown')
        Dropdown.getOrCreateInstance(dropElem).toggle()
      },
      async moveTasks(s) {
        await tasksService.moveTasks(s, props.task.id, route.params.id)
        this.dropToggle()
      },
      sprints: computed(() => AppState.sprints)
    }
  }
}
</script>


<style lang="scss" scoped>
</style>