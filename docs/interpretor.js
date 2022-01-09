class BrainfuckProgram {
    constructor() {
        this.variables = [];
        this.pointer = 0;
        this.string = document.getElementById("code").value;
        this.run()
    }

    run() {
        [...this.string].forEach(el => {
            switch (el) {
                case ".":
                    this.out();
                    break;

                case ",":
                    this.in();
                    break

                case ">":
                    this.ptrright();
                    break

                case "<":
                    this.ptrleft();
                    break
                
                case "+":
                    this.add();
                    break
                
                case "-":
                    this.sub();
                    break

                default:
                    break;
            }
        });
    }

    out() { // '.' instruction
        var v = this.variables[this.pointer];
        var char = String.fromCharCode(v);
        console.log(char);
        alert(char);
    }

    in() { // ',' instruction
        var inp = prompt();
        this.variables[this.pointer] = inp.charCodeAt(0);
    }

    ptrright() { // '>' intruction | adds 1 to the pointer
        this.pointer++;
        if(!this.variables[this.pointer]) {
            this.variables[this.pointer] = 0;
        }
    }

    ptrleft() { // '<' instruction
        this.pointer -= this.pointer ? 1 : 0;
    }

    add() {
        this.variables[this.pointer]++;
    }

    sub() {
        this.variables[this.pointer]--;
    }
}