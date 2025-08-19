import test from '@joystick.js/test';

test.that('confirm delete tag renders dialog elements', async (assert = {}) => {
  const component = await test.render('ui/components/confirm_delete_tag/index.js', {
    options: {
      language: 'en-US',
    },
  });

  const html = component.instance.render_to_html();

  assert.is(html.includes('data-mod-dialog="confirm_delete_tag"'), true);
  assert.is(html.includes('mod-dialog'), true);
  assert.is(html.includes('mod-dialog-content'), true);
});

test.that('confirm delete tag renders warning icon and styling', async (assert = {}) => {
  const component = await test.render('ui/components/confirm_delete_tag/index.js', {
    options: {
      language: 'en-US',
    },
  });

  const html = component.instance.render_to_html();

  assert.is(html.includes('mod-icon-triangle-alert'), true);
  assert.is(html.includes('mod-color-danger'), true);
});

test.that('confirm delete tag renders internationalized text', async (assert = {}) => {
  const component = await test.render('ui/components/confirm_delete_tag/index.js', {
    options: {
      language: 'en-US',
    },
  });

  const html = component.instance.render_to_html();

  // Should contain i18n function calls for title and subtitle
  assert.is(html.includes('Delete Tag'), true);
  assert.is(html.includes('Are you sure'), true);
});

test.that('confirm delete tag renders action buttons', async (assert = {}) => {
  const component = await test.render('ui/components/confirm_delete_tag/index.js', {
    options: {
      language: 'en-US',
    },
  });

  const html = component.instance.render_to_html();

  assert.is(html.includes('data-mod-dialog-no'), true);
  assert.is(html.includes('data-mod-dialog-yes'), true);
  assert.is(html.includes('Cancel'), true);
  assert.is(html.includes('Delete'), true);
});

test.that('confirm delete tag has proper dialog structure', async (assert = {}) => {
  const component = await test.render('ui/components/confirm_delete_tag/index.js', {
    options: {
      language: 'en-US',
    },
  });

  const html = component.instance.render_to_html();

  // Check for proper dialog structure
  assert.is(html.includes('<div class="mod-dialog-content">'), true);
  assert.is(html.includes('<div class="mod-dialog-header">'), true);
  assert.is(html.includes('<div class="mod-dialog-body">'), true);
  assert.is(html.includes('<div class="mod-dialog-footer">'), true);
});

test.that('confirm delete tag renders with proper button themes', async (assert = {}) => {
  const component = await test.render('ui/components/confirm_delete_tag/index.js', {
    options: {
      language: 'en-US',
    },
  });

  const html = component.instance.render_to_html();

  // Cancel button should be secondary theme
  assert.is(html.includes('theme="secondary"'), true);
  // Delete button should be danger theme
  assert.is(html.includes('theme="danger"'), true);
});
