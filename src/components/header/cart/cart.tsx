import React from "react";
import styles from "./cart.module.css";
import Image from "next/image";

const Store = () => {
    return (
        <div className={styles.cartContainer}>
            <Image
                src={"/images/cart.png"}
                width={35}
                height={35}
                alt="cart icon"
                className={styles.cartIcon}
            />
        </div>
    );
}

export default Store;