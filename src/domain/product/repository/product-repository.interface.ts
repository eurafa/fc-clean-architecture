import RepositoryInterface from "../../@shared/repository/repository-interface";
import Product from "../entity/product";

export default interface ProductRepositoryInterface
  extends RepositoryInterface<Product> {
  delete(id: string): Promise<void>;
}
