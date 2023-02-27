import categories from '@/static/mock-data/categories.json'
import { Category } from '@/types/categories'

export const fetchAllCategories = async () => {
  const mockAsyncPromise = (mockCategories: Category[], delay: number) =>
    new Promise((resolve, reject) =>
      setTimeout(
        () =>
          mockCategories
            ? resolve(mockCategories)
            : reject(
                new Error(
                  "Sadly, we couldn't load the necessary data. Please try again, or contact us. Sorry for the inconvenience."
                )
              ),
        delay
      )
    )

  return mockAsyncPromise(categories, 1000)

  // catch is unnecesary here, since it is duplicating an error displayed in the console (should error occur)
}
