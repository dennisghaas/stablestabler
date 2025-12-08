<template>
  <div class="score-wrapper">
    <LoadingUi id="fetch-scores">
      <div class="score-item" id="current-score">Score: {{ score }}</div>
      <div v-if="currentHighscore" class="score-item" id="high-score">
        Highscore: {{ currentHighscore?.score }}
      </div>
    </LoadingUi>
  </div>
  <AppDialog v-if="isGameOver">
    <h1 class="text-center">Game Over!</h1>
    <p class="text-center">
      Not bad {{ playerName }}! Your score is <q>{{ score }}</q>
    </p>

    <ButtonWrapper centered>
      <ButtonUi class="btn btn-secondary" type="button" @click="onRestartGame">
        Restart game
      </ButtonUi>

      <ButtonUi class="btn btn-tertiary" type="button" @click="onExit">
        Exit game
      </ButtonUi>
    </ButtonWrapper>
  </AppDialog>

  <div class="game-ui">
    <div ref="gameContainer" class="game-container"></div>
  </div>
</template>

<script setup lang="ts">
import AppDialog from '@/components/AppDialog/AppDialog.vue';
import ButtonUi from '@/components/Ui/ButtonUi.vue';
import LoadingUi from '@/components/Ui/LoadingUi.vue';
import ButtonWrapper from '@/components/Utils/ButtonWrapper.vue';
import { useHighscore } from '@/composables/useHighscores/highscore.composable.ts';
import { HighscoreType } from '@/composables/useHighscores/highscore.type.ts';
import { useTowerGame } from '@/composables/useTowergame/towergame.composable.ts';
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { GameMode, Team } from '../../../../../types/enums/highscore.enum.ts';

const props = defineProps<{
  playerName: string;
}>();

const { handleFetchHighestScore, handleFetchLowestScore, handleCreateScore } =
  useHighscore();
const { startGame, score, isGameOver, restartGame, destroyGame } =
  useTowerGame();
const currentHighscore = ref<HighscoreType | undefined>(undefined);
const currentLowscore = ref<HighscoreType | undefined>(undefined);
const gameContainer = ref<HTMLElement | null>(null);
const router = useRouter();
const errorMessage = ref<string | string[]>('');

const payload = computed(() => {
  return {
    player: props.playerName,
    score: score.value,
    mode: GameMode.SINGLE,
    team: Team.RED,
  };
});

const onExit = async () => {
  await saveScore();
  destroyGame();
  return await router.push({ name: 'Home' });
};

const onRestartGame = async () => {
  if (currentLowscore.value && score.value <= currentLowscore.value?.score) {
    return restartGame(gameContainer.value);
  }

  await saveScore();
  return restartGame(gameContainer.value);
};

async function saveScore() {
  const { error } = await handleCreateScore(payload.value);
  if (error) {
    errorMessage.value = error;
  }
}

onMounted(async () => {
  currentHighscore.value = await handleFetchHighestScore(GameMode.SINGLE);
  currentLowscore.value = await handleFetchLowestScore(GameMode.SINGLE);

  if (gameContainer.value) {
    startGame(gameContainer.value);
  }
});
</script>

<style scoped></style>
