export type QueryCache = Map<string, unknown>;

export type UseQueryOptions<T> = {
	queryKey: string;
	queryFn: () => Promise<T>;
	onSuccess?: (data: T) => void;
	onError?: (error: unknown) => void;
	onSettled?: (data: T | null, error: unknown, queryKey: string) => void;
	enabled?: boolean;
};

export type UseQueryResult<T> = {
	data: T | undefined;
	isLoading: boolean;
	isError: boolean;
	error: unknown;
	refetch: () => Promise<void>;
};

export type MutationFunction<T, TVariables> = (variables: TVariables) => Promise<T>;

export type UseMutationOptions<T, TVariables, TContext = unknown> = {
	mutationFn: MutationFunction<T, TVariables>;
	onMutate?: (variables: TVariables) => Promise<TContext> | TContext;
	onSuccess?: (data: T, variables: TVariables, context: TContext | undefined) => void;
	onError?: (error: unknown, variables: TVariables, context: TContext | undefined) => void;
	onSettled?: (data: T | null, error: unknown, variables: TVariables, context: TContext | undefined) => void;
};

export type UseMutationResult<T, TVariables> = {
	mutateAsync: (variables: TVariables) => Promise<void>;
	data: T | null;
	error: unknown;
	isPending: boolean;
	isSuccess: boolean;
	isError: boolean;
};
