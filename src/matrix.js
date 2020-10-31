class Matrix {

    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;

        this.data = [];

        for (let i = 0; i < rows; i++) {
            let arr = [];
            for (let j = 0; j < cols; j++) {
                arr.push(0);
            }
            this.data.push(arr);
        }
    }

    map(func) {
        this.data = this.data.map((arr, i) => {
            return arr.map((num, j) => {
                return func(num, i, j);
            });
        });

        return this;
    }

    ramdomize() {
        this.map((elm, i, j) => {
            return (Math.random() * 2) - 1;
        })
    }


    print() {
        console.table(this.data);
    }

    static transpose(A) {
        let matrix = new Matrix(A.cols, A.rows);

        matrix.map((num, i, j) => {
            return A.data[j][i];
        });

        return matrix;
    }

    static arrayToMatrix(arr) {
        let matrix = new Matrix(arr.length, 1);

        return matrix.map((elm, i, j) => {
            return arr[i];
        });
    }

    static matrixToArray(A) {
        let arr = [];

        A.map((elm) => {
            arr.push(elm);
        });

        return arr;
    }

    // Operações estáticas Matriz x Escalar


    static escalar_multiply(A, escalar) {
        let matrix = new Matrix(A.rows, A.cols);

        matrix.map((num, i, j) => {
            return A.data[i][j] * escalar;
        });

        return matrix;
    }


    // Operações estáticas Matriz x Matriz

    static hadamard(A, B) {
        let matrix = new Matrix(A.rows, A.cols);

        matrix.map((num, i, j) => {
            return A.data[i][j] * B.data[i][j];
        });

        return matrix;
    }

    static add(A, B) {
        let matrix = new Matrix(A.rows, A.cols);

        matrix.map((num, i, j) => {
            return A.data[i][j] + B.data[i][j];
        });

        return matrix;
    }

    static subtract(A, B) {
        let matrix = new Matrix(A.rows, A.cols);

        matrix.map((num, i, j) => {
            return A.data[i][j] - B.data[i][j];
        });

        return matrix;
    }

    static multiply(A, B) {
        let matrix = new Matrix(A.rows, B.cols);

        matrix.map((num, i, j) => {

            let sum = 0;

            for (let k = 0; k < A.cols; k++) {
                let elm1 = A.data[i][k];
                let elm2 = B.data[k][j];
                sum += elm1 * elm2;
            }

            return sum;

        });

        return matrix;
    }

    static map(A, func) {

        let matrix = new Matrix(A.rows, A.cols);

        matrix.data = A.data.map((arr, i) => {
            return arr.map((num, j) => {
                return func(num, i, j);
            });
        });

        return matrix;
    }

}