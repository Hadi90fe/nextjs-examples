import Image from "next/image";
import classes from './hero.module.css';

function Hero() {
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
        <Image src='/images/site/hadi.jpeg' alt="An image showing Max" width={300} height={300} />
      </div>
      <h1>Hi, I'm Hadi</h1>
      <p>
        I blog about developement - especially frontend framworks like Angular
        or React.
      </p>
    </section>
  );
}

export default Hero;
