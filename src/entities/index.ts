/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: mostwantedlist
 * Interface for Mostwantedlist
 */
export interface Mostwantedlist {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  title?: string;
  /** @wixFieldType text */
  personName?: string;
  /** @wixFieldType number */
  rank?: number;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  personImage?: string;
  /** @wixFieldType rich_text */
  description?: any;
}
