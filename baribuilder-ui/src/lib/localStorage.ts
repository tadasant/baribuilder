const LOCAL_STORAGE_KEY = 'BBVITAG';

interface ILocalStorage {
  anonymousUserId: string
  disableShowModal: boolean
}

export const getLocalStorage = (key: keyof ILocalStorage) => {
  const storedValue = window.localStorage.getItem(LOCAL_STORAGE_KEY);
  return storedValue === null ? null : JSON.parse(storedValue)[key];
};

export const setLocalStorage = (key: keyof ILocalStorage, value: any) => {
  const currentValue = window.localStorage.getItem(LOCAL_STORAGE_KEY);
  const currentJson: ILocalStorage = currentValue === null ? {} : JSON.parse(currentValue);
  const newJson: ILocalStorage = {
    ...currentJson,
    [key]: value
  };
  window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newJson));
};
