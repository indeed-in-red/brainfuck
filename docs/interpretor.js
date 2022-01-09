class BrainfuckProgram {
    constructor() {
        this.variables = [];
        this.pointer = 0;
        this.iptr = 0 // instruction pointer
        this.loops = [] // array to store loops entry pointer value
        this.string = document.getElementById("code").value;
        this.run()
    }

    run() {
        
        this.ptrright()

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
                    break

                default:
                    break;
            }

            this.iptr++;
        }
    }

    out() { // '.' instruction
        var v = this.variables[this.pointer];
        var char = String.fromCharCode(v);
        console.log(char);
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
            this.loops.push(this.iptr);

        }
        else {
            while(this.string[this.iptr] != ']') {
                this.iptr++
            }
        }
    }

    endloop() {
        if(this.variables[this.pointer] != 0) {
            this.iptr = this.loops[this.loops.length-1]
        }

        else {
            this.loops.pop()
        }
    }
}