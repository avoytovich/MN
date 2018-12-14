import { buildCRUD } from './api';

export const group = buildCRUD('/api/Group');
export const members = buildCRUD('/api/Member');
export const organization = buildCRUD('/api/Organization');