import test from '@joystick.js/test';

test.that('user data operations and constraints', async (assert = {}) => {
  // Test user creation
  const user = await test.accounts.signup({
    email_address: 'db_test@test.com',
    password: 'password123',
    metadata: {
      name: 'Database Test User',
    },
  });

  assert.is(!!user._id, true);
  assert.is(user.emailAddress, 'db_test@test.com');

  // Verify user exists in database
  const db_user = await process.databases.mongodb.collection('users').findOne({
    _id: user._id,
  });

  assert.is(!!db_user, true);
  assert.is(db_user.emailAddress, 'db_test@test.com');
  assert.is(!!db_user.password, true); // Password should be hashed

  // Test duplicate email constraint (should fail)
  try {
    await test.accounts.signup({
      email_address: 'db_test@test.com',
      password: 'different_password',
      metadata: {
        name: 'Duplicate User',
      },
    });
    assert.is(false, true); // Should not reach here
  } catch (error) {
    assert.is(!!error, true); // Should throw error for duplicate email
  }
});

test.that('project data operations and relationships', async (assert = {}) => {
  const user = await test.accounts.signup({
    email_address: 'project_db@test.com',
    password: 'password123',
    metadata: {
      name: 'Project DB User',
    },
  });

  // Create project
  const project_data = {
    _id: 'test_project_id_123',
    name: 'Database Test Project',
    description: 'Testing database operations',
    user_id: user._id,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  await process.databases.mongodb.collection('projects').insertOne(project_data);

  // Verify project exists
  const db_project = await process.databases.mongodb.collection('projects').findOne({
    _id: 'test_project_id_123',
  });

  assert.is(!!db_project, true);
  assert.is(db_project.name, 'Database Test Project');
  assert.is(db_project.user_id, user._id);

  // Test project ownership constraint
  const other_user = await test.accounts.signup({
    email_address: 'other_user@test.com',
    password: 'password123',
    metadata: {
      name: 'Other User',
    },
  });

  // Other user should not be able to access this project
  const unauthorized_project = await process.databases.mongodb.collection('projects').findOne({
    _id: 'test_project_id_123',
    user_id: other_user._id,
  });

  assert.is(unauthorized_project, null);

  // But should be able to access with correct user_id
  const authorized_project = await process.databases.mongodb.collection('projects').findOne({
    _id: 'test_project_id_123',
    user_id: user._id,
  });

  assert.is(!!authorized_project, true);
});

test.that('task data operations and relationships', async (assert = {}) => {
  const user = await test.accounts.signup({
    email_address: 'task_db@test.com',
    password: 'password123',
    metadata: {
      name: 'Task DB User',
    },
  });

  // Create project first
  const project_data = {
    _id: 'test_project_for_tasks',
    name: 'Task Test Project',
    description: 'For testing tasks',
    user_id: user._id,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  await process.databases.mongodb.collection('projects').insertOne(project_data);

  // Create task
  const task_data = {
    _id: 'test_task_id_123',
    project_id: 'test_project_for_tasks',
    user_id: user._id,
    text: 'Test task with #hashtags #testing',
    hashtags: ['#hashtags', '#testing'],
    completed: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  await process.databases.mongodb.collection('tasks').insertOne(task_data);

  // Verify task exists
  const db_task = await process.databases.mongodb.collection('tasks').findOne({
    _id: 'test_task_id_123',
  });

  assert.is(!!db_task, true);
  assert.is(db_task.text, 'Test task with #hashtags #testing');
  assert.is(db_task.project_id, 'test_project_for_tasks');
  assert.is(db_task.user_id, user._id);
  assert.is(db_task.hashtags.length, 2);

  // Test task-project relationship
  const tasks_for_project = await process.databases.mongodb.collection('tasks').find({
    project_id: 'test_project_for_tasks',
  }).toArray();

  assert.is(tasks_for_project.length, 1);
  assert.is(tasks_for_project[0]._id, 'test_task_id_123');

  // Test task ownership constraint
  const other_user = await test.accounts.signup({
    email_address: 'task_other_user@test.com',
    password: 'password123',
    metadata: {
      name: 'Task Other User',
    },
  });

  // Other user should not be able to access this task
  const unauthorized_task = await process.databases.mongodb.collection('tasks').findOne({
    _id: 'test_task_id_123',
    user_id: other_user._id,
  });

  assert.is(unauthorized_task, null);
});

test.that('data integrity and cascading operations', async (assert = {}) => {
  const user = await test.accounts.signup({
    email_address: 'integrity@test.com',
    password: 'password123',
    metadata: {
      name: 'Integrity User',
    },
  });

  // Create project with tasks
  const project = await test.api.set('create_project', {
    user,
    input: {
      name: 'Integrity Test Project',
      description: 'Testing data integrity',
    },
  });

  const task1 = await test.api.set('create_task', {
    user,
    input: {
      project_id: project._id,
      text: 'First task #test',
    },
  });

  const task2 = await test.api.set('create_task', {
    user,
    input: {
      project_id: project._id,
      text: 'Second task #test',
    },
  });

  // Verify tasks exist
  const tasks_before = await process.databases.mongodb.collection('tasks').find({
    project_id: project._id,
  }).toArray();

  assert.is(tasks_before.length, 2);

  // Delete project (should cascade delete tasks)
  await test.api.set('delete_project', {
    user,
    input: { project_id: project._id },
  });

  // Verify project is deleted
  const deleted_project = await process.databases.mongodb.collection('projects').findOne({
    _id: project._id,
  });

  assert.is(deleted_project, null);

  // Verify tasks are also deleted (cascading delete)
  const tasks_after = await process.databases.mongodb.collection('tasks').find({
    project_id: project._id,
  }).toArray();

  assert.is(tasks_after.length, 0);
});

test.that('search index functionality', async (assert = {}) => {
  const user = await test.accounts.signup({
    email_address: 'search_db@test.com',
    password: 'password123',
    metadata: {
      name: 'Search DB User',
    },
  });

  const project = await test.api.set('create_project', {
    user,
    input: {
      name: 'Search Test Project',
      description: 'Testing search functionality',
    },
  });

  // Create tasks with searchable content
  await test.api.set('create_task', {
    user,
    input: {
      project_id: project._id,
      text: 'JavaScript development task #javascript #frontend',
    },
  });

  await test.api.set('create_task', {
    user,
    input: {
      project_id: project._id,
      text: 'Database optimization #database #performance',
    },
  });

  await test.api.set('create_task', {
    user,
    input: {
      project_id: project._id,
      text: 'Frontend JavaScript components #javascript #components',
    },
  });

  // Test text search
  const javascript_tasks = await process.databases.mongodb.collection('tasks').find({
    user_id: user._id,
    text: { $regex: 'JavaScript', $options: 'i' },
  }).toArray();

  assert.is(javascript_tasks.length, 2);

  // Test hashtag search
  const javascript_hashtag_tasks = await process.databases.mongodb.collection('tasks').find({
    user_id: user._id,
    hashtags: '#javascript',
  }).toArray();

  assert.is(javascript_hashtag_tasks.length, 2);

  // Test project name search
  const search_projects = await process.databases.mongodb.collection('projects').find({
    user_id: user._id,
    name: { $regex: 'Search', $options: 'i' },
  }).toArray();

  assert.is(search_projects.length, 1);
  assert.is(search_projects[0].name, 'Search Test Project');
});

test.that('date and timestamp operations', async (assert = {}) => {
  const user = await test.accounts.signup({
    email_address: 'date_test@test.com',
    password: 'password123',
    metadata: {
      name: 'Date Test User',
    },
  });

  const start_time = new Date();
  
  const project = await test.api.set('create_project', {
    user,
    input: {
      name: 'Date Test Project',
      description: 'Testing date operations',
    },
  });

  const end_time = new Date();

  // Verify created_at and updated_at timestamps
  const db_project = await process.databases.mongodb.collection('projects').findOne({
    _id: project._id,
  });

  const created_at = new Date(db_project.created_at);
  const updated_at = new Date(db_project.updated_at);

  assert.is(created_at >= start_time, true);
  assert.is(created_at <= end_time, true);
  assert.is(updated_at >= start_time, true);
  assert.is(updated_at <= end_time, true);

  // Test date range queries
  const projects_created_today = await process.databases.mongodb.collection('projects').find({
    user_id: user._id,
    created_at: {
      $gte: new Date(start_time.getFullYear(), start_time.getMonth(), start_time.getDate()).toISOString(),
    },
  }).toArray();

  assert.is(projects_created_today.length >= 1, true);

  // Update project and verify updated_at changes
  const original_updated_at = db_project.updated_at;
  
  // Wait a moment to ensure timestamp difference
  await new Promise(resolve => setTimeout(resolve, 10));
  
  await test.api.set('update_project', {
    user,
    input: {
      project_id: project._id,
      name: 'Updated Date Test Project',
      description: 'Updated description',
    },
  });

  const updated_project = await process.databases.mongodb.collection('projects').findOne({
    _id: project._id,
  });

  assert.is(updated_project.updated_at !== original_updated_at, true);
});

// Cleanup after all database tests
test.after(async () => {
  // Clean up test users and their data
  await process.databases.mongodb.collection('users').deleteMany({
    emailAddress: {
      $in: [
        'db_test@test.com',
        'project_db@test.com',
        'other_user@test.com',
        'task_db@test.com',
        'task_other_user@test.com',
        'integrity@test.com',
        'search_db@test.com',
        'date_test@test.com',
      ],
    },
  });

  // Clean up test projects
  await process.databases.mongodb.collection('projects').deleteMany({
    name: {
      $in: [
        'Database Test Project',
        'Task Test Project',
        'Integrity Test Project',
        'Search Test Project',
        'Date Test Project',
        'Updated Date Test Project',
      ],
    },
  });

  // Clean up test tasks
  await process.databases.mongodb.collection('tasks').deleteMany({
    $or: [
      { _id: { $in: ['test_task_id_123'] } },
      { project_id: { $in: ['test_project_for_tasks', 'test_project_id_123'] } },
      { text: { $regex: /(JavaScript development|Database optimization|Frontend JavaScript)/i } },
    ],
  });
});
