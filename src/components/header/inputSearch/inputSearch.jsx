'use client'
import React, { useEffect, useState } from "react";
import styles from "./inputSearch.module.css";
import Image from "next/image";

const messages = [
    "Bạn tìm gì hôm nay",
    "Bạn muốn mua gì hôm nay",
    "100% hàng tuyển chọn",
    "Giao hàng 2H & đúng khung giờ"
]

const InputSearch = () => {

    const [message, setMessage] = useState(messages[0]);

    useEffect(() => {
        const interval = setInterval(() => {
            const index = messages.indexOf(message);
            setMessage(messages[(index + 1) % messages.length]);
        }, 2000);
        return () => clearInterval(interval);
    }, [message]);


    return (
        <div className={styles.searchContainer}>
            <Image
                src={"/images/search.png"}
                width={20}
                height={20}
                alt="search icon"
            />
            <input className={styles.input} placeholder={message} />
            <button className={styles.searchBtn}>Tìm kiếm</button>
        </div>
    );
}

export default InputSearch;