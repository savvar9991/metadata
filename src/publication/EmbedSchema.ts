import { z } from 'zod';

import { PublicationMainFocus } from './PublicationMainFocus.js';
import { SchemaId } from './SchemaId.js';
import {
  AnyMediaSchema,
  mainContentFocus,
  metadataDetailsWith,
  publicationWith,
  uri,
} from './common';

export const EmbedSchema = publicationWith({
  $schema: z.literal(SchemaId.EMBED),

  lens: metadataDetailsWith({
    embed: uri('The embed URL.'),

    mainContentFocus: mainContentFocus(PublicationMainFocus.EMBED),

    attachments: AnyMediaSchema.array()
      .optional()
      .describe('The other attachments you want to include with it.'),
  }),
});
export type Embed = z.infer<typeof EmbedSchema>;
