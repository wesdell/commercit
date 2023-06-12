import { AiFillInstagram, AiOutlineTwitter } from 'react-icons/ai';

export function Footer () {
  const year = new Date().getFullYear();

  return (
    <section className="footer-container">
      <p>{year} &copy; All rights reserved</p>
      <p className="icons">
        <AiFillInstagram />
        <AiOutlineTwitter />
      </p>
    </section>
  );
}
