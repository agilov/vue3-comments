<script setup>
import {defineProps, defineEmits} from "vue";
const emit = defineEmits(["proceed", "cancel"]);
defineProps({
  show: Boolean
})
</script>
<template>
  <div v-if="show" class="modal-backdrop fade show"></div>
  <div v-if="show" class="modal fade show" style="display: block;">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Delete comment</h5>
          <button type="button" class="btn-close"></button>
        </div>
        <div class="modal-body">
          <p>Are you sure you want to delete this comment? This will remove the comment and can not be undone</p>
        </div>
        <div class="modal-footer">
          <button @click="emit('cancel')" type="button" class="btn btn-secondary" data-bs-dismiss="modal">
            No, Cancel
          </button>
          <button @click="emit('proceed')" type="button" class="btn btn-primary">
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>