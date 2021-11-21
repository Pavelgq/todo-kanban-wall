import { DetailedHTMLProps, HTMLAttributes } from 'react'

export interface ListProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  title: string
  id: string
}
