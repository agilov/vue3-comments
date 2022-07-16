<script setup>
const emit = defineEmits(["delete", "edit", "reply"])
defineProps({own: Boolean})
</script>
<template>
  <div>
    <button class="btn btn-sm btn-default" @click="emit('reply')">
      Reply
    </button>

    <button v-if="own" @click="emit('edit')" class="btn btn-sm btn-default mx-2">
      Edit
    </button>

    <button v-if="own" @click="emit('delete')" class="btn btn-sm btn-default text-danger">
      Delete
    </button>
  </div>
</template>
