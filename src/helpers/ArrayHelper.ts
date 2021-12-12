export function getRandomItem<T>(items: T[]): T | undefined {
  const index = Math.floor(Math.random() * items.length);
  return items[index];
}
