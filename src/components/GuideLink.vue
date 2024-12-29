<template>
  <div class="guide">
    <h4>{{ title }}</h4>
    <a
      class="guide-link"
      :href="link || image"
      target="_blank"
    >
      <img
        :alt="alt"
        class="guide-image pixel-corners"
        :src="image"
      />
    </a>
  </div>
</template>

<script>
export default {
  name: 'GuideLink',
  props: [
    'alt',
    'image',
    'link',
    'title',
  ]
};
</script>
