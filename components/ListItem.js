import Image from "next/image";
import { AiOutlineEdit, AiOutlineClose } from "react-icons/ai";

import Button from "./Button";
import styles from "@/styles/Item.module.css";

export default function ListItem({ article, router, handleEdit, handleRemove }) {
  return (
    <div className={styles.list}>
      <div className={styles.list_image}>
        <Image
          src={
            article.image
              ? article.image.formats.small.url
              : "https://res.cloudinary.com/pramudya-dev/image/upload/v1642248135/small_default_image_caa84f22a0.jpg"
          }
          alt="image"
          priority
          layout="fill"
          quality={100}
          objectFit="cover"
        />
      </div>
      <div className={styles.list_text}>
        <h4
          className={`${styles.desc_box_title} ${styles.list_text_title}`}
          style={{ margin: "0 0 8px 0" }}
          onClick={() => router.push(`/article/${article.id}`)}
        >
          {article.title}
        </h4>
        <p className={styles.desc_box_subtitle}>{article.description}</p>
      </div>
      <div className={styles.list_buttons}>
        <Button style={{ alignItems: "unset", color: " #570000" }} event={handleRemove}>
          <AiOutlineClose />
        </Button>
        <Button style={{ alignItems: "unset", color: "#004b70" }} event={handleEdit}>
          <AiOutlineEdit />
        </Button>
      </div>
    </div>
  );
}
