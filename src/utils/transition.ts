export interface TransitionOptions {
  ms?: number;
  tFn?: string;
}

const defaults: Required<TransitionOptions> = {
  ms: 300,
  tFn: 'ease',
};

const createTransition = (
  prop: string,
  { ms = defaults.ms, tFn = defaults.tFn }: TransitionOptions = {},
) => `${prop} ${ms}ms ${tFn}`;

const createTransitions = (property: string[] | string, options: TransitionOptions = {}) => {
  const props = Array.isArray(property) ? property : [property];
  return props.map((prop) => createTransition(prop, options)).join(',');
};

export { defaults as transitionDefaults };
export default createTransitions;
