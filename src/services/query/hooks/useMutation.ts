import { useState, useRef, useCallback, useEffect } from 'react';
import type { UseMutationOptions, UseMutationResult } from '../types';

export function useMutation<T, TVariables, TError, TContext = unknown>({
	mutationFn,
	onMutate,
	onSuccess,
	onError,
	onSettled,
}: UseMutationOptions<T, TVariables, TError, TContext>): UseMutationResult<T, TVariables, TError> {
	const [isPending, setIsPending] = useState<boolean>(false);
	const [isSuccess, setIsSuccess] = useState<boolean>(false);
	const [isError, setIsError] = useState<boolean>(false);
	const [error, setError] = useState<TError | null>(null);
	const [data, setData] = useState<T | null>(null);
	const isMounted = useRef<boolean>(true);

	const mutateAsync = useCallback(
		async (variables: TVariables): Promise<void> => {
			let context: TContext | undefined;

			setIsPending(true);
			setIsSuccess(false);
			setIsError(false);
			setError(null);
			setData(null);

			try {
				if (onMutate) {
					context = await onMutate(variables);
				}

				const result = await mutationFn(variables);

				if (isMounted.current) {
					setData(result);
					setIsSuccess(true);
					onSuccess?.(result, variables, context);
					onSettled?.(result, null, variables, context);
				}
			} catch (err) {
				if (isMounted.current) {
					setIsError(true);
					setError(err as TError);
					onError?.(err as TError, variables, context);
					onSettled?.(null, err, variables, context);
				}
			} finally {
				if (isMounted.current) {
					setIsPending(false);
				}
			}
		},
		[mutationFn, onMutate, onSuccess, onError, onSettled],
	);

	useEffect(() => {
		isMounted.current = true;
		return () => {
			isMounted.current = false;
		};
	}, []);

	return {
		mutateAsync,
		data,
		error,
		isPending,
		isSuccess,
		isError,
	};
}
