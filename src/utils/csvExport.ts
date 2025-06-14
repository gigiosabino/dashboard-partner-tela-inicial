
export const exportToCSV = (data: any[], filename: string, headers: string[]) => {
  const csvContent = [
    headers.join(','),
    ...data.map(row => headers.map(header => row[header] || '').join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

// Mock data generator for demonstration
export const generateMockData = (status: string, period: string) => {
  const mockData = [];
  const count = Math.floor(Math.random() * 100) + 20;
  
  for (let i = 0; i < count; i++) {
    mockData.push({
      id: `PROP-${i + 1}`,
      cliente: `Cliente ${i + 1}`,
      valor: (Math.random() * 50000 + 10000).toFixed(2),
      status: status,
      data: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      taxa: (Math.random() * 5 + 2).toFixed(2) + '%'
    });
  }
  
  return mockData;
};
