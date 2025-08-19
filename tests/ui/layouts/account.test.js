import test from '@joystick.js/test';

test.that('account layout renders with basic structure', async (assert = {}) => {
  const MockPage = {
    render: () => '<div class="mock-page">Mock Account Page</div>',
  };

  const component = await test.render('ui/layouts/account/index.js', {
    props: {
      page: MockPage,
    },
    options: {
      language: 'en-US',
    },
  });

  const html = component.instance.render_to_html();

  assert.is(html.includes('<div class="account">'), true);
  assert.is(html.includes('<div class="mod-container">'), true);
});

test.that('account layout renders page component within container', async (assert = {}) => {
  const MockPage = {
    render: () => '<div class="mock-page">Account Page Content</div>',
  };

  const component = await test.render('ui/layouts/account/index.js', {
    props: {
      page: MockPage,
    },
    options: {
      language: 'en-US',
    },
  });

  const html = component.instance.render_to_html();

  // Should render the page component inside the container
  assert.is(html.includes('Account Page Content'), true);
  assert.is(html.includes('<div class="mock-page">'), true);
});

test.that('account layout passes props to page component', async (assert = {}) => {
  const MockPage = {
    render: ({ props }) => `<div class="mock-page">Theme: ${props.theme}</div>`,
  };

  const component = await test.render('ui/layouts/account/index.js', {
    props: {
      page: MockPage,
      theme: 'dark',
    },
    options: {
      language: 'en-US',
    },
  });

  const html = component.instance.render_to_html();

  // Should pass theme prop to page component
  assert.is(html.includes('Theme: dark'), true);
});

test.that('account layout works with login page', async (assert = {}) => {
  const MockLoginPage = {
    render: () => '<div class="login-page">Login Form</div>',
  };

  const component = await test.render('ui/layouts/account/index.js', {
    props: {
      page: MockLoginPage,
    },
    options: {
      language: 'en-US',
    },
  });

  const html = component.instance.render_to_html();

  assert.is(html.includes('Login Form'), true);
  assert.is(html.includes('<div class="account">'), true);
});

test.that('account layout works with signup page', async (assert = {}) => {
  const MockSignupPage = {
    render: () => '<div class="signup-page">Signup Form</div>',
  };

  const component = await test.render('ui/layouts/account/index.js', {
    props: {
      page: MockSignupPage,
    },
    options: {
      language: 'en-US',
    },
  });

  const html = component.instance.render_to_html();

  assert.is(html.includes('Signup Form'), true);
  assert.is(html.includes('<div class="account">'), true);
});

test.that('account layout works with password recovery page', async (assert = {}) => {
  const MockRecoverPage = {
    render: () => '<div class="recover-page">Password Recovery Form</div>',
  };

  const component = await test.render('ui/layouts/account/index.js', {
    props: {
      page: MockRecoverPage,
    },
    options: {
      language: 'en-US',
    },
  });

  const html = component.instance.render_to_html();

  assert.is(html.includes('Password Recovery Form'), true);
  assert.is(html.includes('<div class="account">'), true);
});

test.that('account layout has simple structure without navigation', async (assert = {}) => {
  const MockPage = {
    render: () => '<div class="mock-page">Simple Page</div>',
  };

  const component = await test.render('ui/layouts/account/index.js', {
    props: {
      page: MockPage,
    },
    options: {
      language: 'en-US',
    },
  });

  const html = component.instance.render_to_html();

  // Should not include navigation components
  assert.is(html.includes('app-navigation'), false);
  // Should have simple structure
  assert.is(html.includes('<div class="account">'), true);
  assert.is(html.includes('<div class="mod-container">'), true);
});
