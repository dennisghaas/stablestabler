<template>
  <main>
    <h1 class="headline">Highscores</h1>
    <p class="subtitle">Look at these master builders</p>

    <LoadingUi id="fetch-highscores">
      <div v-if="highscoreList && highscoreList.length > 0" id="highscore-list">
        <table class="highscore-table">
          <thead>
            <tr>
              <th>Pos.</th>
              <th>Name</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(entry, index) in highscoreList?.slice(0, 10)"
              :key="entry.score"
              class="highscore-entry"
            >
              <td class="rank">{{ index + 1 }}</td>
              <td class="player">{{ entry.player }}</td>
              <td class="score">{{ entry.score }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <template v-else> Be the first. No scores set yet.</template>
    </LoadingUi>

    <ButtonWrapper centered>
      <ButtonUi
        :action="ButtonAction.SAME_SITE"
        class="btn btn-secondary"
        :to="{ name: 'Game' }"
      >
        Challenge highscores
      </ButtonUi>
      <ButtonUi
        :action="ButtonAction.SAME_SITE"
        class="btn btn-primary"
        :to="{ name: 'Home' }"
      >
        Back
      </ButtonUi>
    </ButtonWrapper>
  </main>
</template>

<script setup lang="ts">
import { ButtonAction } from '@/components/Ui/button.type.ts';
import ButtonUi from '@/components/Ui/ButtonUi.vue';
import LoadingUi from '@/components/Ui/LoadingUi.vue';
import ButtonWrapper from '@/components/Utils/ButtonWrapper.vue';
import { useHighscore } from '@/composables/useHighscores/highscore.composable.ts';
import { HighscoreType } from '@/composables/useHighscores/highscore.type.ts';
import { onMounted, ref } from 'vue';
import { GameMode } from '../../../../../types/enums/highscore.enum.ts';

const errorMessage = ref<string | string[]>('');
const highscoreList = ref<HighscoreType[] | undefined>([]);

onMounted(async () => {
  const { handleFetchHighscores } = useHighscore();
  const { error, data } = await handleFetchHighscores(GameMode.SINGLE);
  if (error) {
    return (errorMessage.value = error);
  }

  return (highscoreList.value = data);
});
</script>

<style scoped></style>
