import React from "react";
import OrderDetails from "./OrderDetails";
export default function Displayorder(props) {

  return (
    <div className="shoping__cart__table col-lg-9" style={{ margin: "0 auto" }}>
      <table>
        <thead>
          <tr>
            <th>OrderId</th>
            <th>Order Total</th>
            <th>Address</th>
            <th>Order Status</th>
            <th>Payment Method</th>
            <th>Phone Number</th>
            {window.location.pathname.includes("shipped") && (
              <>
                <th>Courier Name</th>
                <th>Tracking Id </th>
              </>
            )}
            <th>View Details</th>
          </tr>
        </thead>
        <tbody>
          {props.orders.map((item, index) => (
            <tr>
              <td key="{item._id}">
                <h5>{item.orderid}</h5>
              </td>
              <td className="shoping__cart__price">₹{item.total}</td>
              <td className="shoping__cart__quantity">
                <div className="quantity">
                  <div>
                    <span name="stock" type="text">
                      {item.customer.address}
                      {item.customer.city}, ,{item.customer.pincode}
                    </span>
                  </div>
                </div>
              </td>
              <td className="shoping__cart__total">{item.orderstatus}</td>
              <td>
                {item.paymentmethod === "Razorpay" && (
                  <h5>
                    {item.paymentmethod}({item.razorpay.paymentstatus})
                  </h5>
                )}
                {item.paymentmethod !== "Razorpay" && (
                  <h5>{item.paymentmethod}</h5>
                )}
              </td>
              <td>
                <h5>{item.customer.phonenumber}</h5>
              </td>
              {item.orderstatus === "Shipped" && (
                <>
                  <td>
                    <h5>{item.couriername}</h5>
                  </td>
                  <td>
                    <h5>{item.trackingid}</h5>
                  </td>
                </>
              )}
              <td className="shoping__cart__item__close">
                <OrderDetails order={item} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
