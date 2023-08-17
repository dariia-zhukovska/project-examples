import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

import useCart from "../../hooks/useCart";
import { IBookListData } from "../../types";
import booksData from "../../data/books.json";

import NavMenu from "../NavMenu/NavMenu";
import Counter from "../Counter/Counter";
import PageNotFound from "../PageNotFound/PageNotFound";

import vectorUp from "../../assets/svg/icon_vector_up.svg";
import vectorDown from "../../assets/svg/icon_vector_down.svg";
import imageNotFound from "../../assets/img/imageNotFound.png";
import { useParams } from "react-router-dom";

import styles from "./SpecificBook.module.css";

export default function SpecificBook() {
  const dataBooks = booksData.books;
  const [isExpanded, setIsExpanded] = useState(true);
  const [countValue, setCountValue] = useState(1);
  const [totalPrice, setTotalPrice] = useState(1);
  const { cartItems, setCartItems } = useCart();

  const { id } = useParams();

  let selectedBook =
    dataBooks.find((book) => book.id === parseInt(`${id}`)) ||
    ({} as IBookListData);

  useEffect(() => {
    const currentItem = cartItems.find((book) => book.id === parseInt(`${id}`));
    if (currentItem) {
      setCountValue(currentItem.count);
      setTotalPrice(currentItem.totalPrice);
    }
  }, [cartItems, id]);

  useEffect(() => {
    const newTotalPrice = countValue * (selectedBook?.price || 0);
    setTotalPrice(newTotalPrice);
  }, [countValue, selectedBook?.price]);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  if (!selectedBook.id) {
    return <PageNotFound />;
  }

  const handleAddToCart = () => {
    const selectedCartItemIndex = cartItems.findIndex(
      (item: IBookListData) => item.id === selectedBook.id
    );

    if (selectedCartItemIndex !== -1) {
      const selectedCartItem = { ...cartItems[selectedCartItemIndex] };
      selectedCartItem.count = countValue;
      selectedCartItem.totalPrice = totalPrice;

      const newItems = cartItems.map((item) => {
        return +item.id === +selectedBook.id ? selectedCartItem : item;
      });
      setCartItems(newItems);
      toast.success("Cart has been updated successfully!");
    } else {
      const newItem = {
        id: selectedBook.id,
        image: selectedBook.image,
        title: selectedBook.title,
        author: selectedBook.author,
        price: selectedBook.price,
        count: countValue,
        totalPrice: totalPrice,
      };
      toast.success("Item added to the cart");
      setCartItems([...cartItems, newItem]);
    }
  };

  return (
    <>
      <Toaster />
      <NavMenu />
      <div className={styles.bookItem}>
        <div className={styles.bookItemLeft}>
          <img
            src={selectedBook.image || imageNotFound}
            alt="book_image"
            className={styles.bookItemImage}
          />
        </div>
        <div className={styles.bookItemRight}>
          <div className={styles.bookItemInfo}>
            <div className={styles.bookItemAuthor}>{selectedBook.author}</div>
            <div className={styles.bookItemTitle}>{selectedBook.title}</div>
            <div className={styles.bookItemShortDescription}>
              {isExpanded
                ? selectedBook.shortDescription
                : selectedBook.description}
            </div>
            <div className={styles.bookItemMoreCard}>
              <div
                className={styles.bookItemMore}
                onClick={handleToggle}
                style={{
                  backgroundColor: isExpanded ? vectorUp : vectorDown,
                  cursor: "pointer",
                }}
              >
                {isExpanded ? "More about book" : "Less about book"}
              </div>
            </div>
          </div>
          <div className={styles.bookItemPriceLine}>
            <div>
              <div className={styles.bookItemPrice}>
                {`${selectedBook.price.toFixed(2)} $`}
              </div>
              <div className={styles.bookItemCount}>
                {<Counter count={countValue} setCount={setCountValue} />}
              </div>
            </div>
            <div>
              {" "}
              <div className={styles.bookItemTotalPrice}>
                {` Total Price: ${totalPrice.toFixed(2)}  $`}
              </div>
              <button
                className={styles.ButtonAddToCart}
                onClick={handleAddToCart}
              >
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
