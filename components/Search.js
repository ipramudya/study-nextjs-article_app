import { useState } from "react";
import { useRouter } from "next/router";
import { CgSearch, CgPlayListRemove } from "react-icons/cg";
import Button from "./Button";
import styles from "@/styles/Search.module.css";

export default function Search() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSubmit = (event) => {
    event.preventDefault();
    setQuery("");
    router.push(`/article/search?query=${query}`);
  };

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleClearInput = () => {
    setQuery("");
  };

  return (
    <div className={styles.search}>
      <form onSubmit={handleSubmit}>
        <input
          className={styles.input}
          type="text"
          name=""
          id=""
          value={query}
          onChange={handleInputChange}
          placeholder="search for articles"
        />
        <div className={styles.search_buttons}>
          <Button event={handleSubmit} buttonType="submit">
            <CgSearch />
          </Button>
          <Button event={handleClearInput} buttonType="button">
            <CgPlayListRemove />
          </Button>
        </div>
      </form>
    </div>
  );
}
