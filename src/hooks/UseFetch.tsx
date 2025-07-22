import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { useIsRTL } from './useIsRTL';
import axiosInstance from '@/services/instance';
import { logOut } from '@/utils/helpers';
import { useNavigate } from '@tanstack/react-router'; // Changed import
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';

interface useFetchProps extends UseQueryOptions {
  queryKey: any;
  endpoint: string | null;
  enabled?: boolean;
  select?: ((data: any) => any) | undefined;
  onError?: (err: any) => void;
  onSuccess?: (data: any) => void;
  general?: boolean;
  params?: any;
  props?: any;
};

function useFetch<T>({
  queryKey,
  endpoint,
  enabled = true,
  select,
  onError: originalOnError,
  onSuccess,
  general = false,
  params,
  props,
}: useFetchProps) {
  const { t } = useTranslation();
  const isRTL = useIsRTL();
  const router = useNavigate(); // Hook remains the same name
  const baseURL = general ? import.meta.env.VITE_BASE_GENERAL_URL : import.meta.env.VITE_BASE_URL;

  const paginationParams = {
    page: params?.page || 1,
    limit: params?.limit || 10,
  };

  const query = useQuery<T>(
    {
    ...props,
    queryKey: [...queryKey, isRTL, paginationParams.page],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get(`${baseURL}/${endpoint}`, { params: { ...params, ...paginationParams } });
        if (res.data?.error) {
          throw new Error(res.data.message || t('no_data'));
        }
        if (onSuccess) {
          onSuccess(res.data);
        }
        return res.data;
      } catch (err: any) {
        if (originalOnError) {
          originalOnError(err);
        }
        toast.error(err?.response?.data?.message || err.message);
        console.log("🚀 ~ queryFn: ~ err.status:", err.status)
        if (err.status == 401) {
          logOut()
          router({ to: "/auth/login" }); // Changed navigation call
        }
        throw err;
      }
    },
    enabled,
    select: (data) => {
      // Select function to prevent re-render if the data is the same
      if (select) {
        return select(data);
      }
      return data;
    },
  });

  return query;
}

export default useFetch;
