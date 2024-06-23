import { useConfirm } from '@boolti/ui';
import Styled from './GiftGuide.styles';

interface Props {
  isRegistered: boolean;
  isCancelled: boolean;
}

const GiftGuide = ({ isRegistered, isCancelled }: Props) => {
  const confirm = useConfirm();
  const isRegistrable = !isRegistered && !isCancelled;
  const descriptionList = [
    '선물 등록 후에는 거절 또는 결제 취소 및 환불이 불가합니다.',
    '기한 내 미등록 시 선물 거절 처리되며 결제가 자동 취소됩니다.',
    '선물 거절 시 보낸 분께 알림이 발송되며 결제가 자동 취소됩니다.',
  ];

  return (
    <Styled.Container>
      <Styled.DescriptoinList>
        {isRegistrable && (
          <>
            {descriptionList.map((item, index) => (
              <Styled.DescriptionListItem key={index}>{item}</Styled.DescriptionListItem>
            ))}
            <Styled.RejectButton
              onClick={async () => {
                const result = await confirm(
                  '선물 거절 시 보낸 분께 알림이 발송되며 결제가 자동 취소됩니다.거절하시겠습니까?',
                  {
                    cancel: '취소하기',
                    confirm: '거절하기',
                  },
                );
                if (result) {
                  // 거절하기 mutate
                }
              }}
            >
              선물 거절하기
            </Styled.RejectButton>
          </>
        )}
        {isRegistered && (
          <Styled.DescriptionListItem>
            선물 등록 후에는 거절 또는 결제 취소 및 환불이 불가합니다.
          </Styled.DescriptionListItem>
        )}
        {isCancelled && (
          <Styled.DescriptionListItem>
            취소되어 등록할 수 없는 선물입니다.
          </Styled.DescriptionListItem>
        )}
      </Styled.DescriptoinList>

      {isRegistrable && (
        <Styled.RegisterGuideContainer>
          <Styled.RegisterGuideTitle>선물 등록 방법</Styled.RegisterGuideTitle>
          <Styled.RegisterGuideDescription>[불티앱이 있다면]</Styled.RegisterGuideDescription>
          <Styled.RegisterGuideDescription>
            선물 등록하기 버튼 클릭 {'>'} 선물 등록 안내 확인
          </Styled.RegisterGuideDescription>
          <Styled.RegisterGuideDescription style={{ marginTop: '20px' }}>
            [불티앱이 없다면]
          </Styled.RegisterGuideDescription>
          <Styled.RegisterGuideDescription>
            스토어에서 앱 다운로드 {'>'} 회원가입 및 로그인 {'>'} 해당 페이지 재접속 {'>'} 선물
            등록하기 버튼 클릭{'>'} 선물 등록 안내 확인
          </Styled.RegisterGuideDescription>
        </Styled.RegisterGuideContainer>
      )}
    </Styled.Container>
  );
};

export default GiftGuide;
