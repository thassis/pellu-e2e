import React from 'react';
import Select from '../Select';

type Props = {
  value: string;
  onChange: (value: string) => void;
};

const SelectState = ({value, onChange}: Props) => {
  const states = [
    'AC',
    'AL',
    'AP',
    'AM',
    'BA',
    'CE',
    'DF',
    'ES',
    'GO',
    'MA',
    'MT',
    'MS',
    'MG',
    'PA',
    'PB',
    'PR',
    'PE',
    'PI',
    'RJ',
    'RN',
    'RS',
    'RO',
    'RR',
    'SC',
    'SP',
    'SE',
    'TO',
  ];

  return (
    <Select
      value={value}
      label="Estado"
      onChange={onChange}
      options={states}
    />
  );
};

export default SelectState;
