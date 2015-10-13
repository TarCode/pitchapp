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
    $('.rate').rateYo({
            rating: 1,
            ratedFill:'#3498DB'
          });
    $('.rate').rateYo('option','onSet',function(rating,rateYoInstance){
              var id = $(this).get(0).id
              console.log('setting scrore of :'+id)
              setScore(id,rating)
          });
          
    $('.giveFeedback').click(function(){
        console.log('giveFeedack class clicked')
        console.log($(this).parent())
        $(this).parent().find('.feedback').css('display','inline')
        $(this).css('display','none')
    })
    $('.submitFeedback').click(function(){
        console.log('submitFeedack class clicked')
        console.log($(this).parent())
        $(this).parent().parent().find('.feedback').css('display','none')
        console.log( $(this).parent().parent().find('.giveFeedback'))
        console.log("the button to be viewd")
        $(this).parent().parent().find('button').css('display','inline')
        
    })
  }); // end of document ready
})(jQuery); // end of jQuery name space
