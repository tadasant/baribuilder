import Airtable from "airtable";

export interface AirtablePost {
	publishedUrl: string;
	relatedKeywordIds: string[];
}

class AirtableApiClient {
	base: Airtable.Base;

	constructor() {
		this.base = new Airtable().base("appfx3H4IT1m9IKNO");
	}

	async callOnEachPostRecord() {
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

	async getKeywordsTrafficData(keywordIds: string[]) {
		// TODO
	}
}

export default AirtableApiClient;
