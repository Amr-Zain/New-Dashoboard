import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import axiosInstance from "@/services/instance";
import { AxiosError, AxiosResponse, Method } from "axios";

type UseMutateProps_TP<Response_T, Request_T = unknown> = {
  endpoint: string;
  mutationKey: [string];
  onSuccess?: (data: Response_T) => void;
  onError?: (err: AxiosError<Response_T>) => void;
  formData?: boolean;
  onMutate?: (variables: Request_T) => Promise<unknown> | unknown;
  method?: Lowercase<Method>;
  headers?: Record<string, string>;
  general?: boolean;
  mutationOptions?: Omit<
    UseMutationOptions<AxiosResponse<Response_T>, AxiosError<Response_T>, Request_T>,
    'mutationKey' | 'mutationFn'
  >;
};

export function useMutate<Response_T = unknown, Request_T = unknown>({
  endpoint,
  mutationKey,
  onSuccess,
  onError: originalOnError,
  formData,
  onMutate,
  method = "post",
  headers = {},
  general = false,
  mutationOptions,
}: UseMutateProps_TP<Response_T, Request_T>): {
  data: AxiosResponse<Response_T> | undefined;
  isLoading: boolean;
  isSuccess: boolean;
  mutate: (variables: Request_T) => void;
  failureReason: unknown;
  isError: boolean;
} {
  const baseURL = import.meta.env.VITE_BASE_URL;
  const baseURLGeneral = import.meta.env.VITE_BASE_GENERAL_URL;

  const enhancedOnError = (err: AxiosError<Response_T>) => {
    if (originalOnError) originalOnError(err);
  };

  const mutation = useMutation<AxiosResponse<Response_T>, AxiosError<Response_T>, Request_T>({
    ...mutationOptions,
    mutationKey,
    mutationFn: (values: Request_T) => {
      const requestConfig = {
        method: method.toUpperCase(),
        url: `${general ? baseURLGeneral : baseURL}/${endpoint}`,
        data: values,
        headers: formData
          ? {
              ...headers,
              "Content-Type": "multipart/form-data",
              Accept: "application/json",
            }
          : {
              ...headers,
              "Content-Type": "application/json; charset=utf-8",
              Accept: "application/json",
            },
      };
      return axiosInstance.request<Response_T>(requestConfig);
    },
    onSuccess: (data) => {
      if (onSuccess) onSuccess(data.data);
    },
    onError: enhancedOnError,
    onMutate,
  });

  return {
    data: mutation.data,
    isLoading: mutation.isPending,
    isSuccess: mutation.isSuccess,
    mutate: mutation.mutate,
    failureReason: mutation.failureReason,
    isError: mutation.isError,
  };
}