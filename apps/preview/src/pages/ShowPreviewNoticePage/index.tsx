import { ShowPreviewResponse } from "@boolti/api";
import { ShowContentMarkdown } from "@boolti/ui";
import { Helmet } from "react-helmet-async";
import { useLoaderData } from "react-router-dom";

const ShowPreviewNoticePage: React.FC = () => {
  const { notice } = useLoaderData() as ShowPreviewResponse;

  return (
    <>
      <Helmet>
        <style>
          {`
          body {
            background-color: transparent;
          }
        `}
        </style>
      </Helmet>
      <ShowContentMarkdown content={notice} colorMode="dark" />
    </>
  );
}

export default ShowPreviewNoticePage;
