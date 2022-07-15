<template>
  <div v-if="show" class="modal-backdrop fade show"></div>
  <div
      v-if="show"
      class="modal fade show" style="display: block;">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLiveLabel">Delete comment</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <p>
            Are you sure you want to delete this comment? This will remove the
            comment and can not be undone
          </p>
        </div>
        <div class="modal-footer">
          <button
              @click="this.$emit('cancel')"
              type="button" class="btn btn-secondary" data-bs-dismiss="modal"> No, Cancel
          </button>
          <button
              @click="this.$emit('proceed')"
              type="button" class="btn btn-primary">Yes, Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "DeletePopup",
  emits: ["proceed", "cancel"],
  props: ["show"],
};
</script>
