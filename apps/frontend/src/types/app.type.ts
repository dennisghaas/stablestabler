export type ResponseLoading = {
  id?: string;
  enabled: boolean;
};

export type ApiResponse<T = unknown> = {
  data?: T;
  message?: string;
  error?: string;
};
