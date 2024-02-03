import TextField from '../TextField';
import Styled, { DatePickerProps } from './DatePicker.styles';

const DatePicker = ({ fromInputProps, toInputProps, size }: DatePickerProps) => {
  return (
    <Styled.Container size={size}>
      <TextField {...fromInputProps} size={size} inputType="date" placeholder="YYYY.MM.DD" />
      <Styled.Seperator>~</Styled.Seperator>
      <TextField {...toInputProps} size={size} inputType="date" placeholder="YYYY.MM.DD" />
    </Styled.Container>
  );
};

export default DatePicker;
