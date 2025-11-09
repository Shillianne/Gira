import { useEffect, useState } from "react";

const useFetch = <T>(
	fetchFunction: () => Promise<T>,
) => {
	const [data, setData] = useState<T | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<Error | null>(null);
	console.log(1)
	// TODO: Fix weird behaviour where multiple 1s are logged when extending, idk what that is about

	const fetchData = async () => {
		try {
			setLoading(true);
			setError(null);

			const result = await fetchFunction();
			setData(result);
		} catch (error) {
			setError(error instanceof Error ? error : new Error("An error occurred during data fetching"));
		} finally {
			setLoading(false);
		}
	}

	const reset = () => {
		setData(null);
		setLoading(false);
		setError(null);
	}

	return {data, loading, error, refetch: fetchData, reset};
};

export default useFetch;
