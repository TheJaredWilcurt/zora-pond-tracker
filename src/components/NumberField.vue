<template>
  <span class="number-field pixel-corners">
    <button
      :disabled="!(modelValue < max)"
      @click="incrementAmount"
    >
      <img
        alt="up arrow"
        class="number-arrow"
        :src="'/zora-pond-tracker/sprites/up.png'"
      />
    </button>
    <input
      :value="modelValue"
      :min="min"
      :max="max"
      type="number"
      @input="emitAmount($event.target.value)"
    />
    <button
      :disabled="!(modelValue > min)"
      @click="decrementAmount"
    >
      <img
        alt="down arrow"
        class="number-arrow"
        :src="'/zora-pond-tracker/sprites/down.png'"
      />
    </button>
  </span>
</template>

<script>
export default {
  name: 'NumberField',
  props: {
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 999
    },
    modelValue: {
      type: Number,
      required: true
    }
  },
  methods: {
    emitAmount: function (amount) {
      this.$emit('update:modelValue', amount);
    },
    decrementAmount: function () {
      const amount = this.modelValue;
      if (amount > this.min) {
        this.emitAmount(amount - 1);
      }
    },
    incrementAmount: function () {
      const amount = this.modelValue;
      if (amount < this.max) {
        this.emitAmount(amount + 1);
      }
    }
  }
};
</script>
