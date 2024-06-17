import { useParams } from 'react-router-dom';

const SitePolicyPage = () => {
  const { policyId } = useParams<{ policyId: string }>();
  return <div>{policyId}</div>;
};

export default SitePolicyPage;
