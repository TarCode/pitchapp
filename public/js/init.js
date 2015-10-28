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
            rating: 0,
            ratedFill:'#3498DB'
          });
    $('.rate').rateYo('option','onSet',function(rating,rateYoInstance){
              var id = $(this).get(0).id
              //console.log('setting scrore of :'+id)
              setScore(id,rating)
          });
          
    $('.giveFeedback').click(function(){
        //console.log('giveFeedack class clicked')
        //console.log($(this).parent())
        $(this).parent().find('.feedback').css('display','inline')
        $(this).css('display','none')
        $('#feedbackArea').val('')
    })
    $('.discardFeedback').click(function(){
        $(this).parent().parent().find('button').css('display','inline')
        $(this).parent().parent().find('.feedback').css('display','none')
    })
    $('.submitFeedback').click(function(){
        //console.log('\n\n\t\tCLICKED FEEDBACK SEND')
        $(this).parent().parent().find('.feedback').css('display','none')
        var criteria=$(this).parent().parent().find('.pointsContainer').find('div').get(0).id;
        var feed= $(this).parent().find('div').find('textarea').val();
        console.log('\nfeed:\t'+feed+'\n')
        setFeedback(criteria,feed)
        closeFeedbackSection($(this))
        //$(this).parent().parent().find('button').css('display','inline')
        //$(this).parent().find('div').find('textarea').val('')
        
    })
    function closeFeedbackSection(elem){        
        elem.parent().parent().find('button').css('display','inline')
    }
  }); // end of document ready
})(jQuery); // end of jQuery name space
