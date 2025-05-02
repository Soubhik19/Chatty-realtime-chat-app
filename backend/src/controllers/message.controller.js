import MessageModel from '../models/message.model.js';

export const sendMessage = async (userId, message) => {
    try {
        // Replace with your logic to save the message
        console.log(`Sending message to user ${userId}:`, message);
        // Example: Save to database
        const savedMessage = await MessageModel.create({ userId, message });
        return savedMessage;
    } catch (error) {
        console.error('Error in sendMessage function:', error.message);
        throw new Error('Message sending failed');
    }
};