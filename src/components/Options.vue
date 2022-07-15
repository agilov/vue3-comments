<template>
  <div>
    <button class="btn btn-sm btn-default" @click="this.$emit('reply')">
      Reply
    </button>

    <button v-if="own" @click="this.$emit('edit')" class="btn btn-sm btn-default mx-2">
      Edit
    </button>

    <button v-if="own" @click="this.$emit('delete')" class="btn btn-sm btn-default text-danger">
      Delete
    </button>
  </div>
</template>

<script>
export default {
  props: ["own"],
  emits: ["delete", "edit", "reply"]
};
</script>
