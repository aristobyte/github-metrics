import { Icons } from "@aristobyte-ui/utils";
import BadgesBuilder from "./components/BadgesBuilder";
import QuickLinks from "./components/QuickLinks";
import SiteHeader from "./components/SiteHeader";
import styles from "./page.module.scss";

type CdnIconProps = {
  name: string;
  size?: number;
  className?: string;
  title?: string;
};

const BASE_URL = "https://api.iconify.design";

const CdnIcon = ({ name, size = 20, className, title }: CdnIconProps) => {
  const src = `${BASE_URL}/${name}.svg`;
  return (
    <img
      className={className}
      src={src}
      width={size}
      height={size}
      alt={title ?? name}
      loading="lazy"
      decoding="async"
    />
  );
};

const links = [
  {
    id: "example",
    text: "See in action",
    href: "https://github.com/aristobyte/www.aristobyte.com/blob/master/README.md",
    icon: "mdi:terminal-line",
  },

  {
    id: "github",
    text: "Source code",
    href: "https://github.com/aristobyte/aristo-badges",
    icon: "simple-icons:github",
  },

  {
    id: "instagram",
    text: "Instagram",
    href: "http://instagram.com/aristo_byte",
    icon: "simple-icons:instagram",
  },

  {
    id: "linkedin",
    text: "LinkedIn",
    href: "https://www.linkedin.com/company/aristobyte",
    icon: "simple-icons:linkedin",
  },

  {
    id: "facebook",
    text: "Facebook",
    href: "https://www.facebook.com/aristobyte/",
    icon: "simple-icons:facebook",
  },
];

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

        <section className={styles["linksSection"]}>
          <div className={styles["linksSectionLogos"]}>
            <span className={styles["linksSectionLogo"]}>
              <Icons.AristoBadges size={104} />
            </span>
            <span className={styles["linksSectionLogoPlus"]}> +</span>
            <span className={styles["linksSectionLogo"]}>
              <Icons.AristoByte size={80} />
            </span>
          </div>
          <p>Built for README badges.</p>
          <h2>
            Maintained by the{" "}
            <span>
              <a href="https://aristobyte.com" target="_blank" rel="noreferrer">
                AristoByte
              </a>
            </span>{" "}
            Team.
          </h2>
          <ul className={styles["links"]}>
            {links.map(({ id, text, href, icon }) => (
              <li key={id}>
                <a
                  className={styles["link"]}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                >
                  <CdnIcon name={icon} size={16} />
                  <span>{text}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>

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
