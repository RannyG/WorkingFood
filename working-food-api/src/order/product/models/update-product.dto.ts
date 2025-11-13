export interface UpdateProductDto {
  name: string;
  description: string | null;
  price: number;
  stockCount: number;
}
