import { useEffect, useState } from "react";
// import BurgerIcon from "./components/BurgerIcon";
import DataTable from "./components/DataTable";
import { Bar } from "react-chartjs-2"; // Import Bar chart from chartjs
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

async function fetchData(offset = 0, limit = 25) {
  try {
    const res = await fetch(`https://erp.seopage1.net/api/leads`);
    const data = await res.json();
    //   console.log(data.data)
    return data.data.slice(offset, offset + limit);
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

function App() {
  const [name, setName] = useState(true);
  const [link, setLink] = useState(true);
  const [projectType, setProjectType] = useState(true);
  const [projectBudget, setProjectBudget] = useState(true);
  const [bid, setBid] = useState(false);
  const [country, setCountry] = useState(false);
  const [created, setCreated] = useState(false);
  const [createdBy, setCreatedBy] = useState(false);
  const [bidDelay, setBidDelay] = useState(false);
  const [projectStatus, setProjectStatus] = useState(false);
  const [dealStatus, setDealStatus] = useState(false);
  const [burgerIcon, setBurgerIcon] = useState(true);

  function handleNameClick() {
    setName((prev) => !prev);
  }
  function handleLinkClick() {
    setLink((prev) => !prev);
  }
  function handleProjectTypeClick() {
    setProjectType((prev) => !prev);
  }
  function handleProjectBudgetClick() {
    setProjectBudget((prev) => !prev);
  }
  function handleBidClick() {
    setBid((prev) => !prev);
  }
  function handleCountryClick() {
    setCountry((prev) => !prev);
  }
  function handleCreatedClick() {
    setCreated((prev) => !prev);
  }
  function handleCreatedByClick() {
    setCreatedBy((prev) => !prev);
  }
  function handleBidDelayClick() {
    setBidDelay((prev) => !prev);
  }
  function handleProjectStatusClick() {
    setProjectStatus((prev) => !prev);
  }
  function handleDealStatusClick() {
    setDealStatus((prev) => !prev);
  }

  function handleClick() {
    setBurgerIcon((prev) => !prev);
  }

  const [leadsData, setLeadsData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(25);
  const totalRows = 250;

  useEffect(() => {
    const getLeads = async () => {
      const offset = page * rowsPerPage;
      const leads = await fetchData(offset, rowsPerPage);
      setLeadsData(leads);
    };
    getLeads();
  }, [page]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const lists = [
    { name: "Name", handler: handleNameClick, state: name },
    { name: "Link", handler: handleLinkClick, state: link },
    {
      name: "Project Type",
      handler: handleProjectTypeClick,
      state: projectType,
    },
    {
      name: "Project Budget",
      handler: handleProjectBudgetClick,
      state: projectBudget,
    },
    { name: "Bid", handler: handleBidClick, state: bid },
    { name: "Country", handler: handleCountryClick, state: country },
    { name: "Created", handler: handleCreatedClick, state: created },
    { name: "CreatedBy", handler: handleCreatedByClick, state: createdBy },
    { name: "Bid Delay", handler: handleBidDelayClick, state: bidDelay },
    {
      name: "Project Status",
      handler: handleProjectStatusClick,
      state: projectStatus,
    },
    { name: "Deal Status", handler: handleDealStatusClick, state: dealStatus },
  ];
  // Preparing the data for the bar chart
  const dealsData = leadsData.map((lead) => lead.deal_status);

  const counts = {
    converted: dealsData.filter((status) => status === 1).length,
    notConverted: dealsData.filter((status) => status !== 1).length,
  };

  const chartData = {
    labels: ["Converted", "Not Converted"],
    datasets: [
      {
        label: "Number of Deals",
        data: [counts.converted, counts.notConverted],
        backgroundColor: ["#4caf50", "#f44336"],
        borderColor: ["#4caf50", "#f44336"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="px-[5%] w-full pt-6">
      {/* <BurgerIcon
        burgerIcon={burgerIcon}
        onClick={handleClick}
        handleNameClick={handleNameClick}
        handleLinkClick={handleLinkClick}
        handleProjectTypeClick={handleProjectTypeClick}
        handleProjectBudgetClick={handleProjectBudgetClick}
        handleBidClick={handleBidClick}
        handleCountryClick={handleCountryClick}
        handleCreatedClick={handleCreatedClick}
        handleCreatedByClick={handleCreatedByClick}
        handleBidDelayClick={handleBidDelayClick}
        handleProjectStatusClick={handleProjectStatusClick}
        handleDealStatusClick={handleDealStatusClick}
        name={name}
        link={link}
        projectType={projectType}
        projectBudget={projectBudget}
        bid={bid}
        country={country}
        created={created}
        createdBy={createdBy}
        bidDelay={bidDelay}
        projectStatus={projectStatus}
        dealStatus={dealStatus}
      /> */}

      {/* table  */}
      <DataTable
        data={leadsData}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={handleChangePage}
        totalRows={totalRows}
        name={name}
        link={link}
        projectType={projectType}
        projectBudget={projectBudget}
        bid={bid}
        country={country}
        created={created}
        createdBy={createdBy}
        bidDelay={bidDelay}
        projectStatus={projectStatus}
        dealStatus={dealStatus}
        burgerIcon={burgerIcon}
        onClick={handleClick}
        handleNameClick={handleNameClick}
        handleLinkClick={handleLinkClick}
        handleProjectTypeClick={handleProjectTypeClick}
        handleProjectBudgetClick={handleProjectBudgetClick}
        handleBidClick={handleBidClick}
        handleCountryClick={handleCountryClick}
        handleCreatedClick={handleCreatedClick}
        handleCreatedByClick={handleCreatedByClick}
        handleBidDelayClick={handleBidDelayClick}
        handleProjectStatusClick={handleProjectStatusClick}
        handleDealStatusClick={handleDealStatusClick}
        lists={lists}
      />
      <div className="mb-6 h-30">
        <h3 className="mb-4 text-lg font-bold">Deal Status Bar Chart</h3>
        {/* Ensure the Bar component receives a unique key when `page` changes */}
        <Bar
          key={page}
          data={chartData}
          options={{ responsive: true, maintainAspectRatio: false }}
          height={10}
        />
      </div>
    </div>
  );
}

export default App;
