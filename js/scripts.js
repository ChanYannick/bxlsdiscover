$.stellar({
    horizontalScrolling: false
});
//fermeture de sidebar
function close(){
  $('#close').click(function(eventClose){
    eventClose.preventDefault();
    $('#sidebar').animate({"right" : -300},500)
  });
}

//function ouverture sidebar
function openLoad(){
  $('#sidebar').animate({"right" : 0},500)  
}
//handlebar start
var source   = $("#release-template").html();
var template = Handlebars.compile(source);
var $highlights= $('#highlights');

//appel des données
$.getJSON("https://wt-902485dbb4fca4fccee3a0efcde5b34c-0.run.webtask.io/discover-brussels")

.done(function(data){
  //append handlebar
  var html = template(data);  
  $highlights.append(html);

  // map
  map = new GMaps({
    div: '#map',
    lat: data.mapConfig.defaultLatitude,
    lng:  data.mapConfig.defaultLongitude,
    setZoom: data.mapConfig.defaultZoom
  });
  // recuperation des données
  data.highlights.forEach(function(item){
    var $lng = item.longitude;
    var $lat = item.latitude;
    var $urlPage = item.pageUrl;

    
    //markers
    map.addMarker({
      lat: $lat,
      lng: $lng,
      title: item.name,
      click: function(e){
       openLoad();
       $("#sidebar .content").load($urlPage);
       close();
     }
   });//end markers    
  });//end forEach data
  $("#highlights .btn").click(function(event){
      event.preventDefault();
      var $thm = $(this).closest('.thumbnail')
      var $urlBtn= $thm.data("page-url");
      openLoad();
      $("#sidebar .content").load($urlBtn);
      close();
      })
  
})//done end

//mini game

$.ajax({
  
  url: "../js/game.js",

  dataType: "JSONP",
  success : function(data) {
    $("#gameBoard").append('<p>lol</p>');
    data.items.forEach(function(item){
      var q = item.question;
      console.log(q);
    })
  }
  
});
