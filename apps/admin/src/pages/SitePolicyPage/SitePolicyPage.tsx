import { useParams } from 'react-router-dom';

import { tableMap } from './constants/tables';
import Styled from './SitePolicyPage.styles';

const SitePolicyPage = () => {
  const { policyId = '' } = useParams<{ policyId: string }>();

  const table = tableMap[policyId];

  if (!table) {
    return null;
  }

  const { title, items, descriptions, type } = table;
  const headers = items.map(({ head }) => head);
  const tableRows = items.map(({ rows }) => rows);

  return (
    <Styled.Container>
      <Styled.Title>{title}</Styled.Title>
      <Styled.Table>
        {type === 'vertical' ? (
          <>
            <Styled.TableHead>
              <tr>
                {headers.map((header) => (
                  <th>{header}</th>
                ))}
              </tr>
            </Styled.TableHead>
            <Styled.Tablebody>
              {tableRows.map((_, index) => {
                const currentIndexRows = tableRows.map((row) => row[index]).filter(Boolean);
                if (currentIndexRows.length > 0) {
                  return (
                    <tr>
                      {tableRows.map((row) => {
                        if (row[index]) {
                          return <td rowSpan={row[index].rowSpan}>{row[index].children}</td>;
                        }
                        return null;
                      })}
                    </tr>
                  );
                }
                return null;
              })}
            </Styled.Tablebody>
          </>
        ) : (
          <>
            {headers.map((header, index) => (
              <tr key={index}>
                <th>{header}</th>
                {tableRows[index].map((row) => (
                  <td key={row.children}>{row.children}</td>
                ))}
              </tr>
            ))}
          </>
        )}
      </Styled.Table>
      {descriptions.map((description) => (
        <Styled.Description>{description}</Styled.Description>
      ))}
    </Styled.Container>
  );
};

export default SitePolicyPage;
