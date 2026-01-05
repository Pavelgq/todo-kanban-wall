import { DetailedHTMLProps, HTMLAttributes } from 'react'

export interface DeleteButtonProps
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  handleClick: () => void
}
