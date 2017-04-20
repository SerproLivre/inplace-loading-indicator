export function runUnitTests(fun: VoidFunction) {
  if (process && process.env) {
    if (process.env.UNIT_TESTS || (process.env.UNIT_TESTS === undefined && process.env.INTEGRATION_TESTS === undefined)) {
      return fun;
    }
  } else {
    return fun;
  }
  return () => { };
}

export function runIntegrationTests(fun: VoidFunction) {
  if (process && process.env) {
    if (process.env.INTEGRATION_TESTS || (process.env.UNIT_TESTS === undefined && process.env.INTEGRATION_TESTS === undefined)) {
      return fun;
    }
  } else {
    return fun;
  }
  return () => { };
}
