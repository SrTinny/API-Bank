import { useState, useCallback } from 'react';
import { Alert } from 'react-native';
import type { AxiosError } from 'axios';

type AsyncFn<TArgs extends any[], R> = (...args: TArgs) => Promise<R>;

export function useApiCall<TData = any, TArgs extends any[] = any[]>(
  fn: AsyncFn<TArgs, TData>,
  options?: { showSuccessMessage?: boolean }
) {
  const [data, setData] = useState<TData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const call = useCallback(
    async (...args: TArgs) => {
      setLoading(true);
      setError(null);
      try {
        const res = await fn(...args);
        setData(res as any);

        if (options?.showSuccessMessage) {
          // se o retorno tiver uma mensagem no objeto, tente exibir
          const message = (res as any)?.message;
          if (message && typeof message === 'string') {
            Alert.alert('Sucesso', message);
          }
        }

        return res;
      } catch (err: any) {
        let message = 'Erro desconhecido';

        // Axios Error padrão
        const axiosErr = err as AxiosError<any>;
        if (axiosErr?.response?.data) {
          const payload = axiosErr.response.data;
          // Spring Boot default error body: { timestamp, status, error, message, path }
          if (payload?.message && typeof payload.message === 'string') {
            message = payload.message;
          } else if (typeof payload === 'string') {
            message = payload;
          } else if (payload?.errors) {
            // validação
            try {
              const first = Array.isArray(payload.errors) ? payload.errors[0] : undefined;
              message = first?.defaultMessage || JSON.stringify(payload.errors);
            } catch (e) {
              message = JSON.stringify(payload.errors);
            }
          }
        } else if (err?.message) {
          message = err.message;
        }

        setError(message);
        // exibir alerta com a mensagem extraída
        Alert.alert('Erro', message);
        throw err; // rethrow para permitir tratamento local se necessário
      } finally {
        setLoading(false);
      }
    },
    [fn, options]
  );

  return { data, loading, error, call } as const;
}
