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

function LastSalesPage() {

    const { data, error, isLoading } = useSWR(
        "https://nextjs-course-d483f-default-rtdb.firebaseio.com/sales.json",
        fetcher
    ); // we used fetcher because we needed to transform our data.


    if (error) {
        return <p>Failed to load</p>;
    }

    if (isLoading) {
        return <h1>Loading...</h1>;
    }

    return (
        <ul>
            {data.map((sale) => (
                <li key={sale.id}>
                    {sale.username} - {sale.volume}
                </li>
            ))}
        </ul>
    );
}

export default LastSalesPage;
