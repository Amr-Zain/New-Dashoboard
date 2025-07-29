import axiosInstance from "@/services/instance";
import { QueryClient, QueryKey } from "@tanstack/react-query";
import axios from "axios";
import { logOut } from "./helpers";
import { redirect } from "@tanstack/react-router";
import i18n from '@/i18n';

export async function prefetchWithUseFetchConfig(
    queryClient: QueryClient,
    queryKey: QueryKey, // Match the useFetch queryKey parameter
    endpoint: string,
    params: Record<string, any> = {},
    general: boolean = false,
) {
    const paginationParams = {
        page: params?.page || 1,
        limit: params?.limit || 10,
    };

    const baseURL = general ? import.meta.env.VITE_BASE_GENERAL_URL : import.meta.env.VITE_BASE_URL;

    const isRTL = (i18n.language || 'ar').startsWith('ar')
    const fullQueryKey = [...queryKey, isRTL, paginationParams?.page];

    await queryClient.prefetchQuery({
        queryKey: fullQueryKey,
        staleTime: 60_000,
        queryFn: async () => {
            try {
                const res = await axiosInstance.get(`${baseURL}/${endpoint}`, {
                    params: { ...params, ...paginationParams }
                });
                if (res.data?.error) {
                    throw new Error(res.data.message);
                }
                return res.data;
            } catch (error) {
                if (axios.isAxiosError(error) && error.response?.status === 401) {
                    logOut();
                    throw redirect({ to: "/auth/login" });
                }
                throw error;
            }
        },
    });
}