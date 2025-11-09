interface ModelProps {
	names: Array<{name: string, id: number}>;
}

export const fetchTitles = async () => {
	const endpoint = `http://${process.env.EXPO_PUBLIC_BASE_URL}/conversations/titles`;

	const response = await fetch(endpoint, {
		method: "GET",
	});

	if (!response.ok) {
		// @ts-ignore
		throw new Error("Failed to fetch conversation titles", response.statusText)
	}

	const data = response.json();
	return data;
};

export const changeTitle = async (id: number | null) => {
	if (!id) {
		return;
	}

	const endpoint = `http://${process.env.EXPO_PUBLIC_BASE_URL}/conversation/${id}/title`;

	const response = await fetch(endpoint, {
		method: "POST",
	});

	if (!response.ok) {
		// @ts-ignore
		throw new Error("Failed to reach server", response.statusText);
	}

	const data = await response.json();
	return data.task_id;
};

export const fetchConversation = async (id: number | null) => {
	if (!id) {
		return [];
	}

	const endpoint = `http://${process.env.EXPO_PUBLIC_BASE_URL}/conversation/${id}/content`;

	const response = await fetch(endpoint, {
		method: "GET",
	});

	if (!response.ok) {
		// @ts-ignore
		throw new Error("Failed to fetch conversation content", response.statusText)
	}

	const data = await response.json();
	return data;
};

export const createConversation = async () => {
	const endpoint = `http://${process.env.EXPO_PUBLIC_BASE_URL}/conversations`;

	const response = await fetch(endpoint, {
		method: "POST",
	});

	if (!response.ok) {
		// @ts-ignore
		throw new Error("Failed to create a conversation", resopnse.statusText);
	}

	const data = await response.json();
	return data;
};

export const deleteConversation = async (id: number | null) => {
	if (!id) {
		return false;
	}

	const endpoint = `http://${process.env.EXPO_PUBLIC_BASE_URL}/conversation/${id}`;

	const response = await fetch(endpoint, {
		method: "DELETE"
	});

	if (!response.ok) {
		// @ts-ignore
		throw new Error("Failed to delete conversation", response.statusText);
	}
	
	return true;
};

export const fetchModels = async () => {
	const endpoint = `http://${process.env.EXPO_PUBLIC_BASE_URL}/models`;

	const response = await fetch(endpoint, {
		method: "GET"
	});

	if (!response.ok) {
		// @ts-ignore
		throw new Error("Faied to fetch available models", response.statusText);
	}

	const data: ModelProps = await response.json();
	return data;
}

export const fetchLoadedModel = async () => {
	const endpoint = `http://${process.env.EXPO_PUBLIC_BASE_URL}/model`;

	const response = await fetch(endpoint, {
		method: "GET"
	});

	if (!response.ok) {
		// @ts-ignore
		throw new Error("Failed to fetch currently loaded model", response.statusText);
	}
	
	const data: ModelProps = await response.json();
	return data.names;
}

export const sendMessage = async (message: string) => {
	const endpoint = `http://${process.env.EXPO_PUBLIC_BASE_URL}/chat/text`;
	console.log(`Sending message: ${message}`)

	const response = await fetch(endpoint, {
		method: "POST",
		body: JSON.stringify({
			content: message
		}),
		headers: {
			"Content-type": "application/json; charset=UTF-8"
		}
	});

	if (!response.ok) {
		// @ts-ignore
		throw new Error("Failed to send message", response.statusText);
	}

	const data = await response.json();
	return data.task_id;
};

export const loadModel = async (name: string, ctx: number, fa: boolean) => {
	const endpoint = `http://${process.env.EXPO_PUBLIC_BASE_URL}/model`;
	console.log(name)
	console.log(ctx)
	console.log(fa)

	const response = await fetch(endpoint, {
		method: "POST",
		body: JSON.stringify({
			model: name,
			ctx: ctx,
			fa: fa
		}),
		headers: {
			"Content-type": "application/json; charset=UTF-8"
		}
	});

	if (!response.ok) {
		const answer = await response.json();
		console.log(answer.detail);
		// @ts-ignore
		throw new Error("Failed to load model", response.statusText);
	}

	return true;
};

export const downloadModel = async (repo: string, name: string, quant: string) => {
	if (repo === "" || name === "" || quant === "") {
		return false;
	}
	const endpoint = `http://${process.env.EXPO_PUBLIC_BASE_URL}/pull`;
	console.log(repo);
	console.log(name);
	console.log(quant);

	const response = await fetch(endpoint, {
		method: "POST",
		body: JSON.stringify({
			repo: repo,
			name: name,
			quant: quant
		}),
		headers: {
			"Content-Type": "application/json; charset=UTF-8"
		}
	});

	if (!response.ok) {
		const answer = await response.json();
		console.log(answer.detail);
		// @ts-ignore
		throw new Error("Failed to download model", response.statusText);
	}

	return true;
};
