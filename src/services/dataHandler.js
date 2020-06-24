import ExampleError from "./../errors/ExampleError";

export async function getData(context) {
  context.start("getData");
  context.stop();
  throw new ExampleError("TODO: Implement me!");
}

export async function readinessCheck() {
  return true;
}
