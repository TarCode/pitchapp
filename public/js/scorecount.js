var scores = {}
var finalScore=0;
var config ={}
function configure(startup,comp){
	config['startup_id']=startup;
	config['comp_id']=comp;
}
var addCriteria = function(criteria,dbID){
	scores[criteria]=[];
	scores[criteria][0]=dbID
	scores[criteria][1]=0;
	scores[criteria][2]='';
	var elem ='#'+criteria
	CalculateTotalScore();
	
}




var setScore = function(criteria,score){
	if(scores[criteria] == undefined){
		scores.criteria=[];
		scores.criteria[1]=score;
	}
	else{
			scores[criteria][1]=score;
		}

	CalculateTotalScore();
}

var setFeedback = function(criteria,feedback){
	if(scores[criteria] == undefined){
		scores.criteria=[];
		scores.criteria[2]=feedback;
	  }
	else{
		//console.log('Setting feedback of '+criteria+' to \n\t\t'+feedback)
		scores[criteria][2]=feedback;
	}
	CalculateTotalScore();
}


var CalculateTotalScore = function(){
	//console.log(scores)
	var totalScore=0;
	for(criteria in scores){
		totalScore += parseFloat(scores[criteria][1])
	}
	$('#totalScore').html(' &nbsp '+totalScore+' &nbsp ')
	finalScore=totalScore;
}


var sendScore = function(){
	    var route= '/judge/'+config.comp_id+'/'+config.startup_id
		$.ajax({
		  url: route,
		  data: {pitch:scores},
		  type: 'POST'
		});
}