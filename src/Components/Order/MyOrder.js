import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import OrderDetails from "./OrderDetails";

const MyOrder = () => {
  const [user] = useAuthState(auth);
  const [orders, setOrders] = useState([]);
  

  useEffect(() => {
    if (user && user.email) {
      fetch(`http://localhost:7000/order/user/${user.email}`)
        .then((res) => res.json())
        .then((data) => setOrders(data));
    }
  }, [user]);

  const email = user?.email;
  const rest = orders.filter((order) => order.email === email);
  return (
    <div>
      <h1>My Orders {rest.length}</h1>

      <section class="min-h-screen bg-gray-100 py-12 sm:py-16 lg:py-20">
        <div class="mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex items-center justify-center">
            <h1 class="text-2xl font-semibold text-gray-900">Your Cart</h1>
          </div>
          <div className="">
            {
              orders.map((order)=>(
                <OrderDetails
                key={order._id}
                order={order}
                />
              ))
            }
          </div>
        </div>
      </section>
    </div>
  );
};

export default MyOrder;
