<template>
  <div>
     <textarea
         ref="create"
         class="form-control"
         :value="modelValue"
         :autofocus="autofocus"
         :maxlength="maxlength"
         @input="input"
         @focus="$emit('focus')"
         @blur="$emit('blur')"
         :rows="rows"
         @keyup.enter.exact.stop.prevent="ok"
         @keyup.esc="clear"
     ></textarea>

    <div class="d-flex justify-content-between pt-2">
      <p class="text-muted pt-1">
        <small v-if="maxlength <= leftSymbols">{{ maxlength }} symbols max</small>
        <small v-else>{{ leftSymbols }} symbols left</small>
      </p>
      <div>
        <button @click="clear" v-if="alwaysShowCancel || modelValue" class="btn btn-sm btn-default">
          Cancel
        </button>
        <button @click="ok" class="btn btn-default">
          {{ buttonText || 'Send' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  emits: ["ok", "cancel", "focus", "blur", "update:modelValue"],
  props: {
    alwaysShowCancel: {
      type: Boolean,
      default: false
    },
    maxlength: {
      type: Number,
      default: 500
    },
    autofocus: {
      type: Boolean,
      default: false
    },
    buttonText: {
      type: String,
      default: 'Send'
    },
    modelValue: String
  },
  mounted() {
    if (this.autofocus) {
      this.$refs.create.focus();
    }
  },
  computed: {
    leftSymbols() {
      return this.maxlength - this.modelValue.length;
    },
    // @todo do not use this in production !!!!
    rows() {
      let add = 0;
      const lines = this.modelValue.split(/\r\n|\r|\n/);

      for (let line of lines) {
        add += Math.floor(line.length / 84);// @todo do not use this in production !!!!
      }

      return lines.length + add;
    }
  },
  methods: {
    input(event) {
      this.$emit('update:modelValue', event.target.value);
    },
    clear() {
      this.$emit('cancel');
      this.$nextTick(() => {
        if (this.$refs.create) {
          this.$refs.create.blur();
        }
      })
    },
    ok() {
      this.$emit('ok')
    }
  }
};
</script>
