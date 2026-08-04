import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { getContrastTextColor } from './utils';
import { mq_xl } from '@boolti/ui';

const slideDetailPaneIn = keyframes`
  from {
    transform: translateX(100%);
  }

  to {
    transform: translateX(0);
  }
`;

const Page = styled.main`
  min-height: 100dvh;
  background: ${({ theme }) => theme.palette.grey.b};
  color: ${({ theme }) => theme.palette.grey.g10};

  &::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    display: block;
    width: 100%;
    height: 72px;
    background: ${({ theme }) => theme.palette.grey.b};
    z-index: 1;
  }

  ${mq_xl} {
    &::before {
      height: 92px;
    }
  }
`;

const Header = styled.header<{ $menuOpen: boolean }>`
  position: sticky;
  top: 0;
  z-index: 33;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  align-content: flex-start;
  gap: 0;
  min-height: ${({ $menuOpen }) => ($menuOpen ? '203px' : '156px')};
  padding: 20px 20px 16px;
  ${({ theme, $menuOpen }) =>
    !$menuOpen &&
    `
      background: linear-gradient(
        to bottom,
        ${theme.palette.grey.main}66 0,
        ${theme.palette.grey.main}66 71px,
        ${theme.palette.grey.g50}4D 71px,
        ${theme.palette.grey.g50}4D 72px,
        ${theme.palette.mobile.grey.b} 72px
      );
    `}
  border-bottom: ${({ theme }) => theme.palette.grey.g50}4D;
  backdrop-filter: blur(80px);
  -webkit-backdrop-filter: blur(80px);

  ${mq_xl} {
    flex-wrap: nowrap;
    align-content: normal;
    gap: 32px;
    min-height: 92px;
    padding: 11px 52px;
    background: ${({ theme }) => theme.palette.grey.main}66;
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
  }
`;

const Logo = styled.button`
  order: 0;
  flex: 0 0 auto;
  height: 52px;
  margin-left: 4px;
  transform: translateY(2px);
  background: none;
  border: none;
  outline: none;
  cursor: pointer;

  svg path:not(:first-of-type) {
    fill: ${({ theme }) => theme.palette.grey.w};
  }

  ${mq_xl} {
    width: 74px;
    height: auto;
    margin-left: 0;
    transform: none;
  }
`;

const HeaderMenuContainer = styled.div`
  position: relative;
  order: 2;
  flex: 0 0 auto;
  margin-left: auto;
  height: 52px;
  margin-right: 4px;

  ${mq_xl} {
    width: 74px;
    height: auto;
    margin-right: 0;
    display: flex;
    justify-content: flex-end;
  }
`;

const MenuButton = styled.button`
  display: grid;
  place-items: center;
  width: 24px;
  height: 28px;
  color: ${({ theme }) => theme.palette.grey.w};
  background: none;
  border: 0;
  cursor: pointer;
  transform: translateY(2px);

  ${mq_xl} {
    width: 44px;
    height: 44px;
    transform: none;
  }
`;

const HeaderMenuPopup = styled.div`
  box-sizing: border-box;
  position: fixed;
  top: 72px;
  right: 0;
  left: 0;
  z-index: 40;
  width: 100%;
  height: 131px;
  color: ${({ theme }) => theme.palette.grey.g10};
  background: transparent;
  border-radius: 0;
  box-shadow: none;

  ${mq_xl} {
    position: absolute;
    top: calc(100% + 16px);
    left: auto;
    width: 300px;
    height: 124px;
    background: ${({ theme }) => theme.palette.mobile.grey.g85};
    border-radius: 12px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
  }
`;

const HeaderMenuLabel = styled.button`
  display: block;
  width: 100%;
  height: 51px;
  padding: 0 20px;
  color: ${({ theme }) => theme.palette.mobile.grey.w};
  background: transparent;
  border: 0;
  cursor: pointer;
  ${({ theme }) => theme.typo.b3};
  text-align: left;

  &:hover {
    background: transparent;
  }

  ${mq_xl} {
    height: 48px;
    padding: 0 16px;
    color: ${({ theme }) => theme.palette.grey.g10};

    &:hover {
      background: ${({ theme }) => theme.palette.grey.g90};
    }
  }
`;

const HeaderMenuPrimaryButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  width: calc(100% - 40px);
  height: 48px;
  color: ${({ theme }) => theme.palette.mobile.grey.w};
  background: ${({ theme }) => theme.palette.mobile.primary.o1};
  border: 0;
  border-radius: 8px;
  margin: 12px 20px 20px;
  cursor: pointer;
  box-sizing: border-box;
  ${({ theme }) => theme.typo.sh1};

  svg {
    width: 20px;
    height: 20px;
  }

  ${mq_xl} {
    width: calc(100% - 32px);
    margin: 12px 16px 16px;
    color: ${({ theme }) => theme.palette.grey.w};
    background: ${({ theme }) => theme.palette.primary.o1};
  }
`;

const SearchForm = styled.form<{ $hiddenOnMobile: boolean }>`
  display: ${({ $hiddenOnMobile }) => ($hiddenOnMobile ? 'none' : 'grid')};
  order: 3;
  grid-template-columns: 1fr 52px;
  width: 100%;
  height: 48px;
  min-height: 48px;
  margin: 20px 0 0;
  background: ${({ theme }) => theme.palette.mobile.grey.g85};
  border: 0;
  border-radius: 4px;

  ${mq_xl} {
    display: grid;
    order: 1;
    grid-template-columns: repeat(3, 1fr) 70px;
    min-width: 672px;
    max-width: 852px;
    width: 100%;
    height: auto;
    min-height: 70px;
    margin: 0 auto;
    background: ${({ theme }) => theme.palette.grey.b};
    border: 1px solid ${({ theme }) => theme.palette.grey.g90};
    border-radius: 999px;
  }
