export interface FruitData {
  id: number;
  inventoryDate: string;
  productName: string;
  color: string;
  amount: number;
  unit: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface FruitFormData {
  inventoryDate: string;
  productName: string;
  color: string;
  amount: number;
  unit: number;
}

export interface FruitNameData {
  productName: string;
}

export interface FruitFormError {
  inventoryDate?: string;
  productName?: string;
  color?: string;
  amount?: string;
  unit?: string;
}
