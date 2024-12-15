import { Dimension } from "../interfaces/offer-detail.interface";

export type DimensionType = 'Carton' | 'Box' | 'Pallet';
export type DimensionValue = Dimension
export type DimensionRecord = Record<DimensionType, DimensionValue>;
