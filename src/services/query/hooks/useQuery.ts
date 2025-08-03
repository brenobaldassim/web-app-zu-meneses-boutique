import { useState, useEffect, useRef, useCallback } from 'react';
import type { QueryCache, UseQueryOptions, UseQueryResult } from '../types';

const cache: QueryCache = new Map();

export function useQuery<T>({
	queryKey,
	queryFn,
	enabled = true,
	onSuccess,
	onError,
	onSettled,
}: UseQueryOptions<T>): UseQueryResult<T> {
	const [data, setData] = useState<T | undefined>(() => cache.get(queryKey) as T | undefined);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isError, setIsError] = useState<boolean>(false);
	const [error, setError] = useState<unknown>(null);
	const isMounted = useRef<boolean>(true);

	const refetch = useCallback(async () => {
		try {
			setIsLoading(true);
			setIsError(false);
			setError(null);
			const result = await queryFn();
			cache.set(queryKey, result);
			if (isMounted.current) {
				setData(result);
				onSuccess?.(result);
				onSettled?.(result, null, queryKey);
			}
		} catch (err) {
			if (isMounted.current) {
				setIsError(true);
				setError(err);
				onError?.(err);
				onSettled?.(null, err, queryKey);
			}
		} finally {
			if (isMounted.current) {
				setIsLoading(false);
			}
		}
	}, [queryKey, queryFn, onSuccess, onError, onSettled]);

	useEffect(() => {
		isMounted.current = true;
		if (enabled && !cache.has(queryKey)) {
			void refetch();
		}
		return () => {
			isMounted.current = false;
		};
	}, [queryKey, enabled, refetch]);

	return {
		data,
		isLoading,
		isError,
		error,
		refetch,
	};
}
