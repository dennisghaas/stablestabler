<template>
  <header class="hero">
    <img src="/png/crane.png" alt="crane" class="crane" loading="eager" />
    <img src="/png/rope.png" alt="rope" class="rope" loading="eager" />
    <img
      src="/png/block-red.png"
      alt="block-red"
      class="block-red"
      loading="eager"
    />
  </header>
  <main>
    <h1 class="headline">Stable Stabler</h1>
    <p class="subtitle">Stack blocks and build the highest tower!</p>
    <nav class="menu">
      <ButtonWrapper centered style="margin-top: 0">
        <Button
          :action="ButtonAction.SAME_SITE"
          :to="{ name: 'Game' }"
          class="btn btn-primary"
        >
          Start Game
        </Button>
        <Button
          :action="ButtonAction.SAME_SITE"
          :to="{ name: 'Highscores' }"
          class="btn btn-secondary"
        >
          Highscores
        </Button>
      </ButtonWrapper>
    </nav>
    <div class="game-advice">
      Use SPACE to drop blocks • Build as high as you can!
    </div>
  </main>
</template>

<script setup lang="ts">
import Button from '@/components/Ui/ButtonUi.vue';
import { ButtonAction } from '@/components/Ui/button.type.ts';
import ButtonWrapper from '@/components/Utils/ButtonWrapper.vue';
</script>

<style scoped></style>