`;

const FilterField = styled.div`
  position: relative;
  display: none;
  min-width: 0;

  ${mq_xl} {
    display: block;
  }
`;

const fieldFocusStyle = `
  outline: none;

  &::before {
    opacity: 1;
  }
`;

const FieldButton = styled.button<{
  active?: boolean;
  $showDivider?: boolean;
  $hideDivider?: boolean;
}>`
  position: relative;
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 2px;
  width: 100%;
  height: 100%;
  min-width: 0;
  padding: 10px 24px;
  text-align: left;
  color: ${({ theme }) => theme.palette.grey.g50};
  background: transparent;
  border: 0;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border: 1px solid ${({ theme }) => theme.palette.grey.g30};
    border-radius: 999px;
    background: ${({ theme }) => theme.palette.grey.g90};
    opacity: 0;
    transition: opacity 120ms ease;
  }

  &::after {
    content: ${({ $hideDivider, $showDivider }) => ($showDivider && !$hideDivider ? "''" : 'none')};
    position: absolute;
    top: 20px;
    right: 0;
    width: 1px;
    height: 30px;
    background: ${({ theme }) => theme.palette.grey.g90};
  }

  > span {
    position: relative;
    z-index: 1;
  }

  &:focus-visible,
  &[aria-expanded='true'] {
    ${fieldFocusStyle}
  }

  &:focus-visible::before,
  &[aria-expanded='true']::before {
    opacity: 1;
  }

  &:disabled {
    cursor: not-allowed;
    color: ${({ theme }) => theme.palette.grey.g60};
  }

  &:disabled::before {
    opacity: 0;
  }

  ${mq_xl} {
    display: flex;
  }
`;

const FilterPopover = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  z-index: 20;
  display: grid;
  gap: 10px;
  width: 360px;
  padding: 16px;
  background: ${({ theme }) => theme.palette.mobile.grey.g85};
  border-radius: 8px;
  box-shadow: 0px 10px 40px 0px ${({ theme }) => theme.palette.grey.b}4D;
`;

const KeywordPopover = styled(FilterPopover)`
  display: none;
  width: 360px;

  ${mq_xl} {
    display: grid;
  }
`;

const RangePopover = styled(FilterPopover)`
  width: 360px;
  gap: 8px;
`;

const FilterOptionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: 16px;

  ${mq_xl} {
    margin-top: 0;
  }
`;

const FilterOption = styled.button<{ active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  height: 48px;
  color: ${({ theme }) => theme.palette.grey.g10};
  background: transparent;
  text-align: left;
  border: 0;
  border-radius: 4px;
  ${({ theme }) => theme.typo.b3};

  &::before {
    content: '';
    flex: 0 0 auto;
    width: 20px;
    height: 20px;
    border: 1px solid
      ${({ active, theme }) => (active ? theme.palette.grey.w : theme.palette.grey.g80)};
    border-radius: 50%;
    background: ${({ active, theme }) => (active ? theme.palette.grey.w : 'transparent')};
    box-shadow: ${({ active, theme }) =>
      active && `inset 0 0 0 3px ${theme.palette.mobile.grey.g85}`};
  }

  ${mq_xl} {
    padding: 0 10px;

    &:hover,
    &:focus-visible {
      color: ${({ theme }) => theme.palette.grey.w};
      background: ${({ theme }) => theme.palette.grey.g90};
      outline: none;
    }
  }
`;

const RangeInputRow = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 12px minmax(0, 1fr);
  align-items: end;
  gap: 8px;
`;

const RangeInputLabel = styled.label`
  display: grid;
  gap: 8px;
  color: ${({ theme }) => theme.palette.grey.g50};
  ${({ theme }) => theme.typo.b2}
`;

const RangeInput = styled.input`
  width: 100%;
  height: 48px;
  padding: 0 10px;
  color: ${({ theme }) => theme.palette.mobile.grey.g05};
  background: ${({ theme }) => theme.palette.grey.b};
  border: 1px solid ${({ theme }) => theme.palette.grey.g80};
  border-radius: 4px;
  outline: 0;
  ${({ theme }) => theme.typo.b3};

  &:focus {
    border-color: ${({ theme }) => theme.palette.grey.g50};
  }

  &::placeholder {
    color: ${({ theme }) => theme.palette.grey.g50};
  }
`;

const RangeDash = styled.span`
  padding-bottom: 16px;
  color: ${({ theme }) => theme.palette.grey.g50};
  text-align: center;
`;

const PopoverHeader = styled.div`
  display: flex;
  justify-content: space-between;
  color: ${({ theme }) => theme.palette.grey.g50};
  ${({ theme }) => theme.typo.b2};
`;

const PopoverFooter = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const TextButton = styled.button`
  padding: 0 6px;
  color: ${({ theme }) => theme.palette.grey.g50};
  background: transparent;
  border: 0;
  ${({ theme }) => theme.typo.sh0};
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;

  &:disabled {
    opacity: 0.6;
    cursor: default;
  }

  &:not(:disabled):hover,
  &:not(:disabled):focus-visible {
    color: ${({ theme }) => theme.palette.grey.w};
    outline: none;
  }
`;

const RecentList = styled.div`
  display: grid;
`;

const RecentItem = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 28px;
  align-items: center;
  min-height: 60px;
  border-radius: 6px;

  &:hover,
  &:focus-within {
    background: ${({ theme }) => theme.palette.grey.g90};
  }
`;

