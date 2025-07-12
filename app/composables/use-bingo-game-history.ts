import type { BingoGame } from "~/types/bingo";

export function useBingoGameHistory() {
    return useState<BingoGame[] | null>('bingo_game_history', () => null)
}
