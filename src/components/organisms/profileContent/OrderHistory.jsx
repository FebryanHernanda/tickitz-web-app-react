import { useSelector } from "react-redux";
import { TicketHistory } from "../../molecules";

const OrderHistory = () => {
  const { orderHistory } = useSelector((state) => state.orders);

  console.log(orderHistory);

  return (
    <>
      <div className="flex w-full flex-col gap-[40px]">
        {!orderHistory?.length ? (
          <p className="text-center">You dont have order history</p>
        ) : (
          <TicketHistory orderData={orderHistory} />
        )}
      </div>
    </>
  );
};

export default OrderHistory;
