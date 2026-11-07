import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import {
  InputDeleteProductDto,
  OutputDeleteProductDto,
} from "./delete.product.dto";

export default class DeleteProductUseCase {
  private productRepository: ProductRepositoryInterface;

  constructor(productRepository: ProductRepositoryInterface) {
    this.productRepository = productRepository;
  }

  async execute(
    input: InputDeleteProductDto
  ): Promise<OutputDeleteProductDto> {
    await this.productRepository.delete(input.id);
    return {};
  }
}
