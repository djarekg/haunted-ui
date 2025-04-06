/**
 * Get the element type of an array.
 *
 * @template ArrayType Array type.
 * @returns Element type of the array.
 */
export type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;
