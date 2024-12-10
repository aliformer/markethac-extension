export const DynamicTable = ({ data }) => {
    // Check if data is an array and not empty
    if (!Array.isArray(data) || data.length === 0) {
      return <p>No data available</p>;
    }
  
    // Extract the headers from the first object
    const headers = Object.keys(data[0]);
  
    return (
      <div className="overflow-auto max-h-[400px]">
      <table className="min-w-full bg-white border border-gray-200 shadow rounded-lg">
        <thead  className="bg-gray-100">
          <tr >
            {headers.map((header) => (
              <th key={header} className="text-left px-4 py-2 border-b border-gray-200 text-sm font-medium text-gray-600">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}  className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
              {headers.map((header) => (
                <td key={header} className="px-4 py-2 border-b border-gray-200 text-sm text-gray-800">{item[header]?.length > 30 ? item[header].substring(0, 30) + "..." : item[header]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    );
  };