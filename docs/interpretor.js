class BrainfuckProgram {
    constructor() {
        this.variables = [0];
        this.pointer = 0;
        this.iptr = 0 // instruction pointer
        this.loops = [] // array to store loops entry pointer value
        this.string = document.getElementById("code").value.replace(/\r?\n|\r|\s|\t/g, '');
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
        console.log(v);
        document.getElementById('out').value += char;
    }

    in() { // ',' instruction
        var inpelem = document.getElementById("in");
        var inp = inpelem.value[0];
        inpelem.value = inpelem.value.slice(1, inpelem.value.length);
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
        this.variables[this.pointer] += this.variables[this.pointer] != 255 ? 1 : -255;
    }

    sub() {
        this.variables[this.pointer] -= this.variables[this.pointer] ? 1 : -255;
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