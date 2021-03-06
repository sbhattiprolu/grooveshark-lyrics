var songName;
var artistName;
var albumName;

$(document).ready(function (){
   //add Image Button at the header
   $("#header_mainNavigation").append("<a href=\"/#/user\" id=\"header_lyrics_btn\" >Lyrics</a>");
   $("#header_lyrics_btn").click(getLyrics);
});

function getLyrics(){

   var nowPlayingDiv=document.getElementById('playerDetails_nowPlaying');
   var anchors= nowPlayingDiv.getElementsByTagName('a');

   songName   = $("#playerDetails_nowPlaying .song").text();
   artistName = $("#playerDetails_nowPlaying .artist").text();
   albumName  = $("#playerDetails_nowPlaying .album").text();
   
   if(songName==null){
      alert("Please Play a Song ");
      event.preventDefault();
   }
   else{

   chrome.extension.sendRequest({song: songName,artist: artistName, album: albumName}, function(response) {

      $("#page").attr("class","gs_page_user");
      $("theme_page_header").attr("style","display:block;");
      $("#page").html("<div id=\"page_header\"></div><div id=\"page_content\"><div id=\"gs_lyrics_content\">"+response.lyrics+"</div></div>");
      $("#page_header").append("<div class=\"meta\"><h3 data-translate-text=\"LYRICS_TITLE\">Lyrics for "+ songName +
                                     " - " +artistName+" - "+albumName + "</h3></div>");
      $("#page_header").append("<div class=\"page_controls\"> <ul class=\"left\"><li class=\"first last btn_group\">" + 
          "<button class=\"btn btn_style2 hide\" type=\"button\"><div><span class=\"label\">Edit Lyrics</span></div></button></li></ul></div>");
      $("#page_header").append("<div class=\"highlight\"></div><div class=\"shadow\"></div>");
      $("#page_header .page_controls").height($(".page_controls .left").outerHeight());
      $("#page_header").height(parseInt($("#page_header .meta").outerHeight()) + parseInt($("#page_header .page_controls").outerHeight())+20);
      $("#page_content").height(parseInt($("#page_wrapper").height()) - parseInt($("#theme_page_header").height()) - $("#page_header").height());   
      $("#page").attr("class","gs_page_popular");
      $("#page_content .rtMatcher").remove();
      
      //$("#gs_lyrics_content").append("<div id=\"gs_youtube_object\">"+response.youtubeElement+"</div>");
      //console.log(response.lyrics);
      //console.log(response.youtubeElement);
   });
   
   }
}




