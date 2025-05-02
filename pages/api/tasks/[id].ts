import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../lib/mongodb';
import { ObjectId } from 'mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { db } = await connectToDatabase();
    const tasksCollection = db.collection('tasks');
    const { id } = req.query;

    if (req.method === 'DELETE') {
      const result = await tasksCollection.deleteOne({ _id: new ObjectId(id as string) });
      
      if (result.deletedCount === 0) {
        return res.status(404).json({ message: 'Task not found' });
      }
      
      return res.status(200).json({ message: 'Task deleted successfully' });
    }

    if (req.method === 'PUT') {
      const task = req.body;
      const result = await tasksCollection.updateOne(
        { _id: new ObjectId(id as string) },
        { $set: task }
      );
      
      if (result.matchedCount === 0) {
        return res.status(404).json({ message: 'Task not found' });
      }
      
      return res.status(200).json({ message: 'Task updated successfully', task });
    }

    return res.status(405).json({ message: 'Method not allowed' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
