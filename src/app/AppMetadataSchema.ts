import { z } from 'zod';

import { AppMetadataSchemaId } from './AppMetadataSchemaId';
import {
  Markdown,
  NonEmptyStringSchema,
  URI,
  MarkdownSchema,
  UriSchema,
  SignatureSchema,
  Signature,
} from '../primitives';

/**
 * The app metadata
 */
export type AppMetadata = {
  /**
   * The schema id.
   */
  $schema: AppMetadataSchemaId.LATEST;
  /**
   * The metadata details.
   */
  lens: AppMetadataDetails;
  /**
   * A cryptographic signature of the `lens` data.
   */
  signature?: Signature;
};

export type AppMetadataDetails = {
  /**
   * The name of the app.
   */
  name: string;
  /**
   * A memorable phrase to capture the essence of the app.
   */
  tagline?: string;
  /**
   * An optional short and detailed description of the app, explaining its features and purpose.
   */
  description?: Markdown;
  /**
   * The Logo icon for the app.
   */
  logo?: URI;
  /**
   * The url of the app.
   */
  url: URI;
  /**
   * The Developer of the app.
   */
  developer: string;
  /**
   * The platforms supported by the app. Currently supports `web`, `ios` and `android`.
   */
  platforms: Platform[];
  /**
   * The terms of service for the app.
   */
  termsOfService?: URI;
  /**
   * The privacy policy for the app.
   */
  privacyPolicy?: URI;
};

export enum Platform {
  WEB = 'web',
  IOS = 'ios',
  ANDROID = 'android',
}

const AppMetadataDetailsSchema = z.object({
  name: NonEmptyStringSchema.describe('The name of the app.'),
  tagline: NonEmptyStringSchema.optional().describe(
    'A memorable phrase to capture the essence of the app.',
  ),
  description: MarkdownSchema.optional().describe(
    'An optional short and detailed description of the app, explaining its features and purpose.',
  ),
  logo: UriSchema.optional().describe('The Logo icon for the app.'),
  url: UriSchema.describe('The url of the app.'),
  developer: NonEmptyStringSchema.describe('The Developer of the app.'),
  platforms: z.array(z.nativeEnum(Platform)).describe('The platforms supported by the app.'),
  termsOfService: UriSchema.optional().describe('The terms of service for the app.'),
  privacyPolicy: UriSchema.optional().describe('The privacy policy for the app.'),
});

export const AppMetadataSchema = z.object({
  $schema: z.literal(AppMetadataSchemaId.LATEST),
  lens: AppMetadataDetailsSchema,
  signature: SignatureSchema.optional(),
});
