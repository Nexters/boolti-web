import type { ConcertHallProfileResponse } from '@boolti/api';
import { ShareIcon } from '@boolti/icon';

import defaultHallImage from '~/assets/images/default-hall.png';
import { CallIcon, MailIcon, WebsiteIcon } from '~/components/icons';
import { formatAddress, formatCapacity, getSubwayLineShortName, isLightColor } from '~/utils/format';

import Styled from './HallHead.styles';

interface Props {
  profile: ConcertHallProfileResponse;
  onShare: () => void;
}

const HallHead = ({ profile, onShare }: Props) => {
  const { name, representativeImageUrl, head } = profile;

  const capacityText = formatCapacity(head?.capacity);
  const addressText = formatAddress(head?.location);
  const subwayStations = head?.subwayStations ?? [];
  const contact = head?.contact;
  const hasContact = Boolean(contact?.websiteUrl || contact?.phoneNumber || contact?.email);

  const hasSummary =
    Boolean(head?.rentalFeeSummary) ||
    Boolean(capacityText) ||
    Boolean(addressText) ||
    subwayStations.length > 0;

  return (
    <Styled.Container>
      <Styled.ImageArea>
        <Styled.BackgroundImage src={representativeImageUrl || defaultHallImage} alt={name} />
        <Styled.BackgroundDim />
        <Styled.AppBar>
          <Styled.ShareButton type="button" aria-label="공유하기" onClick={onShare}>
            <ShareIcon />
          </Styled.ShareButton>
        </Styled.AppBar>
        <Styled.HallNameArea>
          <Styled.HallName>{name}</Styled.HallName>
        </Styled.HallNameArea>
      </Styled.ImageArea>
      {hasSummary && (
        <Styled.SummaryArea>
          {head?.rentalFeeSummary && (
            <Styled.SummaryRow>
              <Styled.SummaryLabel>대관료</Styled.SummaryLabel>
              <Styled.SummaryValue>{head.rentalFeeSummary}</Styled.SummaryValue>
            </Styled.SummaryRow>
          )}
          {capacityText && (
            <Styled.SummaryRow>
              <Styled.SummaryLabel>수용 인원</Styled.SummaryLabel>
              <Styled.SummaryValue>{capacityText}</Styled.SummaryValue>
            </Styled.SummaryRow>
          )}
          {addressText && (
            <Styled.SummaryRow>
              <Styled.SummaryLabel>위치</Styled.SummaryLabel>
              <Styled.SummaryValue>{addressText}</Styled.SummaryValue>
            </Styled.SummaryRow>
          )}
          {subwayStations.length > 0 && (
            <Styled.SummaryRow>
              <Styled.SummaryLabel>지하철역</Styled.SummaryLabel>
              <Styled.SubwayStationList>
                {subwayStations.map((station) => (
                  <Styled.SubwayStationRow key={station.id}>
                    {station.lines.map((line) => (
                      <Styled.SubwayLineChip
                        key={line.id}
                        backgroundColor={line.colorHex}
                        isLight={isLightColor(line.colorHex)}
                      >
                        {getSubwayLineShortName(line.lineName)}
                      </Styled.SubwayLineChip>
                    ))}
                    <Styled.SubwayStationName>{station.stationName}</Styled.SubwayStationName>
                  </Styled.SubwayStationRow>
                ))}
              </Styled.SubwayStationList>
            </Styled.SummaryRow>
          )}
        </Styled.SummaryArea>
      )}
      {hasContact && (
        <Styled.ContactButtonArea>
          <Styled.ContactButton
            type="button"
            disabled={!contact?.websiteUrl}
            onClick={() => window.open(contact?.websiteUrl, '_blank', 'noopener,noreferrer')}
          >
            <WebsiteIcon />
            <Styled.ContactButtonLabel>웹사이트</Styled.ContactButtonLabel>
          </Styled.ContactButton>
          <Styled.ContactButton
            type="button"
            disabled={!contact?.phoneNumber}
            onClick={() => (window.location.href = `tel:${contact?.phoneNumber}`)}
          >
            <CallIcon />
            <Styled.ContactButtonLabel>전화</Styled.ContactButtonLabel>
          </Styled.ContactButton>
          <Styled.ContactButton
            type="button"
            disabled={!contact?.email}
            onClick={() => (window.location.href = `mailto:${contact?.email}`)}
          >
            <MailIcon />
            <Styled.ContactButtonLabel>메일</Styled.ContactButtonLabel>
          </Styled.ContactButton>
        </Styled.ContactButtonArea>
      )}
    </Styled.Container>
  );
};

export default HallHead;
