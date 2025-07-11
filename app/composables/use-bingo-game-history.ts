import type { BingoGame } from "~/types/bingo";

export function useBingoGameHistory() {
    return useState<BingoGame[]>('bingo_game_history', () => [])
}