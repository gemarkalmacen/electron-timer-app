<template>
    <h1>{{time}}</h1>
</template>

<script>

  export default {
    data() {
        return {
            interval:null,
            days:0,
            hours:0,
            minutes:0,
            seconds:0,
            time: "",
            intervals:{
                second: 1000,
                minute: 1000 * 60,
                hour: 1000 * 60 * 60,
                day: 1000 * 60 * 60 * 24
            },
            increment_count: 0,
        }
    },
    props:{
        from : {
            required:true
        },
        status : {
            required:true
        },
        break_duration : {
            required:true
        },
    },
    mounted() {
        if (this.status) {
            this.timer = setInterval(() => {
                this.updateDiffs();
            },1000);
        }
        
        this.updateDiffs();
    },
    destroyed() {
        clearInterval(this.interval);
    },
    watch: {
        status(value) {
            console.log(value)
            if (!value) {
                clearInterval(this.timer);
            }
            else {
                this.timer = setInterval(() => {
                    this.updateDiffs();
                },1000);
            }
        }
    },
    methods:{
        updateDiffs() {
            var now = Date.now();
            var diff = Math.abs(now - this.from.getTime());
            diff -= this.break_duration;
            this.hours = Math.floor(diff / this.intervals.hour);
            diff -= this.hours * this.intervals.hour;
            this.minutes = Math.floor(diff / this.intervals.minute);
            diff -= this.minutes * this.intervals.minute;
            this.seconds = Math.floor(diff / this.intervals.second);

            var hDisplay = this.hours < 10 ? "0"+this.hours : this.hours;
            var mDisplay = this.minutes < 10 ? "0"+this.minutes : this.minutes;
            var sDisplay = this.seconds < 10 ? "0"+this.seconds : this.seconds;

            this.time = hDisplay + ":" + mDisplay + ":" + sDisplay;
        }
    }

  }
</script>