import test from '@joystick.js/test';

test.that('debounce function delays execution', async (assert = {}) => {
  const debounce = await test.load('lib/debounce.js', { default: true });
  
  let callCount = 0;
  const testFunction = () => {
    callCount++;
  };
  
  const debouncedFunction = debounce(testFunction, 100);
  
  // Call multiple times quickly
  debouncedFunction();
  debouncedFunction();
  debouncedFunction();
  
  // Should not have been called yet
  assert.is(callCount, 0);
  
  // Wait for debounce delay
  await new Promise(resolve => setTimeout(resolve, 150));
  
  // Should have been called only once
  assert.is(callCount, 1);
});

test.that('debounce function passes arguments correctly', async (assert = {}) => {
  const debounce = await test.load('lib/debounce.js', { default: true });
  
  let receivedArgs = null;
  const testFunction = (...args) => {
    receivedArgs = args;
  };
  
  const debouncedFunction = debounce(testFunction, 50);
  
  debouncedFunction('test', 123, { key: 'value' });
  
  await new Promise(resolve => setTimeout(resolve, 100));
  
  assert.is(Array.isArray(receivedArgs), true);
  assert.is(receivedArgs.length, 3);
  assert.is(receivedArgs[0], 'test');
  assert.is(receivedArgs[1], 123);
  assert.is(typeof receivedArgs[2], 'object');
  assert.is(receivedArgs[2].key, 'value');
});

test.that('debounce function resets timer on subsequent calls', async (assert = {}) => {
  const debounce = await test.load('lib/debounce.js', { default: true });
  
  let callCount = 0;
  const testFunction = () => {
    callCount++;
  };
  
  const debouncedFunction = debounce(testFunction, 100);
  
  debouncedFunction();
  
  // Wait 50ms and call again (should reset timer)
  await new Promise(resolve => setTimeout(resolve, 50));
  debouncedFunction();
  
  // Wait another 50ms (total 100ms from first call, but only 50ms from second)
  await new Promise(resolve => setTimeout(resolve, 50));
  assert.is(callCount, 0);
  
  // Wait another 60ms (total 110ms from second call)
  await new Promise(resolve => setTimeout(resolve, 60));
  assert.is(callCount, 1);
});

test.after(async () => {
  // Cleanup after all tests in this file
});
