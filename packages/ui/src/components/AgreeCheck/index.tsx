import { useTheme } from '@emotion/react';

import Styled from './AgreeCheck.styles';

interface AgreeCheckProps {
  checked: boolean;
  description: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const AgreeCheck = ({ checked, description, onChange }: AgreeCheckProps) => {
  const theme = useTheme();

  const CheckCircle = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="8.25" stroke={theme.palette.grey.g30} strokeWidth="1.5" />
      <path
        d="M8.25 11.6786L10.9857 14.4924C11.0278 14.5357 11.0972 14.5357 11.1393 14.4924L15.75 9.75"
        stroke={theme.palette.grey.g30}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );

  const CheckCircleActive = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="9" fill={theme.palette.primary.o1} />
      <path
        d="M8.25 11.6786L10.9857 14.4924C11.0278 14.5357 11.0972 14.5357 11.1393 14.4924L15.75 9.75"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );

  return (
    <Styled.AgreeCheck>
      <Styled.Input type="checkbox" checked={checked} onChange={onChange} />
      {checked ? <CheckCircleActive /> : <CheckCircle />}
      <Styled.Description>{description}</Styled.Description>
    </Styled.AgreeCheck>
  );
};

export default AgreeCheck;
