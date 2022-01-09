import Image from "next/image";
import styles from "@/styles/Item.module.css";
import { CgArrowLongRight } from "react-icons/cg";

function imageLoader({ src, width, quality }) {
  return `${src}?w=${width}&q=${quality}`;
}

export default function Item({ imageSource, title, description }) {
  return (
    <div className={styles.item}>
      <div className={styles.item_image}>
        <Image
          loader={imageLoader}
          src={imageSource ? imageSource : "/assets/300x300.svg"}
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
