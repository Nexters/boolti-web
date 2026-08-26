import type { ConcertHallProfileResponse } from '@boolti/api';
import { ChevronDownIcon } from '@boolti/icon';

import { CheckIcon, RentalMethodIcon } from '~/components/icons';
import { useLayoutEffect, useRef, useState } from 'react';

import { formatFee } from '~/utils/format';

import Styled from './RentalTab.styles';

const INSTRUMENTS_COLLAPSED_HEIGHT = 280;

interface InstrumentsSectionProps {
  instrumentsText: string;
}

const InstrumentsSection = ({ instrumentsText }: InstrumentsSectionProps) => {
  const textRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useLayoutEffect(() => {
    if (textRef.current) {
      setIsOverflowing(textRef.current.scrollHeight > INSTRUMENTS_COLLAPSED_HEIGHT);
    }
  }, [instrumentsText]);

  const isCollapsed = isOverflowing && !isExpanded;

  return (
    <Styled.Section>
      <Styled.SectionTitle>보유 악기</Styled.SectionTitle>
      <Styled.InstrumentsWrapper>
        <Styled.InstrumentsText ref={textRef} isCollapsed={isCollapsed}>
          <Styled.InstrumentsParagraph>{instrumentsText}</Styled.InstrumentsParagraph>
          {isCollapsed && <Styled.InstrumentsDim />}
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

interface Props {
  profile: ConcertHallProfileResponse;
}

const RentalTab = ({ profile }: Props) => {
  const rental = profile.rental;

  if (!rental) {
    return null;
  }

  const {
    rentalMethod,
    rentalTime,
    rentalFees = [],
    vat,
    additionalFees = [],
    instrumentsText,
    paidOptions = [],
    specialNotes = [],
  } = rental;

  // 대관 시간 부가 설명: 백엔드 설명 우선, 없고 휴식 포함이면 안내 문구
  const rentalTimeDescription =
    rentalTime?.rentalTimeDescription ||
    (rentalTime?.isEngineerBreakIncluded ? '엔지니어 휴식 1시간이 포함된 시간입니다.' : null);

  return (
    <Styled.Container>
      {rentalMethod && (
        <Styled.Section>
          <Styled.MethodCard>
            <Styled.MethodTitle>
              대관 방법
              <RentalMethodIcon />
            </Styled.MethodTitle>
            <Styled.MethodText>{rentalMethod}</Styled.MethodText>
          </Styled.MethodCard>
        </Styled.Section>
      )}

      {rentalTime?.rentalTimeHours != null && (
        <Styled.Section>
          <Styled.SectionTitle>대관 시간</Styled.SectionTitle>
          {rentalTimeDescription && (
            <Styled.SectionDescription>{rentalTimeDescription}</Styled.SectionDescription>
          )}
          <Styled.TimeBox>{rentalTime.rentalTimeHours}시간</Styled.TimeBox>
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
                <Styled.FeeLeader />
                <Styled.FeeValue>{formatFee(fee.fee)}</Styled.FeeValue>
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
                <Styled.FeeLeader />
                <Styled.FeeValue>{formatFee(fee.fee)} / 1시간</Styled.FeeValue>
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
                <Styled.FeeLeader />
                <Styled.FeeValue>{formatFee(option.price)}</Styled.FeeValue>
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
              <Styled.NoteItem key={index}>
                <Styled.NoteIcon>
                  <CheckIcon />
                </Styled.NoteIcon>
                {note}
              </Styled.NoteItem>
            ))}
          </Styled.NoteList>
        </Styled.Section>
      )}
    </Styled.Container>
  );
};

export default RentalTab;
