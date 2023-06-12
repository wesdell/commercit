import Link from 'next/link';

import type { IBanner } from '@/interfaces';
import { URLFor } from '@/lib/client';

interface Props {
  banner: IBanner
}

export function FooterBanner ({ banner }: Props) {
  return (
    <section className="footer-banner-container">
      <section className="banner-desc">
        <article className="left">
          <p>{banner.discount}</p>
          <h3>{banner.largeText1}</h3>
          <h3>{banner.largeText2}</h3>
          <p>{banner.saleTime}</p>
        </article>
        <article className="right">
          <p>{banner.smallText}</p>
          <h3>{banner.midText}</h3>
          <p>{banner.desc}</p>
          <Link
            href={`/product/${banner.product}`}
          >
            <button type="button">
              {banner.buttonText}
            </button>
          </Link>
        </article>
        <img
          src={URLFor(banner.image)}
          alt={banner.product}
          className="footer-banner-image"
        />
      </section>
    </section>
  );
}
