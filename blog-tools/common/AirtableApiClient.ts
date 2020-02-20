import Airtable from "airtable";

export interface AirtablePost {
	publishedUrl: string;
	relatedKeywordIds: string[];
}

export interface AirtableKeyword {
	id: string;
	keyword: string;
	volume: string;
}

class AirtableApiClient {
	base: Airtable.Base;

	constructor() {
		this.base = new Airtable().base("appfx3H4IT1m9IKNO");
	}

	async getAllPublishedPosts(): Promise<AirtablePost[]> {
		const result = [];

		await this.base("Post Queue")
			.select({
				filterByFormula: 'NOT({Published URL} = "")',
				fields: ["Published URL", "Related Keywords"]
			})
			.all()
			.then(response => {
				response.forEach(record => {
					const post: AirtablePost = {
						// @ts-ignore
						publishedUrl: record.get("Published URL"),
						// @ts-ignore
						relatedKeywordIds: record.get("Related Keywords")
					};
					result.push(post);
				});
			});

		return result;
	}

	async getKeywords(keywordIds: string[]) {
		const result = [];

		const formula = `SEARCH(RECORD_ID(), "${keywordIds.join(",")}") != ""`;

		await this.base("Keywords")
			.select({
				filterByFormula: formula,
				fields: ["Search Volume (Monthly)", "Keyword"]
			})
			.all()
			.then(response => {
				response.forEach(record => {
					const keyword: AirtableKeyword = {
						id: record.id,
						// @ts-ignore
						keyword: record.get("Keyword"),
						// @ts-ignore
						volume: record.get("Search Volume (Monthly)")
					};
					result.push(keyword);
				});
			});

		return result;
	}
}

export default AirtableApiClient;
