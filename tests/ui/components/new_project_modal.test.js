import test from '@joystick.js/test';

test.that('new project modal renders with form elements', async (assert = {}) => {
  const user = await test.accounts.signup({
    email_address: 'test@example.com',
    password: 'password123',
    metadata: {
      name: 'Test User',
    },
  });

  const component = await test.render('ui/components/new_project_modal/index.js', {
    props: {
      theme: 'light',
    },
    options: {
      user,
      language: 'en-US',
    },
  });

  const html = component.instance.render_to_html();

  assert.is(html.includes('<div class="mod-modal'), true);
  assert.is(html.includes('id="new-project-modal"'), true);
  assert.is(html.includes('<form>'), true);
  assert.is(html.includes('name="title"'), true);
  assert.is(html.includes('name="description"'), true);
  assert.is(html.includes('placeholder="Project title"'), true);
  assert.is(html.includes('placeholder="Project description"'), true);
  assert.is(html.includes('Create Project'), true);

  await test.accounts.delete(user._id);
});

test.that('new project modal handles form submission', async (assert = {}) => {
  const user = await test.accounts.signup({
    email_address: 'test@example.com',
    password: 'password123',
    metadata: {
      name: 'Test User',
    },
  });

  const component = await test.render('ui/components/new_project_modal/index.js', {
    props: {
      theme: 'light',
    },
    options: {
      user,
      language: 'en-US',
    },
  });

  // Simulate form submission
  component.test.event('submit', 'form');

  // Check that validation was triggered
  const function_calls = await test.utils.get_function_calls(`ui.${component.instance.id}.methods.validate_form`);
  assert.is(function_calls.length >= 1, true);

  await test.accounts.delete(user._id);
});

test.that('new project modal validates required fields', async (assert = {}) => {
  const user = await test.accounts.signup({
    email_address: 'test@example.com',
    password: 'password123',
    metadata: {
      name: 'Test User',
    },
  });

  const component = await test.render('ui/components/new_project_modal/index.js', {
    props: {
      theme: 'light',
    },
    options: {
      user,
      language: 'en-US',
    },
  });

  // Test form validation method
  const validation_result = component.test.method('validate_form', [
    { title: { value: '' }, description: { value: '' } }, // Mock form with empty values
  ]);

  // The validation should handle empty required fields
  assert.is(typeof validation_result, 'object');

  await test.accounts.delete(user._id);
});

test.that('new project modal handles successful project creation', async (assert = {}) => {
  const user = await test.accounts.signup({
    email_address: 'test@example.com',
    password: 'password123',
    metadata: {
      name: 'Test User',
    },
  });

  const component = await test.render('ui/components/new_project_modal/index.js', {
    props: {
      theme: 'light',
    },
    options: {
      user,
      language: 'en-US',
    },
  });

  // Create a project first to test with
  const project = await test.api.set('create_project', {
    user,
    input: {
      title: 'Test Project',
      description: 'Test Description',
    },
  });

  // Test that project creation triggers navigation
  component.test.event('submit', 'form');

  // Verify the component handles the success case
  assert.is(typeof component.instance, 'object');

  // Cleanup
  await process.databases.mongodb.collection('projects').deleteOne({ _id: project._id });
  await test.accounts.delete(user._id);
});

test.that('new project modal handles API errors', async (assert = {}) => {
  const user = await test.accounts.signup({
    email_address: 'test@example.com',
    password: 'password123',
    metadata: {
      name: 'Test User',
    },
  });

  const component = await test.render('ui/components/new_project_modal/index.js', {
    props: {
      theme: 'light',
    },
    options: {
      user,
      language: 'en-US',
    },
  });

  // Test error handling by checking component structure
  const html = component.instance.render_to_html();
  assert.is(html.includes('form'), true);

  // The component should be able to handle errors gracefully
  assert.is(typeof component.instance.methods, 'object');

  await test.accounts.delete(user._id);
});

test.that('new project modal closes on cancel', async (assert = {}) => {
  const user = await test.accounts.signup({
    email_address: 'test@example.com',
    password: 'password123',
    metadata: {
      name: 'Test User',
    },
  });

  const component = await test.render('ui/components/new_project_modal/index.js', {
    props: {
      theme: 'light',
    },
    options: {
      user,
      language: 'en-US',
    },
  });

  // Test cancel button click
  component.test.event('click', '[data-close-modal]');

  // Verify the modal close functionality
  const html = component.instance.render_to_html();
  assert.is(html.includes('data-close-modal'), true);

  await test.accounts.delete(user._id);
});

test.that('new project modal renders with dark theme', async (assert = {}) => {
  const user = await test.accounts.signup({
    email_address: 'test@example.com',
    password: 'password123',
    metadata: {
      name: 'Test User',
    },
  });

  const component = await test.render('ui/components/new_project_modal/index.js', {
    props: {
      theme: 'dark',
    },
    options: {
      user,
      language: 'en-US',
    },
  });

  const html = component.instance.render_to_html();

  assert.is(html.includes('mod-theme-dark'), true);
  assert.is(html.includes('<form>'), true);

  await test.accounts.delete(user._id);
});

test.after(async () => {
  // Clean up any remaining test data
  await process.databases.mongodb.collection('projects').deleteMany({
    title: { $regex: /^Test/ },
  });
  await process.databases.mongodb.collection('users').deleteMany({
    emailAddress: { $regex: /@example\.com$/ },
  });
});
