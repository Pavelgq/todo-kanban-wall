import React, { DetailedHTMLProps, HTMLAttributes, ReactElement } from 'react'

export interface TagProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  color?: 'red' | 'yellow' | 'blue'
  children: ReactElement
}
