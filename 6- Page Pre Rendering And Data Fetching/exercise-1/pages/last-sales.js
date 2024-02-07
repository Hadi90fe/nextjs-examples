import { useEffect, useState } from "react";
import useSWR from "swr";

const fetcher = (url) =>
    fetch(url)
        .then((r) => r.json())
        .then((data) => {
            const transformedData = [];
            for (const key in data) {
                transformedData.push({
                    id: key,
                    username: data[key].username,
                    volume: data[key].volume,
                });
            }
            return transformedData;
        });

function LastSalesPage(props) {
    const [sales, setSales] = useState(props.sales);
    const { data, error, isLoading } = useSWR(
        "https://nextjs-course-d483f-default-rtdb.firebaseio.com/sales.json",
        fetcher
    ); // we used fetcher because we needed to transform our data.

    useEffect(() => {
        // we used useEffect here to combine prefeched data in server side with fetched data in client side
        setSales(data);
    }, [data]);

    if (error) {
        return <p>Failed to load</p>;
    }

    if (!sales || isLoading) {
        return <h1>Loading...</h1>;
    }

    return (
        <ul>
            {sales.map((sale) => (
                <li key={sale.id}>
                    {sale.username} - {sale.volume}
                </li>
            ))}
        </ul>
    );
}

export async function getStaticProps() {
    const data = await fetcher(
        "https://nextjs-course-d483f-default-rtdb.firebaseio.com/sales.json"
    );
    return {
        props: { sales: data },
        revalidate: 10,
    };
}

export default LastSalesPage;
