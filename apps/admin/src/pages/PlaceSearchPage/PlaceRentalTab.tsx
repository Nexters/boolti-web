import type { ConcertHallProfileRental } from '@boolti/api';
import { ChevronDownIcon } from '@boolti/icon';
import { useLayoutEffect, useRef, useState } from 'react';

import Styled from './PlaceRentalTab.styles';

const INSTRUMENTS_COLLAPSED_HEIGHT = 280;

const formatWon = (value: number) => `${value.toLocaleString('ko-KR')}원`;

const bySequence = <T extends { sequence?: number }>(left: T, right: T) =>
  (left.sequence ?? 0) - (right.sequence ?? 0);

const InstrumentsSection = ({ instrumentsText }: { instrumentsText: string }) => {
  const textRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useLayoutEffect(() => {
    setIsOverflowing(
      Boolean(textRef.current && textRef.current.scrollHeight > INSTRUMENTS_COLLAPSED_HEIGHT),
    );
  }, [instrumentsText]);

  const isCollapsed = isOverflowing && !isExpanded;

  return (
    <Styled.Section>
      <Styled.SectionTitle>보유 악기</Styled.SectionTitle>
      <Styled.InstrumentsWrapper>
        <Styled.InstrumentsText ref={textRef} $collapsed={isCollapsed}>
          <Styled.InstrumentsParagraph>{instrumentsText}</Styled.InstrumentsParagraph>
        </Styled.InstrumentsText>
        {isCollapsed && (
          <Styled.MoreButton type="button" onClick={() => setIsExpanded(true)}>
            내용 더 보기
            <ChevronDownIcon />
          </Styled.MoreButton>
        )}
      </Styled.InstrumentsWrapper>
    </Styled.Section>
  );
};

const PlaceRentalTab = ({ rental }: { rental: ConcertHallProfileRental }) => {
  const {
    rentalMethod,
    rentalTime,
    vat,
    instrumentsText,
    paidOptions = [],
    specialNotes = [],
  } = rental;
  const rentalFees = (rental.rentalFees ?? []).slice().sort(bySequence);
  const additionalFees = (rental.additionalFees ?? []).slice().sort(bySequence);
  const rentalTimeDescription =
    rentalTime?.rentalTimeDescription ||
    (rentalTime?.isEngineerBreakIncluded ? '엔지니어 휴식 1시간이 포함된 시간입니다.' : null);
  const hasRentalTime = rentalTime?.rentalTimeHours != null || Boolean(rentalTimeDescription);

  return (
    <Styled.Container>
      {rentalMethod && (
        <Styled.Section>
          <Styled.SectionTitle>대관 방법</Styled.SectionTitle>
          <Styled.MethodBox>{rentalMethod}</Styled.MethodBox>
        </Styled.Section>
      )}

      {hasRentalTime && (
        <Styled.Section>
          <Styled.SectionTitle>대관 시간</Styled.SectionTitle>
          {rentalTimeDescription && (
            <Styled.SectionDescription>{rentalTimeDescription}</Styled.SectionDescription>
          )}
          {rentalTime?.rentalTimeHours != null && (
            <Styled.TimeBox>{rentalTime.rentalTimeHours}시간</Styled.TimeBox>
          )}
        </Styled.Section>
      )}

      {rentalFees.length > 0 && (
        <Styled.Section>
          <Styled.SectionTitle>대관료</Styled.SectionTitle>
          {vat?.description && (
            <Styled.SectionDescription>{vat.description}</Styled.SectionDescription>
          )}
          <Styled.FeeList>
            {rentalFees.map((fee) => (
              <Styled.FeeRow key={fee.id}>
                <Styled.FeeLabel>{fee.dayTypeName}</Styled.FeeLabel>
                <Styled.FeeValue>{formatWon(fee.fee)}</Styled.FeeValue>
              </Styled.FeeRow>
            ))}
          </Styled.FeeList>
        </Styled.Section>
      )}

      {additionalFees.length > 0 && (
        <Styled.Section>
          <Styled.SectionTitle>시간당 추가 요금</Styled.SectionTitle>
          <Styled.SectionDescription>
            대관 시간 외 별도 시간 추가 시 발생하는 비용입니다.
          </Styled.SectionDescription>
          <Styled.FeeList>
            {additionalFees.map((fee) => (
              <Styled.FeeRow key={fee.id}>
                <Styled.FeeLabel>{fee.dayTypeName}</Styled.FeeLabel>
                <Styled.FeeValue>{formatWon(fee.fee)} / 1시간</Styled.FeeValue>
              </Styled.FeeRow>
            ))}
          </Styled.FeeList>
        </Styled.Section>
      )}

      {instrumentsText && <InstrumentsSection instrumentsText={instrumentsText} />}

      {paidOptions.length > 0 && (
        <Styled.Section>
          <Styled.SectionTitle>유료 옵션</Styled.SectionTitle>
          <Styled.FeeList>
            {paidOptions.map((option) => (
              <Styled.FeeRow key={option.id}>
                <Styled.FeeLabel>{option.name}</Styled.FeeLabel>
                <Styled.FeeValue>{formatWon(option.price)}</Styled.FeeValue>
              </Styled.FeeRow>
            ))}
          </Styled.FeeList>
        </Styled.Section>
      )}

      {specialNotes.length > 0 && (
        <Styled.Section>
          <Styled.SectionTitle>특이사항</Styled.SectionTitle>
          <Styled.NoteList>
            {specialNotes.map((note, index) => (
              <Styled.NoteItem key={`${index}-${note}`}>{note}</Styled.NoteItem>
            ))}
          </Styled.NoteList>
        </Styled.Section>
      )}
    </Styled.Container>
  );
};

export default PlaceRentalTab;
