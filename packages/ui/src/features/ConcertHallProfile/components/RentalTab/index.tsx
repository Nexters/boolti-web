import type { ConcertHallProfileResponse } from '@boolti/api';
import { ChevronDownIcon } from '@boolti/icon';

import { CheckIcon, RentalMethodIcon } from '../icons';
import { useRef, useState } from 'react';

import { formatFee } from '../../utils/format';
import sortBySequence from '../../utils/sortBySequence';
import useIsOverflowing from '../../useIsOverflowing';

import Styled from './RentalTab.styles';
import { type ConcertHallProfileSection, useSectionImpression } from '../../analytics';

const INSTRUMENTS_COLLAPSED_HEIGHT = 280;

const TrackedSection = ({
  section,
  children,
}: {
  section: ConcertHallProfileSection;
  children: React.ReactNode;
}) => {
  const ref = useSectionImpression<HTMLElement>(section);

  return <Styled.Section ref={ref}>{children}</Styled.Section>;
};

interface InstrumentsSectionProps {
  instrumentsText: string;
}

const InstrumentsSection = ({ instrumentsText }: InstrumentsSectionProps) => {
  const textRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const isOverflowing = useIsOverflowing(textRef, INSTRUMENTS_COLLAPSED_HEIGHT);

  const isCollapsed = isOverflowing && !isExpanded;

  return (
    <TrackedSection section="AvailableInstruments">
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
    </TrackedSection>
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
  const sortedRentalFees = sortBySequence(rentalFees);
  const sortedAdditionalFees = sortBySequence(additionalFees);

  // 대관 시간 부가 설명: 백엔드 설명 우선, 없고 휴식 포함이면 안내 문구
  const rentalTimeDescription =
    rentalTime?.rentalTimeDescription ||
    (rentalTime?.isEngineerBreakIncluded ? '엔지니어 휴식 1시간이 포함된 시간입니다.' : null);

  return (
    <Styled.Container>
      {rentalMethod && (
        <TrackedSection section="BookingMethod">
          <Styled.MethodCard>
            <Styled.MethodTitle>
              대관 방법
              <RentalMethodIcon />
            </Styled.MethodTitle>
            <Styled.MethodText>{rentalMethod}</Styled.MethodText>
          </Styled.MethodCard>
        </TrackedSection>
      )}

      {rentalTime?.rentalTimeHours != null && (
        <TrackedSection section="BookingHours">
          <Styled.SectionTitle>대관 시간</Styled.SectionTitle>
          {rentalTimeDescription && (
            <Styled.SectionDescription>{rentalTimeDescription}</Styled.SectionDescription>
          )}
          <Styled.TimeBox>{rentalTime.rentalTimeHours}시간</Styled.TimeBox>
        </TrackedSection>
      )}

      {sortedRentalFees.length > 0 && (
        <TrackedSection section="RentalFee">
          <Styled.SectionTitle>대관료</Styled.SectionTitle>
          {vat?.description && (
            <Styled.SectionDescription>{vat.description}</Styled.SectionDescription>
          )}
          <Styled.FeeList>
            {sortedRentalFees.map((fee) => (
              <Styled.FeeRow key={fee.id}>
                <Styled.FeeLabel>{fee.dayTypeName}</Styled.FeeLabel>
                <Styled.FeeLeader />
                <Styled.FeeValue>{formatFee(fee.fee)}</Styled.FeeValue>
              </Styled.FeeRow>
            ))}
          </Styled.FeeList>
        </TrackedSection>
      )}

      {sortedAdditionalFees.length > 0 && (
        <TrackedSection section="HourlySurcharge">
          <Styled.SectionTitle>시간당 추가 요금</Styled.SectionTitle>
          <Styled.SectionDescription>
            대관 시간 외 별도 시간 추가 시 발생하는 비용입니다.
          </Styled.SectionDescription>
          <Styled.FeeList>
            {sortedAdditionalFees.map((fee) => (
              <Styled.FeeRow key={fee.id}>
                <Styled.FeeLabel>{fee.dayTypeName}</Styled.FeeLabel>
                <Styled.FeeLeader />
                <Styled.FeeValue>{formatFee(fee.fee)} / 1시간</Styled.FeeValue>
              </Styled.FeeRow>
            ))}
          </Styled.FeeList>
        </TrackedSection>
      )}

      {instrumentsText && <InstrumentsSection instrumentsText={instrumentsText} />}

      {paidOptions.length > 0 && (
        <TrackedSection section="PaidOptions">
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
        </TrackedSection>
      )}

      {specialNotes.length > 0 && (
        <TrackedSection section="SpecialNotes">
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
        </TrackedSection>
      )}
    </Styled.Container>
  );
};

export default RentalTab;
