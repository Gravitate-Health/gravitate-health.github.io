import React from 'react';
import lensesData from '@site/lenses.oficial.json';

export default function LensTable() {
  return (
    <table>
      <thead>
        <tr>
          <th>Lens Name</th>
          <th>Description</th>
          <th>Status</th>
          <th>Repository</th>
        </tr>
      </thead>
      <tbody>
        {lensesData.map((lens, index) => (
          <tr key={index}>
            <td>{lens.title || lens.name}</td>
            <td>{lens.description}</td>
            <td>
              {lens.status && (
                <span style={{
                  padding: '2px 8px',
                  borderRadius: '4px',
                  fontSize: '0.85em',
                  fontWeight: '500',
                  backgroundColor: lens.status === 'active' ? '#d4edda' : 
                                  lens.status === 'draft' ? '#fff3cd' : 
                                  '#d1ecf1',
                  color: lens.status === 'active' ? '#155724' : 
                        lens.status === 'draft' ? '#856404' : 
                        '#0c5460'
                }}>
                  {lens.status}
                </span>
              )}
            </td>
            <td>
              {lens.repoUrl ? (
                <a href={lens.repoUrl} target="_blank" rel="noopener noreferrer">
                  {lens.repoUrl.split('/').pop().replace('.git', '')}
                </a>
              ) : (
                'N/A'
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
