import Link from 'next/link';
import Image from 'next/image';

import type { IProduct } from '@/interfaces';
import { URLFor } from '@/lib/client';

interface Props {
  product: IProduct
}

export function Product ({ product }: Props) {
  return (
    <section>
      <Link
        href={`/product/${product.slug.current}`}
      >
        <article className="product-card">
          <Image
            unoptimized
            src={URLFor(product.image[0])}
            alt={product.name}
            width={250}
            height={250}
            className="product-image"
          />
          <p className="product-name">{product.name}</p>
          <p className="product-price">${product.price}</p>
        </article>
      </Link>
    </section>
  );
}
