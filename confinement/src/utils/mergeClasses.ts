export function mergeClasses(...classes: (string | false | undefined | null)[]) {
  return classes.filter(Boolean).join(' ');
}
