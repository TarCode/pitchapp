(function($){
  $(function(){
    $(':radio').change(
      function(){
        $('.choice').text( this.value + ' stars' );
      }
    );
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
        var $preview = $(this).parent().parent().find('.previewFeed')
        
        setFeedback(criteria,feed,$preview)
        closeFeedbackSection($(this))
        //$(this).parent().parent().find('button').css('display','inline')
        //$(this).parent().find('div').find('textarea').val('')

    })
    var editToggle=0;
    $('.editFeedback').clicktoggle(function(){

         
         $(this).html('Save');
         $(this).next().html('Cancel')
         $(this).parent().find('.feedbackEdit').css('display','inline')
     },function(){
        var text = {feedback:$(this).parent().find('.feedbackEdit').val()};
        var entrantid = $(this).parent().find('.entrantID').val();
        var scoreid = $(this).parent().find('.scoreID').val();
        var url = '/judge/results/updateScoreFeedback/'+entrantid+'/'+scoreid
        $.post(url,text,function(){
             var url ='/judge/results/'+entrantid
            window.location.href=url
        })

        $(this).parent().find('.feedbackEdit').css('display','none')
        $(this).html('Edit')
        $(this).next().html('Remove')       
     })
               
            
              
            

        
   
    function closeFeedbackSection(elem){
        elem.parent().parent().find('button').css('display','inline')
    }
  }); // end of document ready
})(jQuery); // end of jQuery name space
$.fn.clicktoggle = function(a, b) {
    return this.each(function() {
        var clicked = false;
        $(this).click(function() {
            if (clicked) {
                clicked = false;
                return b.apply(this, arguments);
            }
            clicked = true;
            return a.apply(this, arguments);
        });
    });
};
