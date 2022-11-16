export const getItems = async (prisma, type) => {
  const items = await prisma.item.findMany({
    where: {
      type,
    },
    orderBy: [
      {
        rating: 'desc',
      },
    ],
  })

  return items
}

export const getItem = async (prisma, id) => {
  const item = await prisma.item.findUnique({
    where: {
      id,
    },
    include: {
      reviews: true,
    },
  })

  return item
}