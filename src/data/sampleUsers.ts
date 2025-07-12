import { User } from '../types';

export const sampleUsers: Omit<User, 'id' | 'createdAt'>[] = [
    {
        name: 'Sanya',
        age: 24,
        interests: ['tech', 'music', 'reading', 'coding', 'art']
    },
    {
        name: 'Nikhil',
        age: 26,
        interests: ['sports', 'gaming', 'tech', 'fitness', 'movies']
    },
    {
        name: 'Priya',
        age: 22,
        interests: ['music', 'dancing', 'travel', 'photography', 'food']
    },
    {
        name: 'Rahul',
        age: 25,
        interests: ['gaming', 'tech', 'movies', 'coding', 'science']
    },
    {
        name: 'Ananya',
        age: 23,
        interests: ['art', 'photography', 'travel', 'nature', 'writing']
    },
    {
        name: 'Karan',
        age: 27,
        interests: ['sports', 'fitness', 'hiking', 'nature', 'music']
    }
];
