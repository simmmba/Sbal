export type FieldFormStoreType = {
  visible: boolean
  lcategory: string | null
  scategory: string | null
  city: string | null
  town: string | null
  isOnline: boolean | null
  weekdayOrWeekend: number | null
  searchBy: string
  searchText: string | null
  toggle: (value: string) => void
}
