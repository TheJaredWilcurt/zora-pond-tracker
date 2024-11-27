<template>
  <label>
    <input
      :checked="modelValue"
      class="check-box"
      type="checkbox"
      @input="$emit('update:modelValue', $event.target.checked)"
    />
    <slot></slot>
  </label>
</template>

<script>
export default {
  name: 'CheckBox',
  props: ['modelValue'],
  emits: ['update:modelValue']
};
</script>
