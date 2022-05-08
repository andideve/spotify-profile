export default function classes(arg: (string | undefined | false)[]) {
  return arg.filter(Boolean).join(' ').replace(/^\s/, '');
}
