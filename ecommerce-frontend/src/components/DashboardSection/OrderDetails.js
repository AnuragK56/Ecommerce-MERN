import React from "react";
import { Button, Icon, Modal } from "semantic-ui-react";

const OrderDetails = (props) => {
  const [open, setOpen] = React.useState(false);
  let couriernameInput = React.createRef();
  let trackingidInput = React.createRef();
  function changeStatus(id) {
    let logindetails = JSON.parse(localStorage.getItem("login"));
    if (logindetails != null) {
      let token = logindetails.token;
      let url = "http://localhost:5000/updateorder/" + id;
      let at = "Bearer " + token;
      let data;
      if (
        couriernameInput.current.value !== "" &&
        trackingidInput.current.value !== ""
      ) {
        data = {
          couriername: couriernameInput.current.value,
          trackingid: trackingidInput.current.value,
        };
      }
      // console.log(url);
      // console.log(at);
      // console.log(data);
      fetch(url, {
        method: "PATCH",
        headers: {
          Authorization: at,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((t) => t.json())
        // .then((data) => console.log(data));
      window.location.reload(false);
    }
  }
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
            <div className="col-lg-6">
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
            <div className="col-lg-6">
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
                    <td className="shoping__cart__price">₹{item.price}</td>
                    <td className="shoping__cart__quantity">
                      <div className="quantity">
                        <div>
                          {/* <input value={item.count}></input> */}
                          <span style={{ padding: "15px" }}>
                            {item.quantity}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="shoping__cart__total">
                      ₹{item.product.price * item.quantity}
                    </td>
                    <td className="shoping__cart__item__close"></td>
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
          {props.order.orderstatus !== "Shipped" && (
            <>
              <hr></hr>
              <h4>Courier Details</h4>
              <div className="row">
                <div className="col-lg-6">
                  Courier Service name
                  <br></br>
                  <input type="text" ref={couriernameInput} />
                </div>
                <div className="col-lg-6">
                  Tracking Id
                  <br></br>
                  <input type="text" ref={trackingidInput} />
                </div>
              </div>
            </>
          )}
          {props.order.orderstatus === "Shipped" && (
            <>
              <hr></hr>
              <h4>Courier Details</h4>
              <div className="row">
                <div className="col-lg-6">
                  Courier Service name
                  <br></br>
                  <h3>{props.order.couriername}</h3>
                </div>
                <div className="col-lg-6">
                  Tracking Id
                  <br></br>
                  <h3>{props.order.trackingid}</h3>
                </div>
              </div>
            </>
          )}
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        {props.order.orderstatus !== "Shipped" && (
          <Button color="green" onClick={() => changeStatus(props.order._id)}>
            Change order status to Shipped <Icon name="chevron right" />
          </Button>
        )}
        <Button onClick={() => setOpen(false)} primary>
          Done <Icon name="chevron right" />
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default OrderDetails;
