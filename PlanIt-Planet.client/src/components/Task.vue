<template>
  <div class="col-md-12">
    <div class="ps-5">
      <div class="d-flex">
        <h3>
          <input
            @click="checkTask()"
            type="checkbox"
            :name="task.name"
            :id="task.id"
            :checked="task.isComplete"
          />
          {{ task.name }}
        </h3>
        <i
          class="mdi mdi-close ps-4 pt-1 fs-5 selectable"
          @click="deleteTask()"
        ></i>
      </div>
      <div class="ps-4 pt-2">
        <i class="mdi mdi-rocket-launch-outline fs-5">{{ task.weight }}</i>
        <i
          class="ps-5 mdi mdi-comment-text-outline fs-5 selectable"
          data-bs-toggle="offcanvas"
          :data-bs-target="'#task-details-' + `${task.id}`"
        ></i>
      </div>
    </div>
  </div>
  <TaskDetails :task="task" />
</template>
<script>
import { computed, onMounted } from "@vue/runtime-core"
import { useRoute } from "vue-router"
import { tasksService } from "../services/TasksService"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { notesService } from "../services/NotesService"
import { AppState } from "../AppState"
export default {
  props: { task: { type: Object, required: true } },
  setup(props) {
    onMounted(async () => {
      await notesService.getNotes(route.params.id)
    })
    const route = useRoute()
    return {
      async deleteTask() {
        if (window.confirm('are you sure')) {
          await tasksService.deleteTask(props.task.id, route.params.id)
        } else {
          return
        }
      },
      async checkTask() {
        await tasksService.checkTask(props.task, route.params.id)
      },

      Notes: computed(() => AppState.notes.filter(n => props.task.id === n.taskId))
    }

  },
}
</script>