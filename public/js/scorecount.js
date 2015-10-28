var scores = {}
var finalScore=0;
var addCriteria = function(criteria){
	scores[criteria]={};
	scores[criteria]['points']=0;
	scores[criteria]['feedback']='';
	var elem ='#'+criteria
	CalculateTotalScore();
	
}




var setScore = function(criteria,score){
	if(scores[criteria] == undefined){
		scores[criteria]={};
		scores[criteria]['points']=score;
	}
	else{
			scores[criteria]['points']=score;
		}

	CalculateTotalScore();
}

var setFeedback = function(criteria,feedback){
	if(scores[criteria] == undefined){
		scores[criteria]={};
		scores[criteria]['feedback']=feedback;
	  }
	else{
		console.log('Setting feedback of '+criteria+' to \n\t\t'+feedback)
		scores[criteria]['feedback']=feedback;
	}
	CalculateTotalScore();
}


var CalculateTotalScore = function(){
	console.log(scores)
	var totalScore=0;
	for(criteria in scores){
		totalScore += parseFloat(scores[criteria].points)
	}
	$('#totalScore').html(' &nbsp '+totalScore+' &nbsp ')
	finalScore=totalScore;
}


