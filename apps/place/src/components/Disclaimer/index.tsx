import Styled from './Disclaimer.styles';

interface Props {
  updatedAtText?: string | null;
}

const Disclaimer = ({ updatedAtText }: Props) => (
  <Styled.Bottom>
    <Styled.BottomText>
      이 페이지의 정보는 불티에서 수집한 것으로, 실제 시설 및 장비와 다를 수 있습니다. 정확한
      정보는 대관 시 공연장에 직접 확인해 주세요.
      {updatedAtText && (
        <>
          <br />
          *정보 업데이트: {updatedAtText}
        </>
      )}
    </Styled.BottomText>
  </Styled.Bottom>
);

export default Disclaimer;
