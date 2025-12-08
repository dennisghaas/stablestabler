import type {
  BackendOptions,
  BackendResult,
} from '@/composables/useBackend/backend.type.ts';
import { core } from '@/core';
import { useConfigStore } from '@/stores/config.store.ts';
import axios, { type Method } from 'axios';

export const useBackend = () => {
  const configStore = useConfigStore();
  const request = async <T = unknown>(
    method: Method,
    url: string,
    body?: unknown,
    options: BackendOptions = {},
  ): Promise<BackendResult<T>> => {
    const { id, responseType = 'json' } = options;

    try {
      configStore.startLoading(id);

      const response = await axios({
        method,
        url: core.base.apiUrl + url,
        data: body,
        withCredentials: true,
        responseType,
        headers: {
          'x-api-key': core.secret.key,
          Accept: responseType === 'text' ? 'text/html' : 'application/json',
        },
      });

      return { data: response.data };
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const data = error.response?.data;
        return {
          error: data?.error,
        };
      }

      return { error: 'Unknown error' };
    } finally {
      configStore.stopLoading(id);
    }
  };

  const getBackend = <T>(url: string, options?: BackendOptions) =>
    request<T>('GET', url, undefined, options);

  const postBackend = <T>(
    url: string,
    data?: unknown,
    options?: BackendOptions,
  ) => request<T>('POST', url, data, options);

  const patchBackend = <T>(
    url: string,
    data: unknown,
    options?: BackendOptions,
  ) => request<T>('PATCH', url, data, options);

  const putBackend = <T>(
    url: string,
    data: unknown,
    options?: BackendOptions,
  ) => request<T>('PUT', url, data, options);

  const deleteBackend = <T>(url: string, options?: BackendOptions) =>
    request<T>('DELETE', url, undefined, options);

  return {
    getBackend,
    postBackend,
    patchBackend,
    putBackend,
    deleteBackend,
  };
};
