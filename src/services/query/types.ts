export type CacheEntry<T = unknown> = {
	data: T;
	timestamp: number;
	staleTime: number;
};

export type QueryCache = Map<string, CacheEntry>;

export type QueryClientMethods = {
	clear: () => void;
	invalidateQueries: (queryKey?: string) => void;
	getQueryData: <T>(queryKey: string) => T | undefined;
	setQueryData: <T>(queryKey: string, data: T, staleTime?: number) => void;
	removeQueries: (queryKey?: string) => void;
	prefetchQuery: <T>(queryKey: string, queryFn: () => Promise<T>, staleTime?: number) => Promise<void>;
};

export type UseQueryOptions<T> = {
	queryKey: string;
	queryFn: () => Promise<T>;
	onSuccess?: (data: T) => void;
	onError?: (error: unknown) => void;
	onSettled?: (data: T | null, error: unknown, queryKey: string) => void;
	enabled?: boolean;
	staleTime?: number;
	cacheTime?: number;
};

export type UseQueryResult<T> = {
	data: T | undefined;
	isLoading: boolean;
	isError: boolean;
	error: unknown;
	refetch: () => Promise<void>;
	isStale: boolean;
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
