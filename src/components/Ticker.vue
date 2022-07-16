<script setup>
import {displayAgo} from "../lib/filters";
import {onMounted, onUnmounted, ref} from "vue";

const {time} = defineProps({
  time: Number,
});

let interval = ref(Math.floor(Date.now() / 1000) - parseInt(time));
let minutesAgo = interval.value / 60;

// Update interval only if time is recent (less that an hour)
// The oldest the time of creation - the bigger update interval
if (minutesAgo < 60) {
  let timer = null;
  let intervalMultiplier = Math.floor(minutesAgo) || 1;

  onMounted(() => {
    timer = setInterval(() => {
      interval.value = Math.floor(Date.now() / 1000) - parseInt(time)
    }, 20000 * intervalMultiplier)
  })

  onUnmounted(() => {
    clearInterval(timer);
  })
}
</script>

<template>
  <span>{{ displayAgo(interval) }}</span>
</template>
