import styled from '@emotion/styled';
import { mq_lg } from '@boolti/ui';

interface LabelProps {
  required?: boolean;
}

interface LinkFormButtonWrapperProps {
  isEditMode?: boolean;
}

const LinkForm = styled.form`
  display: flex;
  flex-direction: column;
  padding: 20px 0 16px;

  ${mq_lg} {
    padding: 0;
  }
`;

const LinkFormControl = styled.div`
  margin-bottom: 28px;

  & > div {
    width: 100%;
  }
`;

const LinkFormButtonWrapper = styled.div<LinkFormButtonWrapperProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row-reverse;
  margin-top: 4px;

  button {
    width: ${({ isEditMode }) => (isEditMode ? 'auto' : '100%')};
  }

  ${mq_lg} {
    button {
      width: auto;
    }
  }
`;

const Label = styled.label<LabelProps>`
  ${({ theme }) => theme.typo.b3};
  color: ${({ theme }) => theme.palette.grey.g90};
  margin-bottom: 8px;
  display: flex;
  position: relative;

  &::after {
    content: ${({ required }) => (required ? "'*'" : 'none')};
    color: ${({ theme }) => theme.palette.status.error1};
    ${({ theme }) => theme.typo.b1};
    line-height: 22px;
    margin-left: 2px;
  }
`;

const LinkDeleteButton = styled.button`
  ${({ theme }) => theme.typo.sh1};
  line-height: 22px;
  text-decoration: underline;
  cursor: pointer;
`;

export default {
  LinkForm,
  LinkFormControl,
  LinkFormButtonWrapper,
  Label,
  LinkDeleteButton,
};
