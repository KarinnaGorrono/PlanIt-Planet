<template>
  <div class="task-details">
    <form @submit.prevent>
      <div
        class="offcanvas offcanvas-end w-50"
        tabindex="-1"
        :id="'task-details-' + `${task.id}`"
        aria-labelledby="offcanvasExampleLabel"
      >
        <div class="offcanvas-header border-bottom border-dark">
          <h5 class="offcanvas-title text-dark text-uppercase fs-2" id="offcanvasRight"
>
            {{ task.name }}
          </h5>
          <i class="mdi mdi-pencil bg-white selectable fs-2" @click="showEdit = !showEdit"></i>
        </div>
        <div class="offcanvas-body container-fluid">
          <div class="row mb-4 ms-2">
            <div class="col-md-12">
              <TaskDetailsEdit v-if="showEdit" :task="task" />
            </div>
          </div>

          <div class="row ms-2">
            <div class="col-12">
              <div
                class="row justify-content-center mb-4 border-bottom border-dark "
              >
                <div class="col-md-6 text-center text-dark ">
                  <p class="fs-2">Notes</p>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12 mb-1">Add a Note</div>
                <form @submit.prevent="makeNote">
                  <div class="col-md-12 d-flex mb-2">
                    <input
                      v-model="state.editable.body"
                      type="text"
                   
                      class="border border-1 border-light w-100"
                    />
                    <button
                      type="submit"
                      class="btn btn-outline-primary"
                      title="create note"
                    >
                      <i class="mdi mdi-play"></i>
                    </button>
                  </div>
                </form>
              </div>
              <div class="row">
                <div class="col-md-12">
                  <div class="row" >
                  <Note v-for="n in notes" :key="n.id" :note="n"/>
                    <div class="col-md-12 my-1 d-flex align-items-center">
                    
                      <p class="m-0 ms-1"></p>
                    </div>
                    <div class="col-md-6"></div>
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
import { computed, reactive, ref } from "@vue/reactivity"
import { AppState } from "../AppState"
import { notesService } from "../services/NotesService"
import { useRoute } from "vue-router"
export default {

  props: { task: { type: Object, required: true } },
  setup(props) {
    const state = reactive({ editable: {} })
    const showEdit = ref(false)
    const route = useRoute()
    return {
      state,
      showEdit,
      tasks: computed(() => AppState.tasks),
      notes: computed(() => AppState.notes),
      sprints: computed(() => AppState.sprints),
      projects: computed(() => AppState.projects),
      account: computed(() => AppState.account),
      async makeNote() {
        await notesService.createNotes(props.task.id, route.params.id, state.editable)
      }
    }
  }
}
</script>


<style lang="scss" scoped>
</style>