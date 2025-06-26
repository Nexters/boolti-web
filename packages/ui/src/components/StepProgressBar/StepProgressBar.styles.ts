import styled from '@emotion/styled';

const StepProgressBar = styled.div<{ width?: string }>`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: ${({ width }) => width || '100%'};
`;

const StepProgressBarLine = styled.div<{ step: number; maxStep: number }>`
  position: relative;
  width: 100%;
  height: 4px;
  flex: 1;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.palette.grey.g10};
  overflow: hidden;

  &::after {
    content: '';
    position: relative;
    display: block;
    top: 0;
    left: 0;
    width: calc(${({ step, maxStep }) => (step / maxStep) * 100}%);
    height: 4px;
    background-color: ${({ theme }) => theme.palette.grey.g90};
    transition: width 0.2s ease-in-out;
  }
`;

const StepProgressBarItemList = styled.div<{ isJustifyCenter: boolean }>`
  display: flex;
  align-items: center;
  ${(props) =>
    props.isJustifyCenter
      ? `
        justify-content: center;
        gap: 12px;
      `
      : 'justify-content: space-between;'};
`;

const StepProgressBarItem = styled.div<{ active: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-wrap: nowrap;
  gap: 4px;
  ${({ theme }) => theme.typo.c1};
  color: ${({ theme }) => theme.palette.grey.g30};

  ${({ theme, active }) =>
    active &&
    `
    color: ${theme.palette.grey.g90};
    font-weight: 600;
  `}
`;

export default {
  StepProgressBar,
  StepProgressBarLine,
  StepProgressBarItemList,
  StepProgressBarItem,
};
