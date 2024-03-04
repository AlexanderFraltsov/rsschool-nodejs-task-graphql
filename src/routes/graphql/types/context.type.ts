import DataLoader from 'dataloader';
import { DB } from './db.type.js';

export type GQLContext = {
	prisma: DB;
	dataLoaders: WeakMap<WeakKey, DataLoader<unknown, unknown, unknown>>;
}
