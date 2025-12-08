import { useBackend } from '@/composables/useBackend/backend.composable.ts';
import {
  CreateScore,
  HighscoreType,
} from '@/composables/useHighscores/highscore.type.ts';
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

  const handleFetchHighestScore = async (
    mode: GameMode,
  ): Promise<HighscoreType | undefined> => {
    const { getBackend } = useBackend();
    const { error, data } = await getBackend<HighscoreType | null>(
      `/highscore/highest?mode=${mode}`,
      { id: 'fetch-scores' },
    );

    if (error) return undefined;
    return data ?? undefined;
  };

  const handleFetchLowestScore = async (
    mode: GameMode,
  ): Promise<HighscoreType | undefined> => {
    const { getBackend } = useBackend();
    const { error, data } = await getBackend<HighscoreType | null>(
      `/highscore/lowest?mode=${mode}`,
      { id: 'fetch-scores' },
    );

    if (error) return undefined;
    return data ?? undefined;
  };

  const handleCreateScore = async (
    payload: CreateScore,
  ): Promise<ApiResponse> => {
    const { postBackend } = useBackend();
    const { error, data } = await postBackend('/highscore', payload, {
      id: 'create-score',
    });
    if (error || !data) {
      return { error };
    }

    return {
      data,
    };
  };

  return {
    handleFetchHighscores,
    handleFetchHighestScore,
    handleFetchLowestScore,
    handleCreateScore,
  };
};
