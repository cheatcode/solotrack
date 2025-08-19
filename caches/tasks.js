import { cache } from '@joystick.js/node';

const tasks = async (user_id = '') => {
  const tasks_cache = cache(`tasks_${user_id}`);
  const tasks = await process.databases.mongodb.collection('tasks').find({
    user_id,
  }).toArray();

  tasks_cache.set(tasks);

  const tasks_change_stream = process.databases.mongodb.collection('tasks').watch([
    {
      $match: {
        $and: [
          {
            $or: [
              { operationType: "insert" },
              { operationType: "update" },
              { operationType: "delete" },
              { operationType: "replace" }
            ]
          },
          {
            "fullDocument.user_id": user_id
          }
        ]
      }
    }
  ], {
    fullDocument: 'updateLookup',
    fullDocumentBeforeChange: 'whenAvailable',
  });

  tasks_change_stream.on('change', async (event = {}) => {
    if (event?.operationType === 'insert') {
      tasks_cache.add(event?.fullDocument);
    }

    if (event?.operationType === 'update') {
      tasks_cache.update(
        ['_id', event?.documentKey?._id],
        event?.updateDescription?.updatedFields,
      );
    }

    if (event?.operationType === 'delete') {
      tasks_cache.remove(
        ['_id', event?.documentKey?._id],
      );
    }
  });
};

export default tasks;
