class SudokuSolver {
    constructor() {
        this.grid = Array(9).fill().map(() => Array(9).fill(0));
        this.originalGrid = Array(9).fill().map(() => Array(9).fill(0));
        this.initializeGrid();
        this.bindEvents();
    }

    initializeGrid() {
        const gridContainer = document.getElementById('sudoku-grid');
        gridContainer.innerHTML = '';
        
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                cell.contentEditable = true;
                cell.dataset.row = row;
                cell.dataset.col = col;
                
                // Add event listeners
                cell.addEventListener('input', (e) => this.handleCellInput(e));
                cell.addEventListener('keydown', (e) => this.handleKeyDown(e));
                cell.addEventListener('focus', (e) => this.handleCellFocus(e));
                
                gridContainer.appendChild(cell);
            }
        }
    }

    bindEvents() {
        document.getElementById('solve-btn').addEventListener('click', () => this.solvePuzzle());
        document.getElementById('clear-btn').addEventListener('click', () => this.clearGrid());
        document.getElementById('example-btn').addEventListener('click', () => this.loadExample());
    }

    handleCellInput(event) {
        const cell = event.target;
        const value = cell.textContent.trim();
        const row = parseInt(cell.dataset.row);
        const col = parseInt(cell.dataset.col);

        // Allow only digits 1-9 or empty
        if (value === '' || value === '0') {
            this.grid[row][col] = 0;
            cell.textContent = '';
            cell.classList.remove('invalid', 'given');
        } else if (/^[1-9]$/.test(value)) {
            this.grid[row][col] = parseInt(value);
            cell.textContent = value;
            cell.classList.remove('invalid');
            cell.classList.add('given');
            
            // Validate the move
            if (!this.isValidMove(row, col, parseInt(value))) {
                cell.classList.add('invalid');
                this.showStatus('Invalid move! Number conflicts with existing numbers.', 'error');
            } else {
                this.showStatus('', '');
            }
        } else {
            // Invalid input - revert
            cell.textContent = this.grid[row][col] === 0 ? '' : this.grid[row][col].toString();
        }
    }

    handleKeyDown(event) {
        // Allow navigation with arrow keys
        if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
            event.preventDefault();
            this.navigateGrid(event.target, event.key);
        } else if (event.key === 'Backspace' || event.key === 'Delete') {
            event.target.textContent = '';
            const row = parseInt(event.target.dataset.row);
            const col = parseInt(event.target.dataset.col);
            this.grid[row][col] = 0;
            event.target.classList.remove('given', 'invalid');
        }
    }

    handleCellFocus(event) {
        event.target.select();
    }

    navigateGrid(currentCell, direction) {
        const row = parseInt(currentCell.dataset.row);
        const col = parseInt(currentCell.dataset.col);
        let newRow = row, newCol = col;

        switch (direction) {
            case 'ArrowUp': newRow = Math.max(0, row - 1); break;
            case 'ArrowDown': newRow = Math.min(8, row + 1); break;
            case 'ArrowLeft': newCol = Math.max(0, col - 1); break;
            case 'ArrowRight': newCol = Math.min(8, col + 1); break;
        }

        if (newRow !== row || newCol !== col) {
            const newCell = document.querySelector(`[data-row="${newRow}"][data-col="${newCol}"]`);
            newCell.focus();
        }
    }

    isValidMove(row, col, num) {
        // Check row
        for (let c = 0; c < 9; c++) {
            if (c !== col && this.grid[row][c] === num) {
                return false;
            }
        }

        // Check column
        for (let r = 0; r < 9; r++) {
            if (r !== row && this.grid[r][col] === num) {
                return false;
            }
        }

        // Check 3x3 box
        const boxRow = Math.floor(row / 3) * 3;
        const boxCol = Math.floor(col / 3) * 3;
        
        for (let r = boxRow; r < boxRow + 3; r++) {
            for (let c = boxCol; c < boxCol + 3; c++) {
                if ((r !== row || c !== col) && this.grid[r][c] === num) {
                    return false;
                }
            }
        }

        return true;
    }

    async solvePuzzle() {
        // Save original state
        this.originalGrid = this.grid.map(row => [...row]);
        
        this.showStatus('Solving puzzle...', 'info');
        document.getElementById('solve-btn').disabled = true;
        
        // Add a small delay to show the status
        await new Promise(resolve => setTimeout(resolve, 100));
        
        const startTime = Date.now();
        const solved = await this.solve();
        const endTime = Date.now();
        
        document.getElementById('solve-btn').disabled = false;
        
        if (solved) {
            this.updateGridDisplay();
            this.showStatus(`Puzzle solved in ${endTime - startTime}ms!`, 'success');
        } else {
            this.showStatus('No solution exists for this puzzle!', 'error');
        }
    }

    async solve() {
        const empty = this.findEmptyCell();
        if (!empty) {
            return true; // Puzzle solved
        }

        const [row, col] = empty;
        
        for (let num = 1; num <= 9; num++) {
            if (this.isValidMove(row, col, num)) {
                this.grid[row][col] = num;
                
                // Add visual feedback during solving (optional)
                await new Promise(resolve => setTimeout(resolve, 1));
                
                if (await this.solve()) {
                    return true;
                }
                
                this.grid[row][col] = 0; // Backtrack
            }
        }
        
        return false;
    }

    findEmptyCell() {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (this.grid[row][col] === 0) {
                    return [row, col];
                }
            }
        }
        return null;
    }

    updateGridDisplay() {
        const cells = document.querySelectorAll('.cell');
        cells.forEach(cell => {
            const row = parseInt(cell.dataset.row);
            const col = parseInt(cell.dataset.col);
            const value = this.grid[row][col];
            
            if (value !== 0) {
                cell.textContent = value.toString();
                
                // Mark as solved if it wasn't in the original puzzle
                if (this.originalGrid[row][col] === 0) {
                    cell.classList.add('solved');
                    cell.classList.remove('given');
                } else {
                    cell.classList.add('given');
                }
            }
            
            cell.classList.remove('invalid');
        });
    }

    clearGrid() {
        this.grid = Array(9).fill().map(() => Array(9).fill(0));
        
        const cells = document.querySelectorAll('.cell');
        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('given', 'solved', 'invalid');
        });
        
        this.showStatus('Grid cleared!', 'info');
    }

    loadExample() {
        // Example Sudoku puzzle (medium difficulty)
        const example = [
            [5, 3, 0, 0, 7, 0, 0, 0, 0],
            [6, 0, 0, 1, 9, 5, 0, 0, 0],
            [0, 9, 8, 0, 0, 0, 0, 6, 0],
            [8, 0, 0, 0, 6, 0, 0, 0, 3],
            [4, 0, 0, 8, 0, 3, 0, 0, 1],
            [7, 0, 0, 0, 2, 0, 0, 0, 6],
            [0, 6, 0, 0, 0, 0, 2, 8, 0],
            [0, 0, 0, 4, 1, 9, 0, 0, 5],
            [0, 0, 0, 0, 8, 0, 0, 7, 9]
        ];
        
        this.grid = example.map(row => [...row]);
        
        const cells = document.querySelectorAll('.cell');
        cells.forEach(cell => {
            const row = parseInt(cell.dataset.row);
            const col = parseInt(cell.dataset.col);
            const value = this.grid[row][col];
            
            cell.classList.remove('given', 'solved', 'invalid');
            
            if (value !== 0) {
                cell.textContent = value.toString();
                cell.classList.add('given');
            } else {
                cell.textContent = '';
            }
        });
        
        this.showStatus('Example puzzle loaded! Click "Solve Puzzle" to see the solution.', 'info');
    }

    showStatus(message, type) {
        const statusEl = document.getElementById('status');
        statusEl.textContent = message;
        statusEl.className = `status ${type}`;
    }
}

// Initialize the Sudoku solver when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new SudokuSolver();
});