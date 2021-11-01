import React from "react";

function Orderlist({me}) {
  return (
    <div>
      <h2 className="col-12">Order List</h2>
        {me.previousOrder.length? (
          <h3 className="col-12">Orders</h3>
        ) : (
          <h3 className="col-12">No Order</h3>
        )}
    </div>
  );
}

export default Orderlist;