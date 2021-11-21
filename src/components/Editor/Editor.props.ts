import { DetailedHTMLProps, HTMLAttributes, ReactElement } from 'react'

export interface EditorProps
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  oldValue: string
  changeValue: (str: string) => void
  children: ReactElement
}
