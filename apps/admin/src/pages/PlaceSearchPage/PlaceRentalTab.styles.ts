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
  color: ${({ theme }) => theme.palette.mobile.grey.g10};
  ${({ theme }) => theme.typo.sh1};
`;

const SectionDescription = styled.p`
  margin-top: -4px;
  color: ${({ theme }) => theme.palette.mobile.grey.g40};
  ${({ theme }) => theme.typo.b2};
  word-break: keep-all;
`;

const MethodBox = styled.div`
  padding: 16px;
  color: ${({ theme }) => theme.palette.mobile.grey.g20};
  background: ${({ theme }) => theme.palette.mobile.grey.g85};
  border-radius: 8px;
  ${({ theme }) => theme.typo.b1};
  white-space: pre-wrap;
  word-break: break-word;
`;

const TimeBox = styled.div`
  display: flex;
  align-items: center;
  height: 48px;
  padding: 0 16px;
  color: ${({ theme }) => theme.palette.mobile.grey.g10};
  background: ${({ theme }) => theme.palette.mobile.grey.g85};
  border-radius: 8px;
  ${({ theme }) => theme.typo.b1};
`;

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
  color: ${({ theme }) => theme.palette.mobile.grey.g30};
  ${({ theme }) => theme.typo.b1};
  word-break: keep-all;
`;

const FeeValue = styled.span`
  color: ${({ theme }) => theme.palette.mobile.grey.g10};
  ${({ theme }) => theme.typo.sh0};
  text-align: right;
  white-space: nowrap;
`;

const InstrumentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const InstrumentsText = styled.div<{ $collapsed: boolean }>`
  position: relative;
  width: 100%;
  max-height: ${({ $collapsed }) => ($collapsed ? '280px' : 'none')};
  overflow: hidden;

  &::after {
    display: ${({ $collapsed }) => ($collapsed ? 'block' : 'none')};
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    height: 80px;
    background: linear-gradient(
      180deg,
      transparent 0%,
      ${({ theme }) => theme.palette.mobile.grey.g90} 100%
    );
    content: '';
    pointer-events: none;
  }
`;

const InstrumentsParagraph = styled.p`
  color: ${({ theme }) => theme.palette.mobile.grey.g30};
  ${({ theme }) => theme.typo.b1};
  white-space: pre-wrap;
  word-break: break-word;
`;

const MoreButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 40px;
  padding: 0 4px;
  color: ${({ theme }) => theme.palette.mobile.grey.g10};
  ${({ theme }) => theme.typo.sh1};
  cursor: pointer;
`;

const NoteList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

const NoteItem = styled.li`
  display: flex;
  gap: 8px;
  color: ${({ theme }) => theme.palette.mobile.grey.g30};
  ${({ theme }) => theme.typo.b1};
  word-break: break-word;

  &::before {
    flex: 0 0 auto;
    color: ${({ theme }) => theme.palette.mobile.grey.g40};
    content: '•';
  }
`;

export default {
  Container,
  FeeLabel,
  FeeList,
  FeeRow,
  FeeValue,
  InstrumentsParagraph,
  InstrumentsText,
  InstrumentsWrapper,
  MethodBox,
  MoreButton,
  NoteItem,
  NoteList,
  Section,
  SectionDescription,
  SectionTitle,
  TimeBox,
};
