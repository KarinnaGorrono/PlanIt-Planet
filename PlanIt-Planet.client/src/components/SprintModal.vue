<template>
  <div class="modal cut" id="sprintModal">
    <form @submit.prevent="createSprint()">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title text-secondary fw-bolder text-uppercase">
              Create Sprint
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="row p-2">
              <label for="picture" class="text-secondary fw-bolder pb-2"
                >SPRINT NAME:</label
              >
              <input
                type="text"
                name="newSprint"
                id="newSprint"
                aria-label="New Sprint Input"
                class="w-100"
                v-model="state.editable.name"
              />

              <div class="col-1"></div>
            </div>
          </div>
          <div class="d-flex justify-content-between my-3 px-2">
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
              aria-label="Submit Create Task"
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
import { reactive } from "@vue/reactivity"
import { sprintsService } from "../services/SprintsService"
import Pop from "../utils/Pop";
import { useRoute } from "vue-router";
import { logger } from "../utils/Logger";
import { Modal } from "bootstrap";
export default {
  setup() {
    const route = useRoute()
    const state = reactive({ editable: {} });
    return {
      state,
      async createSprint() {
        try {
          await sprintsService.createSprint(route.params.id, state.editable)
          state.editable = {}
          Modal.getOrCreateInstance(document.getElementById("sprintModal")).toggle()
        } catch (error) {
          Pop.toast(error)
        }
      }
    }
  },
}
</script>
<style scoped>
</style>