export interface Link {
	slug: string;
	anchor: string;
}

export interface Keyword {
	value: string;
	expectedTraffic: number;
}

export interface PossibleLink extends Link {
	expectedTraffic: number;
}

export interface Post {
	slug: string;
	editUrl: string;
	targetKeywords: Keyword[];
	viableAnchors: string[];
	possibleLinks: PossibleLink[];
	inboundLinks: Link[];
	outboundLinks: Link[];
	content: string;
}
