import Image from "next/image";
import styles from "@/styles/Item.module.css";
import { CgArrowLongRight } from "react-icons/cg";

export default function Item({ imageSource, title, description }) {
  return (
    <div className={styles.item}>
      <div className={styles.item_image}>
        <Image
          src={
            imageSource
              ? imageSource.formats.medium.url
              : "https://res.cloudinary.com/pramudya-dev/image/upload/v1641964051/medium_default_image_aa09a36476.jpg"
          }
          alt="image"
          priority
          layout="fill"
          quality={100}
          objectFit="cover"
        />
      </div>
      <div className={styles.item_desc_box}>
        <h3 className={styles.desc_box_title}>{title}</h3>
        <p className={styles.desc_box_subtitle}>{description}</p>
        <span className={styles.item_link}>
          read more <CgArrowLongRight />
        </span>
      </div>
    </div>
  );
}
