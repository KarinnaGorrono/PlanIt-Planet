<template>
  <div class="card mt-3">
    <div class="card-body">
      <div class="row">
        <div class="col-12">
          <div class="d-flex align-items-center">
            <img class="imgting" :src="note.creator.picture" alt="" />
            <p class="fs-6 ps-3">{{ note.creator.name }}</p>
          </div>
          <div class="p-2 ps-4 mt-1">
            <p class="fs-4">{{ note.body }}</p>
          </div>
          <i
            v-if="note.creator.id === account.id"
            class="
              mdi mdi-trash-can-outline
              d-flex
              justify-content-end
              selectable
            "
            @click="deleteTask"
          ></i>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { computed, onMounted } from "@vue/runtime-core"
import { logger } from "../utils/Logger"
import { AppState } from "../AppState"
import { notesService } from "../services/NotesService"
import { useRoute } from "vue-router"
export default {
  props: { note: { type: Object, required: true } },
  setup(props) {
    const route = useRoute()
    onMounted(async () => {
      logger.log('notes', AppState.notes)
    })
    return {
      notes: computed(() => AppState.notes),
      account: computed(() => AppState.account),
      async deleteTask() {
        notesService.deleteNotes(route.params.id, props.note.id)
      }
    }
  },
}
</script>
<style scoped>
.imgting {
  height: 50px;
  width: 50px;
  border-radius: 50px;
}
</style>