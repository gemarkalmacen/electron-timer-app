<template>    
    <!-- <h4 style="display: inline;">{{formattedTimeLeft}}</h4> -->
    <button
        class="btn btn-md btn-neutral"
        color="green"
        style="margin-left:20px;"
    >
    <!-- <v-icon left style="color:white!important" >
        mdi-clock
        </v-icon> -->
        <span style="color:white!important">
            Break {{formattedTimeLeft}}
        </span>
    </button>
</template>

<script>   
//   const TIME_LIMIT = 20;

  export default {
    data() {
        return {
            timePassed: 0,
            timerInterval: null,
            remainingTime: 0
        }
    },
    props:{
        status : {
            required:true
        },
        time_limit : {
            required:true
        },
        break_id: {
            required:true
        }
    },
    computed: {
        formattedTimeLeft() {
            const timeLeft = this.timeLeft;
            const minutes = Math.floor(timeLeft / 60);
            let seconds = timeLeft % 60;

            if (seconds < 10) {
                seconds = `0${seconds}`;
            }

            return `${minutes}:${seconds} mins`;
        },
        timeLeft() {
            var v = this.time_limit - this.timePassed;
            this.remainingTime = v;
            this.$emit("changeRemainingTime", {id: this.break_id, remainingTime: v});
            return v;
        },
    },
    watch: {
        status(value) {
            if(value){
                this.startTimer();
            }        
            else{
                this.onTimesUp();
            }    
        },
        timeLeft(newValue) {
            if (newValue === 0) {
                this.onTimesUp();
            }
        }
    },

    mounted() {
        if (this.status) {
            this.startTimer();
        }        
    },

    methods: {
        onTimesUp() {
        // clearInterval(this.timerInterval);
        },

        startTimer() {
        this.timerInterval = setInterval(() => (this.timePassed += 1), 1000);
        }
    }
  };
</script>