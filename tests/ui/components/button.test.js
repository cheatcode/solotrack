import test from '@joystick.js/test';

test.that('button component renders as anchor when href is provided', async (assert = {}) => {
  const component = await test.render('ui/components/button/index.js', {
    props: {
      href: '/projects',
      label: 'View Projects',
      theme: 'brand',
      classes: 'custom-class',
      target: '_blank'
    }
  });

  const html = component.instance.render_to_html();
  
  assert.is(html.includes('<a href="/projects"'), true);
  assert.is(html.includes('class="button brand custom-class"'), true);
  assert.is(html.includes('target="_blank"'), true);
  assert.is(html.includes('View Projects'), true);
});

test.that('button component renders as button when href is not provided', async (assert = {}) => {
  const component = await test.render('ui/components/button/index.js', {
    props: {
      label: 'Submit Form',
      theme: 'github',
      classes: 'submit-btn'
    }
  });

  const html = component.instance.render_to_html();
  
  assert.is(html.includes('<button'), true);
  assert.is(html.includes('class="button github submit-btn"'), true);
  assert.is(html.includes('Submit Form'), true);
  assert.is(html.includes('<a'), false);
});

test.that('button component defaults target to _self when not specified', async (assert = {}) => {
  const component = await test.render('ui/components/button/index.js', {
    props: {
      href: '/dashboard',
      label: 'Dashboard'
    }
  });

  const html = component.instance.render_to_html();
  
  assert.is(html.includes('target="_self"'), true);
});

test.that('button component handles empty theme and classes gracefully', async (assert = {}) => {
  const component = await test.render('ui/components/button/index.js', {
    props: {
      href: '/home',
      label: 'Home'
    }
  });

  const html = component.instance.render_to_html();
  
  assert.is(html.includes('class="button undefined undefined"'), true);
  assert.is(html.includes('Home'), true);
});

test.that('button component renders with brand theme styling', async (assert = {}) => {
  const component = await test.render('ui/components/button/index.js', {
    props: {
      label: 'Brand Button',
      theme: 'brand'
    }
  });

  const html = component.instance.render_to_html();
  
  assert.is(html.includes('class="button brand undefined"'), true);
  assert.is(html.includes('Brand Button'), true);
});

test.that('button component renders with github theme styling', async (assert = {}) => {
  const component = await test.render('ui/components/button/index.js', {
    props: {
      href: 'https://github.com',
      label: 'GitHub',
      theme: 'github',
      target: '_blank'
    }
  });

  const html = component.instance.render_to_html();
  
  assert.is(html.includes('class="button github undefined"'), true);
  assert.is(html.includes('target="_blank"'), true);
  assert.is(html.includes('GitHub'), true);
});

test.that('button component handles multiple CSS classes', async (assert = {}) => {
  const component = await test.render('ui/components/button/index.js', {
    props: {
      label: 'Multi Class Button',
      theme: 'brand',
      classes: 'large primary-action'
    }
  });

  const html = component.instance.render_to_html();
  
  assert.is(html.includes('class="button brand large primary-action"'), true);
});

test.that('button component renders without props', async (assert = {}) => {
  const component = await test.render('ui/components/button/index.js', {
    props: {}
  });

  const html = component.instance.render_to_html();
  
  // Should render as button since no href
  assert.is(html.includes('<button'), true);
  assert.is(html.includes('class="button undefined undefined"'), true);
});
