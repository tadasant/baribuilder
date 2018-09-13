/*
  Central endpoint for scoring the product results based on the core algorithm
 */

export default async event => {
  await new Promise(r => setTimeout(r, 50))

  return {
    data: {
      productsAndScores: {
        'test': 'test'
      }
    }
  }
}