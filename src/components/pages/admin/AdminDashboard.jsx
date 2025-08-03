import { SalesChart, TicketSalesChart } from "../../organisms";

const AdminDashboard = () => {
  return (
    <div className="bg-gray-200">
      <div className="mx-auto flex max-w-screen-2xl flex-col gap-10 p-5 lg:p-10">
        <SalesChart />
        <TicketSalesChart />
      </div>
    </div>
  );
};

export default AdminDashboard;
