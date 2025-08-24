import { createContext } from 'react';

import { UIStore } from './uiStores';

interface Store {
  uiStore: UIStore;
}

export const store: Store = {
  uiStore: new UIStore(),
};

export const StoreContext = createContext(store);
