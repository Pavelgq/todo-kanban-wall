import { DetailedHTMLProps, HTMLAttributes } from 'react'

export interface SortProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  sort: SortEnam
  setSort: (type: SortEnam) => void
}

export enum SortEnam {
  All,
  Complite,
  Active,
}
