import { useDialog } from '@boolti/ui';

import Styled from './ShowInfoFormContent.styles';
import { PlusIcon } from '@boolti/icon';
import ShowCastInfoFormDialogContent, {
  TempShowCastInfoFormInput,
} from '../ShowCastInfoFormDialogContent';

interface Props {
  onSave: (value: TempShowCastInfoFormInput) => Promise<void>;
}

const ShowCastInfoFormContent = ({ onSave }: Props) => {
  const dialog = useDialog();

  const onClick = () => {
    dialog.open({
      isAuto: true,
      title: '출연진 정보 등록',
      content: (
        <ShowCastInfoFormDialogContent
          onSave={async (value) => {
            try {
              await onSave(value);
              dialog.close();
            } catch {
              return new Promise((_, reject) => reject('저장 중 오류가 발생하였습니다.'));
            }
          }}
        />
      ),
    });
  };

  return (
    <Styled.ShowInfoFormGroup>
      <Styled.ShowInfoFormGroupHeader>
        <Styled.ShowInfoFormGroupInfo style={{ marginBottom: 0 }}>
          <Styled.ShowInfoFormLabel style={{ justifyContent: 'space-between' }}>
            출연진 정보
            <Styled.MobileCastInfoRegisterButton type="button" onClick={onClick}>
              <PlusIcon />
              등록하기
            </Styled.MobileCastInfoRegisterButton>
          </Styled.ShowInfoFormLabel>
          <Styled.ShowInfoFormDescription>
            출연진 정보를 팀 단위로 등록해 주세요.
          </Styled.ShowInfoFormDescription>
        </Styled.ShowInfoFormGroupInfo>
        <Styled.DesktopCastInfoRegisterButton
          type="button"
          colorTheme="netural"
          size="small"
          icon={<PlusIcon />}
          onClick={onClick}
        >
          등록하기
        </Styled.DesktopCastInfoRegisterButton>
      </Styled.ShowInfoFormGroupHeader>
    </Styled.ShowInfoFormGroup>
  );
};

export default ShowCastInfoFormContent;
