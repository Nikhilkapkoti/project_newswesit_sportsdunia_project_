import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { Bar } from 'react-chartjs-2'; // Import Bar chart from react-chartjs-2
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import Papa from 'papaparse'; // For CSV export
import { jsPDF } from 'jspdf'; // For PDF export
import * as XLSX from 'xlsx';
import './Dashboard.css';  // Add this line at the top of your Dashboard component
 // For Google Sheets export

// Registering the necessary chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [payoutPerArticle, setPayoutPerArticle] = useState(0);
  const [numArticles, setNumArticles] = useState(0);
  const [totalPayout, setTotalPayout] = useState(0);

  useEffect(() => {
    // Load payout data from local storage on component mount
    const storedPayout = localStorage.getItem('payoutData');
    if (storedPayout) {
      const { payoutPerArticle, numArticles } = JSON.parse(storedPayout);
      setPayoutPerArticle(payoutPerArticle);
      setNumArticles(numArticles);
      setTotalPayout(payoutPerArticle * numArticles);
    }
  }, []);

  useEffect(() => {
    // Automatically recalculate total payout whenever payout or article count changes
    setTotalPayout(payoutPerArticle * numArticles);
    // Save payout data to local storage
    localStorage.setItem('payoutData', JSON.stringify({ payoutPerArticle, numArticles }));
  }, [payoutPerArticle, numArticles]);

  // Handle Input Changes
  const handlePayoutChange = (e) => setPayoutPerArticle(e.target.value);
  const handleArticleCountChange = (e) => setNumArticles(e.target.value);

  // Export to CSV
  const exportToCSV = () => {
    const payoutData = { payoutPerArticle, numArticles, totalPayout };
    const csv = Papa.unparse([payoutData]);
    const blob = new Blob([csv], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'payout-report.csv';
    link.click();
  };

  // Export to PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text(`Payout per Article: $${payoutPerArticle}`, 10, 10);
    doc.text(`Number of Articles: ${numArticles}`, 10, 20); // This should work if defined
    doc.text(`Total Payout: $${totalPayout}`, 10, 30);
    doc.save('payout-report.pdf');
};

  // Export to Google Sheets
  const exportToGoogleSheets = () => {
    const data = [
      { 'Payout per Article': payoutPerArticle, 'Number of Articles': numArticles, 'Total Payout': totalPayout },
    ];

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Payout Report');
    XLSX.writeFile(wb, 'payout-report.xlsx');
  };

  // Chart Data
  const chartData = {
    labels: ['Payout'],
    datasets: [
      {
        label: 'Total Payout',
        data: [totalPayout],
        backgroundColor: '#00E77F', // Color for the bars
        borderColor: '#00E77F', // Border color
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Total Payout Graph',
        font: {
          size: 20,
          weight: 'bold',
        },
        color: '#aaa',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: '#00E77F', // Y-axis color
        },
      },
      x: {
        ticks: {
          color: '#00E77F', // X-axis color
        },
      },
    },
  };

  return (
    <div className="dashboard">
      {/* Payout Calculator Section */}
      <div className="payoutCalculator">
        <h2>Payout Calculator</h2>
        <div>
          <label>Payout per Article/Blog:</label>
          <input
            type="number"
            value={payoutPerArticle}
            onChange={handlePayoutChange}
            placeholder="Enter payout value"
          />
        </div>
        <div>
          <label>Number of Articles/Blogs:</label>
          <input
            type="number"
            value={numArticles}
            onChange={handleArticleCountChange}
            placeholder="Enter number of articles"
          />
        </div>
        <div>
          <h3>Total Payout: ${totalPayout}</h3>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="chartContainer">
        <Bar data={chartData} options={chartOptions} />
      </div>

      {/* Export functionality buttons */}
      <div className="exportOptions">
        <button onClick={exportToCSV}>Export as CSV</button>
        <button onClick={exportToPDF}>Export as PDF</button>
        <button onClick={exportToGoogleSheets}>Export to Google Sheets</button>
      </div>
    </div>
  );
};

export default Dashboard;