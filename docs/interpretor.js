class BrainfuckProgram {
    constructor() {
        this.variables = [0];
        this.pointer = 0;
        this.iptr = 0 // instruction pointer
        this.loops = [] // array to store loops entry pointer value
        this.string = document.getElementById("code").value;
        this.run()
    }

    run() {

        while(this.iptr < this.string.length) {

            switch (this.string[this.iptr]) {
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

                case "[":
                    this.newloop();
                    break
                
                case "]":
                    this.endloop();

                default:
                    break;
            }

            this.iptr++;
        }
    }

    out() { // '.' instruction
        var v = this.variables[this.pointer];
        var char = String.fromCharCode(v);
        console.log(v);
        document.getElementById('out').innerHTML += char;
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

    newloop() {
        if(this.variables[this.pointer] != 0) {
            this.loops.push(this.iptr - 1);

        }
        else {
            var x = 1;
            var p = this.iptr + 1;
            while(x) {
                if(this.string[p] == '[') {
                    x += 1;
                }
                else if(this.string[p] == ']') {
                    x -= 1;
                }
                p++;
            }
            this.iptr = p - 1;
        }
    }

    endloop() {
        this.iptr = this.loops.pop();
    }
}