import { SalesChart, TicketSalesChart } from "../../organisms";

const AdminDashboard = () => {
  return (
    <section className="bg-gray-200">
      <div className="mx-auto flex min-h-screen max-w-screen-2xl flex-col items-center gap-10 p-5 lg:p-10 xl:flex-row">
        <SalesChart />
        <TicketSalesChart />
      </div>
    </section>
  );
};

export default AdminDashboard;
