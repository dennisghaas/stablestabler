<template>
  <template v-if="view === GameView.WELCOME">
    <AppDialog>
      <form @submit.prevent="onSubmit">
        <h2 class="text-center">Enter your Name</h2>

        <InputUi
          id="name"
          label="Your name"
          placeholder="e.g. John Doe"
          required
          v-model:value="playerName"
        />

        <ButtonWrapper centered>
          <ButtonUi type="submit" class="btn btn-secondary">
            Let's Go!
          </ButtonUi>
          <ButtonUi
            :action="ButtonAction.SAME_SITE"
            class="btn btn-tertiary"
            :to="{ name: 'Home' }"
          >
            Back
          </ButtonUi>
        </ButtonWrapper>
      </form>
    </AppDialog>
  </template>
  <template v-else>
    <Game :player-name="playerName" />
  </template>
</template>

<script setup lang="ts">
import AppDialog from '@/components/AppDialog/AppDialog.vue';
import Game from '@/components/Game/Game.vue';
import { ButtonAction } from '@/components/Ui/button.type.ts';
import ButtonUi from '@/components/Ui/ButtonUi.vue';
import InputUi from '@/components/Ui/InputUi.vue';
import ButtonWrapper from '@/components/Utils/ButtonWrapper.vue';
import { GameView } from '@/pages/GameView/game-view.enum.ts';
import { useConfigStore } from '@/stores/config.store.ts';
import { onMounted, ref } from 'vue';

const configStore = useConfigStore();
const view = ref<GameView>(GameView.WELCOME);
const playerName = ref('');

const onSubmit = () => {
  configStore.playerName = playerName.value;
  view.value = GameView.GAME;
};

onMounted(() => {
  if (configStore.playerName && configStore.playerName.length > 0) {
    playerName.value = configStore.playerName;
  }
});
</script>
