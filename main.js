Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});

camera = document.getElementById("camera");

Webcam.attach('#camera');

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    });
}

console.log('ml5 version:', ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/5A53F3gcy/model.json', modelLoaded);

function modelLoaded(){
    console.log('Model Loaded');
}

function check(){
    img = document.getElementById('captured_image');
    classifier.classify(img, got_results);
}


function got_results(error, results){
    if(error){
        console.error(error);
    } else {
        console.log(results);
        document.getElementById("result_gesture_name").innerHTML = results[0].label;
        document.getElementById("result_gesture_name2").innerHTML = results[1].label;
        function speak(){
            var synth = window.speechSynthesis;
            speak_data_1 = "The meaning of the first gesture is ";
            speak_data_2 = results[0].label;
            speak_data_3 = "And the second prediction is "
            speak_data_4 = results[1].label;
            var utter_this = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2 + speak_data_3 + speak_data_4);
            synth.speak(utter_this)
        }
        speak();
        //Prediction 1
        if(results[0].label == "Yes"){
            document.getElementById("update_gesture").innerHTML = "👍";
            
        }
        if(results[0].label == "No"){
            document.getElementById("update_gesture").innerHTML = "👎";
           
        }
        if(results[0].label == "Nice"){
            document.getElementById("update_gesture").innerHTML = "👌";
            
        }
        if(results[0].label == "Peace"){
            document.getElementById("update_gesture").innerHTML = "✌";
            
        }
        
        //Prediction 2
        if(results[1].label == "Yes"){
            document.getElementById("update_gesture2").innerHTML = "👍";
           
        }
        if(results[1].label == "No"){
            document.getElementById("update_gesture2").innerHTML = "👎";
            
        }
        if(results[1].label == "Nice"){
            document.getElementById("update_gesture2").innerHTML = "👌";
            
        }
        if(results[1].label == "Peace"){
            document.getElementById("update_gesture2").innerHTML = "✌";
           
        }
    }
}