const RecentKeywordButton = styled.button`
  min-width: 0;
  height: 100%;
  padding: 0 10px;
  overflow: hidden;
  color: ${({ theme }) => theme.palette.grey.g30};
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap;
  background: transparent;
  border: 0;
  display: flex;
  align-items: center;
  gap: 12px;
  ${({ theme }) => theme.typo.b3};
  cursor: pointer;

  &:focus-visible {
    color: ${({ theme }) => theme.palette.grey.w};
    outline: none;
  }
`;

const AutocompleteText = styled.span`
  display: grid;
  min-width: 0;
  gap: 2px;
`;

const AutocompleteMatch = styled.strong`
  color: ${({ theme }) => theme.palette.primary.o1};
  font-weight: inherit;
`;

const AutocompleteAddress = styled.span`
  overflow: hidden;
  color: ${({ theme }) => theme.palette.grey.g50};
  text-overflow: ellipsis;
  white-space: nowrap;
  ${({ theme }) => theme.typo.b2};
`;

const AutocompleteState = styled.p`
  padding: 18px 10px;
  color: ${({ theme }) => theme.palette.grey.g50};
  text-align: center;
  ${({ theme }) => theme.typo.b3};
`;

const IconButton = styled.button`
  display: grid;
  place-items: center;
  width: 28px;
  height: 28px;
  padding: 0;
  color: ${({ theme }) => theme.palette.grey.g60};
  background: transparent;
  border: 0;
  cursor: pointer;

  svg {
    width: 14px;
    height: 14px;
  }

  &:hover,
  &:focus-visible {
    color: ${({ theme }) => theme.palette.grey.w};
    outline: none;
  }
`;

const FieldLabel = styled.span`
  ${({ theme }) => theme.typo.b1};
  font-weight: 400;
`;

const FieldValue = styled.span<{ isPlaceholder?: boolean }>`
  overflow: hidden;
  color: ${({ theme, isPlaceholder }) =>
    isPlaceholder ? theme.palette.grey.g50 : theme.palette.grey.g10};
  ${({ theme }) => theme.typo.b3};
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const SearchInputLabel = styled.label`
  display: none;
  color: ${({ theme }) => theme.palette.grey.g50};
  ${({ theme }) => theme.typo.b1};
  font-weight: 400;

  ${mq_xl} {
    display: inline;
  }
`;

const SearchInputField = styled.div<{ active?: boolean; $hideDivider?: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2px;
  min-width: 0;
  padding: 0 12px;

  &::before {
    content: none;
    position: absolute;
    inset: 0;
    border: 1px solid ${({ theme }) => theme.palette.grey.g30};
    border-radius: 999px;
    background: ${({ theme }) => theme.palette.mobile.grey.g85};
    opacity: 0;
    transition: opacity 120ms ease;
  }

  &::after {
    content: none;
    position: absolute;
    top: 20px;
    right: 0;
    width: 1px;
    height: 30px;
    background: ${({ theme }) => theme.palette.grey.g90};
  }

  ${SearchInputLabel} {
    position: relative;
    z-index: 1;
  }

  ${({ active }) => active && fieldFocusStyle}

  &:focus-within::before {
    opacity: 1;
  }

  ${mq_xl} {
    padding: 10px 24px;

    &::before {
      content: '';
    }

    &::after {
      content: ${({ $hideDivider }) => ($hideDivider ? 'none' : "''")};
    }
  }
`;

const KeywordInput = styled.input`
  position: relative;
  z-index: 1;
  display: block;
  min-width: 0;
  width: 100%;
  height: 48px;
  padding: 0;
  color: ${({ theme }) => theme.palette.mobile.grey.g05};
  background: transparent;
  border: 0;
  outline: 0;
  ${({ theme }) => theme.typo.b3};

  &::placeholder {
    color: ${({ theme }) => theme.palette.mobile.grey.g70};
  }

  ${mq_xl} {
    height: 24px;
    font-size: 16px;
    line-height: 24px;

    &::placeholder {
      color: ${({ theme }) => theme.palette.grey.g50};
    }
  }
`;

const SearchButton = styled.button`
  display: grid;
  place-items: center;
  width: 52px;
  height: 48px;
  margin: auto;
  color: ${({ theme }) => theme.palette.mobile.grey.g60};
  background: transparent;
  border: 0;
  border-radius: 0;
  cursor: pointer;

  ${mq_xl} {
    width: 48px;
    color: ${({ theme }) => theme.palette.grey.w};
    background: ${({ theme }) => theme.palette.primary.o1};
    border-radius: 50%;
  }
`;

const Content = styled.div<{ hasDetail: boolean }>`
  display: block;
  min-height: calc(100vh - 156px);

  ${mq_xl} {
    display: grid;
    grid-template-columns: ${({ hasDetail }) =>
      hasDetail ? 'minmax(0, 3fr) minmax(0, 1fr)' : 'minmax(0, 1fr)'};
    min-height: calc(100vh - 92px);
    overflow-x: clip;
  }
`;

const ResultsPane = styled.section<{ $headerMenuOpen: boolean }>`
  min-width: 0;
  overflow-y: auto;
  height: ${({ $headerMenuOpen }) =>
    $headerMenuOpen ? 'calc(100dvh - 203px)' : 'calc(100dvh - 156px)'};

  ${mq_xl} {
    height: calc(100vh - 92px);
  }
`;

const Toolbar = styled.div`
  display: grid;
  grid-template-columns: 76px minmax(0, 1fr);
  align-items: center;
  gap: 16px;
  height: auto;
  width: 100%;
  padding: 8px 20px 12px;
  position: sticky;
  top: 0;
  left: 0;
  background: ${({ theme }) => theme.palette.grey.b};
  z-index: 31;

  ${mq_xl} {
    display: flex;
    grid-template-columns: none;
    justify-content: space-between;
    height: 92px;
    padding: 20px 52px;
  }
`;

