import styled from '@emotion/styled';
import { Input } from 'antd';

const Container = styled.div``;

const Section = styled.section`
  padding: 52px 0;
  & + & {
    border-top: 1px solid ${({ theme }) => theme.palette.grey.g20};
  }
`;

const Wrapper = styled.div`
  width: 600px;
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 32px;
`;

const Title = styled.h2`
  ${({ theme }) => theme.typo.sh1};
  color: ${({ theme }) => theme.palette.grey.g90};
`;

const Description = styled.p`
  ${({ theme }) => theme.typo.b1};
  color: ${({ theme }) => theme.palette.grey.g60};
`;

const Textarea = styled(Input.TextArea)`
  height: 240px !important;
  margin-top: 16px !important;
  margin-bottom: 32px !important;
  padding: 12px !important;
  resize: none !important;
`;

const Ticket = styled.div`
  width: 100%;
  box-shadow: 0px 8px 14px 0px #888d9d26;
  border: 1px solid ${({ theme }) => theme.palette.grey.g20};
  border-radius: 8px;

  & + & {
    margin-top: 20px;
  }
`;

const TicketContentsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 28px;
`;

const TicketInfo = styled.div`
  display: flex;
  flex-direction: column;

  div {
    display: flex;
    align-items: center;
  }

  h3 {
    ${({ theme }) => theme.typo.sh2};
    color: ${({ theme }) => theme.palette.grey.g90};
    margin-right: 8px;
  }

  span {
    ${({ theme }) => theme.typo.b3};
    color: ${({ theme }) => theme.palette.grey.g70};
  }
`;

const TicketButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const CodeListContainer = styled.div`
  border-top: 1px solid ${({ theme }) => theme.palette.grey.g20};
`;

const CodeList = styled.ul`
  max-height: 575px;
  overflow: scroll;
`;

const CodeListItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 28px;
  ${({ theme }) => theme.typo.b3};
  color: ${({ theme }) => theme.palette.grey.g70};

  div {
    display: inline;
    ${({ theme }) => theme.typo.sh1};
    color: ${({ theme }) => theme.palette.grey.g90};
  }
`;

const CodeListToggleSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 19px 0;
  ${({ theme }) => theme.typo.sh1};
  color: ${({ theme }) => theme.palette.grey.g70};
  background-color: ${({ theme }) => theme.palette.grey.w};
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  cursor: pointer;
`;

export default {
  Container,
  Section,
  Wrapper,
  SectionHeader,
  Title,
  Description,
  Textarea,
  Ticket,
  TicketContentsWrapper,
  TicketInfo,
  TicketButtonGroup,

  CodeListContainer,
  CodeList,
  CodeListItem,
  CodeListToggleSection,
};
