import { initialData } from './seed'
import prisma from '../lib/prisma'

const main = async () => {
  // delete all data
  await prisma.productImage.deleteMany()
  await prisma.product.deleteMany()
  await prisma.category.deleteMany()

  // seed categories
  const { categories, products } = initialData

  const categoriesData = categories.map((category) => ({
    name: category
  }))

  await prisma.category.createMany({
    data: categoriesData
  })

  // format categories
  const categoriesDB = await prisma.category.findMany()

  const categoriesMap = categoriesDB.reduce<Record<string, string>>((map, category) => {
    map[category.name.toLowerCase()] = category.id
    return map
  }, {})

  // products
  products.forEach(async (product) => {
    const { type, images, title, ...rest } = product

    const dbProduct = await prisma.product.create({
      data: {
        ...rest,
        name: title,
        categoryId: categoriesMap[type]
      }
    })

    const imagesData = images.map((image) => ({
      url: image,
      productId: dbProduct.id
    }))

    await prisma.productImage.createMany({
      data: imagesData
    })
  }
  )

  // eslint-disable-next-line no-console
  console.log('Seed executed successfully')
}

(() => {
  if (process.env.NODE_ENV === 'production') return

  main()
}
)()
