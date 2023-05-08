import JackPot from "../JackPot";
import Competition from "./Competition";
import LastWinner from "./LastWinner";
import NextRound from "./NextRound";
import Stake from "./Stake";

const styles = {
  section2:
    "relative bg-black md:flex flex-wrap md:flex-nowrap justify-between items-start my-10",
  mainContentContainer: "md:w-[50%]",
  competitionContainer:
    "w-[100%] mt-6 md:flex flex-wrap md:flex-nowrap justify-between items-start gap-6 flex-1",
  lastWinnerContainer: "md:w-[48%]",
  nextRoundCompetitionContainer:
    "md:w-[48%] md:flex flex-col flex-wrap md:flex-nowrap justify-between gap-6",
};

export default function Section2() {
  return (
    <section className={styles.section2} id="stake">
      <JackPot
        p={
          "By staking your tokens, a weekly giveaway will be held. The more you stake the higher chance you have of winning the giveaway."
        }
        title={"Weekly Prize"}
      />
      <div className={styles.mainContentContainer}>
        <Stake />
        <div className={styles.competitionContainer}>
          <div className={styles.lastWinnerContainer}>
            <LastWinner />
          </div>
          <div className={styles.nextRoundCompetitionContainer}>
            <NextRound />
          </div>
        </div>
      </div>
    </section>
  );
}
