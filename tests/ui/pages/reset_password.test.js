import test from '@joystick.js/test';

test.that('reset password page renders with form elements', async (assert = {}) => {
  const component = await test.render('ui/pages/reset_password/index.js', {
    props: {
      theme: 'light',
    },
    options: {
      language: 'en-US',
    },
  });

  const html = component.instance.render_to_html();

  assert.is(html.includes('<form>'), true);
  assert.is(html.includes('name="new_password"'), true);
  assert.is(html.includes('name="repeat_new_password"'), true);
  assert.is(html.includes('type="password"'), true);
  assert.is(html.includes('type="submit"'), true);
  assert.is(html.includes('class="reset-password"'), true);
});

test.that('reset password page displays proper header with logo', async (assert = {}) => {
  const component = await test.render('ui/pages/reset_password/index.js', {
    props: {
      theme: 'dark',
    },
    options: {
      language: 'en-US',
    },
  });

  const html = component.instance.render_to_html();

  assert.is(html.includes('<header>'), true);
  assert.is(html.includes('/logo_dark.svg'), true);
  assert.is(html.includes('<h1>'), true);
  assert.is(html.includes('<img'), true);
});

test.that('reset password page has password visibility toggle elements', async (assert = {}) => {
  const component = await test.render('ui/pages/reset_password/index.js', {
    props: {
      theme: 'light',
    },
    options: {
      language: 'en-US',
    },
  });

  const html = component.instance.render_to_html();

  assert.is(html.includes('mod-password-input-show-hide'), true);
  assert.is(html.includes('mod-icon-eye'), true);
  // Should have two password fields with toggle icons
  const eyeIconCount = (html.match(/mod-icon-eye/g) || []).length;
  assert.is(eyeIconCount, 2);
});

test.that('reset password page renders with proper CSS classes', async (assert = {}) => {
  const component = await test.render('ui/pages/reset_password/index.js', {
    props: {
      theme: 'light',
    },
    options: {
      language: 'en-US',
    },
  });

  const html = component.instance.render_to_html();

  assert.is(html.includes('class="reset-password"'), true);
  assert.is(html.includes('class="mod-form-input"'), true);
  assert.is(html.includes('class="mod-input-label"'), true);
  assert.is(html.includes('class="mod-input"'), true);
  assert.is(html.includes('class="mod-button'), true);
});

test.that('reset password page handles theme prop correctly', async (assert = {}) => {
  const lightComponent = await test.render('ui/pages/reset_password/index.js', {
    props: {
      theme: 'light',
    },
    options: {
      language: 'en-US',
    },
  });

  const darkComponent = await test.render('ui/pages/reset_password/index.js', {
    props: {
      theme: 'dark',
    },
    options: {
      language: 'en-US',
    },
  });

  const lightHtml = lightComponent.instance.render_to_html();
  const darkHtml = darkComponent.instance.render_to_html();

  assert.is(lightHtml.includes('/logo_light.svg'), true);
  assert.is(darkHtml.includes('/logo_dark.svg'), true);
});

test.that('reset password page has both password input fields', async (assert = {}) => {
  const component = await test.render('ui/pages/reset_password/index.js', {
    props: {
      theme: 'light',
    },
    options: {
      language: 'en-US',
    },
  });

  const html = component.instance.render_to_html();

  assert.is(html.includes('name="new_password"'), true);
  assert.is(html.includes('name="repeat_new_password"'), true);
  
  // Should have two password input fields
  const passwordInputCount = (html.match(/type="password"/g) || []).length;
  assert.is(passwordInputCount, 2);
});

test.that('reset password page form inputs have proper attributes', async (assert = {}) => {
  const component = await test.render('ui/pages/reset_password/index.js', {
    props: {
      theme: 'light',
    },
    options: {
      language: 'en-US',
    },
  });

  const html = component.instance.render_to_html();

  assert.is(html.includes('type="password"'), true);
  assert.is(html.includes('placeholder='), true);
  assert.is(html.includes('class="mod-input"'), true);
  
  // Should have two form input containers
  const formInputCount = (html.match(/class="mod-form-input"/g) || []).length;
  assert.is(formInputCount, 2);
});

test.that('reset password page submit button has proper classes', async (assert = {}) => {
  const component = await test.render('ui/pages/reset_password/index.js', {
    props: {
      theme: 'light',
    },
    options: {
      language: 'en-US',
    },
  });

  const html = component.instance.render_to_html();

  assert.is(html.includes('type="submit"'), true);
  assert.is(html.includes('mod-button-brand'), true);
  assert.is(html.includes('mod-button-block'), true);
  assert.is(html.includes('mod-margin-top-20'), true);
});

test.that('reset password page uses internationalization', async (assert = {}) => {
  const component = await test.render('ui/pages/reset_password/index.js', {
    props: {
      theme: 'light',
    },
    options: {
      language: 'en-US',
    },
  });

  const html = component.instance.render_to_html();

  // Should contain proper structure for i18n elements
  assert.is(html.includes('<label'), true);
  assert.is(html.includes('placeholder='), true);
  assert.is(html.includes('<h1>'), true);
  
  // Should have two labels for the two password fields
  const labelCount = (html.match(/<label/g) || []).length;
  assert.is(labelCount, 2);
});

test.that('reset password page handles form submission event', async (assert = {}) => {
  const component = await test.render('ui/pages/reset_password/index.js', {
    props: {
      theme: 'light',
    },
    options: {
      language: 'en-US',
    },
  });

  // Test that form submission event is properly bound
  component.test.event('submit', 'form');

  // Should not throw an error when form submit event is triggered
  assert.is(true, true);
});

test.that('reset password page renders without props', async (assert = {}) => {
  const component = await test.render('ui/pages/reset_password/index.js', {
    props: {},
    options: {
      language: 'en-US',
    },
  });

  const html = component.instance.render_to_html();

  assert.is(html.includes('class="reset-password"'), true);
  assert.is(html.includes('<form>'), true);
  assert.is(html.includes('name="new_password"'), true);
  assert.is(html.includes('name="repeat_new_password"'), true);
});

test.that('reset password page has proper form structure', async (assert = {}) => {
  const component = await test.render('ui/pages/reset_password/index.js', {
    props: {
      theme: 'light',
    },
    options: {
      language: 'en-US',
    },
  });

  const html = component.instance.render_to_html();

  // Check for proper nesting structure
  assert.is(html.includes('<div class="reset-password">'), true);
  assert.is(html.includes('<header>'), true);
  assert.is(html.includes('<form>'), true);
  assert.is(html.includes('</form>'), true);
  assert.is(html.includes('</header>'), true);
  assert.is(html.includes('</div>'), true);
});
