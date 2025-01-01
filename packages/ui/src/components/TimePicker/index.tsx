import { CloseIcon } from '@boolti/icon';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

import { useOnClickOutside } from '../../hooks/useOnClickOutside';
import TextField from '../TextField';
import Styled from './TimePicker.styles';

function addZero(n: number) {
  return ('0' + n).slice(-2);
}

const hours = new Array(12).fill({ length: 12 }).map((_, index) => addZero(index + 1));
const minutes = new Array(6).fill({ length: 6 }).map((_, index) => addZero(index * 10));

interface Props {
  disabled?: boolean;
  onBlur?: VoidFunction;
  errorMessage: React.ComponentProps<typeof TextField>['errorMessage'];
  value?: string;
  onChange?: (value: string) => void;
}

function TimePicker({ disabled, errorMessage, value, onChange, onBlur }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const hourRef = useRef<HTMLDivElement>(null);
  const minuteRef = useRef<HTMLDivElement>(null);
  const [hour, minute] = value ? value.split(':').map(Number) : [];
  const [isAM, setIsAM] = useState(value ? hour < 12 : true);
  const [open, setIsOpen] = useState(false);
  const [currentHour, setCurrentHour] = useState(hour);
  const [currentMinute, setCurrentMinute] = useState(minute);
  const nextValue =
    currentHour !== undefined && currentMinute !== undefined
      ? `${addZero((isAM ? 0 : 12) + (currentHour % 12))}:${addZero(currentMinute)}`
      : undefined;

  useLayoutEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = originalStyle;
    }
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [open]);

  useOnClickOutside(ref, () => {
    onBlur?.();
    setIsOpen(false);
  });

  useEffect(() => {
    if (open) {
      hourRef.current?.scrollTo({ top: (36 + 8) * (currentHour - 1) });
      minuteRef.current?.scrollTo({ top: (36 + 8) * (currentMinute / 10) });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    if (nextValue) {
      onChange?.(nextValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentHour, currentMinute]);

  return (
    <>
      <Styled.Container open={open}>
        <Styled.TextContainer
          onClick={() => {
            if (!disabled) {
              setIsOpen((prev) => !prev);
            }
          }}
        >
          <Styled.Text
            inputType="time"
            size="big"
            value={
              hour !== undefined && minute !== undefined
                ? `${isAM ? '오전' : '오후'} ${addZero(isAM ? hour % 12 : hour)}:${addZero(minute)}`
                : undefined
            }
            disabled={disabled}
            errorMessage={errorMessage}
          />
        </Styled.TextContainer>
        {open && (
          <Styled.Dimmed>
            <Styled.Control ref={ref}>
              <Styled.Title>
                시간 선택하기
                <Styled.CloseButton
                  onClick={() => {
                    onBlur?.();
                    setIsOpen(false);
                  }}
                >
                  <CloseIcon />
                </Styled.CloseButton>
              </Styled.Title>
              <Styled.ListContainer>
                <Styled.List>
                  <Styled.Item
                    type="button"
                    isActive={isAM}
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsAM(true);
                    }}
                  >
                    오전
                  </Styled.Item>
                  <Styled.Item
                    type="button"
                    isActive={!isAM}
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsAM(false);
                    }}
                  >
                    오후
                  </Styled.Item>
                </Styled.List>
                <Styled.List hasPadding ref={hourRef}>
                  {hours.map((hour, index) => (
                    <Styled.Item
                      type="button"
                      key={hour}
                      isActive={currentHour === index + 1}
                      onClick={(e) => {
                        e.stopPropagation();
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
                      type="button"
                      key={minute}
                      isActive={currentMinute === Number(minute)}
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentMinute(Number(minute));
                      }}
                    >
                      {minute}
                    </Styled.Item>
                  ))}
                </Styled.List>
              </Styled.ListContainer>
            </Styled.Control>
          </Styled.Dimmed>
        )}
      </Styled.Container>
    </>
  );
}

export default TimePicker;
