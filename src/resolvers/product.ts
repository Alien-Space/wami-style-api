import {
  Args,
  ArgsType,
  Field,
  InputType,
  Mutation,
  Query,
  Resolver,
} from 'type-graphql';
import Product, { AddCategoryInput } from '../entities/Product';

@InputType()
export class AddProductInput {
  @Field({ nullable: false })
  name: string;

  @Field({ nullable: false })
  description: string;

  @Field({ nullable: false })
  price: number;

  @Field(() => [AddCategoryInput], { description: 'Separe the elements by ;' })
  categories: AddCategoryInput[];
}

@ArgsType()
class AddProductArgs {
  @Field(() => [AddProductInput])
  productsInput: AddProductInput[];
}

@Resolver(Product)
export class ProductResolver {
  @Query(() => [Product])
  async allProducts(): Promise<Product[]> {
    return await Product.find();
  }

  @Mutation(() => [Product])
  async addProduct(
    @Args(() => AddProductArgs) productArgs: AddProductInput[]
  ): Promise<Product[]> {
    const products = await Product.find();
    console.log(products);

    return products;
  }
}
