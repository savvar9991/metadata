#!/usr/bin/env -S npx tsx

import { join } from 'path';

import fs from 'fs-extra';
import { z } from 'zod';
import { zodToJsonSchema } from 'zod-to-json-schema';

import {
  AdvancedContractConditionSchema,
  AnyMediaSchema,
  ArticleSchema,
  AudioSchema,
  CheckingInSchema,
  CollectConditionSchema,
  EmbedSchema,
  EoaOwnershipConditionSchema,
  Erc20OwnershipConditionSchema,
  EventSchema,
  FollowConditionSchema,
  ImageSchema,
  LinkSchema,
  LiveStreamSchema,
  Nft721MetadataAttributeSchema,
  MediaAudioSchema,
  MediaImageSchema,
  MediaVideoSchema,
  MetadataAttributeSchema,
  MetadataLicenseTypeSchema,
  MintSchema,
  NetworkAddressSchema,
  NftOwnershipConditionSchema,
  AccountMetadataSchema,
  ProfileOwnershipConditionSchema,
  PublicationEncryptionStrategySchema,
  SpaceSchema,
  StorySchema,
  TextOnlySchema,
  ThreeDSchema,
  TransactionSchema,
  VideoSchema,
  LegacyProfileIdSchema,
  EvmAddressSchema,
  AccessConditionSchema,
  LegacyPublicationIdSchema,
  AmountSchema,
  TagSchema,
  GeoURISchema,
  PhysicalAddressSchema,
  EncryptedStringSchema,
  EncryptableUriSchema,
  EncryptableGeoURISchema,
  ChainIdSchema,
  PostMetadataSchema,
  SignatureSchema,
  LocaleSchema,
  EncryptableMarkdownSchema,
  MetadataIdSchema,
  ContentWarningSchema,
  EncryptableDateTimeSchema,
  NonEmptyStringSchema,
  EncryptableStringSchema,
  UriSchema,
  MarkdownSchema,
  ModuleMetadataSchema,
  AppMetadataSchema,
  GraphMetadataSchema,
  FeedMetadataSchema,
  GroupMetadataSchema,
  UsernameMetadataSchema,
  PostMainFocusSchema,
  SponsorshipMetadataSchema,
} from '../src';

const outputDir = 'jsonschemas';

await fs.ensureDir(outputDir);

// Post schemas
const schemas = new Map<string, z.ZodSchema<unknown>>([
  ['posts/3d/3.0.0.json', ThreeDSchema],
  ['posts/article/3.0.0.json', ArticleSchema],
  ['posts/audio/3.0.0.json', AudioSchema],
  ['posts/checking-in/3.0.0.json', CheckingInSchema],
  ['posts/embed/3.0.0.json', EmbedSchema],
  ['posts/event/3.0.0.json', EventSchema],
  ['posts/image/3.0.0.json', ImageSchema],
  ['posts/link/3.0.0.json', LinkSchema],
  ['posts/livestream/3.0.0.json', LiveStreamSchema],
  ['posts/mint/3.0.0.json', MintSchema],
  ['posts/space/3.0.0.json', SpaceSchema],
  ['posts/story/3.0.0.json', StorySchema],
  ['posts/text-only/3.0.0.json', TextOnlySchema],
  ['posts/transaction/3.0.0.json', TransactionSchema],
  ['posts/video/3.0.0.json', VideoSchema],
]);

for (const [path, Schema] of schemas) {
  const outputFile = join(outputDir, path);

  await fs.ensureFile(outputFile);

  const jsonSchema = zodToJsonSchema(Schema, {
    target: 'jsonSchema7',
    definitionPath: '$defs',
    definitions: {
      NonEmptyString: NonEmptyStringSchema,
      Markdown: MarkdownSchema,
      Uri: UriSchema,
      AccessCondition: AccessConditionSchema,
      AdvancedContractCondition: AdvancedContractConditionSchema,
      Amount: AmountSchema,
      AnyMedia: AnyMediaSchema,
      ChainId: ChainIdSchema,
      CollectCondition: CollectConditionSchema,
      EncryptableUri: EncryptableUriSchema,
      EncryptedString: EncryptedStringSchema,
      EncryptableString: EncryptableStringSchema,
      EoaOwnershipCondition: EoaOwnershipConditionSchema,
      Erc20OwnershipCondition: Erc20OwnershipConditionSchema,
      EvmAddress: EvmAddressSchema,
      FollowCondition: FollowConditionSchema,
      GeoURI: GeoURISchema,
      LegacyProfileId: LegacyProfileIdSchema,
      LegacyPublicationId: LegacyPublicationIdSchema,
      MarketplaceMetadataAttribute: Nft721MetadataAttributeSchema,
      MediaAudio: MediaAudioSchema,
      MediaImage: MediaImageSchema,
      MediaVideo: MediaVideoSchema,
      MetadataAttribute: MetadataAttributeSchema,
      MetadataLicenseType: MetadataLicenseTypeSchema,
      NetworkAddress: NetworkAddressSchema,
      NftOwnershipCondition: NftOwnershipConditionSchema,
      PhysicalAddress: PhysicalAddressSchema,
      ProfileOwnershipCondition: ProfileOwnershipConditionSchema,
      PublicationEncryptionStrategy: PublicationEncryptionStrategySchema,
      Tag: TagSchema,
    },
  });

  await fs.writeJSON(outputFile, jsonSchema, { spaces: 2 });
}

// Umbrella schema
await generateUmbrellaSchema();

