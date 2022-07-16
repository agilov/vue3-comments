<template>
  <div class="container">

    <div class="row">
      <div class="col-8 offset-2">
        <div class="mb-5">
          <Settings/>
        </div>

        <div>
          <h4 class="text-center mb-5">Current playback value: {{ seconds }}</h4>
        </div>

        <div class="bg-white p-3 shadow-sm">

          <div class="row">
            <div class="col-1 pt-2">
              <TimeCode :value="secondsCapture" v-if="inputFocused || userComment"/>
            </div>
            <div class="col-1">
              <img :src="$store.state.user.avatar" :alt="$store.state.user.username" class="avatar"/>
            </div>
            <div class="col-10">
              <CreateTextarea
                  v-model="userComment"
                  @ok="newComment"
                  @cancel="userComment=''"
                  @focus="capturePlayback"
                  @blur="inputFocused = false"
              >
              </CreateTextarea>
            </div>
          </div>
        </div>

        <Comment
            v-for="(comment, index) in $store.state.comments"
            :key="comment.id"
            :id="'comment-' + comment.id"
            :comment="comment"
        />
      </div>
    </div>

  </div>
</template>

<script>
import CreateTextarea from "./components/CreateTextarea.vue";
import TimeCode from "./components/TimeCode.vue";
import Comment from "./components/Comment.vue";
import Settings from "./components/Settings.vue";

export default {
  name: "ChatApp",
  components: {
    Settings,
    Comment,
    CreateTextarea,
    TimeCode
  },
  mounted() {
    setInterval(() => {
      this.seconds++;

      if (this.seconds > 200) {
        this.seconds = 1;
      }
    }, 1000);
  },
  methods: {
    capturePlayback() {
      this.secondsCapture = parseInt(this.seconds.toString())
      this.inputFocused = true;
    },
    newComment(comment) {
      const id = Math.floor(Date.now()).toString();
      this.$store.commit('addComment', {
        id: id,
        content: this.userComment.toString(),
        time_code: this.secondsCapture
      });
      this.secondsCapture = 0;
      this.userComment = '';
      this.inputFocused = false;
    },
  },
  data() {
    return {
      secondsCapture: 0,
      seconds: 0,
      inputFocused: false,
      comments: [],
      userComment: "",
    };
  }
};
</script>
