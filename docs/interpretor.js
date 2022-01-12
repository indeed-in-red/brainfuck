class BrainfuckProgram {
    constructor() {
        this.variables = [0];
        this.pointer = 0;
        this.iptr = 0 // instruction pointer
        this.loops = [] // array to store loops entry pointer value
        this.string = document.getElementById("code").value;
        this.pause = false;
        document.getElementById('out').value = '';
        this.run();
    }

    async run() { // async to use await to avoid loop blocking
        this.pause = false;
        document.getElementById('play-pause-button').innerHTML = 'II';
        document.getElementById('play-pause-button').onclick = (e) => { this.stop() };
        while (this.iptr < this.string.length && !this.pause) {

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
                    await new Promise(resolve => setTimeout(resolve, 1)); // avoid blocking window with infinite loop
                    this.endloop();
                    break

                default:
                    break;
            }
            this.iptr++;
        }
        document.getElementById('play-pause-button').innerHTML = '▶';
        document.getElementById('play-pause-button').onclick = (e) => { this.run() };
    }

    stop() {
        this.pause = true;
    }

    out() { // '.' instruction
        var v = this.variables[this.pointer];
        var char = String.fromCharCode(v);
        console.log(v);
        document.getElementById('out').value += char;
    };

    in() { // ',' instruction
        var inpelem = document.getElementById("in");
        if (inpelem.value) {
            var inp = inpelem.value[0];
            inpelem.value = inpelem.value.slice(1, inpelem.value.length);
            this.variables[this.pointer] = inp.charCodeAt(0);
        }
        else {
            inpelem.classList.add('error-no-value');
            inpelem.placeholder = 'Input needed';
            this.stop();
            inpelem.onkeyup = (e) => {
                inpelem.classList.remove('error-no-value');
                this.in();
                this.run();
                inpelem.onkeyup = (e) => { };
                inpelem.placeholder = 'input...';
            };
        };
    };

    ptrright() { // '>' intruction | adds 1 to the pointer
        this.pointer++;
        if (!this.variables[this.pointer]) {
            this.variables[this.pointer] = 0;
        }
        return 0;
    }

    ptrleft() { // '<' instruction
        this.pointer -= this.pointer ? 1 : 0;
        return 0;
    }

    add() {
        this.variables[this.pointer] += this.variables[this.pointer] != 255 ? 1 : -255;
        return 0;
    }

    sub() {
        this.variables[this.pointer] -= this.variables[this.pointer] ? 1 : -255;
        return 0;
    }

    newloop() {
        if (this.variables[this.pointer] != 0) {
            this.loops.push(this.iptr);

        }
        else {
            while (this.string[this.iptr] != ']') {
                this.iptr++
            }
        }
        return 0;
    }

    endloop() {
        if (this.variables[this.pointer] != 0) {
            this.iptr = this.loops[this.loops.length - 1]
        }

        else {
            this.loops.pop()
        }
        return 0;
    }
}

var program;

var newprogram = () => {
    program = new BrainfuckProgram;
}

// ++++++++[>++++[>++>+++>+++>+<<<<-]>+>+>->>+[<]<-]>>.>---.+++++++..+++.>>.<-.<.+++.------.--------.>>+.>++.
