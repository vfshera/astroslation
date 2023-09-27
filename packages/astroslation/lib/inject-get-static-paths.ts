import type { Plugin } from "vite";
import { VITE_PLUGIN_INJECT_GET_STATIC_PATHS } from "./constants";

export default function injectGetStaticPaths(): Plugin {
  return {
    name: VITE_PLUGIN_INJECT_GET_STATIC_PATHS,
  };
}
