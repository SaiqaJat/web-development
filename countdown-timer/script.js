

        // fatching ID..
        let startBtn = document.getElementById('startBtn');
        let pauseBtn = document.getElementById('pauseBtn');
        let resetBtn = document.getElementById('resetBtn');
        let time = document.getElementById('time');
        let status = document.getElementById('status') ;
        let progress = document.getElementById('progress') ;

        const TOTAL_SECOND = 3600;
        let remaining = TOTAL_SECOND;
        let timer = null;
        let running = false;

        function format(num) {
            if (num < 10) return "0" + num;
            return "" + num;
        }

        function convert(sec){
            let h = parseInt(sec/TOTAL_SECOND);
            let m = parseInt((sec%TOTAL_SECOND)/60);
            let s = parseInt(sec%60);
            return format(h)+":"+format(m)+":"+format(s);
        }

        function update(){
            time.textContent = convert(remaining);
            progress.style.width = ((TOTAL_SECOND-remaining)/TOTAL_SECOND) * 100 + "%";

        }

        function start(){
            if(running){ return;}
            running = true;
            status.innerText = "Running";
        

        timer = setInterval(function(){
            remaining--;
            update();
            if(remaining <= 0){
                remaining  = 0;
                clearInterval(timer);
                running = false;
                status.innerText = 'Time up!';

            }
        }, 1000);
    }

    function pause(){
        if(!running) return;
        running = false;
        clearInterval(timer);
        status.innerText = "Paused";
    }
    function reset(){
        running = false;
        clearInterval(timer);
        remaining = TOTAL_SECOND;
        update();
        status.innerText = "Ready";
    }

    update();
   

  