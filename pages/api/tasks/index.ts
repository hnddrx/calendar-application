import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../lib/mongodb';
import { ObjectId } from 'mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { db } = await connectToDatabase();
    const tasksCollection = db.collection('tasks');

    if (req.method === 'GET') {
      const tasks = await tasksCollection.find({}).toArray();
      return res.status(200).json(tasks);
    }

    if (req.method === 'POST') {
      const task = req.body;
      const result = await tasksCollection.insertOne(task);
      return res.status(201).json({
        _id: result.insertedId,
        ...task
      });
    }

    return res.status(405).json({ message: 'Method not allowed' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}