import {
  createWafConfig,
  getWafConfigs,
  getWafConfigById,
  RequestOptions,
} from '@linode/api-v4/lib/waf';
import { createQueryKeys } from '@lukemorales/query-key-factory';
import { useMutation, useQuery } from '@tanstack/react-query';
import { APIError } from '@linode/api-v4';

const wafQueries = createQueryKeys('wafConfigs', {
  wafConfigs: (options: RequestOptions = {}) => ({
    queryFn: () => getWafConfigs(options),
    queryKey: [options],
  }),
  wafConfigById: (id: string, options: RequestOptions = {}) => ({
    queryFn: () => getWafConfigById(id, options),
    queryKey: [options],
  }),
});

export const useWafConfigs = (options: RequestOptions = {}) => {
  return useQuery<any, APIError[]>({ ...wafQueries.wafConfigs(options) });
};

export const useWafConfigById = (id: string, options: RequestOptions = {}) => {
  return useQuery<any, APIError[]>({
    ...wafQueries.wafConfigById(id, options),
  });
};

export const useCreateWafConfig = (options: RequestOptions = {}) => {
  return useMutation({
    mutationFn: (data) => createWafConfig(data, options),
    onSuccess: () => {},
    onError: () => {},
  });
};
