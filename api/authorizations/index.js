export const user_exists = (_input = {}, context = {}) => {
  return !!context?.user?._id;
};

export const can_access_project = async (input = {}, context = {}) => {
  const project = await process.databases.mongodb.collection('projects').findOne({
    _id: input?.project_id,
  });

  return project?.user_id === context?.user?._id;
};