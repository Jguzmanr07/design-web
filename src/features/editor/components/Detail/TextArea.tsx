import type { ComponentProps, FC } from 'react'

interface Props {
  onChange: ComponentProps<'textarea'>['onChange']
  value: ComponentProps<'textarea'>['value']
}

export const TextArea: FC<Props> = ({ value, ...props }) => {
  return <textarea {...props} defaultValue={value} />
}
