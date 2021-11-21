import { DetailedHTMLProps, HTMLAttributes } from 'react'

export interface CheckboxProps
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  check: boolean
  handleClick: () => void
  id: string
}
