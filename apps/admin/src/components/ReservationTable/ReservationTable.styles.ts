import { Button } from '@boolti/ui';
import styled from '@emotion/styled';

const Container = styled.table`
  table-layout: auto;
  margin-bottom: 16px;
  width: ${({ theme }) => theme.breakpoint.desktop};
`;

const HeaderRow = styled.tr`
  width: 100%;
  padding-left: 8px;
  background-color: ${({ theme }) => theme.palette.grey.g00};
  border-top: 1px solid ${({ theme }) => theme.palette.grey.g20};
  border-bottom: 1px solid ${({ theme }) => theme.palette.grey.g20};
`;

const HeaderItem = styled.th`
  padding: 12px;
  ${({ theme }) => theme.typo.b2};
  color: ${({ theme }) => theme.palette.grey.g60};
  white-space: nowrap;

  &.ticket-price {
    text-align: right;
  }
`;

const Row = styled.tr`
  width: 100%;
  padding-left: 8px;
  border-bottom: 1px solid ${({ theme }) => theme.palette.grey.g20};
`;

const Item = styled.td`
  padding: 14px 12px;
  white-space: nowrap;
  ${({ theme }) => theme.typo.b2};
  color: ${({ theme }) => theme.palette.grey.g90};
  & strong {
    background-color: ${({ theme }) => theme.palette.primary.o0};
  }
  &.ticket-price {
    text-align: right;
  }
`;

const DisabledText = styled.span`
  ${({ theme }) => theme.typo.b2};
  color: ${({ theme }) => theme.palette.grey.g30};
`;

const Empty = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  display: flex;
  transform: translateX(-50%) translateY(46px);
  flex-direction: column;
  flex: 1;
  justify-content: center;
  align-items: center;
  white-space: pre-wrap;
  text-align: center;
  ${({ theme }) => theme.typo.b4};
  color: ${({ theme }) => theme.palette.grey.g40};
`;

const ResetButton = styled(Button)`
  display: block;
  margin-top: 18px;
`;

const TooltipItemColumn = styled.ul`
  display: block;
`;

const TooltipItemRow = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  & > span {
    ${({ theme }) => theme.typo.c1};
    color: ${({ theme }) => theme.palette.grey.w};
  }
  & > span:first-of-type {
    margin-right: 16px;
  }
  & > span:nth-child(2) {
    min-width: 78px;
    text-align: left;
  }
`;

const TooltipAnchor = styled.a`
  &:hover {
    color: ${({ theme }) => theme.palette.grey.g50};
  }
`;

export default {
  Container,
  HeaderItem,
  HeaderRow,
  Row,
  Item,
  DisabledText,
  Empty,
  ResetButton,
  TooltipItemColumn,
  TooltipItemRow,
  TooltipAnchor,
};
