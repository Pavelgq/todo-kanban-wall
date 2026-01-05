import React, { DetailedHTMLProps, HTMLAttributes } from 'react'

export interface TagProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  color?: 'red' | 'yellow' | 'blue' | 'green' | 'purple' | 'orange'
  children: React.ReactNode
  onRemove?: () => void
}