const Count = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  min-width: 0;
  position: relative;
  color: ${({ theme }) => theme.palette.grey.g40};
  font-size: 15px;
  line-height: 22px;

  span {
    white-space: nowrap;
  }

  ${mq_xl} {
    align-items: center;
    ${({ theme }) => theme.typo.b3};
  }
`;

const CountValue = styled.strong<{ $hasSearchConditions: boolean }>`
  color: ${({ $hasSearchConditions, theme }) =>
    $hasSearchConditions ? theme.palette.primary.o1 : theme.palette.grey.g10};
  ${({ theme }) => theme.typo.sh1};
  white-space: nowrap;

  ${mq_xl} {
    white-space: normal;
  }
`;

const CountInfoPopupButton = styled.button`
  display: inline-flex;
  align-items: center;
  background: none;
  border: none;
  position: relative;
  cursor: pointer;
`;

const CountInfoPopup = styled.div<{ isOpen?: boolean }>`
  width: calc(100% - 40px);
  padding: 16px 40px 16px 20px;
  position: absolute;
  top: 52px;
  left: 20px;
  border-radius: 12px;
  background: ${({ theme }) => theme.palette.mobile.grey.g85};
  color: ${({ theme }) => theme.palette.grey.g10};
  box-shadow: 0 10px 40px 0 #0000004d;
  opacity: ${({ isOpen }) => (isOpen ? '1' : '0')};
  transition: opacity 120ms ease-in-out;
  ${({ theme }) => theme.typo.b3};
  pointer-events: ${({ isOpen }) => (isOpen ? 'default' : 'none')};

  ${mq_xl} {
    width: 280px;
    top: 64px;
    left: 48px;
  }
`;

const CountInfoPopupCloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  cursor: pointer;
`;

const SortGroup = styled.div<{ $disabled: boolean }>`
  display: none;
  gap: 4px;
  padding: 4px;
  border-radius: 8px;
  background: ${({ theme }) => theme.palette.grey.g100};
  opacity: 1;
  transition: opacity 120ms ease;

  ${mq_xl} {
    display: flex;
    opacity: ${({ $disabled }) => ($disabled ? 0.6 : 1)};
  }
`;

const SortButton = styled.button<{ active?: boolean }>`
  display: inline-flex;
  flex: 0 1 86px;
  justify-content: center;
  align-items: center;
  gap: 4px;
  width: 160px;
  height: 40px;
  padding: 0;
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: ${({ theme }) => theme.palette.grey.g10};
  text-align: center;
  font-size: 13px;
  line-height: 16px;
  white-space: normal;
  cursor: pointer;

  &:disabled {
    cursor: default;
    color: ${({ theme }) => theme.palette.grey.g60};
  }

  ${mq_xl} {
    flex: 0 1 auto;
    height: 44px;
    padding: 0 10px;
    background: ${({ active, theme }) => (active ? theme.palette.grey.g90 : 'transparent')};
    color: ${({ active, theme }) => (active ? theme.palette.grey.g10 : theme.palette.grey.g60)};
    ${({ active, theme }) => (active ? theme.typo.sh1 : theme.typo.b3)};
  }
`;

const MobileSortButton = styled.button`
  display: inline-flex;
  justify-self: end;
  align-items: center;
  justify-content: flex-end;
  gap: 4px;
  min-width: 128px;
  height: 40px;
  padding: 0;
  color: ${({ theme }) => theme.palette.grey.g10};
  background: transparent;
  border: 0;
  font-size: 13px;
  font-weight: 600;
  line-height: 16px;
  white-space: nowrap;

  svg {
    width: 20px;
    height: 20px;
  }

  &:disabled {
    cursor: not-allowed;
    color: ${({ theme }) => theme.palette.grey.g60};
  }

  ${mq_xl} {
    display: none;
  }
`;

const ChipRow = styled.div`
  display: flex;
  gap: 8px;
  padding: 0 20px 16px;
  overflow-x: auto;

  ${mq_xl} {
    display: none;
  }
`;

const Chip = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 36px;
  padding: 0 12px;
  white-space: nowrap;
  color: ${({ theme }) => theme.palette.mobile.grey.g05};
  background: ${({ theme }) => theme.palette.grey.g90};
  border: 1px solid ${({ theme }) => theme.palette.grey.g80};
  border-radius: 999px;
  font-size: 14px;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  justify-items: center;
  gap: 16px;
  padding: 0 20px 24px;

  ${mq_xl} {
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    justify-items: stretch;
    padding: 0 52px 24px;
  }
`;

const LoadMoreTrigger = styled.div`
  height: 1px;
  margin-bottom: 48px;

  ${mq_xl} {
    margin-bottom: 64px;
  }
`;

const ConcertHallCard = styled.button<{ $dimmed: boolean }>`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 100%;
  min-width: 280px;
  max-width: 480px;
  height: 421px;
  padding: 0;
  text-align: left;
  color: ${({ theme }) => theme.palette.grey.g10};
  background: ${({ theme }) => theme.palette.mobile.grey.g85};
  border-radius: 8px;
  opacity: 1;
  cursor: pointer;
  transition:
    border-color 120ms ease,
    opacity 120ms ease;

  ${mq_xl} {
    width: auto;
    min-width: 0;
    max-width: none;
    opacity: ${({ $dimmed }) => ($dimmed ? 0.5 : 1)};
  }
