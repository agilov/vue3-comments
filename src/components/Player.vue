<script setup>
import {displayTimeCodeValue} from '../lib/filters';
import {onMounted, onUnmounted} from "vue";
import {useStore} from 'vuex';

const store = useStore();
let timer;

onMounted(() => {
  timer = setInterval(() => {
    store.commit('incrementPlayback')
  }, 1000)
})

onUnmounted(() => {
  clearInterval(timer)
})
</script>
<template>
  <div class="text-center">
    <h4>Current playback value: {{ displayTimeCodeValue(store.state.playback) }}</h4>
    <span class="text-muted">You hear some nice music...</span>
  </div>
</template>