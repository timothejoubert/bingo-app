export const ROOM_ID_LENGTH = 6

export function generateId(length = 3): string {
  return Math.random().toString(36).substring(2, 2 + length).toUpperCase()
}


export function generateRoomId(): string {
  return generateId(ROOM_ID_LENGTH)
}
