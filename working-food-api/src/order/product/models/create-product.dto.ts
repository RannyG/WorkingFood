export interface CreateProductDto {
  name: string;
  description: string | null;
  price: number;
  isAvailable: boolean;
  idRestaurant: number;
  stockCount: number;
}
