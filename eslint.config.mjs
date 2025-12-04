import { defineConfig } from "eslint/config";
import prettier from "eslint-config-prettier/flat";
import tseslint from "typescript-eslint";

/**
 * Base ESLint configuration for the fullstack-notes monorepo.
 */
const baseConfig = defineConfig([
  ...tseslint.configs.recommended,
  prettier,
  {
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          varsIgnorePattern: "^_",
          argsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
        },
      ],
    },
  },
]);

export default baseConfig;

