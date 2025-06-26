import Styled from './StepProgressBar.styles';

interface StepProgressBarItem {
  key: string;
  title: string;
}

interface StepProgressBarProps {
  activeKey: string;
  items: StepProgressBarItem[];
}

const StepProgressBar: React.FC<StepProgressBarProps> = ({ activeKey, items }) => {
  const step = items.findIndex((item) => item.key === activeKey) + 1;
  const isJustifyCenter = items.length < 3;
  const width = `${items.length * 58}px`;

  return (
    <Styled.StepProgressBar width={width}>
      <Styled.StepProgressBarLine step={step} maxStep={items.length} />
      <Styled.StepProgressBarItemList isJustifyCenter={isJustifyCenter}>
        {items.map((item, index) => (
          <Styled.StepProgressBarItem key={item.key} active={step >= index + 1}>
            <span>{item.title}</span>
          </Styled.StepProgressBarItem>
        ))}
      </Styled.StepProgressBarItemList>
    </Styled.StepProgressBar>
  );
};

export default StepProgressBar;
