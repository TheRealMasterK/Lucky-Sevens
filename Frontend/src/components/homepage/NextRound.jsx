const styles = {
  NextRound:
    "w-full p-9 my-4 md:my-0 rounded-3xl relative bg-[color:var(--dark-red)]",
  h1: "text-[1.8em]",
  time: "text-[1.8em] font-bold my-8 mx-0 p-4 bg-[#1F1F1F] rounded-3xl text-center",
};

export default function NextRound() {
  return (
    <div className={styles.NextRound}>
      <h1 className={styles.h1}>Next Round</h1>
      <div className={styles.time}>
        <span>5 Days 1 : </span>
        <span>59</span>
      </div>
    </div>
  );
}
