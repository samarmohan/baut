export function isStringBuildWithNumbersOnly(input: string): boolean {
  return input.match(/^\d+$/) !== null;
}
