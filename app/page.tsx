import BadgesBuilder from "./components/BadgesBuilder";
import QuickLinks from "./components/QuickLinks";
import SiteHeader from "./components/SiteHeader";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <SiteHeader
          className={styles.siteHeader}
          logoClassName={styles.siteLogo}
          brandClassName={styles.brand}
          taglineClassName={styles.tagline}
        />

        {/* <h2>Maintained by the Aristobyte UI team. Built for README badges.</h2> */}

        <QuickLinks />

        <BadgesBuilder />

        <section className={styles.footer}>
          <p>
            Add <code>GITHUB_TOKEN</code> to your Netlify env for higher rate
            limits. All endpoints are CDN cached with stale-while-revalidate.
          </p>
        </section>
      </main>
    </div>
  );
}
