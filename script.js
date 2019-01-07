var password = "co cię nie zabije to cię wzmocni";

var passwordLength = password.length;

var miss = 0;

var hiddenPassword ="";

function startGame() {
    document.getElementById("start-point").style.display = "none";
    document.getElementById("container").style.display = "block";
      
}

function goodbye() {
    document.getElementById("container").style.display = "none";
    document.getElementById("start-point").style.display = "block";
    document.getElementById("start-point").innerHTML = "Dziękuję za grę.<br></br>Życze miłego dnia :)";
}

function restart() {
    
    location.reload();

}

for (i = 0; i < passwordLength; i++) {
    if(password.charAt(i) == " ")hiddenPassword = hiddenPassword + " ";
    
    else hiddenPassword = hiddenPassword + "-";
}

password = password.toUpperCase();

function guessTurn() {
    document.getElementById("password").innerHTML = hiddenPassword;
}

window.onload = start;

var characters = ["A", "Ą", "B", "C", "Ć", "D", "E", "Ę", "F", "G", "H", "I", "J", "K", "L", "Ł", "M", "N", "Ń", "O", "Ó", "P", "Q", "R", "S", "Ś", "T", "U", "W", "V", "X", "Y", "Z", "Ź", "Ż"]

function start() {

    var alphabetContent = "";

    for(i = 0; i <= 34; i++) {
        var element = "char"+ i;
        alphabetContent = alphabetContent + '<div class="character" onclick="check('+i+')" id="' + element + '">'+ characters[i] + '</div>';
        if((i + 1) % 7 == 0) alphabetContent = alphabetContent + '<div style="clear:both";></div>'
    }

    document.getElementById("alphabet").innerHTML = alphabetContent;

    guessTurn();
}

 String.prototype.switchCharacter= function(place, char) {
    if (place > this.length -1) return this.toString();
    else return this.substr(0, place) + char + this.substr(place + 1);
}

function check(nr) {

    var hit = false;
    
    for(i=0; i < passwordLength; i++) {
        if (password.charAt(i) == characters[nr]) {
            hiddenPassword = hiddenPassword.switchCharacter(i, characters[nr]);
            hit = true
        }
    }

    if(hit == true) {
        var element = "char" + nr;
        document.getElementById(element).style.backgroundColor = "#003300";
        document.getElementById(element).style.borderColor = "#00C000";
        document.getElementById(element).style.color = "#00C000";
        document.getElementById(element).style.cursor = "default";
        guessTurn()
    }

    else {
        var element = "char" + nr;
        document.getElementById(element).style.backgroundColor = "#330000";
        document.getElementById(element).style.borderColor = "#C00000";
        document.getElementById(element).style.color = "#C00000";
        document.getElementById(element).style.cursor = "default";
        document.getElementById(element).setAttribute("onclick" , ";")

        miss++;

        var image = "assets/s" + miss + ".jpg";
        document.getElementById("gallow").innerHTML = '<img src="' + image + '" alt="gallows"/>';
    }
    // win

    if(password == hiddenPassword) {
        document.getElementById("alphabet").innerHTML = "Gratulacje! Hasło jest prawidłowe."+
        '<br></br>Chcesz zagrać jeszcze raz?<br></br><button class="btn" onclick="restart()">TAK</button><button class="btn" onclick="goodbye()">NIE</button>';
    }
    //lost

    if(miss >= 9) {
        document.getElementById("alphabet").innerHTML = 'Przegrana!<br></br>Chcesz spróbować jeszcze raz?<br></br><button class="btn" onclick="restart()">TAK</button><button class="btn" onclick="goodbye()">NIE</button>';

    }
    
}