<template>
  <div class="dialog" role="dialog">
    <div class="dialog-content">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="css">
.dialog {
  position: fixed;
  top: 50%;
  transform: translate(-50%, -50%);
  left: 50%;
  background: #fff;
  width: 100%;
  height: 100%;
  padding: 20px;

  @media (min-width: 576px) {
    border-radius: 10px;
    width: 80vw;
    height: auto;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
  }

  @media (min-width: 992px) {
    padding: 40px;
    width: 40vw;
    max-width: 40vw;
  }
}
</style>
