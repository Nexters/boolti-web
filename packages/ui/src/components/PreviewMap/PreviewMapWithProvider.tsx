import { NavermapsProvider } from 'react-naver-maps';

import PreviewMap from './index';

interface Props {
  latitude: number;
  longitude: number;
  name: string;
  isAppWebview: boolean;
  ncpKeyId: string;
}

const PreviewMapWithProvider = ({ ncpKeyId, ...previewMapProps }: Props) => {
  return (
    <NavermapsProvider ncpKeyId={ncpKeyId}>
      <PreviewMap {...previewMapProps} />
    </NavermapsProvider>
  );
};

export default PreviewMapWithProvider;
