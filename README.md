
# 🧩 Sudoku Solver Web App

A web-based Sudoku solver that takes user input for a 9x9 grid and **automatically solves the puzzle** using a backtracking algorithm. Built using **HTML**, **CSS**, and **JavaScript**, this app provides a visual and interactive way to solve Sudoku puzzles instantly.

---

## 🎯 Features

- Interactive 9x9 Sudoku grid input
- Automatic puzzle solving using backtracking algorithm
- Input validation for valid Sudoku format
- Instant solution rendering on the grid
- Clear and reset options
- Responsive UI design

---

## 📁 Project Structure

```

sudoku-solver/
│
├── index.html        # HTML structure of the page
├── style/
│   └── style.css     # Grid layout and visual styling
└── script/
└── script.js     # Sudoku solving logic and DOM interaction

````

---

## 🚀 Getting Started

To run this project locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/sudoku-solver.git
````

2. Navigate into the project directory:

   ```bash
   cd sudoku-solver
   ```

3. Open `index.html` in your preferred browser.

---

## 📸 Screenshots
```
<img width="848" height="872" alt="Screenshot 2025-08-07 151929" src="https://github.com/user-attachments/assets/4d4459ce-669a-4f41-9d5e-4a21518b45ca" />
<img width="823" height="790" alt="image" src="https://github.com/user-attachments/assets/b63f158a-a39b-426f-86b3-01961d129254" />

```
---

## ⚙️ How It Works

* The user fills in the known values on the 9x9 grid.
* When the **Solve** button is clicked, the app:

  1. Validates the input
  2. Applies the **backtracking algorithm** to find a solution
  3. Fills the solution in the grid
* The **Clear** button resets the grid to start over.

---

## 📌 Technologies Used

* **HTML5** – Structure and grid layout
* **CSS3** – Styling and responsiveness
* **JavaScript (Vanilla)** – Core logic, validation, and solving algorithm

---

## 🧠 Algorithm

This solver uses the **Backtracking Algorithm**, a form of recursion, to:

1. Try filling empty cells with valid numbers (1–9)
2. Recursively attempt to solve the grid
3. Backtrack when no valid number fits and try the next possibility

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 🙋‍♂️ Author

**Anurag Patil**
[GitHub Profile](https://github.com/AnuragPatil3781)

---

## 🤝 Contributions

Contributions, issues, and feature requests are welcome!
Feel free to fork the project and submit a pull request.

---

```

Would you like the actual Sudoku solving code in JS too? Or a hosted version link to add to the README?
```
