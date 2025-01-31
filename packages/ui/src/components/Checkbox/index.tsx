import { useState } from 'react';
import Styled from './Checkbox.styles';
import styled from '@emotion/styled';

const CheckIcon: React.FC = () => (
  <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.744 1.6681L4.71719 9.49339L0.258545 4.5676L1.74132 3.22545L4.71125 6.50655L10.2559 0.331848L11.744 1.6681Z"
      fill="currentColor"
    />
  </svg>
);

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  variant: 'main' | 'sub';
}

const Checkbox: React.FC<CheckboxProps> = ({ variant, ...props }) => {
  const [uncontrolledChecked, setUncontrolledChecked] = useState(props.checked);

  const checked = props.checked ?? uncontrolledChecked;

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUncontrolledChecked((prev) => !prev);
    props.onChange?.(event);
  };

  return (
    <Styled.CheckboxContainer checked={checked} variant={variant}>
      <Styled.CheckboxInput {...props} checked={checked} type="checkbox" onChange={changeHandler} />
      <CheckIcon />
    </Styled.CheckboxContainer>
  );
};

const CheckboxLabel = styled.label`
  &:hover ${Styled.CheckboxContainer} {
    border-color: ${({ theme }) => theme.palette.grey.g90};
  }
`;

const CheckboxComponent = Checkbox as React.FC<CheckboxProps> & {
  Label: typeof CheckboxLabel;
};

CheckboxComponent.Label = CheckboxLabel;

export default CheckboxComponent;
