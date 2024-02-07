import path from 'path';
import fs from 'node:fs/promises';

import Link from 'next/link';

function HomePage(props) {
  const { products } = props;
  return <ul>
    {products.map((product) => <li key={product.id}><Link href={`/products/${product.id}`}>{product.title}</Link></li>)}
  </ul>
}

export async function getStaticProps(context) {
  // getStaticProps means this page should be pre-generated on build time

  console.log('(Re-)Generating...');
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData); // convert json data to regular jscript object

  if (!data) {
    return {
      redirect: {
        destination: '/no-data'
      }
    };
  }

  if (data.products.length === 0) {
    return { notFound: true };
  }

  return {
    props: {
      products: data.products,
    },
    revalidate: 10
  };
}

export default HomePage;
