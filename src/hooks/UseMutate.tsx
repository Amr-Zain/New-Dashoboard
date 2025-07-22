import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/services/instance";

type UseMutateProps_TP<Response_T> = {
  endpoint: string;
  mutationKey: [string];
  onSuccess?: (data: Response_T) => void;
  onError?: (err: unknown) => void;
  formData?: boolean;
  onMutate?: (err?: unknown) => void;
  method?: "post" | "delete" | "put";
  headers?: Record<string, string>;
  general?: boolean;
};

export function useMutate<Response_T>({
  endpoint,
  mutationKey,
  onSuccess,
  onError: originalOnError,
  formData,
  onMutate,
  method = "post",
  headers = {},
  general = false,
}: UseMutateProps_TP<Response_T>) {
    
  const baseURL = import.meta.env.VITE_BASE_URL;
  const baseURLGeneral = import.meta.env.VITE_BASE_GENERAL_URL;

  const enhancedOnError = (err: any) => {
    if (originalOnError) originalOnError(err);
  };

  const mutation = useMutation<Response_T, unknown, any>({
    mutationKey,
    mutationFn: (values) => {
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
              "Content-Type": "application/json; charset=utf-8",
              Accept: "application/json",
            },
      };
      return axiosInstance.request(requestConfig);
    },
    onSuccess,
    onError: enhancedOnError,
    onMutate,
  });

  return {
    data: mutation.data?.data,
    isLoading: mutation.isLoading,
    isSuccess: mutation.isSuccess,
    mutate: mutation.mutate,
    failureReason: mutation.failureReason,
    isError: mutation.isError,
  };
}
