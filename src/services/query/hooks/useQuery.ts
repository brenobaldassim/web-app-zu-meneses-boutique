import { useState, useEffect, useRef, useCallback } from 'react';
import type { UseQueryOptions, UseQueryResult } from '../types';
import { queryClient } from '../queryClient';

export function useQuery<T>({
	queryKey,
	queryFn,
	enabled = true,
	staleTime = 0,
	onSuccess,
	onError,
	onSettled,
}: UseQueryOptions<T>): UseQueryResult<T> {
	const [data, setData] = useState<T | undefined>(() => queryClient.getQueryData<T>(queryKey));
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isError, setIsError] = useState<boolean>(false);
	const [error, setError] = useState<unknown>(null);
	const [isStale, setIsStale] = useState<boolean>(() => queryClient.isStale(queryKey));
	const isMounted = useRef<boolean>(true);
	const isFetching = useRef<boolean>(false);

	const refetch = useCallback(async () => {
		if (isFetching.current) {
			return;
		}

		try {
			isFetching.current = true;
			setIsLoading(true);
			setIsError(false);
			setError(null);

			const result = await queryFn();
			queryClient.setQueryData(queryKey, result, staleTime);

			if (isMounted.current) {
				setData(result);
				setIsStale(false);
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
				isFetching.current = false;
				setIsLoading(false);
			}
		}
	}, [queryKey, staleTime, queryFn, onSuccess, onError, onSettled]);

	useEffect(() => {
		isMounted.current = true;

		const cachedData = queryClient.getQueryData<T>(queryKey);
		const isDataStale = queryClient.isStale(queryKey);
		setIsStale(isDataStale);

		if (enabled) {
			if (!cachedData || isDataStale) {
				void refetch();
			} else {
				setData(cachedData);
			}
		}
		return () => {
			isMounted.current = false;
		};
	}, [queryKey, enabled, refetch]);

	return {
		data,
		isStale,
		isLoading,
		isError,
		error,
		refetch,
	};
}
