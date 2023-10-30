import React, { forwardRef } from 'react'
import { Controller } from 'react-hook-form'
import { FormFactory } from 'components/form'
import SelectMultiple, { MultiValue, SingleValue } from 'react-select'

export type OptionsType = {
  label: string
  value: number | string
}

export type ReactSelectProps = {
  value?: any
  name: string
  control?: any
  isMulti?: boolean
  options: OptionsType[]
  closeMenuOnSelect?: boolean
  handleSelection: (
    e: SingleValue<OptionsType> | MultiValue<OptionsType>
  ) => void | Promise<void>
}

const CustomSelect = ({ ...props }) => {
  return (
    <SelectMultiple
      {...props}
      placeholder="-- Selecione --"
      styles={{
        container: provided => ({
          ...provided,
          width: '13.75rem',
        }),
      }}
      theme={(theme: any) => ({
        ...theme,
        spacing: {
          ...theme.spacing,
          controlHeight: '3.3rem',
        },
      })}
    />
  )
}

const ReactSelect = forwardRef<any, ReactSelectProps>(
  (
    {
      name,
      options,
      control,
      isMulti,
      handleSelection,
      closeMenuOnSelect,
      ...props
    },
    ref
  ) => {
    if (!control) {
      return (
        <CustomSelect
          ref={ref}
          {...props}
          options={options}
          isMulti={isMulti}
          closeMenuOnSelect={closeMenuOnSelect}
          onChange={(e: SingleValue<OptionsType> | MultiValue<OptionsType>) => {
            handleSelection(e)
          }}
        />
      )
    }

    return (
      <div>
        <Controller
          name={name}
          control={control}
          shouldUnregister
          render={({ field: { onChange, onBlur, value } }) => {
            return (
              <CustomSelect
                ref={ref}
                {...props}
                value={value}
                onBlur={onBlur}
                options={options}
                isMulti={isMulti}
                closeMenuOnSelect={closeMenuOnSelect}
                onChange={(
                  e: SingleValue<OptionsType> | MultiValue<OptionsType>
                ) => {
                  handleSelection(e)
                  onChange(e)
                }}
              />
            )
          }}
        />
      </div>
    )
  }
)

ReactSelect.displayName = 'ReactSelect'

export const Select = FormFactory(ReactSelect, 'Select')

export default Select
