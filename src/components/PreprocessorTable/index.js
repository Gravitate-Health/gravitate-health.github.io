import React from 'react';
import preprocessorsData from '@site/preprocessors.oficial.json';

function PreprocessorTableSection({ title, data, isExample = false }) {
  if (!data || data.length === 0) {
    return null;
  }

  return (
    <>
      <h2>{title}</h2>
      {isExample && (
        <div style={{ 
          padding: '12px 16px', 
          marginBottom: '16px',
          backgroundColor: '#fff3cd',
          border: '1px solid #ffc107',
          borderRadius: '4px',
          color: '#856404'
        }}>
          <strong>ℹ️ Templates:</strong> These repositories are meant to be forked and used as starting points for developing your own preprocessors.
        </div>
      )}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Repository</th>
          </tr>
        </thead>
        <tbody>
          {data.map((preprocessor, index) => {
            // Remove 'preprocessing-service-' prefix for cleaner display
            const displayName = preprocessor.name.replace(/^preprocessing-service-/, '');
            
            return (
              <tr key={index}>
                <td>
                  <code>{displayName}</code>
                </td>
                <td>{preprocessor.description}</td>
                <td>
                  {preprocessor.repoUrl ? (
                    <a href={preprocessor.repoUrl.replace('.git', '')} target="_blank" rel="noopener noreferrer">
                      View on GitHub
                    </a>
                  ) : (
                    'N/A'
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default function PreprocessorTable() {
  return (
    <div>
      <PreprocessorTableSection 
        title="Operational Preprocessors" 
        data={preprocessorsData.preprocessors} 
      />
      
      <PreprocessorTableSection 
        title="Example Templates" 
        data={preprocessorsData.examples}
        isExample={true}
      />
    </div>
  );
}
