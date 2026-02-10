module.exports = {
  resolveSnapshotPath: (testPath, snapshotExtension) =>
    testPath.replace("/__tests__/", "/__tests__/snapshots/") + snapshotExtension,
  resolveTestPath: (snapshotFilePath, snapshotExtension) =>
    snapshotFilePath
      .replace("/__tests__/snapshots/", "/__tests__/")
      .slice(0, -snapshotExtension.length),
  testPathForConsistencyCheck:
    "components/Accordion/__tests__/Accordion.unit.test.tsx",
};
