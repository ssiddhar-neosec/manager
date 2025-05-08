import Request, { setData, setHeaders, setMethod, setURL } from '../request';
import { RequestOptions } from '../types';

export const createWafConfig = (data: any, headers: RequestOptions) => {
  return Request(
    setURL(`https://api.lindev.local/v4/waf_config`),
    setMethod('POST'),
    setData(data),
    setHeaders(headers)
  );
};

export const getWafConfigs = (headers: RequestOptions) => {
  return Request(
    setURL(`https://api.lindev.local/v4/waf_config`),
    setMethod('GET'),
    setHeaders(headers)
  );
};

export const getWafConfigById = (id: string, headers: RequestOptions) => {
  return Request(
    setURL(`https://api.lindev.local/v4/waf_config/${id}`),
    setMethod('GET'),
    setHeaders(headers)
  );
};
