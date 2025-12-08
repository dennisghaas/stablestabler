<template>
  <component :is="tag" v-bind="attrs" :type="buttonType" @click="handleClick">
    <slot />
  </component>
</template>

<script setup lang="ts">
import { ButtonAction } from '@/components/Ui/button.type.ts';
import { computed } from 'vue';
import { RouteLocationRaw } from 'vue-router';

const props = defineProps<{
  type?: 'button' | 'submit';
  action?: ButtonAction;
  href?: string | null;
  to?: RouteLocationRaw | null;
}>();

const buttonAction = computed(() => props.action ?? ButtonAction.BUTTON);
const tag = computed(() => {
  switch (buttonAction.value) {
    case ButtonAction.SAME_SITE:
      return 'router-link';
    case ButtonAction.EXTERNAL:
      return 'a';
    default:
      return 'button';
  }
});

const attrs = computed(() => {
  if (buttonAction.value === ButtonAction.EXTERNAL) {
    return {
      href: props.href,
      target: '_blank',
      rel: 'noopener noreferrer',
    };
  }

  if (buttonAction.value === ButtonAction.SAME_SITE) {
    return {
      to: props.to,
    };
  }

  return {};
});

const buttonType = computed(() => {
  return buttonAction.value === ButtonAction.BUTTON
    ? (props.type ?? 'button')
    : undefined;
});

const emit = defineEmits(['click']);

const handleClick = () => {
  if (tag.value !== 'button') return;
  emit('click');
};
</script>

<style lang="css" scoped>
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 8px 12px;
  font-family: 'CustomFont', Arial, sans-serif;
  font-size: 14px;
  font-weight: 500;
  border-radius: 4px;
  text-decoration: none;
  cursor: pointer;
  border: 2px solid transparent;
  transition:
    background-color 0.2s ease,
    color 0.2s ease,
    border-color 0.2s ease,
    backdrop-filter 0.2s ease;
}

.btn-primary {
  backdrop-filter: blur(5px);
  background: rgba(255, 255, 255, 0.7);
  border-color: white;
  color: black;

  &:hover,
  &:visited:hover {
    background-color: white;
    color: black;
  }
}

.btn-secondary {
  backdrop-filter: blur(5px);
  background: rgba(0, 0, 0, 0.7);
  border-color: black;
  color: white;

  &:hover,
  &:visited:hover {
    background-color: black;
    color: white;
  }
}

.btn-tertiary {
  backdrop-filter: blur(5px);
  background: rgba(255, 255, 255, 0.7);
  border-color: black;
  color: black;

  &:hover,
  &:visited:hover {
    background-color: white;
    color: black;
  }
}
</style>
