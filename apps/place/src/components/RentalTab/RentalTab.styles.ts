import styled from '@emotion/styled';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 12px 0;
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  padding: 32px 20px;
`;

const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  line-height: 26px;
  color: ${({ theme }) => theme.palette.mobile.grey.g10};
`;

const SectionDescription = styled.p`
  margin-top: -4px;
  font-size: 14px;
  line-height: 20px;
  color: ${({ theme }) => theme.palette.mobile.grey.g40};
  word-break: keep-all;
`;

// 대관 방법 — 회색 박스, 줄바꿈 보존
const MethodBox = styled.div`
  padding: 16px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.palette.mobile.grey.g85};
  font-size: 15px;
  line-height: 23px;
  color: ${({ theme }) => theme.palette.mobile.grey.g20};
  white-space: pre-wrap;
  word-break: break-word;
`;

// 대관 시간 값 박스
const TimeBox = styled.div`
  display: flex;
  align-items: center;
  height: 48px;
  padding: 0 16px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.palette.mobile.grey.g85};
  font-size: 15px;
  line-height: 23px;
  color: ${({ theme }) => theme.palette.mobile.grey.g10};
`;

// 금액 행 (요일/옵션명 좌측, 금액 우측)
const FeeList = styled.div`
  display: flex;
  flex-direction: column;
`;

const FeeRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 0;

  & + & {
    border-top: 1px solid ${({ theme }) => theme.palette.mobile.grey.g85};
  }
`;

const FeeLabel = styled.span`
  font-size: 15px;
  line-height: 23px;
  color: ${({ theme }) => theme.palette.mobile.grey.g30};
  word-break: keep-all;
`;

const FeeValue = styled.span`
  font-size: 15px;
  font-weight: 600;
  line-height: 23px;
  color: ${({ theme }) => theme.palette.mobile.grey.g10};
  text-align: right;
  white-space: nowrap;
`;

// 보유 악기 — 더보기 토글 (HomeTab 소개 패턴과 동일)
const InstrumentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const InstrumentsText = styled.div<{ isCollapsed: boolean }>`
  position: relative;
  width: 100%;
  max-height: ${({ isCollapsed }) => (isCollapsed ? '280px' : 'none')};
  overflow: hidden;
`;

const InstrumentsParagraph = styled.p`
  font-size: 15px;
  line-height: 23px;
  color: ${({ theme }) => theme.palette.mobile.grey.g30};
  word-break: break-word;
  white-space: pre-wrap;
`;

const InstrumentsDim = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 80px;
  background: linear-gradient(180deg, rgba(9, 10, 11, 0) 0%, #090a0b 100%);
`;

const MoreButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 40px;
  padding: 0 4px;
  font-size: 16px;
  font-weight: 600;
  line-height: 22px;
  color: ${({ theme }) => theme.palette.mobile.grey.g10};
  cursor: pointer;
`;

// 특이사항 — 목록
const NoteList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

const NoteItem = styled.li`
  display: flex;
  gap: 8px;
  font-size: 15px;
  line-height: 23px;
  color: ${({ theme }) => theme.palette.mobile.grey.g30};
  word-break: break-word;

  &::before {
    content: '•';
    flex-shrink: 0;
    color: ${({ theme }) => theme.palette.mobile.grey.g40};
  }
`;

export default {
  Container,
  Section,
  SectionTitle,
  SectionDescription,
  MethodBox,
  TimeBox,
  FeeList,
  FeeRow,
  FeeLabel,
  FeeValue,
  InstrumentsWrapper,
  InstrumentsText,
  InstrumentsParagraph,
  InstrumentsDim,
  MoreButton,
  NoteList,
  NoteItem,
};
