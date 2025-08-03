import type { QueryCache, CacheEntry, QueryClientMethods } from './types';

class QueryClient implements QueryClientMethods {
	private cache: QueryCache = new Map();
	private defaultStaleTime: number = 0;
	private defaultCacheTime: number = 5 * 60 * 1000;

	clear(): void {
		this.cache.clear();
		console.log('Query Cache cleared');
	}

	invalidateQueries(queryKey?: string): void {
		if (queryKey) {
			const entry = this.cache.get(queryKey);
			if (entry) {
				entry.staleTime = 0;
				entry.timestamp = 0;
				console.log(`Query ${queryKey} invalidated`);
			}
		} else {
			for (const entry of this.cache.values()) {
				entry.staleTime = 0;
				entry.timestamp = 0;
			}
			console.log('All queries invalidated');
		}
	}

	getQueryData<T>(queryKey: string): T | undefined {
		const entry = this.cache.get(queryKey);

		if (!entry) {
			return;
		}

		const now = Date.now();
		if (now - entry.timestamp > this.defaultCacheTime) {
			this.cache.delete(queryKey);
			console.log(`Query ${queryKey} expired`);
			return;
		}

		return entry.data as T;
	}

	setQueryData<T>(queryKey: string, data: T, staleTime?: number): void {
		const entry: CacheEntry<T> = {
			data,
			timestamp: Date.now(),
			staleTime: staleTime ?? this.defaultStaleTime,
		};
		this.cache.set(queryKey, entry);
	}

	removeQueries(queryKey?: string): void {
		if (queryKey) {
			this.cache.delete(queryKey);
			console.log(`Query ${queryKey} removed`);
		} else {
			this.cache.clear();
			console.log('All queries removed');
		}
	}

	isStale(queryKey: string): boolean {
		const entry = this.cache.get(queryKey);
		if (!entry) {
			return true;
		}
		const now = Date.now();
		return now - entry.timestamp > entry.staleTime;
	}

	async prefetchQuery<T>(queryKey: string, queryFn: () => Promise<T>, staleTime?: number): Promise<void> {
		try {
			const data = await queryFn();
			this.setQueryData(queryKey, data, staleTime);
			console.log(`Query ${queryKey} prefetched`);
		} catch (error) {
			console.error(`Error prefetching query ${queryKey}:`, error);
		}
	}

	getCacheStats() {
		return {
			size: this.cache.size,
			keys: Array.from(this.cache.keys()),
			entries: Array.from(this.cache.entries()).map(([key, entry]) => ({
				key,
				timestamp: entry.timestamp,
				isStale: this.isStale(key),
			})),
		};
	}
}

export const queryClient = new QueryClient();
