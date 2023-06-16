import Link from 'next/link';
import Image from 'next/image';

import type { IBanner } from '@/interfaces';
import { URLFor } from '@/lib/client';

interface Props {
  banner: IBanner
}

export function HeroBanner ({ banner }: Props) {
  return (
    <section className="hero-banner-container">
      <article>
        <p className="beats-solo">
          {banner.smallText}
        </p>
        <h3>
          {banner.midText}
        </h3>
        <Image
          unoptimized
          src={URLFor(banner.image)}
          alt={banner.product}
          className="hero-banner-image"
        />
        <div>
          <Link
            href={`/product/${banner.product}`}
          >
            <button type="button">
              {banner.buttonText}
            </button>
          </Link>
          <article className="desc">
            <h5>Description</h5>
            <p>{banner.desc}</p>
          </article>
        </div>
      </article>
    </section>
  );
}
