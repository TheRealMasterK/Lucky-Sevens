import VibesGif from "../../assets/vibe.gif";

const styles = {
  lastWinner:
    "w-full p-9  my-4 md:my-0 rounded-3xl relative bg-[color:var(--red)]",
  imgContainer: "rounded-3xl w-[90%] mt-10 mx-auto",
  h1: "text-[1.7em]",
  green: "text-[color:var(--light-green)] underline cursor-pointer",
  orangeYellow: "text-[#F3C53B]",
  winnerInfo: "text-center mt-7",
};

export default function LastWinner() {
  return (
    <div className={styles.lastWinner}>
      <h1 className={styles.h1}>Last Winner</h1>
      <img src={VibesGif} alt="" className={styles.imgContainer} />
      <div className={styles.winnerInfo}>
        <p>3,320 USDC</p>
        <p className={styles.orangeYellow}>0x0000...0000</p>
        <p className={`${styles.green}`}>View Here</p>
      </div>
    </div>
  );
}
