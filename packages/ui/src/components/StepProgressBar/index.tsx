import Styled from './StepProgressBar.styles';

interface StepProgressBarItem {
  key: string;
  title: string;
}

interface StepProgressBarProps {
  activeKey: string;
  items: StepProgressBarItem[];
  width?: string;
}

const StepProgressBar: React.FC<StepProgressBarProps> = ({ activeKey, items, width }) => {
  const step = items.findIndex((item) => item.key === activeKey) + 1;

  return (
    <Styled.StepProgressBar width={width}>
      <Styled.StepProgressBarLine step={step} maxStep={items.length} />
      <Styled.StepProgressBarItemList>
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
