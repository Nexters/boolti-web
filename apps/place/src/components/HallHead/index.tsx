import type { ConcertHallProfileResponse } from '@boolti/api';
import { ShareIcon } from '@boolti/icon';
import { SubwayLineBadge, useToast } from '@boolti/ui';

import defaultHallImage from '~/assets/images/default-hall.png';
import { CallIcon, MailIcon, WebsiteIcon } from '~/components/icons';
import { formatAddress, formatCapacity, normalizeWebsiteUrl } from '~/utils/format';

import Styled from './HallHead.styles';

interface Props {
  profile: ConcertHallProfileResponse;
  onShare: () => void;
}

const HallHead = ({ profile, onShare }: Props) => {
  const toast = useToast();
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

  // 문의처는 1개라도 있으면 버튼 3개를 모두 노출하고,
  // 데이터가 없는 항목은 비활성 스타일 + 클릭 시 준비 중 토스트를 띄운다
  const contactButtons = [
    {
      key: 'website',
      label: '웹사이트',
      icon: <WebsiteIcon />,
      value: contact?.websiteUrl,
      emptyMessage: '웹사이트를 준비 중이에요.',
      action: (websiteUrl: string) => {
        window.open(normalizeWebsiteUrl(websiteUrl), '_blank', 'noopener,noreferrer');
      },
    },
    {
      key: 'phone',
      label: '전화',
      icon: <CallIcon />,
      value: contact?.phoneNumber,
      emptyMessage: '전화 정보를 준비 중이에요.',
      action: (phoneNumber: string) => {
        window.location.href = `tel:${phoneNumber}`;
      },
    },
    {
      key: 'email',
      label: '메일',
      icon: <MailIcon />,
      value: contact?.email,
      emptyMessage: '메일 정보를 준비 중이에요.',
      action: (email: string) => {
        window.location.href = `mailto:${email}`;
      },
    },
  ];

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
                      <SubwayLineBadge
                        key={line.id}
                        lineName={line.lineName}
                        colorHex={line.colorHex}
                      />
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
          {contactButtons.map(({ key, label, icon, value, emptyMessage, action }) => (
            <Styled.ContactButton
              key={key}
              type="button"
              isActive={Boolean(value)}
              onClick={() => {
                if (value) {
                  action(value);
                } else {
                  toast.info(emptyMessage);
                }
              }}
            >
              {icon}
              <Styled.ContactButtonLabel>{label}</Styled.ContactButtonLabel>
            </Styled.ContactButton>
          ))}
        </Styled.ContactButtonArea>
      )}
    </Styled.Container>
  );
};

export default HallHead;
