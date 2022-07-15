<template>
  <div>
    <div class="bg-white p-3  shadow-sm my-3">
      <div class="row" v-if="deleted">
        <div class="col-2 text-center">
          <div class="d-flex justify-content-center">
            <div v-if="comment.time_code" class="me-3 pt-2">
              <span class="badge bg-danger">10:00</span>
            </div>
            <div class="text-center">
              <img src="/trash.png" alt="" class="avatar"/>
            </div>
          </div>
        </div>
        <div class="col-10 pt-2">
          <h5 class="text-muted opacity-50">
            {{ comment.content }}
          </h5>
        </div>
      </div>
      <div class="row" v-else>
        <div class="col-2">
          <div class="d-flex justify-content-center">
            <div v-if="comment.time_code > 0" class="me-3 pt-2">
              <TimeCode :value="comment.time_code"/>
            </div>
            <div class="text-center">
              <img :src="comment.user.avatar" alt="" class="avatar"/>
            </div>
          </div>
        </div>
        <div class="col-10">
          <p>
            <strong>{{ comment.user.name || comment.user.username }} </strong>

            <Ticker class="text-muted ms-3" :time="comment.date_created"></Ticker>
          </p>
          <CreateTextarea
              v-if="edit"
              :always-show-cancel="true"
              v-model="content"
              :autofocus="true"
              button-text="Save"
              @ok="updateComment"
              @cancel="cancelEdit"
          >
          </CreateTextarea>
          <div v-else>
            <div v-for="line in displayContent">{{ line }}</div>
            <Options
                :own="own"
                @reply="newReply"
                @edit="edit=true"
                @delete="showDeletePopup=true"
                class="mt-2"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="ps-5">
      <div class="bg-white p-3 shadow-sm my-3" v-if="replying">
        <div class="row">
          <div class="col-2 text-center">
            <img :src="$store.state.user.avatar" :alt="$store.state.user.username" class="avatar"/>
          </div>
          <div class="col-10">
            <CreateTextarea
                :always-show-cancel="true"
                :model-value="reply"
                :autofocus="true"
                button-text="Send"
                @update:modelValue="saveReply"
                @ok="createReply"
                @cancel="clearReply"
            >
            </CreateTextarea>
          </div>
        </div>
      </div>
      <Comment
          v-for="(reply, index) in comment.replies"
          :key="reply.id"
          :id="'reply-' + reply.id"
          :comment="reply"
      />
    </div>

    <DeletePopup
        v-if="showDeletePopup"
        :show="true"
        @cancel="showDeletePopup = false"
        @proceed="deleteComment"
    />
  </div>
</template>

<script>
import TimeCode from "./TimeCode.vue";
import Ticker from "./Ticker.vue";
import Options from "./Options.vue";
import CreateTextarea from "./CreateTextarea.vue";
import DeletePopup from "./DeletePopup.vue";

export default {
  name: "Comment",
  components: {
    TimeCode,
    DeletePopup,
    CreateTextarea,
    Options,
    Ticker
  },
  props: {
    comment: Object,
  },
  data() {
    return {
      initialContent: JSON.parse(JSON.stringify(this.comment.content)),
      content: JSON.parse(JSON.stringify(this.comment.content)),
      edit: false,
      showDeletePopup: false
    }
  },
  methods: {
    cancelEdit() {
      console.log(this.initialContent);
      this.content = this.initialContent;
      this.edit = false;
    },
    updateComment() {
      if (this.content === '') {
        return;
      }
      this.initialContent = this.content;
      this.$store.commit('updateComment', {
        id: this.comment.id,
        content: this.initialContent
      });
      this.edit = false;
    },
    deleteComment() {
      this.$store.commit('deleteComment', this.comment.id);
      this.showDeletePopup = false;
      this.edit = false;
    },
    newReply() {
      this.$store.commit('newReply', {
        id: this.comment.id,
        tag: this.comment.user.name || this.comment.user.username
      });
    },
    saveReply(content) {
      this.$store.commit('saveReply', {
        id: this.comment.id,
        content: content
      });
    },
    clearReply() {
      this.$store.commit('clearReply', this.comment.id);
    },
    createReply() {
      const id = Math.floor(Date.now()).toString();
      this.$store.commit('createReply', {
        id: id,
        threadId: this.comment.thread_id,
        commentId: this.comment.id,
        content: this.reply
      });
      this.clearReply();
      this.$nextTick(() => {
        document.querySelector('#reply-' + id).scrollIntoView({
          behavior: 'smooth'
        });
      });
    }
  },
  computed: {
    displayContent() {
      return this.content.split(/\r\n|\r|\n/);
    },
    reply() {
      return this.$store.state.replies[this.comment.id] || ''
    },
    replies() {
      return this.$store.state.replies
    },
    replying() {
      return this.comment.id === this.$store.state.reply
    },
    deleted() {
      return this.comment.date_deleted > 0
    },
    own() {
      return this.comment.user.id === this.$store.state.user.id
    }
  }
};
</script>
