<template>
  <input
    :id="id"
    :checked="modelValue"
    class="check-box"
    type="checkbox"
    @input="$emit('update:modelValue', $event.target.checked)"
  />
  <label :for="id">
    <slot></slot>
  </label>
</template>

<script>
import { useId } from 'vue';

export default {
  name: 'CheckBox',
  props: ['modelValue'],
  emits: ['update:modelValue'],
  computed: {
    id: function () {
      return useId();
    }
  }
};
</script>
