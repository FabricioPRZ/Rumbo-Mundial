/** Preserve the existing key format so refreshing and upgrades retain the player's seat. */
export const roomStorage = {
  read: (id: string): string | null => localStorage.getItem(`turista:${id}`),
  write: (id: string, token: string): void => localStorage.setItem(`turista:${id}`, token),
};