`;

const CardImage = styled.div<{ imageUrl?: string }>`
  width: 100%;
  height: 200px;
  background: linear-gradient(
      135deg,
      ${({ theme }) => theme.palette.primary.o1}52,
      ${({ theme }) => theme.palette.grey.g80}61
    ),
    ${({ imageUrl, theme }) =>
      imageUrl ? `url(${imageUrl}) center/cover` : theme.palette.grey.g90};
`;

const CardInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 28px 24px;
`;

const CardInfoHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const PriceRow = styled.div`
  display: flex;
  align-items: center;
`;

const Price = styled.strong`
  ${({ theme }) => theme.typo.h2};
  color: ${({ theme }) => theme.palette.primary.o1};
`;

const PriceLabel = styled.span`
  ${({ theme }) => theme.typo.b2};
  color: ${({ theme }) => theme.palette.grey.g30};
  margin-left: 1px;
`;

const PriceHours = styled.span`
  ${({ theme }) => theme.typo.b2};
  color: ${({ theme }) => theme.palette.grey.g50};
  margin-left: 4px;
`;

const CardTitle = styled.h2`
  overflow: hidden;
  color: ${({ theme }) => theme.palette.mobile.grey.g05};
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const CardDivider = styled.hr`
  height: 1px;
  margin: 20px 0;
  border: 0;
  background: ${({ theme }) => theme.palette.grey.g90};
`;

const MetaList = styled.dl`
  display: grid;
  grid-template-columns: 62px minmax(0, 1fr);
  gap: 16px;
  color: ${({ theme }) => theme.palette.grey.g30};
  ${({ theme }) => theme.typo.b2};
`;

const MetaLabel = styled.dt`
  color: ${({ theme }) => theme.palette.grey.g50};
`;

const MetaValue = styled.dd`
  min-width: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: right;
`;

const DetailMetaList = styled.dl`
  display: grid;
  grid-template-columns: 62px minmax(0, 1fr);
  gap: 16px;
  color: ${({ theme }) => theme.palette.grey.g40};
  ${({ theme }) => theme.typo.b2};
`;

const DetailMetaLabel = styled.dt`
  color: ${({ theme }) => theme.palette.grey.g50};
`;

const DetailMetaValue = styled.dd`
  min-width: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: left;
`;

const Empty = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
  gap: 12px;
  min-height: 360px;
  padding: 48px 20px;
  text-align: center;
  color: ${({ theme }) => theme.palette.grey.g30};

  ${mq_xl} {
    align-content: normal;
    gap: 24px;
    min-height: 0;
    padding: 0;
  }
`;

const EmptyTitle = styled.p`
  color: ${({ theme }) => theme.palette.mobile.grey.g05};
  font-size: 18px;
  font-weight: 600;
  line-height: 26px;

  ${mq_xl} {
    line-height: normal;
  }
`;

const EmptyDescription = styled.p`
  display: grid;
  color: ${({ theme }) => theme.palette.grey.g40};
  ${({ theme }) => theme.typo.b4};
`;

const EmptyIcon = styled.div`
  display: grid;
  place-items: center;
  color: ${({ theme }) => theme.palette.grey.g10};

  svg {
    width: 60px;
    height: 60px;
  }
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 20px;

  ${mq_xl} {
    margin-top: 0;
  }
`;

const ActionButton = styled.button<{ variant?: 'primary' | 'secondary' }>`
  height: 48px;
  padding: 0 20px;
  color: ${({ variant, theme }) =>
    variant === 'primary' ? theme.palette.grey.w : theme.palette.mobile.grey.g05};
  background: ${({ variant, theme }) =>
    variant === 'primary' ? theme.palette.primary.o1 : theme.palette.mobile.grey.g70};
  border: none;
  border-radius: 6px;
  text-align: center;
  ${({ theme }) => theme.typo.sh1};
  cursor: pointer;

  &:disabled {
    color: ${({ theme }) => theme.palette.grey.g60};
    background: ${({ theme }) => theme.palette.grey.g90};
    border-color: ${({ theme }) => theme.palette.grey.g90};
    cursor: default;
  }
`;

const DetailPane = styled.aside`
  position: fixed;
  inset: 0;
  z-index: 50;
  width: 100%;
  height: 100dvh;
  max-height: none;
  min-height: auto;
  overflow-y: auto;
  background: ${({ theme }) => theme.palette.mobile.grey.g90};
  border-left: 0;
  border-radius: 0;

  ${mq_xl} {
    position: relative;
    inset: auto;
    z-index: 21;
    width: auto;
    height: calc(100vh - 92px);
    max-height: none;
    min-height: 0;
    border-left: 1px solid ${({ theme }) => theme.palette.grey.g90};
    border-radius: 0;
    animation: ${slideDetailPaneIn} 260ms cubic-bezier(0.22, 1, 0.36, 1) both;
    will-change: transform;

    @media (prefers-reduced-motion: reduce) {
      animation: none;
    }
  }
`;

const DetailNavigation = styled.nav`
  position: sticky;
  top: 0;
  z-index: 3;
`;

const DetailBackdrop = styled.button`
  display: none;
  padding: 0;
  background: transparent;
  border: 0;
`;

const DetailHero = styled.div<{ imageUrl?: string }>`
  position: relative;
  display: flex;
  align-items: flex-end;
  min-height: 375px;
  padding: 20px;
  background: linear-gradient(
      180deg,
      ${({ theme }) => theme.palette.grey.b}0F,
      ${({ theme }) => theme.palette.grey.b}B8
    ),
    ${({ imageUrl, theme }) =>
      imageUrl ? `url(${imageUrl}) center/cover` : theme.palette.grey.g90};
  z-index: 2;

  ${mq_xl} {
    min-height: 331px;
  }
`;

const DetailState = styled.div`
  position: relative;
  display: grid;
  place-items: center;
  min-height: calc(100vh - 92px);
  padding: 40px 20px;
  text-align: center;
`;

