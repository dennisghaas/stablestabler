<template>
  <template v-if="view === GameView.WELCOME">
    <AppDialog>
      <form @submit.prevent="onSubmit">
        <h2 style="text-align: center; margin-bottom: 10px">Enter your Name</h2>

        <InputUi
          id="name"
          label="Your name"
          placeholder="e.g. John Doe"
          required
          v-model:value="name"
        />

        <div class="button-wrapper">
          <ButtonUi
            type="submit"
            class="btn btn-secondary"
            style="margin-top: 30px"
          >
            Let's play!
          </ButtonUi>
        </div>
      </form>
    </AppDialog>
  </template>
  <template v-else> Game Mode mit Namen {{ name }} </template>
</template>

<script setup lang="ts">
import AppDialog from '@/components/AppDialog/AppDialog.vue';
import ButtonUi from '@/components/Ui/ButtonUi.vue';
import InputUi from '@/components/Ui/InputUi.vue';
import { GameView } from '@/pages/GameView/game-view.enum.ts';
import { useConfigStore } from '@/stores/config.store.ts';
import { onMounted, ref } from 'vue';

const configStore = useConfigStore();
const view = ref<GameView>(GameView.WELCOME);
const name = ref('');

const onSubmit = () => {
  configStore.gameName = name.value;
  view.value = GameView.GAME;
};

onMounted(() => {
  if (configStore.gameName && configStore.gameName.length > 0) {
    name.value = configStore.gameName;
  }
});
</script>

<style scoped>
.button-wrapper {
  display: flex;
  justify-content: center;
}
</style>
