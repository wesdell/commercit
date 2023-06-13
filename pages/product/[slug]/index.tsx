import { useState } from 'react';

import type { GetStaticPaths, GetStaticProps } from 'next';

import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai';

import type { IProduct } from '@/interfaces';
import { Product, Layout } from '@/components';
import { client, URLFor } from '@/lib/client';

interface Props {
  product: IProduct
  products: IProduct[]
}

export default function ProductSlug ({ product, products }: Props) {
  const [index, setIndex] = useState(0);

  return (
    <Layout
      title={`Commercit | ${product.name}`}
      description={product.details}
    >
      <section>
        <section className="product-detail-container">
          <article>
            <article className="image-container">
              <img
                src={URLFor(product.image[index])}
                alt={product.name}
                className="product-detail-image"
              />
            </article>
            <article className="small-images-container">
              {
                product.image.map((item, idx) => (
                  <img
                    key={item.key}
                    src={URLFor(item)}
                    className={idx === index ? 'small-image selected-image' : 'small-image'}
                    onMouseEnter={() => setIndex(idx)}
                  />
                ))
              }
            </article>
          </article>
          <article className="product-detail-desc">
            <h1>{product.name}</h1>
            <div className="reviews">
              <div>
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
                <AiOutlineStar />
              </div>
              <p>(20)</p>
            </div>
            <h4>Details: </h4>
            <p>{product.details}</p>
            <p className="price">${product.price}</p>
            <div className="quantity">
              <h3>Quantity: </h3>
              <p className="quantity-desc">
                <span className="minus">
                  <AiOutlineMinus />
                </span>
                <span className="num">
                  0
                </span>
                <span className="plus">
                  <AiOutlinePlus />
                </span>
              </p>
            </div>
            <div className="buttons">
              <button type="button" className="add-to-cart">
                Add to Cart
              </button>
              <button type="button" className="buy-now">
                Buy Now
              </button>
            </div>
          </article>
        </section>
        <section className="maylike-products-wrapper">
          <h2>You may also like</h2>
          <article className="marquee">
            <div className="maylike-products-container track">
              {
                products.map((product) => (
                  <Product key={product._id} product={product} />
                ))
              }
            </div>
          </article>
        </section>
      </section>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const query = `
    *[_type == "product"] {
      slug {
        current
      }
    }
  `;
  const products = await client.fetch<IProduct[]>(query);
  const paths = products.map((product) => ({ params: { slug: product.slug.current }}));
  
  return {
    paths,
    fallback: 'blocking'
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug = '' } = context.params as { slug: string };

  const productQuery = `*[_type == "product" && slug.current == "${slug}"][0]`;
  const product = await client.fetch<IProduct>(productQuery);

  const productsQuery = '*[_type == "product"]';
  const products = await client.fetch<IProduct[]>(productsQuery);
  
  return {
    props: {
      product,
      products
    }
  };
};