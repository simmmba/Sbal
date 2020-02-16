export type FieldFormStoreType = {
  // visible: boolean
  // lcategory: string | null
  // scategory: string | null
  // city: string | null
  // town: string | null
  // isOnline: boolean | null
  // weekdayOrWeekend: number | null
  // searchBy: string
  // searchText: string | null
  // openModal: () => void
  handleCancel: () => void
  // toggle: (value: string) => void
}

export type FilterData = {
  searchBy: string
  searchText: string | null
  lcategory: string | null
  scategory: string | null
  city: string | null
  town: string | null
  weekdayOrWeekend: number | null
  isOnline: number | null
  [key: string]: string | number | null
}
