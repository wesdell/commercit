import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = sanityClient({
  projectId: 'wtkrqp9y',
  dataset: 'production',
  apiVersion: '2023-06-12',
  useCdn: true,
  token: process.env.NEXT_SANITY_TOKEN
});

const builder = imageUrlBuilder(client);

export const URLFor = (source: string) => builder.image(source);
