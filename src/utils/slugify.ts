/**
 * Slugify a string
 * @param text The string to slugify
 * @returns The slugified string
 */
export const slugify = (text: string): string => {
  return text
    .toLowerCase() // Convert to lowercase
    .trim() // Remove spaces at the start and end
    .normalize('NFD') // Normalize accented characters
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics (accents)
    .replace(/[^a-z0-9\s-]/g, '') // Remove non-alphanumeric characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Remove duplicate hyphens
}
