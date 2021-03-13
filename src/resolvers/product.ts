import {
  Args,
  ArgsType,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from 'type-graphql';

import { Product, AddCategoryInput, Category } from '../entities';

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

  @Field(() => [AddCategoryInput])
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

@ObjectType()
export class FieldError {
  @Field()
  path: string;

  @Field()
  message: string;
}

@ObjectType()
export class ProductResponse {
  @Field(() => [Product], { nullable: true })
  products?: Product[];

  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
}

@Resolver(Product)
export class ProductResolver {
  @Query(() => ProductResponse)
  async allProducts(): Promise<ProductResponse> {
    try {
      const productsParsed = await Product.find({ relations: ['categories'] });

      return { products: productsParsed, errors: null };
    } catch (err) {
      return { errors: [{ path: '', message: err.message }] };
    }
  }

  @Mutation(() => ProductResponse)
  async addProduct(
    @Args(() => AddProductArgs) productArgs: AddProductArgs
  ): Promise<ProductResponse> {
    try {
      const productsAdded = await Promise.all(
        productArgs.productsInput.map(async (product) => {
          const productToAdd = Product.create(product);

          await Product.save(productToAdd);

          const categoriesAdded = await Promise.all(
            productToAdd.categories.map(async (cat) => {
              const categoryAdded = Category.create({
                ...cat,
                product: productToAdd,
              });

              await Category.save(categoryAdded);

              return categoryAdded;
            })
          );

          productToAdd.categories = categoriesAdded;

          return productToAdd;
        })
      );

      return { products: productsAdded };
    } catch (err) {
      console.log(err.message, 'message');

      return { errors: [{ message: err.message, path: '' }] };
    }
  }
}
