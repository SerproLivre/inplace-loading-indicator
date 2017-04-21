
export function isIntegrationTestEnabled() {
  return (process.env.INTEGRATION_TESTS || (process.env.UNIT_TESTS === undefined && process.env.INTEGRATION_TESTS === undefined));
}

export function isUnitTestEnabled() {
  return (process.env.INTEGRATION_TESTS || (process.env.UNIT_TESTS === undefined && process.env.INTEGRATION_TESTS === undefined));
}

export function runUnitTests(fun: VoidFunction) {
  if (process && process.env) {
    if (isUnitTestEnabled()) {
      return fun;
    }
  } else {
    return fun;
  }
  return () => { };
}

export function runIntegrationTests(fun: VoidFunction) {
  if (process && process.env) {
    if (isIntegrationTestEnabled()) {
      return fun;
    }
  } else {
    return fun;
  }
  return () => { };
}
