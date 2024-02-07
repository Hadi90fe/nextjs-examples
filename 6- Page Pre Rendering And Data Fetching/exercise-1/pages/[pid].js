import path from 'path';
import fs from 'node:fs/promises';

function ProductDetailPage(props) {
    const { loadedProduct } = props;

    // if (!loadedProduct) {
    //     return <p>Loading...</p>;
    // }

    return <>
        <h1>{loadedProduct.title}</h1>
        <p>{loadedProduct.description}</p>
    </>;
};

async function getData() {
    const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
    const jsonData = await fs.readFile(filePath);
    const data = JSON.parse(jsonData); // convert json data to regular jscript object
    return data;
};

export async function getStaticProps(context) {
    const { params } = context;

    const productId = params.pid;

    const data = await getData();
    const product = data.products.find((product) => product.id === productId);

    if (!product) {
        return { notFound: true };
    }

    return {
        props: {
            loadedProduct: product,
        }
    };
};

export async function getStaticPaths() {
    const data = await getData();

    const ids = data.products.map(product => product.id);
    const pathsWithParams = ids.map(id => ({ params: { pid: id } }));

    return {
        paths: pathsWithParams,
        fallback: "blocking", // or true with => if(!loadedProduct) {return <p>Loading...</p>) in page component
    };
}

export default ProductDetailPage;