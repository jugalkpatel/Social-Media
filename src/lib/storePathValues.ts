export function storePathValues() {
  const storage = globalThis?.sessionStorage;

  if (!storage) return;

  const prevPath = storage.getItem('currentPath');

  storage.setItem('prevPath', prevPath);

  storage.setItem('currentPath', globalThis.location.pathname);
}

export function getPrevPath(): string | null {
  const storage = globalThis?.sessionStorage;

  if (!storage) {
    return null;
  }

  return storage.getItem('prevPath');
}

export function getCurrentPath(): string | null {
  const storage = globalThis?.sessionStorage;

  if (!storage) {
    return null;
  }

  return storage.getItem('currentPath');
}
