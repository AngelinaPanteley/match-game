//This class based on the following examples
//http://info-comp.ru/obucheniest/302-javascript-clock-stopwatch.html
class Timer {
    constructor(form) {
        this.base=60;
        this.form=form;
        this.clearСlock();
    }

    clearСlock() { 
        clearTimeout(this.clocktimer); 
        this.h=1;this.m=1;this.tm=1;this.s=0;this.ts=0;this.ms=0; 
        this.init=0;
        this.readout='00:00.00'; 
        this.form.value=this.readout; 
    }
    
    startTime() { 
        var cdateObj = new Date(); 
        var t = (cdateObj.getTime() - this.dateObj.getTime())-(this.s*1000); 
        if (t>999) 
            this.s++;
        if (this.s>=(this.m*this.base)) { 
            this.ts=0; 
            this.m++; 
        } else { 
            this.ts=parseInt((this.ms/100)+this.s); 
            if(this.ts>=this.base)
                this.ts=this.ts-((this.m-1)*this.base); 
        } 
        if (this.m>(this.h*this.base)) { 
            this.tm=1; 
            this.h++; 
        } else { 
            this.tm=parseInt((this.ms/100)+this.m); 
            if(this.tm>=this.base) 
                this.tm=this.tm-((this.h-1)*this.base); 
        } 
        this.ms = Math.round(t/10); 
        if (this.ms>99) 
            this.ms=0; 
        if (this.ms==0) 
            this.ms='00';
        if (this.ms>0&&this.ms<=9) 
            this.ms = '0'+this.ms;  
        if (this.ts>0) { 
            this.ds = this.ts; 
            if (this.ts<10)
                this.ds = '0'+this.ts; 
        } else
            this.ds = '00'; 
        this.dm=this.tm-1; 
        if (this.dm>0) { 
            if (this.dm<10)
                this.dm = '0'+this.dm;
        } else 
             this.dm = '00';  
        this.readout = this.dm + ':' + this.ds + '.' + this.ms; 
        this.form.value = this.readout; 
        this.clocktimer = setTimeout(this.startTime.bind(this),1); 
    }

    start() { 
        if (this.init==0){ 
            this.clearСlock();
            this.dateObj = new Date(); 
            this.startTime(); 
            this.init=1; 
        }
    }
    
    stop() { 
        if (this.init==1){ 
            clearTimeout(this.clocktimer);
            this.init=0;
        } 
    }
}