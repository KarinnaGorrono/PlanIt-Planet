<template>
  <button
    class="
      btn-info
      w-75
      mt-5
      height
      shadow
      border-0
      elevatation-5
      rounded
      mdi mdi-rocket-launch-outline
      text-dark
      lighten-25
      display-3
    "
    type="button"
    data-bs-toggle="offcanvas"
    data-bs-target="#proj-offcanvas"
    aria-controls="offcanvas-projects"
    aria-label="project navigation"
    title="projects"
    @click="ProjectSelector"
  ></button>
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
.height {
  height: 75px;
}
</style>