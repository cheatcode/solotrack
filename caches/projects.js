import { cache } from '@joystick.js/node-canary';

const projects = async (user_id = '') => {
  const projects_cache = cache(`projects_${user_id}`);
  const projects = await process.databases.mongodb.collection('projects').find({
    user_id,
  }).toArray();

  projects_cache.set(projects);

  const projects_change_stream = process.databases.mongodb.collection('projects').watch([
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

  projects_change_stream.on('change', async (event = {}) => {
    if (event?.operationType === 'insert') {
      projects_cache.add(event?.fullDocument);
    }

    if (event?.operationType === 'update') {
      projects_cache.update(
        ['_id', event?.documentKey?._id],
        event?.updateDescription?.updatedFields,
      );
    }

    if (event?.operationType === 'delete') {
      projects_cache.remove(
        ['_id', event?.documentKey?._id],
      );
    }
  });
};

export default projects;
