import { CategoryDto } from '../../category/models/category.dto';
import { ProductDto } from './product.dto';

export interface ProductWithCategory extends ProductDto {
  categories: CategoryDto[];
}
