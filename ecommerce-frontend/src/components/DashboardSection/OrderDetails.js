import React from "react";
import { Button, Icon, Modal } from "semantic-ui-react";

const OrderDetails = (props) => {
  const [open, setOpen] = React.useState(false);
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      trigger={<Button>View Order Details</Button>}
    >
      <Modal.Header>Order ID : {props.order.orderid}</Modal.Header>
      <Modal.Content image scrolling>
        {/* <h2>Customer Details &nbsp;</h2> */}
        <Modal.Description>
          <div className="row">
            <div class="col-lg-6">
              <h1>Customer Details</h1>
              <p>
                <strong>First name: &nbsp;</strong>
                {props.order.customer.firstname}{" "}
              </p>
              <p>
                <strong>Last name: &nbsp;</strong>
                {props.order.customer.lastname}
              </p>
              <p>
                <strong>Phone number: &nbsp;</strong>
                {props.order.customer.phonenumber}
              </p>
              <p>
                <strong>Email :&nbsp;</strong>
                {props.order.customer.email}
              </p>
            </div>
            <div class="col-lg-6">
              <p>
                <strong>Address : &nbsp;</strong>
                {props.order.customer.address}
              </p>
              <p>
                <strong>City/Town: &nbsp;</strong>
                {props.order.customer.city}
              </p>
              <p>
                <strong>State: &nbsp;</strong>
                {props.order.customer.state}
              </p>
              <p>
                <strong>Pincode: &nbsp;</strong>
                {props.order.customer.pincode}
              </p>
            </div>
          </div>
          <hr></hr>
          <div className="col-lg-6" style={{ margin: "0 auto" }}>
            <h1> Cart</h1>
            <p> (Order created at {props.order.ordercreation})</p>
            <table>
              <thead>
                <tr>
                  <th>Products</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {props.order.cart.map((item) => (
                  <tr>
                    <td key="{item._id}">
                      <img
                        src={`http://localhost:5000/${item.product.image}`}
                        alt=""
                        width="50"
                        height="50"
                      ></img>
                      <h5>{item.product.title}</h5>
                    </td>
                    <td class="shoping__cart__price">₹{item.product.price}</td>
                    <td class="shoping__cart__quantity">
                      <div class="quantity">
                        <div>
                          {/* <input value={item.count}></input> */}
                          <span style={{ padding: "15px" }}>
                            {item.quantity}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td class="shoping__cart__total">
                      ₹{item.product.price * item.quantity}
                    </td>
                    <td class="shoping__cart__item__close"></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <hr></hr>
          <div className="col-lg-6" style={{ margin: "0 auto" }}>
            <h1>Payment</h1>
            <div>
              <p>
                <strong>Payment method &nbsp;</strong>
                {props.order.paymentmethod}{" "}
              </p>
              {props.order.paymentmethod === "Razorpay" && (
                <p>
                  <strong>Payment Status &nbsp;</strong>
                  {props.order.razorpay.paymentstatus}
                </p>
              )}
              {/* 
              {props.order.paymentmethod === "Razorpay" && (
                <p>
                  <strong>Razorpay Order Id:&nbsp;</strong>
                  {props.order.razorpay.razorpay_orderid}
                </p>
              )} */}
              {props.order.paymentmethod === "Razorpay" &&
                props.order.razorpay.paymentstatus !== "Unpaid" && (
                  <p>
                    <strong>Razorpay Transaction ID &nbsp;</strong>
                    {props.order.razorpay.transactionid}
                  </p>
                )}
              {props.order.paymentmethod === "Razorpay" &&
                props.order.razorpay.paymentstatus !== "Unpaid" && (
                  <p>
                    <strong>Payment Captured at &nbsp;</strong>
                    {props.order.razorpay.paymentcaptured}
                  </p>
                )}
            </div>
          </div>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => setOpen(false)} primary>
          Done <Icon name="chevron right" />
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default OrderDetails;
