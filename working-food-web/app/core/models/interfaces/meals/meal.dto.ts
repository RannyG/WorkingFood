export interface MealDto {
  id: number;
  name: string;
  description: string | null;
  price: number;
  isAvailable: boolean;
  stockCount: number;
}
