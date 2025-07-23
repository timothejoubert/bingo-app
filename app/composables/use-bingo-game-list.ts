import type { BingoGame } from "~/types/bingo";

export function useBingoGameList() {
    return useState<BingoGame[] | null>('bingo_game_list', () => null)
}
