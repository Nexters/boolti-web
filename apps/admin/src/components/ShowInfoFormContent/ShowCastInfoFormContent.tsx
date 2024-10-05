import { Button, useDialog } from '@boolti/ui';

import Styled from './ShowInfoFormContent.styles';
import { PlusIcon } from '@boolti/icon';
import ShowCastInfoFormDialogContent from '../ShowCastInfoFormDialogContent';

const ShowCastInfoFormContent = () => {
  const dialog = useDialog();

  return (
    <Styled.ShowInfoFormGroup>
      <Styled.ShowInfoFormGroupHeader>
        <Styled.ShowInfoFormGroupInfo>
          <Styled.ShowInfoFormTitle>출연진 정보</Styled.ShowInfoFormTitle>
          <Styled.ShowInfoFormSubtitle>
            출연진 정보를 팀 단위로 등록해 주세요.
            <br />
            정보는 공연 등록 이후에도 <strong>수정 및 추가</strong>할 수 있어요.
          </Styled.ShowInfoFormSubtitle>
        </Styled.ShowInfoFormGroupInfo>
        <Button
          type="button"
          colorTheme="netural"
          size="bold"
          icon={<PlusIcon />}
          onClick={() => {
            dialog.open({
              isAuto: true,
              title: '출연진 정보 등록',
              content: <ShowCastInfoFormDialogContent />,
            });
          }}
        >
          등록하기
        </Button>
      </Styled.ShowInfoFormGroupHeader>
    </Styled.ShowInfoFormGroup>
  );
};

export default ShowCastInfoFormContent;