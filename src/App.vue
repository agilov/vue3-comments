<script setup>
import {useStore} from "vuex";
import CreateComment from "./components/CreateComment.vue";
import Player from "./components/Player.vue";
import Comment from "./components/Comment.vue";
import Settings from "./components/Settings.vue";

const store = useStore();
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col-8 offset-2">
        <Settings class="mb-5"/>

        <Player class="mb-5"/>

        <CreateComment/>

        <Comment
            v-for="comment in store.state.comments"
            :key="comment.id"
            :id="'comment-' + comment.id"
            :comment="comment"
        />
      </div>
    </div>
  </div>
</template>