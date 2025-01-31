import { useState, useCallback } from 'react';
import DialogBase from './DialogBase';
import DialogContent from './DialogContent';
import { StepDialogProps } from './types';

const StepDialog: React.FC<StepDialogProps> = ({ initialHistory, ...props }) => {
  const [history, setHistory] = useState<string[]>(initialHistory);
  const currentHistory = history.length > 0 ? history[history.length - 1] : null;

  const push = useCallback((nextStep: string) => {
    setHistory((prev) => [...prev, nextStep]);
  }, []);

  const back = useCallback(() => {
    setHistory((prev) => {
      if (prev.length <= 1) return prev;
      return prev.slice(0, -1);
    });
  }, []);

  if (!props.open || currentHistory === null) return null;

  const children = props.content[currentHistory].children;
  const title = props.content[currentHistory].title;

  return (
    <DialogBase onClose={props.onClose}>
      <DialogContent {...props} title={title} onClickBackButton={history.length > 1 ? back : undefined}>
        {children({ push, back })}
      </DialogContent>
    </DialogBase>
  );
};

export default StepDialog;
