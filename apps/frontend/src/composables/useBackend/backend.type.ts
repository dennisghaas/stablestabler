export type BackendOptions = {
  id?: string;
  responseType?: 'json' | 'text';
};

export type BackendResult<T> = {
  data?: T;
  error?: string;
};
