import { VersionGraph } from '@start9labs/start-sdk'
import { current } from './current'
import { v_0_42_0_4 } from './v0.42.0_4'

export const versionGraph = VersionGraph.of({
  current,
  other: [v_0_42_0_4],
})
