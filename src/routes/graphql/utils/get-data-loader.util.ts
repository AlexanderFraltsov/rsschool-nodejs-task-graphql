import DataLoader, { BatchLoadFn } from 'dataloader';

export const getDataLoader = async <T>(
	dataLoaders: WeakMap<WeakKey,	DataLoader<unknown, unknown, unknown>>,
	key: WeakKey,
	cb: (ids: string[]) => Promise<T[]>) => {
	let dl = dataLoaders.get(key);
	if (!dl) {
		const batchLoader: BatchLoadFn<string, unknown> = async (keys: readonly string[]) => {
			const ids = [...keys];
			const sortedInIdsOrder = await cb(ids);
			return sortedInIdsOrder;
		}
		dl = new DataLoader(batchLoader);
		dataLoaders.set(key, dl);
	}
	return dl;
}
