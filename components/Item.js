import Image from "next/image";
import styles from "@/styles/Item.module.css";
import { CgArrowLongRight } from "react-icons/cg";

export default function Item() {
  return (
    <div className={styles.item}>
      <div className={styles.item_image}>
        <Image src="/assets/300x300.svg" alt="image" priority layout="fill" quality={100} objectFit="cover" />
      </div>
      <div className={styles.item_desc_box}>
        <h3 className={styles.desc_box_title}>title goes here</h3>
        <p className={styles.desc_box_subtitle}>long long description goes here</p>
        <button className={styles.item_btn}>
          read more <CgArrowLongRight />
        </button>
      </div>
    </div>
  );
}
