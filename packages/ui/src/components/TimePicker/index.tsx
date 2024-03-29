import { useEffect, useRef, useState } from 'react';

import { useOnClickOutside } from '../../hooks/useOnClickOutside';
import Styled from './TimePicker.styles';

function addZero(n: number) {
  return ('0' + n).slice(-2);
}

const hours = new Array(12).fill({ length: 12 }).map((_, index) => addZero(index + 1));
const minutes = new Array(6).fill({ length: 6 }).map((_, index) => addZero(index * 10));

interface Props {
  hour: number;
  minute: number;
  onChange?: (hour: number, minute: number) => void;
}

function TimePicker({ hour, minute, onChange }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const hourRef = useRef<HTMLDivElement>(null);
  const minuteRef = useRef<HTMLDivElement>(null);
  const [isAM, setIsAM] = useState(hour < 12);
  const [open, setIsOpen] = useState(true);
  const [currentHour, setCurrentHour] = useState(hour);
  const [currentMinute, setCurrentMinute] = useState(minute);
  const value = `${addZero((isAM ? 0 : 12) + (currentHour % 12))}:${addZero(currentMinute)}`;

  useOnClickOutside(ref, () => {
    setIsOpen(false);
  });

  useEffect(() => {
    if (open) {
      hourRef.current?.scrollTo({ top: (36 + 8) * (currentHour - 1) });
      minuteRef.current?.scrollTo({ top: (36 + 8) * (currentMinute / 10) });
    }
  }, [open]);

  useEffect(() => {
    onChange?.(hour, minute);
  }, [currentHour, currentMinute]);

  return (
    <>
      <Styled.Container
        open={open}
        onClick={() => {
          setIsOpen((prev) => !prev);
        }}
      >
        <Styled.Text
          inputType="time"
          size="big"
          value={value}
          onChange={() => {
            /** */
          }}
        />
        {open && (
          <Styled.Control ref={ref}>
            <Styled.List>
              <Styled.Item
                isActive={isAM}
                onClick={() => {
                  setIsAM(true);
                }}
              >
                오전
              </Styled.Item>
              <Styled.Item
                isActive={!isAM}
                onClick={() => {
                  setIsAM(false);
                }}
              >
                오후
              </Styled.Item>
            </Styled.List>
            <Styled.List hasPadding ref={hourRef}>
              {hours.map((hour, index) => (
                <Styled.Item
                  key={hour}
                  isActive={currentHour === index + 1}
                  onClick={() => {
                    setCurrentHour(index + 1);
                  }}
                >
                  {hour}
                </Styled.Item>
              ))}
            </Styled.List>
            <Styled.List hasPadding ref={minuteRef}>
              {minutes.map((minute) => (
                <Styled.Item
                  key={minute}
                  isActive={currentMinute === Number(minute)}
                  onClick={() => {
                    setCurrentMinute(Number(minute));
                  }}
                >
                  {minute}
                </Styled.Item>
              ))}
            </Styled.List>
          </Styled.Control>
        )}
      </Styled.Container>
    </>
  );
}

export default TimePicker;
