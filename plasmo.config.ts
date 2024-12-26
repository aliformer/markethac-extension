import type { PlasmoManifest } from "plasmo"

export const manifest: PlasmoManifest = {
  manifest_version: 3,
  background: {
    service_worker: "background/index.ts",
    type: "module"
  },
  permissions: [
    "cookies",
    "storage",
    "activeTab"
  ],
  host_permissions: [
    "https://*.shopee.co.id/*",
    "https://bridge.markethac.id/*"
  ]
} 