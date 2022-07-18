<script setup>
import {useStore} from 'vuex';
import {reactive, watch} from 'vue';

const store = useStore();

const saved = localStorage.getItem('settings');
const settings = saved ? JSON.parse(saved) : {
  commentsCount: 20,
  currentUser: parseInt(store.state.user.id),
  minReplies: 0,
  maxReplies: 10,
}

const state = reactive({
  currentUser: settings.currentUser,
  commentsCount: settings.commentsCount,
  minReplies: settings.minReplies,
  maxReplies: settings.maxReplies,
})

function regenerateComments() {
  store.commit('regenerateComments', {
    commentsCount: state.commentsCount,
    minReplies: state.minReplies,
    maxReplies: state.maxReplies,
  })
}

function saveSettings() {
  localStorage.setItem('settings', JSON.stringify({
    currentUser: state.currentUser,
    commentsCount: state.commentsCount,
    minReplies: state.minReplies,
    maxReplies: state.maxReplies,
  }))
}

watch(state, () => {
  store.commit('updateUser', state.currentUser);
  saveSettings();
})
</script>

<template>
  <form class="row g-3" @submit.stop.prevent="regenerateComments">
    <div class="col-8 ">
      <div class="bg-white p-3 shadow-sm">
        <div class="row">
          <div class="col-md-4">
            <label class="form-label small">Comments</label>
            <input type="number" min="0" max="1000" class="form-control form-control-sm" v-model="state.commentsCount">
          </div>
          <div class="col-md-4">
            <label class="form-label small">Min replies</label>
            <input type="number" min="0" max="1000" class="form-control form-control-sm" v-model="state.minReplies">
          </div>
          <div class="col-md-4">
            <label class="form-label small">Max replies</label>
            <input type="number" min="0" max="1000" class="form-control form-control-sm" v-model="state.maxReplies">
          </div>

          <div class="mt-3">
            <button type="submit" class="btn btn-primary btn-sm">Regenerate comments</button>
          </div>
        </div>
      </div>
    </div>
    <div class="col-4">
      <div class="bg-white p-3 shadow-sm">
        <label class="form-label small">Current user</label>

        <select class="form-select form-select-sm" v-model="state.currentUser">
          <option v-for="option in store.state.users" :value="option.id">
            {{ option.name }} ({{ option.username }})
          </option>
        </select>
      </div>
    </div>
  </form>
</template>
