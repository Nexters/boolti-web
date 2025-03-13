import DialogBase from './DialogBase';
import DialogContent from './DialogContent';
import { DialogProps } from './types';

const Dialog = (props: DialogProps) => {
  if (!props.open) return null;

  return (
    <DialogBase mobileType={props.mobileType} onClose={props.onClose}>
      <DialogContent {...props} />
    </DialogBase>
  );
};

export default Dialog;
