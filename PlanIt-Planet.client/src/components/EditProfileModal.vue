
<template>
  <div class="modal" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title text-secondary fw-bolder">EDIT PROFILE</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="editProfile()">
            <div class="row">
              <div class="form-group">
                <label for="name" class="text-secondary fw-bolder">NAME:</label>
                <input
                  placeholder="Name..."
                  type="text"
                  class="form-control"
                  name="name"
                  id="name"
                  aria-label="User Name Input"
                  v-model="editable.name"
                />
              </div>
              <div class="form-group pt-4">
                <label for="picture" class="text-secondary fw-bolder"
                  >PROFILE PICTURE:</label
                >
                <input
                  placeholder="https://imgurl.com"
                  type="url"
                  class="form-control"
                  name="picture"
                  id="picture"
                  aria-label="Profile Picture Input"
                  v-model="editable.picture"
                />
              </div>
              <div class="d-flex justify-content-between my-3">
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
                  aria-label="Submit Edit Profile"
                >
                  <b> submit </b>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { computed, watchEffect, ref } from "@vue/runtime-core";
import { AppState } from "../AppState";
import { accountService } from "../services/AccountService";
import Pop from "../utils/Pop";
import { Modal } from "bootstrap";
export default {
  setup() {
    const editable = ref({});
    watchEffect(() => {
      editable.value = { ...AppState.account };
    });
    return {
      editable,
      account: computed(() => AppState.account),
      async editProfile() {
        try {
          await accountService.editProfile(editable.value);
          Modal.getOrCreateInstance(
            document.getElementById("edit-profile-modal")
          ).hide();
        } catch (error) {
          Pop.toast(error.message, "error");
        }
      },
    };
  },
};
</script>

<style>
</style>