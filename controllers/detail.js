const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
module.exports = prisma;

async function createProduct(req,res) {
    try {
        const { name, place, detail, price, image1, image2, image3 } = req.body;
    
        // Validasi data yang diterima dari request
        if (!name || !place || !detail || !price || !image1 || !image2 || !image3) {
          return res.status(400).json({ error: 'Semua kolom harus diisi' });
        }
    
        // Buat produk baru di database menggunakan Prisma
        const newProduct = await prisma.products.create({
          data: {
            name,
            place,
            detail,
            price,
            image1,
            image2,
            image3,
          },
        });
    
        res.status(201).json({newProduct, message: 'produk berhasil ditambahkan'});
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ error: 'Terjadi kesalahan saat membuat produk' });
        }
}

async function getProduct (req,res) {
    try {
        const products = await prisma.products.findMany();
        res.json(products);
    } catch (error) {
    console.error('Error getting products:', error);
    res.status(500).json({ error: 'Terjadi kesalahan saat mengambil produk' });
    }
}

async function getProductById(req, res) {
  try {
      const productId = parseInt(req.params.id, 10);

      // Validate if productId is a valid number
      if (isNaN(productId)) {
          return res.status(400).json({ error: 'Invalid product ID' });
      }

      // Retrieve the product by ID
      const product = await prisma.products.findUnique({
          where: { id: productId },
      });

      // Check if the product with the specified ID exists
      if (!product) {
          return res.status(404).json({ error: 'Product not found' });
      }

      res.json(product);
  } catch (error) {
      console.error('Error getting product:', error);
      res.status(500).json({ error: 'Terjadi kesalahan saat mengambil produk' });
  }
}

async function deleteProduct (req,res){

  try {
    const productId = parseInt(req.params.id, 10);
    // Check if the product exists
    const existingProduct = await prisma.products.findUnique({
      where: { id: productId },
    });

    if (!existingProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Delete the product
    await prisma.products.delete({
      where: { id: productId },
    });

    return res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

async function updProduct (req,res){
    try {
        const productId = parseInt(req.params.id, 10);
        const { name, place, detail, price, image1, image2, image3 } = req.body;
    
        // Validasi data yang diterima dari request
        if (!name || !place || !detail || !price || !image1 || !image2 || !image3) {
          return res.status(400).json({ error: 'Semua kolom harus diisi' });
        }
    
        // Perbarui produk berdasarkan ID menggunakan Prisma
        const updatedProduct = await prisma.products.update({
          where: { id: productId },
          data: {
            name,
            place,
            detail,
            price,
            image1,
            image2,
            image3,
          },
        });
    
        res.json(updatedProduct);
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ error: 'Terjadi kesalahan saat mengupdate produk' });
    }
    
}
module.exports = {createProduct, getProduct, updProduct, getProductById, deleteProduct }