import {ActionMeta, MultiValue, StylesConfig} from 'react-select';

export default interface SelectOption {
  readonly value: string;
  readonly label: string;
  readonly color?: string;
  readonly isFixed?: boolean;
  readonly isDisabled?: boolean;
}

export const defaultOptionsStyle: StylesConfig<SelectOption, true> = {
  control: (styles, data) => ({
    ...styles,
    backgroundColor: '#24292d',
    borderColor: data.isFocused ? '#86b7fe' : '#3e454d',
    boxShadow: data.isFocused ? '0 0 0 0.25rem rgb(13 110 253 / 25%)' : '',
    borderRadius: '0.5rem',
  }),
  input: (styles) => ({
    ...styles,
    color: '#b7b7b7',
  }),
  menuList: (styles) => ({
    ...styles,
    backgroundColor: '#24292d',
    borderRadius: '0.75rem',
    color: '#b7b7b7',
  }),
  option: (styles, data) => ({
    ...styles,
    backgroundColor: data.isFocused || data.isSelected ? '#13b497' : '',
    color: '#fff',
    cursor: 'pointer',
  }),
  multiValue: (styles) => ({
    ...styles,
    borderRadius: '0.55rem',
  }),
  multiValueLabel: (styles) => ({
    ...styles,
    backgroundColor: '#13b497',
    color: '#fff',
  }),
};

export type OnChange = (
  newValue: MultiValue<SelectOption>,
  actionMeta: ActionMeta<SelectOption>,
) => void;
