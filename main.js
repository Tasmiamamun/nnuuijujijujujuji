
array_1=["aircraft carrier","airplane","alarm clock","ambulance","angel","animal migration","ant","anvil","apple","arm","asparagus","axe","backpack","banana","bandage","barn","baseball","baseball bat","basket","basketball","bat","bathtub","beach","bear","beard","bed","bee","belt","bench","bicycle","binoculars","bird","birthday cake","blackberry","blueberry","book","boomerang","bottlecap","bowtie","bracelet","brain","bread","bridge","broccoli","broom","bucket","bulldozer","bus","bush","butterfly","cactus","cake","calculator","calendar","camel","camera","camouflage","campfire","candle","cannon","canoe","car","carrot","castle","cat","ceiling fan","cello","cell phone","chair","chandelier","church","circle","clarinet","clock","cloud","coffee cup","compass","computer","cookie","cooler","couch","cow","crab","crayon","crocodile","crown","cruise ship","cup","diamond","dishwasher","diving board","dog","dolphin","donut","door","dragon","dresser","drill","drums","duck","dumbbell","ear", "elbow","elephant","envelope","eraser","eye"]

random_no = Math.floor((Math.random()*array_1.length)+1)

document.getElementById("name").innerHTML=array_1[random_no]


timer_counter=0
timer_ckeck=""
drawn_sketch=""
answer_holder=""
score=0

function update_canvas(){
    background("white")

    random_no = Math.floor((Math.random()*array_1.length)+1)

document.getElementById("name").innerHTML=array_1[random_no]

}





function preload(){
    classifier=ml5.imageClassifier("DoodleNet")
}



function setup(){
    canvas=createCanvas(300,300)
    canvas.center()
    background("white")
canvas.mouseReleased(classify_canvas)
synth=window.speechSynthesis;

}

function clear_canvas(){
    background("white")
}


function classify_canvas(){
    classifier.classify(canvas,got_results)
}

check_sketch()








function draw(){
    strokeWeight(13)
    stroke(0)
    if (mouseIsPressed) {
        line(pmouseX,pmouseY,mouseX,mouseY)
    }
}


function got_results(error,results){
if (error) {
    console.log(error)
} else {
    console.log(results)
    document.getElementById("label_name").innerHTML=results[0].label
    document.getElementById("confidence_name").innerHTML=Math.floor(results[0].confidence*100)+"%"
    utterThis=new SpeechSynthesisUtterance(results[0].label);
    synth.speak(utterThis)
}
}



function check_sketch(){
    timer_counter++
    document.getElementById("timer").innerHTML=timer_counter 
    if (timer_counter>400) {
        timer_counter=0
        timer_ckeck="completed"
    }


    if (timer_ckeck=="completed"|| answer_holder=="set") {
        timer_ckeck=""
        answer_holder=""
        update_canvas()
    }
}