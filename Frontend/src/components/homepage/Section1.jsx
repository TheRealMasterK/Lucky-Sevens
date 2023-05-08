import Bg from "../../assets/bg-section1.png";
import Border from "../../assets/btn-rectangle.png";
import { FaTelegram, FaTwitter } from "react-icons/fa";
import { BsMedium } from "react-icons/bs";

const styles = {
  section1:
    "relative bg-black md:h-[70vh] flex flex-wrap md:flex-nowrap justify-between items-center",
  image: "md:absolute md:-top-20 md:w-[94%] mx-auto md:left-[3%] z-[1]",
  head: "text-white text-[4em] font-bold",
  mainContent:
    "relative z-[2] w-[90%] flex flex-col flex-wrap md:flex-nowrap justify-center items-start gap-12 my-10",
  desc: "text-white text-[1.2em]",
  btn: "text-white px-28 py-5 font-bold rounded-xl cursor-pointer hover:opacity-90 whitespace-nowrap",
  btnContainer: "relative z-[2] p-3",
  btnRectangle: "absolute top-0 left-0 z-[-1] w-full h-full",
  links:
    "flex w-3/6 md:w-[initial] mx-auto mt-10 md:mt-0 md:flex-col flex-wrap md:flex-nowrap justify-between items-center md:h-[45%] text-white text-[1.8em] relative -top-12",
};

export default function Section1() {
  return (
    <section className={styles.section1}>
      <div className={styles.mainContent}>
        <h1 className={styles.head}>Lucky 7&apos;s</h1>
        <p className={styles.desc}>
          Lead by Pepe, Our team of memes have worked together to bring <br />{" "}
          the meme coin world a brand new weekly lottery!
        </p>
        <div className={styles.btnContainer}>
          <img src={Border} alt="" className={styles.btnRectangle} />
          <button
            className={styles.btn}
            style={{ background: "var(--component-gradient-bg)" }}
          >
            Buy Now -&gt;
          </button>
        </div>
      </div>
      <img src={Bg} alt="" className={styles.image} />
      <div className={styles.links}>
        <FaTelegram />
        <FaTwitter />
        <BsMedium />
      </div>
    </section>
  );
}
