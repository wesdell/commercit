import type { GetServerSideProps } from 'next';

import type { IBanner, IProduct } from '@/interfaces';
import { FooterBanner, HeroBanner, Product, Layout } from '@/components';
import { client } from '@/lib/client';

interface Props {
  products: IProduct[]
  banner: IBanner[]
}

export default function Home({ products, banner }: Props) {
  return (
    <Layout
      title="Commercit | Home"
      description="The best e-commerce to buy and sell your products."
    >
      <HeroBanner banner={banner[0]} />
      <section className="products-heading">
        <h2>Beset Selling Products</h2>
        <p>Speakers of many variations</p>
      </section>
      <section className="products-container">
        {
          products.map((product) => <Product key={product._id} product={product} />)
        }
      </section>
      <FooterBanner banner={banner[0]} />
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const productsQuery = '*[_type == "product"]';
  const products = await client.fetch(productsQuery);

  const bannerQuery = '*[_type == "banner"]';
  const banner = await client.fetch(bannerQuery);
  
  return {
    props: {
      products,
      banner
    }
  };
};
