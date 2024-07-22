export const DynamicTable = ({ data }) => {
    // Check if data is an array and not empty
    if (!Array.isArray(data) || data.length === 0) {
      return <p>No data available</p>;
    }
  
    // Extract the headers from the first object
    const headers = Object.keys(data[0]);
  
    return (
      <table>
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              {headers.map((header) => (
                <td key={header}>{item[header]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };