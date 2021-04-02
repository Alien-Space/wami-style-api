import { Request, Response } from 'express';
import { Image, Product } from '../entities';

class UploadController {
  static async uploadFile(request: Request, response: Response) {
    console.log(request.file, 'FILE');

    const { productId } = request?.params;

    const fileName = `http://localhost:4000/files/${request?.file?.filename}`;

    try {
      const product = await Product.findOne(productId);
      console.log(product, 'prod');

      const image = Image.create({ product, url: fileName });

      await Image.save(image);

      return response.json(image);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}

export default UploadController;
