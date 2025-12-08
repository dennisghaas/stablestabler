<template>
  <div :class="['button-wrapper', { 'button-wrapper--centered': centered }]">
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  centered?: boolean;
}>();
</script>

<style scoped>
.button-wrapper {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

.button-wrapper.button-wrapper--centered {
  justify-content: center;
}
</style>
