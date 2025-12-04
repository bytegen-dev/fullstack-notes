/**
 * Base Prettier configuration for the fullstack-notes monorepo.
 * Extended by individual packages with their specific needs.
 *
 * @type {import('prettier').Config}
 */
const config = {
  trailingComma: "all",
  tabWidth: 2,
  semi: true,
  singleQuote: false,
};

export default config;

