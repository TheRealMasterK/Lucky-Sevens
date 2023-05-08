import { BiChevronDown } from "react-icons/bi";

const styles = {
  stake: "w-full p-9 rounded-3xl relative",
  h1: "text-[1.8em]",
  total: "ttext-[0.6em] absolute top-5 right-7",
  desc: "text-[1.2em] mt-2",
  pill: "bg-[#1F1F1F] w-[100%] md:width-[initial] border border-white text-white text-center rounded-full px-5 py-2 text-[1.1em]",
  pills:
    "flex md:flex-row flex-col flex-wrap md:flex-nowrap justify-center items-center gap-7 md:gap-16 mt-10",
};

export default function Stake() {
  return (
    <form
      className={styles.stake}
      style={{ background: "var(--component-gradient-bg)" }}
    >
      <p className={styles.total}>Total Staked: 473,492 $777</p>
      <h1 className={styles.h1}>Stake</h1>
      <p className={styles.desc}>
        Stake to be entered into the weekly giveaway.
      </p>
      <div className={styles.pills}>
        <input type="text" className={styles.pill} placeholder="Amount" />
        <select className={styles.pill}>
          <option>Duration (days)</option>
          {/* generate options from 1 - 30 */}
          {Array(30)
            .fill()
            .map((_, i) => (
              <option key={i}>{i + 1}</option>
            ))}
        </select>
        <button className={styles.pill + " bg-[#000000] font-bold"}>
          Stake
        </button>
      </div>
    </form>
  );
}
