import { mq_lg } from '@boolti/ui';
import styled from '@emotion/styled';

const Container = styled.div`
  position: relative;
  width: 100%;
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const SearchInput = styled.input<{ hasError?: boolean }>`
  width: 100%;
  border-radius: 4px;
  padding: 12px 40px 12px 13px;
  color: ${({ theme }) => theme.palette.grey.g90};
  border: 1px solid
    ${({ hasError, theme }) =>
      hasError ? `${theme.palette.status.error1} !important` : theme.palette.grey.g20};
  background: ${({ theme }) => theme.palette.grey.w};
  ${({ theme }) => theme.typo.b3};

  &::placeholder {
    color: ${({ theme }) => theme.palette.grey.g30};
  }

  &:focus {
    border: 1px solid ${({ theme }) => theme.palette.grey.g90};
  }

  &:disabled {
    background: ${({ theme }) => theme.palette.grey.g10};
    border: 1px solid ${({ theme }) => theme.palette.grey.g20};
    color: ${({ theme }) => theme.palette.grey.g40};
  }
`;

const SearchIconWrapper = styled.div`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  pointer-events: none;

  svg {
    width: 20px;
    height: 20px;
  }

  path {
    stroke: ${({ theme }) => theme.palette.grey.g40};
  }
`;

const Dropdown = styled.ul`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  z-index: 10;
  background: ${({ theme }) => theme.palette.grey.w};
  border: 1px solid ${({ theme }) => theme.palette.grey.g20};
  border-radius: 4px;
  box-shadow: 0px 8px 14px 0px ${({ theme }) => theme.palette.shadow};
  max-height: 300px;
  overflow-y: auto;
  list-style: none;
  padding: 0;
  margin: 0;

  ${mq_lg} {
    max-height: 274px;
  }
`;

const DropdownItem = styled.li`
  padding: 12px 16px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 2px;
  border-bottom: 1px solid ${({ theme }) => theme.palette.grey.g10};

  &:last-of-type {
    border-bottom: none;
  }

  &:hover {
    background: ${({ theme }) => theme.palette.grey.g00};
  }
`;

const PlaceNameRow = styled.div`
  display: flex;
  align-items: baseline;
  gap: 6px;
`;

const PlaceName = styled.span`
  ${({ theme }) => theme.typo.b3};
  color: ${({ theme }) => theme.palette.grey.g90};
`;

const Category = styled.span`
  ${({ theme }) => theme.typo.b1};
  color: ${({ theme }) => theme.palette.grey.g40};
`;

const AddressName = styled.span`
  ${({ theme }) => theme.typo.b1};
  color: ${({ theme }) => theme.palette.grey.g50};
`;

const SelectedInfo = styled.div`
  margin-top: 8px;
  display: flex;
  align-items: center;
  gap: 8px;

  div {
    width: auto;
    flex: 1;
  }
`;

const ErrorMessage = styled.span`
  margin-top: 4px;
  ${({ theme }) => theme.typo.b1};
  color: ${({ theme }) => theme.palette.status.error1};
`;

const EmptyState = styled.div`
  padding: 16px;
  text-align: center;
  ${({ theme }) => theme.typo.b1};
  color: ${({ theme }) => theme.palette.grey.g50};
`;

const SectionHeader = styled.li`
  padding: 8px 16px;
  ${({ theme }) => theme.typo.b1};
  color: ${({ theme }) => theme.palette.grey.g50};
  background: ${({ theme }) => theme.palette.grey.g00};
  list-style: none;
`;

const BooltiBadge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 2px 6px;
  border-radius: 4px;
  background: ${({ theme }) => theme.palette.grey.g90};
  color: ${({ theme }) => theme.palette.grey.w};
  ${({ theme }) => theme.typo.b1};
  font-size: 11px;
  line-height: 1;
  margin-left: auto;
`;

export default {
  Container,
  InputWrapper,
  SearchInput,
  SearchIconWrapper,
  Dropdown,
  DropdownItem,
  PlaceNameRow,
  PlaceName,
  Category,
  AddressName,
  SelectedInfo,
  ErrorMessage,
  EmptyState,
  SectionHeader,
  BooltiBadge,
};
