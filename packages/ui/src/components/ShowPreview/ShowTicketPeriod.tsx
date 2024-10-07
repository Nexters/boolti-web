import Styled from './ShowPreview.styles';

interface Props {
  salesStartTime: string;
  salesEndTime: string;
}

const ShowTicketPeriod = ({ salesEndTime, salesStartTime }: Props) => {
  return (
    <Styled.ShowPreviewTicketPeriod>
      <Styled.ShowPreviewTicketPeriodInfo>
        <Styled.ShowPreviewTicketPeriodTitle>티켓 예매 기간</Styled.ShowPreviewTicketPeriodTitle>
        <Styled.ShowPreviewTicketPeriodText>
          {salesStartTime} - {salesEndTime}
        </Styled.ShowPreviewTicketPeriodText>
      </Styled.ShowPreviewTicketPeriodInfo>
    </Styled.ShowPreviewTicketPeriod>
  );
};

export default ShowTicketPeriod;
