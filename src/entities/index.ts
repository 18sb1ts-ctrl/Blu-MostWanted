/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file
 */

/**
 * Collection ID: mostwantedlist
 * Interface for MostWantedList
 */
export interface MostWantedList {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType number */
  rank?: number;
  /** @wixFieldType text */
  personName?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  personImage?: string;
  /** @wixFieldType text */
  description1?: string;
  /** @wixFieldType text */
  lastKnownLocation?: string;
}
