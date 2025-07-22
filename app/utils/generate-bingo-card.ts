export type GridCell = number | null;
export type BingoCardGrid = GridCell[][];

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateBingoCardGrid(): BingoCardGrid {
  const rows = 3;
  const cols = 8;
  const totalNumbers = 15;

  const grid: BingoCardGrid = Array.from({ length: rows }, () => Array<GridCell>(cols).fill(null));

  const columnRanges: [number, number][] = [
    [1, 10],
    [11, 20],
    [21, 30],
    [31, 40],
    [41, 50],
    [51, 60],
    [61, 70],
    [71, 89]
  ];

  const columnNumbers: number[][] = [];
  let total = 0;

  // Étape 1 : générer les numéros de chaque colonne
  for (let i = 0; i < cols; i++) {
    const [min, max] = columnRanges[i] || [0, 0]
    const remaining = totalNumbers - total;
    const maxThisCol = Math.min(2, remaining);
    const count = (Math.random() < 0.5 || maxThisCol === 1) ? 1 : 2;

    const numbers = new Set<number>();
    while (numbers.size < count) {
      numbers.add(getRandomInt(min, max));
    }

    const sortedNumbers = Array.from(numbers).sort((a, b) => a - b);
    columnNumbers.push(sortedNumbers);
    total += sortedNumbers.length;
  }

  // Vérification du total
  const currentTotal = columnNumbers.reduce((acc, col) => acc + col.length, 0);
  if (currentTotal !== totalNumbers) {
    return generateBingoCardGrid(); // relancer si pas bon
  }

  // Étape 2 : placer les numéros dans la grille, ligne par ligne
  const rowCounts = Array(rows).fill(0);

  for (let col = 0; col < cols; col++) {
    const nums = columnNumbers[col];

    if (nums?.length === 2) {
      const availableRows = [0, 1, 2].filter(r => rowCounts[r] < 5);
      availableRows.sort((a, b) => rowCounts[a] - rowCounts[b]);

      grid[availableRows[0]][col] = nums[0];
      grid[availableRows[1]][col] = nums[1];
      rowCounts[availableRows[0]]++;
      rowCounts[availableRows[1]]++;
    } else if (nums.length === 1) {
      const availableRow = [0, 1, 2].sort((a, b) => rowCounts[a] - rowCounts[b])[0];
      grid[availableRow][col] = nums[0];
      rowCounts[availableRow]++;
    }
  }

  // Vérification finale : chaque ligne doit avoir 5 numéros
  if (rowCounts.some(count => count !== 5)) {
    return generateBingoCardGrid(); // relancer si placement invalide
  }

  return grid;
}
