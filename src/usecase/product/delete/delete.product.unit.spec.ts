import ProductFactory from "../../../domain/product/factory/product.factory";
import DeleteProductUseCase from "./delete.product.usecase";

const product = ProductFactory.create("a", "Product", 100);

const MockRepository = () => {
  return {
    create: jest.fn(),
    findAll: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    update: jest.fn(),
    delete: jest.fn(),
  };
};

describe("Unit test for product delete use case", () => {
  it("should delete a product", async () => {
    const productRepository = MockRepository();
    const productDeleteUseCase = new DeleteProductUseCase(productRepository);

    const output = await productDeleteUseCase.execute({ id: product.id });

    expect(productRepository.delete).toHaveBeenCalledWith(product.id);
    expect(output).toEqual({});
  });
});
