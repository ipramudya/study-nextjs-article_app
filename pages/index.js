import Layout from "@/components/Layout";
import Banner from "@/components/Banner";
import GridItem from "@/components/Item";
import styles from "@/styles/Home.module.css";

export default function Home() {
  return (
    <Layout>
      <Banner />
      <div className={styles.home}>
        <div className={styles.home_grid}>
          <div className={styles.grid_item}>
            <GridItem />
          </div>
          <div className={styles.grid_item}>
            <GridItem />
          </div>
          <div className={styles.grid_item}>
            <GridItem />
          </div>
          <div className={styles.grid_item}>
            <GridItem />
          </div>
        </div>
      </div>
    </Layout>
  );
}
