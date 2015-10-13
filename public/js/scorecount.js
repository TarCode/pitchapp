console.log('\n\t Scorecount \n\n')

var addCriteria = function(id){
	
	console.log('\nadding criteria '+id)
	scores[id]=0;
	var elem ='#'+id
	console.log(elem)
	CalculateTotalScore();
	
}



var scores = {}
var setScore = function(id,score){
	console.log('--Setting score of--'+id)

	if(scores[id] == undefined){
		scores[id] =  score
	}
	else{
		scores[id] =  score;
	}

	CalculateTotalScore();
}

var finalScore=0;
var CalculateTotalScore = function(){
	console.log(scores)
	var totalScore=0;
	for(score in scores){
		totalScore += parseFloat(scores[score])
	}
	$('#totalScore').html(totalScore)
	finalScore=totalScore;
}


