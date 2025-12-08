<template>
  <div>
    <div v-if="loading">Loading...</div>
    <slot v-else></slot>
  </div>
</template>

<script lang="ts" setup>
import { useConfigStore } from '@/stores/config.store.ts';
import { computed } from 'vue';
const configStore = useConfigStore();

const props = defineProps<{
  id: string;
}>();

const loading = computed(() => {
  return (
    configStore.responseLoading?.id === props.id &&
    configStore.responseLoading.enabled
  );
});
</script>

<style scoped></style>
