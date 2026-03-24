import TeamCard from "@/components/ui/TeamCard";
import { getData } from "@/lib/getData";
import styles from "./Team.module.css";

type TeamData = typeof import("@/data/team.json");

export default async function Team() {
  const [team, siteData] = await Promise.all([
    getData<TeamData>("team"),
    getData<typeof import("@/data/site.json")>("site"),
  ]);

  return (
    <section className={styles.section} id="team">
      <h2 className={`font-cormorant ${styles.heading}`}>{siteData.sectionTitles.team}</h2>
      <div className={styles.grid}>
        {team.map((member) => (
          <TeamCard key={member.name} member={member} />
        ))}
      </div>
    </section>
  );
}
