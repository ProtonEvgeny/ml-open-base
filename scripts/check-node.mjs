const MIN_MAJOR = 22;
const MIN_MINOR = 19;

const [major, minor] = process.versions.node.split(".").map(Number);
const supported = major > MIN_MAJOR || (major === MIN_MAJOR && minor >= MIN_MINOR);

if (!supported) {
  console.error(
    `\nBlume requires Node.js >=${MIN_MAJOR}.${MIN_MINOR}.0, but this shell runs ${process.version}.\n` +
      `Run \`nvm use\` in this folder (the version is pinned in .nvmrc) and try again.\n`
  );
  process.exit(1);
}
