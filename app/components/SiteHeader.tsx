import { Icons } from "@aristobyte-ui/utils";

type SiteHeaderProps = {
  className?: string;
  logoClassName?: string;
  brandClassName?: string;
  taglineClassName?: string;
};

export default function SiteHeader({
  className,
  logoClassName,
  brandClassName,
  taglineClassName,
}: SiteHeaderProps) {
  return (
    <div className={className}>
      <div className={logoClassName}>
        <Icons.AristoByteUI size={40} />
      </div>
      <div>
        <p className={brandClassName}>AristoBadges</p>
        <span className={taglineClassName}>
          Minimal SVG Badges for README dashboards
        </span>
      </div>
    </div>
  );
}
