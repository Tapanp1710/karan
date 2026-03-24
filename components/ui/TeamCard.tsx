import Image from "next/image";
import styles from "./TeamCard.module.css";

type TeamMember = (typeof import("@/data/team.json"))[number];

type TeamCardProps = {
  member: TeamMember;
};

export default function TeamCard({ member }: TeamCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.imageWrap}>
        <Image
          src={member.imagePath}
          alt={member.name}
          width={420}
          height={320}
          className={styles.image}
        />
      </div>

      <h3 className={`font-cormorant ${styles.name}`}>{member.name}</h3>
      <p className={styles.role}>{member.role}</p>
      <p className={styles.qualification}>{member.qualification}</p>
      <p className={styles.bio}>{member.bio}</p>
    </article>
  );
}
