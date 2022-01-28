<template>
  <button
    class="btn-primary w-50 mt-4 h-10 border-0 rounded"
    type="button"
    data-bs-toggle="offcanvas"
    data-bs-target="#proj-offcanvas"
    aria-controls="offcanvasExample"
    aria-label="sidebutton1"
    title="projects"
    @click="ProjectSelector"
  >
    P
  </button>
</template>


<script>
import { Modal } from "bootstrap"
export default {
  setup() {
    return {
      async editModal() {
        const modalElem = document.getElementById("editproj-modal")
        Modal.getOrCreateInstance(modalElem).toggle()
      },
    }
  }
}
</script>


<style lang="scss" scoped>
.h-10 {
  height: 10%;
}
</style>