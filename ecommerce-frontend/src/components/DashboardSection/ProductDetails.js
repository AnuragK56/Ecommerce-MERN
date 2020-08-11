import React from "react";
import { Button, Icon, Modal } from "semantic-ui-react";

const ProductDetails = (props) => {
  let stockInput = React.createRef();
  let PriceInput = React.createRef();
  let DescriptionInput = React.createRef();
  let MinidescriptionInput = React.createRef();
  let titleInput = React.createRef();
  let subcategoryInput = React.createRef();

  const [open, setOpen] = React.useState(false);
  function changeStatus(id) {
    let logindetails = JSON.parse(localStorage.getItem("login"));
    if (logindetails != null) {
      let token = logindetails.token;
      let url = "http://localhost:5000/updateproduct/" + id;
      let at = "Bearer " + token;
      let data;
      if (
        stockInput.current.value !== "" &&
        PriceInput.current.value !== "" &&
        (DescriptionInput.current.value !== "") &
          (MinidescriptionInput.current.value !== "") &&
        titleInput.current.value !== "" &&
        subcategoryInput.current.value !== ""
      ) {
        data = {
          stock: stockInput.current.value,
          price: PriceInput.current.value,
          description: DescriptionInput.current.value,
          minidescription: MinidescriptionInput.current.value,
          title: titleInput.current.value,
          subcategory: subcategoryInput.current.value,
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
      trigger={<Button primary>Update</Button>}
    >
      <Modal.Header>Product: {props.product.title}</Modal.Header>
      <Modal.Content image scrolling>
        {/* <h2>Customer Details &nbsp;</h2> */}    
        <Modal.Description>
          <div className="checkout__input">
            <div>
              Title
              <br></br>
              <input
                type="text"
                defaultValue={props.product.title}
                ref={titleInput}
              />
            </div>
            <div>
              Subcategory
              <br></br>
              <input
                type="text"
                defaultValue={props.product.subcategory}
                ref={subcategoryInput}
              />
            </div>
            <div>
              Stock
              <br></br>
              <input
                type="text"
                defaultValue={props.product.stock}
                ref={stockInput}
              />
            </div>
            <div>
              Price
              <br></br>
              <input
                type="text"
                defaultValue={props.product.price}
                ref={PriceInput}
              />
            </div>
            <div>
              Description
              <br></br>
              <textarea
                style={{ height: "100px", width: "100%" }}
                type="text"
                defaultValue={props.product.description}
                ref={DescriptionInput}
              />
            </div>
            <div>
              Mini Description
              <br></br>
              <textarea
                style={{ height: "100px", width: "100%" }}
                type="text"
                defaultValue={props.product.minidescription}
                ref={MinidescriptionInput}
              />
            </div>
          </div>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color="green" onClick={() => changeStatus(props.product._id)}>
          Update
          <Icon name="chevron right" />
        </Button>
        <Button onClick={() => setOpen(false)} primary>
          Done <Icon name="chevron right" />
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default ProductDetails;
