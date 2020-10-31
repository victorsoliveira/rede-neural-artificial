function sigmoid(x) {
    return 1 / (1 + Math.exp(-x));
}

function dsigmoid(x) {
    return x * (1 - x);
}

class RedeNeural {

    constructor(i_nodes, h_nodes, o_nodes) {

        this.i_nodes = i_nodes;
        this.h_nodes = h_nodes;
        this.o_nodes = o_nodes;

        this.bias_ih = new Matrix(this.h_nodes, 1);
        this.bias_ih.ramdomize();
        this.bias_ho = new Matrix(this.o_nodes, 1);
        this.bias_ho.ramdomize();

        this.weight_ih = new Matrix(this.h_nodes, this.i_nodes);
        this.weight_ih.ramdomize();

        this.weight_ho = new Matrix(this.o_nodes, this.h_nodes);
        this.weight_ho.ramdomize();

        this.learning_rate = 0.1;
    }

    train(arr, target) {

        // FEEDFOWRARD

        // input --> hidden
        let input = Matrix.arrayToMatrix(arr);

        let hidden = Matrix.multiply(this.weight_ih, input);
        hidden = Matrix.add(hidden, this.bias_ih);
        hidden.map(sigmoid)

        // hidden --> output
        // d(sigmoid) = output * (1-output)
        let output = Matrix.multiply(this.weight_ho, hidden);
        output = Matrix.add(output, this.bias_ho);
        output.map(sigmoid);

        //BACKPROPAGATION

        // output --> hidden
        let expected = Matrix.arrayToMatrix(target);
        let output_error = Matrix.subtract(expected, output);
        let d_output = Matrix.map(output, dsigmoid);
        let hidden_t = Matrix.transpose(hidden);

        let gradient = Matrix.hadamard(output_error, d_output);
        gradient = Matrix.escalar_multiply(gradient, this.learning_rate);

        this.bias_ho = Matrix.add(this.bias_ho, gradient);

        let weight_ho_deltas = Matrix.multiply(gradient, hidden_t);
        this.weight_ho = Matrix.add(this.weight_ho, weight_ho_deltas);


        // hidden --> input
        let weight_ho_t = Matrix.transpose(this.weight_ho);
        let hidden_error = Matrix.multiply(weight_ho_t, output_error);
        let d_hidden = Matrix.map(hidden, dsigmoid);
        let input_t = Matrix.transpose(input);

        let gradient_h = Matrix.hadamard(hidden_error, d_hidden);
        gradient_h = Matrix.escalar_multiply(gradient_h, this.learning_rate);

        this.bias_ih = Matrix.add(this.bias_ih, gradient_h);

        let weights_ih_deltas = Matrix.multiply(gradient_h, input_t);
        this.weight_ih = Matrix.add(this.weight_ih, weights_ih_deltas);
    }

    predict(arr) {

        let input = Matrix.arrayToMatrix(arr);

        let hidden = Matrix.multiply(this.weight_ih, input);
        hidden = Matrix.add(hidden, this.bias_ih);
        hidden.map(sigmoid)

        let output = Matrix.multiply(this.weight_ho, hidden);
        output = Matrix.add(output, this.bias_ho);
        output.map(sigmoid);

        output = Matrix.matrixToArray(output);

        return output;

    }

}