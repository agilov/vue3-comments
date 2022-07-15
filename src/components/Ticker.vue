<template>
  <span>{{ val }}</span>
</template>

<script>
export default {
  name: "Ticker",
  props: {
    time: Number,
  },
  data: function () {
    return {
      now: Math.floor(Date.now() / 1000),
      ticker: null
    }
  },
  unmounted: function () {
    if (this.ticker !== null) {
      clearInterval(this.ticker)
    }
  },
  mounted: function () {
    if ((this.now - parseInt(this.time)) / 3600 < 1) {
      this.ticker = setInterval(() => {
        this.now = Math.floor(Date.now() / 1000)
      }, 30000)
    }
  },
  computed: {
    val: function () {
      const seconds = this.now - parseInt(this.time);

      let interval = seconds / 31536000;

      if (interval > 1) {
        return Math.floor(interval) + " years ago";
      }
      interval = seconds / 2592000;
      if (interval > 1) {
        return Math.floor(interval) + " months ago";
      }
      interval = seconds / 86400;
      if (interval > 1) {
        return Math.floor(interval) + " days ago";
      }
      interval = seconds / 3600;
      if (interval > 1) {
        return Math.floor(interval) + " hours ago";
      }
      interval = seconds / 60;
      if (interval > 1) {
        const minutes = Math.floor(interval);

        if (minutes > 1) {
          return minutes + " minutes ago";
        }

        return minutes + " minute ago";
      }

      const sec = Math.floor(seconds);

      if (sec < 3) {
        return 'just yet'
      }

      return sec + " seconds ago";
    }
  }
};
</script>
