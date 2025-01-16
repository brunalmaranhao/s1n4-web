declare interface ReactionAuthor {
  id: string;
  name: string;
  email: string;
  role: string;
}

declare interface Reaction {
  id: string;
  unified: string;
  author: ReactionAuthor;
  commentId?: string
  projectUpdateId?: string
}

declare interface GroupedReactions {
  [unified: string]: Reaction[]; 
}
