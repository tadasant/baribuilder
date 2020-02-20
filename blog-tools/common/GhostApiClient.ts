import axios from "axios";

interface GhostPost {
	slug: string;
	html: string;
	published_at?: string;
}

class GhostApiClient {
	url: string;
	key: string;
	version: string;

	constructor(options: { url: string; key: string; version: string }) {
		this.url = options.url;
		this.key = options.key;
		this.version = options.version;
	}

	getAllPublishedPosts() {
		const queryParams = new URLSearchParams();
		queryParams.append("key", this.key);

		const urlToCall = `https://${this.url}/ghost/api/${
			this.version
			// TODO make limit more robust
		}/content/posts/?${queryParams.toString()}&limit=9999999`;
		console.log(urlToCall);
		return axios.get<{ posts: GhostPost[] }>(urlToCall).then(response => {
			return response.data.posts;
		});
	}

	async getAllPublishedPostsSync(): Promise<GhostPost[]> {
		const posts = await this.getAllPublishedPosts();
		return posts;
	}
}

export default GhostApiClient;
