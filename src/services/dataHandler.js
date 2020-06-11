import ExampleError from "./../errors/ExampleError";

export async function getData() {
  throw new ExampleError("TODO: Implement me!");
}

export async function readinessCheck() {
  return true;
}
