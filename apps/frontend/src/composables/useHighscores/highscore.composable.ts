import { useBackend } from '@/composables/useBackend/backend.composable.ts';
import { HighscoreType } from '@/composables/useHighscores/highscore.type.ts';
import { ApiResponse } from '@/types/app.type.ts';
import { GameMode } from '../../../../../types/enums/highscore.enum.ts';
export const useHighscore = () => {
  const handleFetchHighscores = async (
    mode: GameMode,
  ): Promise<ApiResponse<HighscoreType[]>> => {
    const { getBackend } = useBackend();
    const { error, data } = await getBackend<HighscoreType[]>(
      `/highscore?mode=${mode}`,
      {
        id: 'fetch-highscores',
      },
    );
    if (error || !data) {
      return { error };
    }

    return {
      data,
    };
  };

  return {
    handleFetchHighscores,
  };
};
