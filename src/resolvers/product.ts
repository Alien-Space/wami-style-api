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

  @Field()
  quantity: number;

  @Field(() => [AddCategoryInput], { description: 'Separe the elements by ;' })
  categories: AddCategoryInput[];

  @Field(() => String)
  mainDetail: string;

  @Field(() => String)
  specifications: string;
}

@ArgsType()
class AddProductArgs {
  @Field(() => [AddProductInput])
  productsInput: AddProductInput[];
}

export function parseProductCategories(products: Product[]) {
  return products.map((prod) => ({
    ...prod,
    categories: prod.category.split(',').map((cat) => ({ name: cat })),
  }));
}

@Resolver(Product)
export class ProductResolver {
  @Query(() => [Product])
  async allProducts(): Promise<Product[]> {
    const productsParsed = parseProductCategories(await Product.find());

    return productsParsed as Product[];
  }

  @Mutation(() => [Product])
  async addProduct(
    @Args(() => AddProductArgs) productArgs: AddProductArgs
  ): Promise<Product[]> {
    function parseProductCategories(products: AddProductInput[]) {
      return products.map((productValue) => ({
        ...productValue,
        category: productValue.categories
          .map((cat) => `${cat.name}`)
          .toString(),
      }));
    }

    const productsWithCategoriesParsed = parseProductCategories(
      productArgs.productsInput
    );

    const products = await Product.insert(productsWithCategoriesParsed);

    const allAddedProducts = parseProductCategories(
      await Product.findByIds(products.identifiers.map((prod) => prod.id))
    );

    return allAddedProducts as Product[];
  }
}
