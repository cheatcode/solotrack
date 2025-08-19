import test from '@joystick.js/test';

test.that('app layout renders with basic structure', async (assert = {}) => {
  const MockPage = {
    render: () => '<div class="mock-page">Mock Page Content</div>',
  };

  const component = await test.render('ui/layouts/app/index.js', {
    props: {
      page: MockPage,
      theme: 'light',
    },
    options: {
      language: 'en-US',
    },
  });

  const html = component.instance.render_to_html();

  assert.is(html.includes('<div class="app">'), true);
  assert.is(html.includes('<div class="mod-container">'), true);
});

test.that('app layout renders app navigation component', async (assert = {}) => {
  const MockPage = {
    render: () => '<div class="mock-page">Mock Page Content</div>',
  };

  const component = await test.render('ui/layouts/app/index.js', {
    props: {
      page: MockPage,
      theme: 'light',
    },
    options: {
      language: 'en-US',
    },
  });

  const html = component.instance.render_to_html();

  // Should render the AppNavigation component
  assert.is(html.includes('app-navigation'), true);
});

test.that('app layout renders page component within container', async (assert = {}) => {
  const MockPage = {
    render: () => '<div class="mock-page">Mock Page Content</div>',
  };

  const component = await test.render('ui/layouts/app/index.js', {
    props: {
      page: MockPage,
      theme: 'light',
    },
    options: {
      language: 'en-US',
    },
  });

  const html = component.instance.render_to_html();

  // Should render the page component inside the container
  assert.is(html.includes('Mock Page Content'), true);
  assert.is(html.includes('<div class="mock-page">'), true);
});

test.that('app layout passes props to navigation and page components', async (assert = {}) => {
  const user = await test.accounts.signup({
    email_address: 'test@example.com',
    password: 'password123',
    metadata: {
      name: 'Test User',
    },
  });

  const MockPage = {
    render: ({ props }) => `<div class="mock-page">Theme: ${props.theme}</div>`,
  };

  const component = await test.render('ui/layouts/app/index.js', {
    props: {
      page: MockPage,
      theme: 'dark',
    },
    options: {
      user,
      language: 'en-US',
    },
  });

  const html = component.instance.render_to_html();

  // Should pass theme prop to page component
  assert.is(html.includes('Theme: dark'), true);
});

test.that('app layout works with authenticated user', async (assert = {}) => {
  const user = await test.accounts.signup({
    email_address: 'test@example.com',
    password: 'password123',
    metadata: {
      name: 'Test User',
    },
  });

  const MockPage = {
    render: () => '<div class="mock-page">Authenticated Page</div>',
  };

  const component = await test.render('ui/layouts/app/index.js', {
    props: {
      page: MockPage,
      theme: 'light',
    },
    options: {
      user,
      language: 'en-US',
    },
  });

  const html = component.instance.render_to_html();

  assert.is(html.includes('Authenticated Page'), true);
  assert.is(html.includes('<div class="app">'), true);
});

test.that('app layout works without authenticated user', async (assert = {}) => {
  const MockPage = {
    render: () => '<div class="mock-page">Public Page</div>',
  };

  const component = await test.render('ui/layouts/app/index.js', {
    props: {
      page: MockPage,
      theme: 'light',
    },
    options: {
      language: 'en-US',
    },
  });

  const html = component.instance.render_to_html();

  assert.is(html.includes('Public Page'), true);
  assert.is(html.includes('<div class="app">'), true);
});

// Cleanup
test.after(async () => {
  await process.databases.mongodb.collection('users').deleteMany({});
});
