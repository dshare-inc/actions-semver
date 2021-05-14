export const version: (original: string) => {
  prefix: string | null
  version: string
  suffix: string | null
} = (original: string) => {
  const groups = original.match(/^(?<prefix>[A-z0-9-_]+:|)(?<version>.*?)(?<suffix>:[A-z0-9-_]+|)$/)?.groups;
  if (groups === undefined) {
    throw new Error(`❌ Invalid Version ${original}`);
  }

  return {
    ...groups,
    prefix: groups.prefix === '' ? null : groups.prefix.replace(':', ''),
    suffix: groups.suffix === '' ? null : groups.suffix.replace(':', ''),
  } as {
    prefix: string | null,
    version: string,
    suffix: string | null,
  };
}

export const result: (version: { version: string, prefix: string | null, suffix: string | null }, options: {
  prefix: boolean,
  suffix: boolean
}) => string = (version, options) => `${options.prefix && version.prefix !== null ? `${(version.prefix ?? '')}:` : ''}${version.version}${options.suffix && version.suffix !== null ? `:${(version.suffix ?? '')}` : ''}`;