const DetailCloseButton = styled.button`
  position: absolute;
  top: 0;
  left: 0;
  padding: 10px 20px;
  display: grid;
  place-items: center;
  color: ${({ theme }) => theme.palette.grey.w};
  border: 0;
  border-radius: 50%;
  cursor: pointer;

  svg {
    width: 24px;
    height: 24px;
  }
`;

const DetailShareButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  padding: 10px 20px;
  display: grid;
  place-items: center;
  color: ${({ theme }) => theme.palette.grey.w};
  border: 0;
  border-radius: 50%;
  cursor: pointer;

  svg {
    width: 24px;
    height: 24px;
  }

  &:disabled {
    color: ${({ theme }) => theme.palette.grey.g60};
    cursor: default;
  }
`;

const DetailHeader = styled.div`
  position: sticky;
  top: 0;
  background: ${({ theme }) => theme.palette.mobile.grey.g90};
  width: 100%;
  height: 44px;
  margin-top: -44px;
  display: flex;
  align-items: center;
  z-index: 1;
`

const DetailHeaderTitle = styled.span`
  margin-left: 56px;
  display: inline-flex;
  align-items: center;
  ${({ theme }) => theme.typo.sh2};
`

const DetailTitle = styled.h2`
  color: ${({ theme }) => theme.palette.grey.w};
  font-size: 24px;
  line-height: 34px;
  font-weight: 700;
`;

const DetailSection = styled.section`
  padding: 28px 20px;
  border-bottom: 1px solid ${({ theme }) => theme.palette.grey.g90};
`;

const DetailSectionTitle = styled.h3`
  margin-bottom: 12px;
  color: ${({ theme }) => theme.palette.mobile.grey.g05};
  font-size: 18px;
  font-weight: 600;
`;

const DetailText = styled.p`
  color: ${({ theme }) => theme.palette.grey.g30};
  font-size: 15px;
  line-height: 24px;
`;

const TextToggleButton = styled.button`
  height: 36px;
  margin-top: 10px;
  padding: 0;
  color: ${({ theme }) => theme.palette.mobile.primary.o1};
  background: transparent;
  border: 0;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
`;

const DetailActions = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  padding: 16px 20px 28px;
`;

const DetailAction = styled.button`
  display: flex;
  flex-direction: column;
  place-items: center;
  align-items: center;
  justify-content: center;
  gap: 4px;
  height: 66px;
  color: ${({ theme }) => theme.palette.grey.g40};
  text-decoration: none;
  background: ${({ theme }) => theme.palette.mobile.grey.g85};
  border: 0;
  border-radius: 6px;
  ${({ theme }) => theme.typo.b1};
  cursor: pointer;

  &:disabled {
    color: ${({ theme }) => theme.palette.grey.g60};
    cursor: default;
  }
`;

const DetailTabs = styled.div`
  position: sticky;
  top: 44px;
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  padding: 0 20px;
  border-bottom: 1px solid ${({ theme }) => theme.palette.grey.g90};
  background: ${({ theme }) => theme.palette.mobile.grey.g90};
`;

const DetailTab = styled.button`
  height: 48px;
  color: ${({ theme }) => theme.palette.grey.g60};
  background: transparent;
  border: 0;
  border-bottom: 2px solid transparent;
  ${({ theme }) => theme.typo.sh1};
  text-align: center;
  cursor: pointer;

  &[aria-selected='true'] {
    color: ${({ theme }) => theme.palette.mobile.grey.g05};
    border-bottom-color: ${({ theme }) => theme.palette.mobile.grey.g05};
  }
`;

