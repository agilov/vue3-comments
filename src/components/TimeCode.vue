<script setup>
import {displayTimeCodeValue} from '../lib/filters';
defineProps({value: Number});
</script>
<template>
  <div class="badge bg-danger">
    {{ displayTimeCodeValue(value) }}
  </div>
</template>
