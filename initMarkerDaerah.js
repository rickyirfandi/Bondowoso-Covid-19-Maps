$(window).on('load',function(){
  $('#instructionModal').modal();
});

$.ajax({
    type: "GET",
    url: "https://rickyirfandi.com/covid19/data/bondowoso/",

    dataType: "json",
    success: function (data) {
      $.each(data, function (i, obj) {
        var div_data = "<option value=" + obj.kecamatan + ">" + obj.kecamatan + "</option>";
        $(div_data).appendTo('#Kecamatan');
      });
    }
  });

  function geocodeAddress(geocoder, resultsMap) {
    var address = document.getElementById('Kecamatan').value;
    geocoder.geocode({
      'address': 'kelurahan '+address+' Kabupaten Bondowoso Jawa Timur'
    }, function (results, status) {
      if (status === 'OK') {
        console.log("Getting Latitude and Longitude of the Country selected: "+ new Date());
        resultsMap.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
          map: resultsMap,
          position: results[0].geometry.location,
          icon: "http://www.rickyirfandi.com/covid19/bondowoso/flag.png"
        });


        $.ajax({
          type: "GET",
          url: "https://rickyirfandi.com/covid19/data/bondowoso/",
          dataType: "json",
          success: function (data) {
            $.each(data, function (i, obj) {
              if (obj.kecamatan == document.getElementById('Kecamatan').value) {
                console.log("Relevant information of the selected country is displayed: "+ new Date());
                var div_data = "<h3><b>" + obj.kecamatan + "</b></h3>" + "<p>Positif : " + obj.positif +
                  " Pasien <br>Orang Dalam Pengawasan : " + obj.ODP +
                  " <br>Pasien Dalam Pengawasan : " + obj.PDP +
                  " <br>Meninggal : " + obj.meninggal
                  " <br>Sembuh : " + obj.sembuh +
                  " <br>recovered/confirmed: " + Math.round((((obj.recovered / obj.cases).toFixed(3)) *
                    100) * 100) / 100 +
                  "%" + " <br>deaths/confirmed: " + Math.round((((obj.deaths / obj.cases).toFixed(3)) *
                    100) * 100) / 100 +
                  "%" + "</p>";
                $('#content').html(div_data);
                //$("#instructionModal").modal();
                //$(div_data).appendTo('#content');
              }
            });
          }
        });
        //$('#content').scrollIntoView(false);
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }
  function scrollToBottom() {
    var content = document.getElementById("content");
    content.scrollIntoView(false);
    console.log("scroll to buttom has happened");
  }
