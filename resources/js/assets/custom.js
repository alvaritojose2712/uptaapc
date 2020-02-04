$(document).on("click",".notificacion",function() {
    $(this).animate({
        top:"-100%",
    },1000)
    $(".text-noti").html("")
})
function toggleNoti() {
    $(".notificacion").animate({
        top:"0%",
    },200)
}
$(document).ready(function() {
	$('.mdb-select').materialSelect();
});

$(document).on("click",".autoHide",function(){
	let name = $(this).data("handle")
	let _class = $(this).data("class")
	let val = $("[name="+name+"]:checked").val()
	if (val==$(this).data("hideval")) {
		$("."+_class).css({display:"none"})
	}else{
		$("."+_class).css({display:""})
	}
})
