import React, { useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import { useSelector, useDispatch } from "react-redux";
import { addItemsToCart } from "../../actions/cartAction.js";
import {
  clearErrors,
  getProductDetails,
  newReview,
} from "../../actions/productAction";
import ReviewCard from "./ReviewCard.js";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import { useParams } from "react-router-dom";

// import { addItemsToCart } from "../../actions/cartAction";
// import {
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   Button,
// } from "@material-ui/core";
// import { Rating } from "@material-ui/lab";
// import { NEW_REVIEW_RESET } from "../../constants/productConstants";
import ReactStars from "react-rating-stars-component";

const ProductDetails = ({ match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { id } = useParams(); 

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

//   const { success, error: reviewError } = useSelector(
//     (state) => state.newReview
//   );

  const options = {
    edit: false,
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: product.rating,
    isHalf: true,
  };

  const [quantity, setQuantity] = useState(1);
//   const [open, setOpen] = useState(false);
//   const [rating, setRating] = useState(0);
//   const [comment, setComment] = useState("");

  const increaseQuantity = () => {
    if (product.stock <= quantity) return;//if quantity is 5 den it shudnt add more than 5 items
    const qty = quantity + 1;
    console.log(qty);
    setQuantity(qty);
  };

  const decreaseQuantity = () => {
    if (1 >= quantity) return; //if 1 or 1 se kaam return
    const qty = quantity - 1;
    console.log(qty);
    setQuantity(qty);
  };

  const addToCartHandler=()=>{
    dispatch(addItemsToCart(id,quantity));
    console.log("added")
    alert.success("Items added to cart")
  }
//   const submitReviewToggle = () => {
//     open ? setOpen(false) : setOpen(true);
//   };

//   const reviewSubmitHandler = () => {
//     const myForm = new FormData();

//     myForm.set("rating", rating);
//     myForm.set("comment", comment);
//     myForm.set("productId", match.params.id);

//     dispatch(newReview(myForm));

//     setOpen(false);
//   };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    // if (reviewError) {
    //   alert.error(reviewError);
    //   dispatch(clearErrors());
    // }

    // if (success) {
    //   alert.success("Review Submitted Successfully");
    //   dispatch({ type: NEW_REVIEW_RESET });
    // }
    dispatch(getProductDetails(id));
  }, [dispatch,id, error, alert]);
//   reviewError, success

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={`${product.name} -- ECOMMERCE`} />
          <div className="ProductDetails">
            <div>
              {/* <Carousel> */}
                {product.images &&
                  product.images.map((item, i) => ( // i is index
                    <img
                      className="CarouselImage"
                      key={i}
                      src={item.url}
                      alt={`${i} Slide`}
                    />
                  ))}
            </div>

            <div>
              <div className="detailsBlock-1">
                <h2>{product.name}</h2>
                <p>Product # {product._id}</p>
              </div>
              <div className="detailsBlock-2">
                <ReactStars {...options} />
                <span className="detailsBlock-2-span">
                  {" "}
                  ({product.numofre} Reviews)
                </span>
              </div>
              <div className="detailsBlock-3">
                <h1>{`₹${product.price}`}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button onClick={decreaseQuantity} >-</button>
                    <input readOnly type="number"  value={quantity}/>
                    <button onClick={increaseQuantity} >+</button>
                  </div>
                  <button onClick={addToCartHandler}
                    disabled={product.stock < 1 ? true : false}
                  >
                    Add to Cart
                  </button>
                </div>

                <p>
                  Status:
                  <b className={product.Stock < 1 ? "redColor" : "greenColor"}>  {/*show text in red/green color */}
                    {product.stock < 1 ? "OutOfStock" : "InStock"} {/* indicate avalaibility of product */}
                  </b>
                </p>
              </div>

              <div className="detailsBlock-4">
                Description : <p>{product.description}</p>
              </div>

              <button className="submitReview">
                Submit Review
              </button>
              {/* onClick={submitReviewToggle}  */}
            </div>
          </div>

          <h3 className="reviewsHeading">REVIEWS</h3>

          {/* <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />

              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog> */}

          {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews &&
                product.reviews.map((review) => (
                  <ReviewCard key={review._id} review={review} />
                ))}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
          )}
        </>
      )}
    </>
  );
};

export default ProductDetails;