interface DialogPropsBase {
  open: boolean;
  isAuto?: boolean;
  width?: string;
  title?: string;
  contentPadding?: string;
  mobileType?: 'bottomSheet' | 'fullPage' | 'centerPopup';
  onClose?: () => void;
}

export interface DialogProps extends DialogPropsBase {
  children: React.ReactNode;
}

export interface StepDialogProps {
  initialHistory: string[];
  content: Record<string, {
    children: (props: {
      push: (nextStep: string) => void;
      back: () => void;
    }) => React.ReactNode
    title?: string;
  }>;
  open: boolean;
  isAuto?: boolean;
  width?: string;
  contentPadding?: string;
  mobileType?: 'bottomSheet' | 'fullPage' | 'centerPopup';
  onClose?: () => void;
}

export interface DialogContentProps extends DialogPropsBase {
  children: React.ReactNode;
  onClickBackButton?: () => void;
}
