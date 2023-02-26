import { ref } from '@nuxtjs/composition-api'

const lastSortAsc = ref(false)

export const sortDates = (transactions: any) => {
  const sortedDatesAsc = transactions.slice().sort((a: any, b: any) => {
    return a.date > b.date ? 1 : a.date < b.date ? -1 : 0
  })
  const sortedDatesDesc = transactions.slice().sort((a: any, b: any) => {
    return a.date > b.date ? -1 : a.date < b.date ? 1 : 0
  })

  if (lastSortAsc.value === true) {
    lastSortAsc.value = false
    return sortedDatesDesc
  }
  if (lastSortAsc.value === false) {
    lastSortAsc.value = true
    return sortedDatesAsc
  }
}
