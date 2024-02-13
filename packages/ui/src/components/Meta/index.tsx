import { Helmet, HelmetProvider } from 'react-helmet-async';

function Meta({ children }: React.PropsWithChildren) {
  return (
    <HelmetProvider>
      <Helmet>
        <title>손쉬운 예매 빠른 입장은 불티</title>
        <meta charSet="UTF-8" />
        <link rel="shortcut icon" href="/favicon.png" />
        <meta
          name="description"
          content="핫한 공연 예매의 시작, 불티 지금 티켓을 구매하고 공연을 즐겨보세요🤟"
        />
        <meta property="og:title" content="손쉬운 예매 빠른 입장은 불티" />
        <meta property="og:site_name" content="손쉬운 예매 빠른 입장은 불티" />
        <meta
          name="og:description"
          content="핫한 공연 예매의 시작, 불티 지금 티켓을 구매하고 공연을 즐겨보세요🤟"
        />
        <meta property="og:url" content="https://boolti.in/" />
        <meta property="og:image" content="/thumbnail.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="600" />
        <link rel="canonical" href="https://boolti.in/" />
      </Helmet>
      {children}
    </HelmetProvider>
  );
}

export default Meta;