const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 109px));
  gap: 4px;

  ${mq_xl} {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const DetailImage = styled.div<{ imageUrl?: string }>`
  aspect-ratio: 1;
  border-radius: 4px;
  background: ${({ imageUrl }) => (imageUrl ? `url(${imageUrl}) center/cover` : '')},
    ${({ theme }) => theme.palette.grey.g90};
`;

const MoreImageButton = styled.button<{ imageUrl?: string }>`
  display: grid;
  place-items: center;
  gap: 2px;
  aspect-ratio: 1;
  color: ${({ theme }) => theme.palette.grey.w};
  background: linear-gradient(
      ${({ theme }) => theme.palette.grey.b}94,
      ${({ theme }) => theme.palette.grey.b}94
    ),
    ${({ imageUrl, theme }) =>
      imageUrl ? `url(${imageUrl}) center/cover` : theme.palette.grey.g90};
  border: 0;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 700;
`;

const MoreImageCount = styled.span`
  line-height: 18px;
`;

const SubwayList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
`;

const SubwayItem = styled.div`
  ${({ theme }) => theme.typo.b2};
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-weight: 400;
`;

const SubwayChip = styled.span<{ colorHex: string }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 20px;
  padding: 0 6px;
  border-radius: 999px;
  background: ${({ colorHex }) => colorHex};
  ${({ theme }) => theme.typo.sh0};
  color: ${({ colorHex }) => getContrastTextColor(colorHex)};
`;

const AmenityGrid = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px 16px;
  color: ${({ theme }) => theme.palette.grey.g30};
  font-size: 15px;
  line-height: 24px;
`;

const MapBox = styled.div`
  position: relative;
  display: grid;
  place-items: center;
  gap: 4px;
  height: 140px;
  margin-top: 12px;
  color: ${({ theme }) => theme.palette.grey.g30};
  background: linear-gradient(
      135deg,
      ${({ theme }) => theme.palette.primary.o1}29,
      ${({ theme }) => theme.palette.grey.g80}6B
    ),
    ${({ theme }) => theme.palette.grey.g90};
  border-radius: 8px;

  span {
    color: ${({ theme }) => theme.palette.mobile.grey.g05};
    font-size: 14px;
    font-weight: 600;
  }

  small {
    color: ${({ theme }) => theme.palette.grey.g50};
    font-size: 12px;
  }
`;

const MapOpenButton = styled.button`
  position: absolute;
  right: 16px;
  bottom: 16px;
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  color: ${({ theme }) => theme.palette.grey.w};
  background: ${({ theme }) => theme.palette.mobile.grey.g90}B8;
  border: 0;
  border-radius: 50%;
`;

const MapPin = styled.span`
  width: 16px;
  height: 16px;
  background: ${({ theme }) => theme.palette.primary.o1};
  border: 3px solid ${({ theme }) => theme.palette.grey.w}C2;
  border-radius: 50%;
  box-shadow: 0 0 0 8px ${({ theme }) => theme.palette.primary.o1}29;
`;

const MobileFilterOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 60;
  display: flex;
  align-items: flex-end;
  background: rgba(0, 0, 0, 0.5);
`;

const MobileFilterSheet = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: min(589px, calc(100dvh - 32px));
  overflow: hidden;
  color: ${({ theme }) => theme.palette.mobile.grey.g05};
  background: ${({ theme }) => theme.palette.mobile.grey.g85};
  border-radius: 16px 16px 0 0;
`;

const MobileSheetHandle = styled.div`
  flex: 0 0 auto;
  width: 45px;
  height: 4px;
  margin: 12px auto 8px;
  background: ${({ theme }) => theme.palette.mobile.grey.g70};
  border-radius: 999px;
`;

const MobileSheetHeader = styled.div`
  display: flex;
  flex: 0 0 48px;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
`;

const MobileSheetTitle = styled.h2`
  color: ${({ theme }) => theme.palette.mobile.grey.g05};
  font-size: 18px;
  font-weight: 600;
  line-height: 26px;
`;

const MobileSheetCloseButton = styled.button`
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  padding: 0;
  color: ${({ theme }) => theme.palette.mobile.grey.g30};
  background: transparent;
  border: 0;

  svg {
    width: 20px;
    height: 20px;
  }
`;

const MobileLocationSearch = styled.label`
  position: relative;
  display: flex;
  flex: 0 0 48px;
  align-items: center;
  margin: 4px 20px 12px;
  padding: 0 44px 0 16px;
  background: ${({ theme }) => theme.palette.mobile.grey.b};
  border: 1px solid ${({ theme }) => theme.palette.mobile.grey.g80};
  border-radius: 999px;

  > svg {
    position: absolute;
    right: 14px;
    width: 20px;
    height: 20px;
    color: ${({ theme }) => theme.palette.mobile.grey.g30};
  }
`;

const MobileLocationInput = styled.input`
  width: 100%;
  min-width: 0;
  padding: 0;
  color: ${({ theme }) => theme.palette.mobile.grey.g05};
  background: transparent;
  border: 0;
  outline: 0;
  font-size: 15px;
  line-height: 22px;

  &::placeholder {
    color: ${({ theme }) => theme.palette.mobile.grey.g50};
  }
`;

const MobileSheetBody = styled.div`
  flex: 1 1 auto;
  min-height: 0;
  padding: 0 20px 20px;
  overflow-y: auto;
`;

const MobileResultHeading = styled.h3`
  height: 38px;
  padding-top: 8px;
  color: ${({ theme }) => theme.palette.mobile.grey.g50};
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
`;

const MobileResultList = styled.div`
  display: grid;
`;

const MobileResultButton = styled.button`
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
  min-height: 60px;
  padding: 7px 0;
  color: ${({ theme }) => theme.palette.mobile.grey.g10};
  text-align: left;
  background: transparent;
  border: 0;
  font-size: 16px;
  line-height: 24px;

  ${AutocompleteText} {
    overflow: hidden;
  }
`;

const MobileResultIcon = styled.span`
  display: grid;
  flex: 0 0 24px;
  place-items: center;
  width: 24px;
  height: 24px;
  color: ${({ theme }) => theme.palette.mobile.grey.g40};

  svg {
    width: 20px;
    height: 20px;
  }
`;

const MobileFilterSections = styled.div`
  flex: 1 1 auto;
  min-height: 0;
  overflow-y: auto;
`;

const MobileFilterSummary = styled.button<{ isPlaceholder?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  min-height: 58px;
  padding: 0 20px;
  color: ${({ theme }) => theme.palette.mobile.grey.g05};
  text-align: left;
  background: transparent;
  border: 0;
  border-bottom: 1px solid ${({ theme }) => theme.palette.mobile.grey.g80};
  ${({ theme }) => theme.typo.b3};

  strong {
    max-width: 65%;
    overflow: hidden;
    color: ${({ theme, isPlaceholder }) =>
      isPlaceholder ? theme.palette.grey.g50 : theme.palette.grey.g00};
    ${({ theme }) => theme.typo.b3};
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const MobileExpandedFilter = styled.section`
  padding: 18px 20px 10px;
  border-bottom: 1px solid ${({ theme }) => theme.palette.mobile.grey.g80};

  ${RangeInputRow} {
    margin-top: 16px;
    margin-bottom: 8px;
  }
`;

const MobileExpandedTitle = styled.h2`
  color: ${({ theme }) => theme.palette.mobile.grey.g05};
  ${({ theme }) => theme.typo.sh2};
`;

const MobileFilterFooter = styled.div`
  display: grid;
  flex: 0 0 80px;
  grid-template-columns: 100px minmax(0, 1fr);
  gap: 9px;
  padding: 16px 20px;
  background: ${({ theme }) => theme.palette.mobile.grey.g85};
  border-top: 1px solid ${({ theme }) => theme.palette.grey.g90};
`;

const MobileClearButton = styled.button`
  height: 48px;
  color: ${({ theme }) => theme.palette.mobile.grey.g05};
  background: ${({ theme }) => theme.palette.mobile.grey.g90};
  border: 0;
  border-radius: 4px;
  ${({ theme }) => theme.typo.sh1};
  text-align: center;
`;

const MobileApplyButton = styled.button`
  height: 48px;
  color: ${({ theme }) => theme.palette.mobile.grey.w};
  background: ${({ theme }) => theme.palette.mobile.primary.o1};
  border: 0;
  border-radius: 4px;
  ${({ theme }) => theme.typo.sh1};
  text-align: center;
`;

const ModalBackdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: 30;
  display: grid;
  place-items: center;
  padding: 28px;
  background: ${({ theme }) => theme.palette.grey.g90}80;
`;

const Modal = styled.form`
  width: min(450px, 100%);
  padding: 32px;
  color: ${({ theme }) => theme.palette.grey.g10};
  background: ${({ theme }) => theme.palette.mobile.grey.g85};
  border-radius: 12px;
  box-shadow: 0px 10px 40px 0px #0000004d;
`;

const ConfirmModal = styled.div`
  width: min(480px, 100%);
  padding: 32px;
  background: ${({ theme }) => theme.palette.mobile.grey.g85};
  border: 1px solid ${({ theme }) => theme.palette.grey.g90};
  border-radius: 8px;
`;

const ModalTitle = styled.h2`
  margin-bottom: 24px;
  color: ${({ theme }) => theme.palette.grey.g10};
  ${({ theme }) => theme.typo.b3};
`;

const ModalLabel = styled.label`
  display: grid;
  gap: 8px;
  color: ${({ theme }) => theme.palette.grey.g30};
  font-size: 14px;
`;

const ModalInput = styled.input<{ hasError?: boolean }>`
  height: 48px;
  padding: 0 12px;
  color: ${({ theme }) => theme.palette.grey.g10};
  background: ${({ theme }) => theme.palette.grey.b};
  border: 1px solid
    ${({ hasError, theme }) => (hasError ? theme.palette.status.error1 : theme.palette.grey.g30)};
  border-radius: 4px;
  outline: 0;
`;

const ErrorText = styled.p`
  margin-top: 6px;
  color: ${({ theme }) => theme.palette.status.error1};
  font-size: 12px;
`;

const ModalButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 24px;
`;

export default {
  ActionButton,
  AmenityGrid,
  AutocompleteAddress,
  AutocompleteMatch,
  AutocompleteState,
  AutocompleteText,
  ButtonRow,
  CardGrid,
  CardImage,
  CardInfo,
  CardInfoHeader,
  CardTitle,
  CardDivider,
  Chip,
  ChipRow,
  ConfirmModal,
  Content,
  Count,
  CountValue,
  CountInfoPopupButton,
  CountInfoPopup,
  CountInfoPopupCloseButton,
  DetailAction,
  DetailActions,
  DetailBackdrop,
  DetailCloseButton,
  DetailHeader,
  DetailHeaderTitle,
  DetailHero,
  DetailImage,
  DetailPane,
  DetailSection,
  DetailSectionTitle,
  DetailShareButton,
  DetailState,
  DetailNavigation,
  DetailTab,
  DetailTabs,
  DetailText,
  DetailTitle,
  DetailMetaList,
  DetailMetaLabel,
  DetailMetaValue,
  Empty,
  EmptyDescription,
  EmptyIcon,
  EmptyTitle,
  ErrorText,
  FieldButton,
  FieldLabel,
  FieldValue,
  FilterField,
  FilterOptionList,
  FilterOption,
  FilterPopover,
  Header,
  HeaderMenuContainer,
  HeaderMenuLabel,
  HeaderMenuPopup,
  HeaderMenuPrimaryButton,
  IconButton,
  ImageGrid,
  KeywordPopover,
  KeywordInput,
  LoadMoreTrigger,
  Logo,
  MapBox,
  MapOpenButton,
  MetaLabel,
  MetaList,
  MetaValue,
  MenuButton,
  Modal,
  ModalBackdrop,
  ModalButtons,
  ModalInput,
  ModalLabel,
  ModalTitle,
  MobileApplyButton,
  MobileClearButton,
  MobileExpandedFilter,
  MobileExpandedTitle,
  MobileFilterFooter,
  MobileFilterOverlay,
  MobileFilterSections,
  MobileFilterSheet,
  MobileFilterSummary,
  MobileLocationInput,
  MobileLocationSearch,
  MobileResultButton,
  MobileResultHeading,
  MobileResultIcon,
  MobileResultList,
  MobileSheetBody,
  MobileSheetCloseButton,
  MobileSheetHandle,
  MobileSheetHeader,
  MobileSheetTitle,
  MobileSortButton,
  MoreImageButton,
  MoreImageCount,
  Page,
  PopoverFooter,
  PopoverHeader,
  Price,
  PriceLabel,
  PriceHours,
  PriceRow,
  RangeDash,
  RangeInput,
  RangeInputLabel,
  RangeInputRow,
  RangePopover,
  RecentItem,
  RecentKeywordButton,
  RecentList,
  ResultsPane,
  SearchButton,
  SearchForm,
  SearchInputField,
  SearchInputLabel,
  SortButton,
  SortGroup,
  SubwayChip,
  SubwayList,
  SubwayItem,
  TextButton,
  TextToggleButton,
  Toolbar,
  ConcertHallCard,
  MapPin,
};
