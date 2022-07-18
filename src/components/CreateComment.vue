<script setup>
import {useStore} from "vuex";
import {reactive} from 'vue';
import TimeCode from './TimeCode.vue';
import CreateTextarea from './CreateTextarea.vue';

const store = useStore();
const state = reactive({
  comment: '',
  focused: false,
  seconds: 0
});

function onFocus() {
  state.seconds = store.state.playback
  state.focused = true;
}

function createComment() {
  store.commit('addComment', {
    id: Math.floor(Date.now()).toString(),
    content: state.comment,
    time_code: state.seconds
  });

  state.seconds = 0;
  state.comment = '';
  state.focused = false;
}
</script>

<template>
  <div class="bg-white p-3 shadow-sm">
    <div class="row">
      <div class="col-1 pt-2">
        <TimeCode :value="state.seconds" v-if="state.focused || state.comment"/>
      </div>
      <div class="col-1">
        <img :src="store.state.user.avatar" :alt="store.state.user.username" class="avatar"/>
      </div>
      <div class="col-10">
        <CreateTextarea
            v-model="state.comment"
            @ok="createComment"
            @cancel="state.comment=''"
            @focus="onFocus"
            @blur="state.focused = false"
        ></CreateTextarea>
      </div>
    </div>
  </div>
</template>