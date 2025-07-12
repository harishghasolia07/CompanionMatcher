import { User, Match } from '../types';
import { sampleUsers } from '../data/sampleUsers';

export class UserService {
  private users: User[] = [];
  private shortlistedUsers: string[] = [];
  private readonly USERS_STORAGE_KEY = 'friendFinder_users';
  private readonly SHORTLIST_STORAGE_KEY = 'friendFinder_shortlist';

  // Initialize with storage data only
  constructor() {
    this.loadFromStorage();
  }

  private initializeSampleData(): void {
    this.users = sampleUsers.map(user => ({
      ...user,
      id: this.generateId(),
      createdAt: new Date()
    }));
  }

  // Public method to add sample data for testing (optional)
  public addSampleData(): void {
    if (this.users.length === 0) {
      this.initializeSampleData();
      this.saveToStorage();
    }
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  private loadFromStorage(): void {
    try {
      const usersData = localStorage.getItem(this.USERS_STORAGE_KEY);
      const shortlistData = localStorage.getItem(this.SHORTLIST_STORAGE_KEY);

      if (usersData) {
        this.users = JSON.parse(usersData).map((user: User) => ({
          ...user,
          createdAt: new Date(user.createdAt)
        }));
      }

      if (shortlistData) {
        this.shortlistedUsers = JSON.parse(shortlistData);
      }
    } catch (error) {
      console.error('Error loading data from storage:', error);
      this.users = [];
      this.shortlistedUsers = [];
    }
  }

  private saveToStorage(): void {
    try {
      localStorage.setItem(this.USERS_STORAGE_KEY, JSON.stringify(this.users));
      localStorage.setItem(this.SHORTLIST_STORAGE_KEY, JSON.stringify(this.shortlistedUsers));
    } catch (error) {
      console.error('Error saving data to storage:', error);
    }
  }

  public createUser(userData: Omit<User, 'id' | 'createdAt'>): User {
    const newUser: User = {
      ...userData,
      id: this.generateId(),
      createdAt: new Date()
    };

    this.users.push(newUser);
    this.saveToStorage();
    return newUser;
  }

  public getUserByName(name: string): User | undefined {
    return this.users.find(user => user.name.toLowerCase() === name.toLowerCase());
  }

  public getAllUsers(): User[] {
    return [...this.users];
  }

  public findMatches(userName: string): Match[] {
    const user = this.getUserByName(userName);
    if (!user) return [];

    const matches: Match[] = [];

    this.users.forEach(otherUser => {
      if (otherUser.id === user.id) return;

      const commonInterests = user.interests.filter(interest =>
        otherUser.interests.includes(interest)
      );

      if (commonInterests.length >= 2) {
        const matchScore = this.calculateMatchScore(commonInterests.length, user.interests.length, otherUser.interests.length);
        matches.push({
          user: otherUser,
          commonInterests,
          matchScore
        });
      }
    });

    return matches.sort((a, b) => b.matchScore - a.matchScore);
  }

  private calculateMatchScore(commonCount: number, userInterests: number, otherUserInterests: number): number {
    const totalInterests = userInterests + otherUserInterests - commonCount;
    return Math.round((commonCount / totalInterests) * 100);
  }

  public shortlistUser(userId: string): void {
    if (!this.shortlistedUsers.includes(userId)) {
      this.shortlistedUsers.push(userId);
      this.saveToStorage();
    }
  }

  public removeFromShortlist(userId: string): void {
    this.shortlistedUsers = this.shortlistedUsers.filter(id => id !== userId);
    this.saveToStorage();
  }

  public isUserShortlisted(userId: string): boolean {
    return this.shortlistedUsers.includes(userId);
  }

  public getShortlistedUsers(): User[] {
    return this.users.filter(user => this.shortlistedUsers.includes(user.id));
  }

  // Method to clear all data (useful for resetting the app)
  public clearAllData(): void {
    this.users = [];
    this.shortlistedUsers = [];
    localStorage.removeItem(this.USERS_STORAGE_KEY);
    localStorage.removeItem(this.SHORTLIST_STORAGE_KEY);
    localStorage.removeItem('friendFinder_currentUser');
  }
}

export const userService = new UserService();