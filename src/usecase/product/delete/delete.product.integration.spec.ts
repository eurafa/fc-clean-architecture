import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import CreateProductUseCase from "../create/create.product.usecase";
import DeleteProductUseCase from "./delete.product.usecase";

describe("Test delete product use case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should delete a product", async () => {
    const productRepository = new ProductRepository();
    const createUseCase = new CreateProductUseCase(productRepository);
    const deleteUseCase = new DeleteProductUseCase(productRepository);

    const created = await createUseCase.execute({
      type: "a",
      name: "Product",
      price: 100,
    });

    await deleteUseCase.execute({ id: created.id });

    const productModel = await ProductModel.findOne({
      where: { id: created.id },
    });

    expect(productModel).toBeNull();
  });
});
