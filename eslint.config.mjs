import recommended from "@tobysmith568/eslint-config";
import browser from "@tobysmith568/eslint-config/browser";
import node from "@tobysmith568/eslint-config/node";
import prettier from "@tobysmith568/eslint-config/prettier";
import react from "@tobysmith568/eslint-config/react";
import test from "@tobysmith568/eslint-config/test";
import testingLibraryDom from "@tobysmith568/eslint-config/testing-library/dom";
import testingLibraryReact from "@tobysmith568/eslint-config/testing-library/react";
import { defineConfig } from "eslint/config";

export default defineConfig([
  recommended,
  { files: ["src/**"], extends: [browser, react] },
  { files: ["*.config.*", "test-setup/**"], extends: [node] },
  { files: ["**/*.spec.*"], extends: [test, testingLibraryDom, testingLibraryReact] },
  prettier
]);
