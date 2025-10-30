import mongoose from 'mongoose';
import sqlite3 from 'sqlite3';

const dbType = process.env.DB_TYPE || 'mongo'; // 'mongo' or 'sqlite'

export const connectDB = async () => {
    if (dbType === 'mongo') {
        const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/mock-ecommerce';
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        } as any);
        console.log('Connected to MongoDB');
        return mongoose.connection;
    } else if (dbType === 'sqlite') {
        sqlite3.verbose();
        const dbPath = process.env.SQLITE_DB || './database.sqlite';
        return new Promise<sqlite3.Database>((resolve, reject) => {
            const db = new sqlite3.Database(dbPath, (err) => {
                if (err) {
                    console.error('Unable to connect to the SQLite database:', err);
                    return reject(err);
                }
                console.log('Connected to SQLite');
                resolve(db);
            });
        });
    } else {
        throw new Error('Unsupported database type');
    }
};