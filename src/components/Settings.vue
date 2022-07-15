<template>
  <form class="row g-3">
    <div class="col-8 ">
      <div class="bg-white p-3 shadow-sm">
        <div class="row">
          <div class="col-md-4">
            <label class="form-label small">Comments</label>
            <input type="number" min="0" max="1000" class="form-control form-control-sm" v-model="commentsCount">
          </div>
          <div class="col-md-4">
            <label class="form-label small">Min replies</label>
            <input type="number" min="0" max="1000" class="form-control form-control-sm" v-model="minReplies">
          </div>
          <div class="col-md-4">
            <label class="form-label small">Max replies</label>
            <input type="number" min="0" max="1000" class="form-control form-control-sm" v-model="maxReplies">
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

        <select class="form-select form-select-sm" v-model="currentUser">
          <option v-for="option in $store.state.users" :value="option.id">
            {{ option.name }} ({{ option.username }})
          </option>
        </select>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: "Settings",
  data: function () {
    const saved = localStorage.getItem('settings');
    const settings = saved ? JSON.parse(saved) : {
      commentsCount: 20,
      currentUser: parseInt(this.$store.state.user.id),
      minReplies: 0,
      maxReplies: 10,
    }

    return {
      currentUser: settings.currentUser,
      commentsCount: settings.commentsCount,
      minReplies: settings.minReplies,
      maxReplies: settings.maxReplies,
    }
  },
  methods: {

    regenerateComments() {
      this.$store.commit('regenerateComments', {
        commentsCount: this.commentsCount,
        minReplies: this.minReplies,
        maxReplies: this.maxReplies,
      })
    },

    saveSettings() {
      localStorage.setItem('settings', JSON.stringify({
        currentUser: this.currentUser,
        commentsCount: this.commentsCount,
        minReplies: this.minReplies,
        maxReplies: this.maxReplies,
      }))
    }
  },
  watch: {
    currentUser: function () {
      this.$store.commit('updateUser', this.currentUser);
      this.saveSettings();
    },
    maxReplies: function () {
      this.saveSettings();
    },
    minReplies: function () {
      this.saveSettings();
    },
    commentsCount: function () {
      this.saveSettings();
    }
  }
};
</script>
