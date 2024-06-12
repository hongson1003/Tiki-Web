import Image from "next/image";
import styles from "./page.module.css";
import SubSidebar from "../../components/homePage/sidebar/subSidebar/subSidebar.homePage";

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Image
          src="/images/homePage/box.png"
          alt="Logo"
          width={90}
          height={20}
        />
        &nbsp;
        <p className={styles.headerTitle}>đổi ý & miễn phí trả hàng</p>
        <Image
          src="/images/homePage/right-arrow.png"
          alt="Arrow"
          width={12}
          height={12}
          className={styles.arrow}
        />
      </div>
      <div className={styles.content}>
        <div className={styles.sidebar}>
          <SubSidebar title="Danh mục" data={[]} />
        </div>
      </div>
    </div>
  );
}
