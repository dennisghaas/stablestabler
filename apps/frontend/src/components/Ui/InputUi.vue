<template>
  <fieldset>
    <label :for="id">{{ label }}</label>
    <input
      ref="input"
      v-model="value"
      :id="id"
      :required="required"
      :placeholder="placeholder"
      autocomplete="on"
    />
  </fieldset>
</template>

<script setup lang="ts">
const value = defineModel<string>('value', { default: '' });

defineProps<{
  id: string;
  label: string;
  required?: boolean;
  placeholder?: string;
}>();
</script>

<style scoped>
fieldset {
  border: 0 none;
  display: flex;
  flex-direction: column;
  font-family: 'Arial', sans-serif;
}

label {
  font-size: 12px;
  letter-spacing: 0.02rem;
  font-weight: 600;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 8px 12px;
  font-size: 1rem;
  font-weight: 500;
  color: black;
  background: rgba(255, 255, 255, 0.7);
  border: 1px solid black;
  border-radius: 4px;
}
</style>
