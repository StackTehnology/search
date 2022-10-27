
export default async function getOrThrowAsync<T> (promise: Promise<T | null>): Promise<T> {
  return getOrThrow(await promise)
}

export function getOrThrow<T> (result: T | null): T {
  if (!result) {
    throw Error('Server error')
  }
  return result
}
