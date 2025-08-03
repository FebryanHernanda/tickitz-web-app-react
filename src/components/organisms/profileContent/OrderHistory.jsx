import { TicketHistory } from "../../molecules";

const OrderHistory = () => {
  /* Get data from localstorage */
  const data = localStorage.getItem("userData");
  const userData = JSON.parse(data);

  return (
    <>
      <div className="flex w-full flex-col gap-[40px]">
        {!userData.order ? (
          <p className="text-center">You dont have order history</p>
        ) : (
          <TicketHistory userData={userData} />
        )}
      </div>
    </>
  );
};

export default OrderHistory;
