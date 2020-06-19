import ExampleError from "./../errors/ExampleError";

export async function getData(jaegerTracer) {
  jaegerTracer.start("getData");
  jaegerTracer.stop();
  throw new ExampleError("TODO: Implement me!");
}

export async function readinessCheck() {
  return true;
}
