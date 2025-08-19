import test from '@joystick.js/test';

test.that('joystick teaser renders with light theme', async (assert = {}) => {
  const component = await test.render('ui/components/joystick_teaser/index.js', {
    props: {
      theme: 'light'
    }
  });

  const html = component.instance.render_to_html();
  
  assert.is(html.includes('joystick-teaser'), true);
  assert.is(html.includes('/joystick_logo_light.svg'), true);
  assert.is(html.includes('alt="Joystick"'), true);
  assert.is(html.includes('This is a demo app built with Joystick'), true);
  assert.is(html.includes('Test Drive Joystick'), true);
});

test.that('joystick teaser renders with dark theme', async (assert = {}) => {
  const component = await test.render('ui/components/joystick_teaser/index.js', {
    props: {
      theme: 'dark'
    }
  });

  const html = component.instance.render_to_html();
  
  assert.is(html.includes('joystick-teaser'), true);
  assert.is(html.includes('/joystick_logo_dark.svg'), true);
  assert.is(html.includes('alt="Joystick"'), true);
});

test.that('joystick teaser renders promotional content', async (assert = {}) => {
  const component = await test.render('ui/components/joystick_teaser/index.js', {
    props: {
      theme: 'light'
    }
  });

  const html = component.instance.render_to_html();
  
  assert.is(html.includes('JavaScript framework for SaaS apps'), true);
  assert.is(html.includes('Building your own SaaS?'), true);
  assert.is(html.includes('Tired of time-wasting tools'), true);
  assert.is(html.includes('frustrating frameworks?'), true);
});

test.that('joystick teaser renders call-to-action button', async (assert = {}) => {
  const component = await test.render('ui/components/joystick_teaser/index.js', {
    props: {
      theme: 'light'
    }
  });

  const html = component.instance.render_to_html();
  
  assert.is(html.includes('mod-button'), true);
  assert.is(html.includes('mod-button-brand'), true);
  assert.is(html.includes('mod-button-block'), true);
  assert.is(html.includes('mod-button-icon-prefixed'), true);
  assert.is(html.includes('mod-icon-rocket'), true);
  assert.is(html.includes('Test Drive Joystick'), true);
});

test.that('joystick teaser renders correct link with UTM parameters', async (assert = {}) => {
  const component = await test.render('ui/components/joystick_teaser/index.js', {
    props: {
      theme: 'light'
    }
  });

  const html = component.instance.render_to_html();
  
  assert.is(html.includes('https://cheatcode.co/joystick'), true);
  assert.is(html.includes('utm_source=solotrack'), true);
  assert.is(html.includes('utm_medium=demo'), true);
  assert.is(html.includes('utm_campaign=solotrack'), true);
});

test.that('joystick teaser renders without theme prop', async (assert = {}) => {
  const component = await test.render('ui/components/joystick_teaser/index.js', {
    props: {}
  });

  const html = component.instance.render_to_html();
  
  assert.is(html.includes('joystick-teaser'), true);
  assert.is(html.includes('/joystick_logo_undefined.svg'), true);
  assert.is(html.includes('Test Drive Joystick'), true);
});

test.that('joystick teaser has proper CSS structure', async (assert = {}) => {
  const component = await test.render('ui/components/joystick_teaser/index.js', {
    props: {
      theme: 'light'
    }
  });

  const html = component.instance.render_to_html();
  
  // Check that the main container div has the correct class
  assert.is(html.includes('<div class="joystick-teaser">'), true);
  
  // Check that image is properly structured
  assert.is(html.includes('<img src="/joystick_logo_light.svg" alt="Joystick" />'), true);
  
  // Check that paragraph contains the promotional text
  assert.is(html.includes('<p><strong>This is a demo app built with Joystick'), true);
  
  // Check that the link has all the required CSS classes
  assert.is(html.includes('class="mod-button mod-button-brand mod-button-block mod-button-icon-prefixed"'), true);
});

test.that('joystick teaser renders complete promotional message', async (assert = {}) => {
  const component = await test.render('ui/components/joystick_teaser/index.js', {
    props: {
      theme: 'light'
    }
  });

  const html = component.instance.render_to_html();
  
  const expectedMessage = 'This is a demo app built with Joystick, the JavaScript framework for SaaS apps';
  const expectedQuestion = 'Building your own SaaS? Tired of time-wasting tools and frustrating frameworks?';
  
  assert.is(html.includes(expectedMessage), true);
  assert.is(html.includes(expectedQuestion), true);
});
