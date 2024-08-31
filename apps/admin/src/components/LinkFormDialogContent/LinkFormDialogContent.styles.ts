import styled from '@emotion/styled'

interface LabelProps {
  required?: boolean;
}

const LinkForm = styled.form`
  display: flex;
  flex-direction: column;
`

const LinkFormControl = styled.div`
  margin-bottom: 28px;

  & > div {
    width: 100%;
  }
`

const LinkFormButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row-reverse;
  margin-top: 4px;
`

const Label = styled.label<LabelProps>`
  ${({ theme }) => theme.typo.b3};
  color: ${({ theme }) => theme.palette.grey.g90};
  margin-bottom: 8px;
  display: flex;
  position: relative;

  &::after {
    content: ${({ required }) => (required ? "'*'" : "none")};
    color: ${({ theme }) => theme.palette.status.error};
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
`

export default {
  LinkForm,
  LinkFormControl,
  LinkFormButtonWrapper,
  Label,
  LinkDeleteButton
}
