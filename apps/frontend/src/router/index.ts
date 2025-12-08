import GameView from '@/pages/GameView/GameView.vue';
import HighscoreView from '@/pages/HighscoreView/HighscoreView.vue';
import HomeView from '@/pages/HomeView/HomeView.vue';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView,
    },
    {
      path: '/game',
      name: 'Game',
      component: GameView,
    },
    {
      path: '/highscores',
      name: 'Highscores',
      component: HighscoreView,
    },
  ],
});
export default router;
