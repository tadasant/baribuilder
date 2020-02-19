export interface Link {
  slug: string,
  anchor: string
}

export interface Keyword {
  value: string;
  expectedTraffic: number;
}

export interface Post {
  slug: string,
  editUrl: string,
  targetKeywords: Keyword[],
  inboundLinks: Link[],
  outboundLinks: Link[],
  content: string
}