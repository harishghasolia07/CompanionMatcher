export interface User {
  id: string;
  name: string;
  age: number;
  interests: string[];
  createdAt: Date;
}

export interface Match {
  user: User;
  commonInterests: string[];
  matchScore: number;
}

export interface ShortlistedUser {
  userId: string;
  shortlistedAt: Date;
}

export type AppView = 'home' | 'create-profile' | 'matches';