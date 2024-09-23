import { Helmet } from 'react-helmet-async';

interface Props {
  title: string;
  showId: string;
}

export const Meta = ({ title, showId }: Props) => {
  return (
    <Helmet>
      <link rel="shortcut icon" href="https://preview.boolti.in/favicon.png" />

      <title>{title}</title>
      <link rel="canonical" href="https://preview.boolti.in" />
      <meta name="description" content="지금 불티에서 핫한 공연 정보를 확인해 보세요." />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:site_name" content="손쉬운 예매 빠른 입장은 불티" />
      <meta property="og:description" content="지금 불티에서 핫한 공연 정보를 확인해 보세요." />
      <meta property="og:url" content={`https://preview.boolti.in/show/${showId}`} />
      <meta property="og:image" content="https://preview.boolti.in/thumbnail.png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="600" />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:domain" content="preview.boolti.in" />
      <meta property="twitter:url" content={`https://preview.boolti.in/show/${showId}`} />
      <meta property="twitter:title" content={title} />
      <meta
        property="twitter:description"
        content="지금 불티에서 핫한 공연 정보를 확인해 보세요."
      />
      <meta property="twitter:image" content="/thumbnail.png" />
    </Helmet>
  );
};
