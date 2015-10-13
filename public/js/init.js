(function($){
  $(function(){
    $(".openJudge").click(function(){
        $(".judgeBtn").show();
        $(".openJudge").hide();
        $(".closeJudge").show();
    });
    $(".closeJudge").click(function(){
        $(".judgeBtn").hide();
        $(".openJudge").show();
        $(".closeJudge").hide();
    });

    $(".openComp").click(function(){
        $(".openComp").hide();
        $(".closeComp").show();
    });
    $(".closeComp").click(function(){
        $(".openComp").show();
        $(".closeComp").hide();
    });

    $('.button-collapse').sideNav();

   			  $("#valueProposition").rateYo({
   			    rating: 5,
   			    ratedFill:'#3498DB'
   			  });
   			  $("#bussinessModel").rateYo({
   			    rating: 4,
   			    ratedFill:'#3498DB'
   			  });
   			  $("#scale").rateYo({
   			    rating: 3,
   			    ratedFill:'#3498DB'
   			  });
   			  $("#innovation").rateYo({
   			    rating: 2,
   			    ratedFill:'#3498DB'
   			  });
   			  $("#product").rateYo({
   			    rating: 2,
   			    ratedFill:'#3498DB'
   			  });
   			  $("#pitch").rateYo({
   			    rating: 1,
   			    ratedFill:'#3498DB'
   			  });
   			   $("#unfairAdvantage").rateYo({
   			    rating:0,
   			    ratedFill:'#3498DB'
   			  });


   			 //Getting the rating value when startup is scored i.e rated


   			  $("#valueProposition").rateYo('option','onSet',function(rating,rateYoInstance){
   			  		$('#valuePropositionScore').html(rating)
   			  });

  }); // end of document ready
})(jQuery); // end of jQuery name space
