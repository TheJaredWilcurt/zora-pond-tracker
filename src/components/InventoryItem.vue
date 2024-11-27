<template>
  <div class="inventory-item-wrapper">
    <div class="inventory-item pixel-corners">
      <img
        :alt="alt"
        class="pointer"
        role="button"
        tabindex="0"
        :src="src || '/zora-pond-tracker/sprites/1.1.6/' + alt.toLowerCase() + modelValue + '.png'"
        @click="emit(modelValue + 1)"
        @keydown.prevent.space="emit(modelValue + 1)"
        @keyup.enter="emit(modelValue + 1)"
      >
      <NumberField
        :modelValue="modelValue"
        :min="min"
        :max="max"
        @update:modelValue="emit"
      />
    </div>
  </div>
</template>

<script>
import NumberField from '@/components/NumberField.vue';

export default {
  name: 'InventoryItem',
  components: {
    NumberField
  },
  props: {
    modelValue: {
      type: Number,
      required: true
    },
    alt: {
      type: String,
      required: true
    },
    src: {
      type: String,
      default: undefined
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 999
    }
  },
  emits: ['update:modelValue'],
  methods: {
    emit: function (value) {
      value = parseInt(value);
      value = Math.min(this.max, value);
      value = Math.max(this.min, value);
      this.$emit('update:modelValue', value)
    }
  }
};
</script>
