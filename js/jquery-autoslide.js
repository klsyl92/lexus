// JavaScript Document

$(function(){
  $('#slideItems div').hide();	//slideItems안의 div 5개를 숨김
  
  var current = -1;     //현제 보여지고있는 div의 번호
  var prev = null;		//prev - 이전 div의 번호를 변수로 선언
  var interval = null;	//주기적인 반복을 만들기위한 변수
  var FADE_SPEED = 300;		//등장할때 걸리는 시간	
  var DELAY_SPEED = 5000; 		//다음 div가 등장할때까지 보여주는 시간
  var slides = $('#slideItems div');		//slideItems안의 div를 변수로 선언
 
	  var html = '<ul id="slideAllCount">'   //html - 변수선언
	  
	  for (var i = slides.length -1; i >= 0; i--){		//for문 (최대값4;최종값0;감소)
		  html += '<li id="slide'+i+'" class="slide"><span>'+(i+1)+'</span></li>' ;      //띄어쓰기 주의
		  }
		  html += '</ul>' ;
/*	
  <ul id="slideAllCount">
	  <li id="slide4" class="slide"><span>5</span></li>
	  <li id="slide3" class="slide"><span>4</span></li>
	  <li id="slide2" class="slide"><span>3</span></li>
	  <li id="slide1" class="slide selectedTab"><span>2</span></li>
	  <li id="slide0" class="slide"><span>1</span></li>
  </ul>
  
*/	
  
  $("#slideAll").after(html);  		//만들어진 코드를 어디에 삽입하는지 정해준다
  
  for (var i = slides.length - 1; i >=0; i--) {
  
  $('#slide' + i).bind("click",{index:i}, function(event){
	  current = event.data.index;		//클릭 이벤트를 바인딩. 이벤트 핸들러에 전해지는 data, event와 함께 실행할 함수
	  
	  gotoSlide(current);

	  });
  };
  
  autoSlide();     //자동으로 다음div로 넘어간다.
  
  
  function autoSlide () {
			  if (current >= slides.length -1) {   //현제 보이는 div 가 4와 같거나 크다면 현제 보이는 div값을 0으로해준다.
				  current = 0;
				  }else {
					  current++
				  }
			  gotoSlide(current);
			  }
  
  function gotoSlide(current){
				  if (current != prev){    //null값 지정되있어서 항상 
					  $('#slide'+current).addClass('selectedTab');   //선택되면 selectedTab 클래스로지정
					  $('#slide'+prev).removeClass('selectedTab');  //이전에 보이던 ul li의 클래스명을 삭제

					  $(slides[prev]).stop().hide();
					  $(slides[current]).stop().fadeIn(FADE_SPEED);   //slideDown - 아래로 슬라이드

					  prev = current;   //current값을 이전값으로

					  if (interval != null){
						  clearInterval(interval);   //setInterval 함수가 중첩되므로 클리어해준다
					  }
					  interval = setInterval(autoSlide, DELAY_SPEED);   
				  }
			  }
		  });