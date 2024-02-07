import { useEffect, useState } from "react";

function LastSalesPage() {
    const [sales, setSales] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(
                "https://nextjs-course-d483f-default-rtdb.firebaseio.com/sales.json"
            );
            if (!response.ok) {
                throw new Error("Failed to fetch sales data.");
            }
            const data = await response.json();
            const transformedData = [];
            for (const key in data) {
                transformedData.push({
                    id: key,
                    username: data[key].username,
                    volume: data[key].volume,
                });
            }
            setSales(transformedData);
        } catch (error) {
            console.error(error);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (isLoading) {
        return <h1>Loading...</h1>;
    }

    if (!sales) {
        return <p>No data yet!</p>;
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

export default LastSalesPage;
