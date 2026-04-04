import { InputHTMLAttributes, ReactNode } from 'react';
import Styled from './RadioButton.styles';

interface RadioButtonProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: ReactNode;
}

const RadioButton = ({ disabled, checked, label, ...props }: RadioButtonProps) => {
  const radioElement = (
    <Styled.RadioButtonCircle checked={checked} disabled={disabled}>
      <Styled.RadioButtonInput {...props} checked={checked} disabled={disabled} type="radio" />
      <Styled.RadioButtonInner checked={checked} disabled={disabled} />
    </Styled.RadioButtonCircle>
  );

  if (label) {
    return (
      <Styled.RadioButtonContainer disabled={disabled}>
        {radioElement}
        <Styled.RadioButtonLabel>{label}</Styled.RadioButtonLabel>
      </Styled.RadioButtonContainer>
    );
  }

  return radioElement;
};

export default RadioButton;