// Other schemas
const others = new Map<string, z.ZodSchema<unknown>>([
  ['account/1.0.0.json', AccountMetadataSchema],
  ['app/1.0.0.json', AppMetadataSchema],
  ['graph/1.0.0.json', GraphMetadataSchema],
  ['feed/1.0.0.json', FeedMetadataSchema],
  ['group/1.0.0.json', GroupMetadataSchema],
  ['sponsorship/1.0.0.json', SponsorshipMetadataSchema],
  ['username/1.0.0.json', UsernameMetadataSchema],
]);

for (const [path, Schema] of others) {
  const outputFile = join(outputDir, path);

  await fs.ensureFile(outputFile);

  const jsonSchema = zodToJsonSchema(Schema, {
    target: 'jsonSchema7',
    definitionPath: '$defs',
    definitions: {
      NonEmptyString: NonEmptyStringSchema,
      Uri: UriSchema,
      Markdown: MarkdownSchema,
      MetadataAttribute: MetadataAttributeSchema,
    },
  });

  await fs.writeJSON(outputFile, jsonSchema, { spaces: 2 });
}

// Module schema
const openActions = new Map<string, z.ZodSchema<unknown>>([
  ['module/1.0.0.json', ModuleMetadataSchema],
]);

for (const [path, Schema] of openActions) {
  const outputFile = join(outputDir, path);

  await fs.ensureFile(outputFile);

  const jsonSchema = zodToJsonSchema(Schema, {
    target: 'jsonSchema7',
    definitionPath: '$defs',
    definitions: {
      NonEmptyString: NonEmptyStringSchema,
      MetadataAttribute: MetadataAttributeSchema,
    },
  });

  await fs.writeJSON(outputFile, jsonSchema, { spaces: 2 });
}

async function generateUmbrellaSchema() {
  const outputFile = join(outputDir, 'schema.json');

  await fs.ensureFile(outputFile);

  const jsonSuperSchema = zodToJsonSchema(PostMetadataSchema, {
    target: 'jsonSchema7',
    definitionPath: '$defs',
    $refStrategy: 'root',
    definitions: {
      NonEmptyString: NonEmptyStringSchema,
      Markdown: MarkdownSchema,
      Uri: UriSchema,
      AccessCondition: AccessConditionSchema,
      AdvancedContractCondition: AdvancedContractConditionSchema,
      MainContentFocus: PostMainFocusSchema,
      Amount: AmountSchema,
      AnyMedia: AnyMediaSchema,
      ChainId: ChainIdSchema,
      CollectCondition: CollectConditionSchema,
      EncryptableDateTime: EncryptableDateTimeSchema,
      EncryptableGeoURI: EncryptableGeoURISchema,
      EncryptableMarkdown: EncryptableMarkdownSchema,
      EncryptableString: EncryptableStringSchema,
      EncryptableUri: EncryptableUriSchema,
      EncryptedString: EncryptedStringSchema,
      EoaOwnershipCondition: EoaOwnershipConditionSchema,
      Erc20OwnershipCondition: Erc20OwnershipConditionSchema,
      EvmAddress: EvmAddressSchema,
      FollowCondition: FollowConditionSchema,
      GeoURI: GeoURISchema,
      LegacyProfileId: LegacyProfileIdSchema,
      LegacyPublicationId: LegacyPublicationIdSchema,
      Locale: LocaleSchema,
      MarketplaceMetadataAttribute: Nft721MetadataAttributeSchema,
      MediaAudio: MediaAudioSchema,
      MediaImage: MediaImageSchema,
      MediaVideo: MediaVideoSchema,
      MetadataAttribute: MetadataAttributeSchema,
      MetadataId: MetadataIdSchema,
      MetadataLicenseType: MetadataLicenseTypeSchema,
      NetworkAddress: NetworkAddressSchema,
      NftOwnershipCondition: NftOwnershipConditionSchema,
      PhysicalAddress: PhysicalAddressSchema,
      ProfileOwnershipCondition: ProfileOwnershipConditionSchema,
      PublicationEncryptionStrategy: PublicationEncryptionStrategySchema,
      ContentWarning: ContentWarningSchema,
      Signature: SignatureSchema,
      Tag: TagSchema,
      ArticleMetadata: ArticleSchema,
      AudioMetadata: AudioSchema,
      CheckingInMetadata: CheckingInSchema,
      EmbedMetadata: EmbedSchema,
      EventMetadata: EventSchema,
      ImageMetadata: ImageSchema,
      LinkMetadata: LinkSchema,
      LiveStreamMetadata: LiveStreamSchema,
      MintMetadata: MintSchema,
      SpaceMetadata: SpaceSchema,
      TextOnlyMetadata: TextOnlySchema,
      StoryMetadata: StorySchema,
      TransactionMetadata: TransactionSchema,
      ThreeDMetadata: ThreeDSchema,
      VideoMetadata: VideoSchema,
      AccountMetadata: AccountMetadataSchema,
      ModuleMetadata: ModuleMetadataSchema,
      AppMetadata: AppMetadataSchema,
      GraphMetadata: GraphMetadataSchema,
      FeedMetadata: FeedMetadataSchema,
      GroupMetadata: GroupMetadataSchema,
      SponsorshipMetadata: SponsorshipMetadataSchema,
      UsernameMetadata: UsernameMetadataSchema,
    },
  });

  await fs.writeJSON(outputFile, jsonSuperSchema, { spaces: 2 });
}
