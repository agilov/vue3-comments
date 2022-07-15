<template>
  <div class="badge bg-danger">
    {{ val }}
  </div>
</template>

<script>
export default {
  name: "TimeCode",
  props: {
    value: Number,
  },

  data() {
    let minutes = Math.floor(this.value / 60).toString();
    let seconds = (this.value % 60).toString();

    if (minutes.length < 2) {
      minutes = '0' + minutes;
    }
    if (seconds.length < 2) {
      seconds = '0' + seconds;
    }

    return {
      val: minutes + ":" + seconds
    }
  }
};
</script>
