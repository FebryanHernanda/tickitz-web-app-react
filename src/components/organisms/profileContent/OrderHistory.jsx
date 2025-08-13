import { useSelector } from "react-redux";
import { TicketHistory } from "../../molecules";

const OrderHistory = () => {
  const { userData } = useSelector((state) => state.user);
  const { user } = useSelector((state) => state.auth);

  const currentUser = userData.find((data) => data.id === user.id);
  const historyOrder = currentUser.order;

  return (
    <>
      <div className="flex w-full flex-col gap-[40px]">
        {!currentUser.order.length ? (
          <p className="text-center">You dont have order history</p>
        ) : (
          <TicketHistory userData={historyOrder} />
        )}
      </div>
    </>
  );
};

export default OrderHistory;
