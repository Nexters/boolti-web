import { Footer } from '@boolti/ui';
import Styled from './GiftTerms.styles';
import { useState } from 'react';
import { ChevronDown } from '@boolti/icon/src/components/ChevronDown';
import { LINK } from '~/constants/link';
import { ChevronUp } from '@boolti/icon/src/components/ChevronUp';

const GiftTerms = () => {
  const [isOpen, setIsOpen] = useState(false);
  const terms = [
    '서비스 내 발권 취소 및 환불은 주최자가 지정한 티켓 판매 기간 내에만 가능하며, 판매 기간 이후 환불은 주최자에게 직접 문의해 주시기 바랍니다.',
    '초청 티켓의 경우 발권 취소가 불가합니다.',
    '취소 요청 즉시 취소 완료 처리 및 환불이 진행됩니다.',
    '환불은 기존 결제 수단으로 진행되며 계좌이체의 경우 결제하신 계좌로 환불이 진행됩니다.',
    '결제 수단에 따라 환불 완료까지 약 1~5 영업일이 소요될 수 있습니다.',
  ];
  return (
    <Styled.Container>
      <Styled.ExpansionPanel>
        <Styled.ExpansionPanelHeader onClick={() => setIsOpen((isOpen) => !isOpen)}>
          <Styled.ExpansionPanelHeaderTitle>취소/환불 규정</Styled.ExpansionPanelHeaderTitle>
          {isOpen ? <ChevronUp /> : <ChevronDown />}
        </Styled.ExpansionPanelHeader>
        {isOpen && (
          <Styled.ExpansionPanelContents>
            <Styled.List>
              {terms.map((term, index) => (
                <Styled.ListItem key={index}>{term}</Styled.ListItem>
              ))}
              <Styled.ListItem>
                기타 사항은 카카오톡 채널{' '}
                <Styled.BooltiChannelLink to={LINK.BOOLTI_KAKAO_CHANNEL}>
                  @스튜디오불티
                </Styled.BooltiChannelLink>
                로 문의해 주시기 바랍니다.
              </Styled.ListItem>
            </Styled.List>
          </Styled.ExpansionPanelContents>
        )}
      </Styled.ExpansionPanel>
      <Footer />
    </Styled.Container>
  );
};

export default GiftTerms;
