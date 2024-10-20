// src/utils/queueHelper.ts

const queues: Map<string, string[]> = new Map();

export const addToQueue = (queueName: string, task: string): void => {
  if (!queues.has(queueName)) {
    queues.set(queueName, []);
  }
  queues.get(queueName)?.push(task);
};

// Function to process queues in the background (can be extended for further processing)
export const processQueue = (queueName: string): void => {
  const queue = queues.get(queueName);
  if (queue) {
    // Process tasks asynchronously
    queue.forEach((task) => {
      console.log(`Processing task: ${task}`);
      // Simulate task processing or retry logic here
    });
    queues.set(queueName, []);  // Clear the queue after processing
  }
};
