import { BadgesBuilder } from "../BadgesBuilder";
import { FooterNote } from "../FooterNote";
import { ProjectInfo } from "../ProjectInfo";
import { QuickLinks } from "../QuickLinks";
import { SiteHeader } from "../SiteHeader";

export function HomePage() {
  return (
    <div className="home">
      <main className="home__main">
        <SiteHeader />
        <ProjectInfo />
        <QuickLinks />
        <BadgesBuilder />
        <FooterNote />
      </main>
    </div>
  );
}
