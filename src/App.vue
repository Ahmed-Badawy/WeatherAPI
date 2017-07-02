<template>
  <div class="container" id='root'>
    <ul class="nav nav-tabs nav-justified">
      <li @click='reset()' class="active"><a data-toggle="tab" href="#ByCoordinates">Weather By Coordinates</a></li>
      <li @click='reset()'><a data-toggle="tab" href="#ByCity">Weather By City</a></li>
    </ul>

    <div class="tab-content">

      <div id="ByCity" class="tab-pane fade">
        <h3>Weather By City</h3>
        <form>
          <label for="Country">Country</label>
          <select name="country" class='form-control' v-model='query.country'>
            <option value="" disabled>Select Country</option>
            <option v-for='country in countryList' :value="country.code">{{country.name}}</option>
          </select>
          <label for="City">City</label>
          <input type="text" class='form-control' placeholder='Write City Name' v-model='query.city'>
          <button class='btn btn-primary pull-right' @click.prevent='getWeather("city_based")'>Get Weather</button>
        </form> 
        <p class='help-block'>Warning, If the system didn't find the city name it will try it's best to find the neerest city to the inputed string</p>

      </div>

      <div id="ByCoordinates" class="tab-pane fade in active">
          <h3>Weather By Coordinates</h3>
        <form>
          <label for="latitude">Latitude</label>
          <input type="text" class='form-control' placeholder='latitude' v-model='query.lat'>
          <label for="longitude">Longitude</label>
          <input type="text" class='form-control' placeholder='Longitude' v-model='query.lon'>

          <button class='btn btn-primary pull-right' @click.prevent='getWeather("coordinates_based")'>Get Weather</button>
          <button class='btn btn-info pull-right' @click.prevent='generate_random_coordinates()'>Get Random</button>

        </form>    
      </div>
    </div>

    <div class="clearfix"></div>

      <table class='table table-striped table-condensed' v-if='output_data.visibility'>
        <tr> 
          <th>City</th> 
          <td>{{output_data.city}}</td>
        </tr>
        <tr>
          <th>Lat, Lon</th> 
          <td>{{output_data.lat}}, {{output_data.lon}}</td>
        </tr>
        <tr>
          <th>Main</th> 
          <td> 
            <b>Ground Level: </b> {{output_data.main.grnd_level}} <br>
            <b>Humidity: </b> {{output_data.main.humidity}} <br>
            <b>Sea Level: </b> {{output_data.main.sea_level}} <br>
            <b>Temp: </b> {{output_data.main.temp}} <br>
            <b>Temp Max: </b> {{output_data.main.temp_max}} <br>
            <b>Temp Min: </b> {{output_data.main.temp_min}} <br>
          </td>
        </tr> 
        <tr> 
          <th>Weather</th> 
          <td>{{output_data.weather}}</td>
        </tr> 
        <tr> 
          <th>Wind</th> 
          <td>
            <b>Degree: </b> {{output_data.wind.deg}} <br>
            <b>Speed: </b> {{output_data.wind.speed}}
          </td>
        </tr>   
      </table>


  </div>
</template>


<script>

var APIKEY = "50b303ea633de431414a8d6d73a0627b";
var weather_api = `http://api.openweathermap.org/data/2.5/weather?APPID=${APIKEY}`;

export default {
  name: 'app',
  data () {
    return {
      countryList : countryList,
      query: {
        country: ""
      },
      output_data: {
        city: "",
        visibility: false,
        main:{},
        wind:{},
      }
    }
  },
  methods: {

      reset(){
        this.output_data = { city: "", visibility: false, main:{}, wind:{} };
        this.query = {country: ""};
      },

      getWeather(based){
        var query_obj = this.query;
        var request_url = "";
        if(based=='city_based'){
          if(query_obj.city) request_url = weather_api + `&q=${query_obj.city}`;
          if(query_obj.country) request_url += `,${query_obj.country}`;
        }else if(based=='coordinates_based'){
          if(query_obj.lat && query_obj.lon) request_url = weather_api + `&lat=${query_obj.lat}&lon=${query_obj.lon}`;                
        }
        if(request_url == "" || !based){ 
          alert("you must specify the wanted area to get the weather");
          return;
        }
        axios.get(request_url).then(res=>{
          // console.log(res);
          console.log(res.data);
          this.output_data.city = res.data.name;
          this.output_data.lat = res.data.coord.lat;
          this.output_data.lon = res.data.coord.lon;
          this.output_data.main = res.data.main;
          this.output_data.weather = res.data.weather[0].description;
          this.output_data.wind = res.data.wind;
          this.output_data.visibility = true;
        },error=>{
          let error_string = "Sorry! Error Happened, "+error.response.data.message;
          console.log(error_string);
          alert(error_string);
        })
      },

      generate_random_coordinates(){
        this.reset();
        this.query.lon = this.generateRandomLong();
        this.query.lat = this.generateRandomLat();
        this.getWeather("coordinates_based");
      },


      // LONGITUDE -180 to + 180
      generateRandomLong() {
          var num = (Math.random()*180).toFixed(3);
          var posorneg = Math.floor(Math.random());
          if (posorneg == 0) {
              num = num * -1;
          }
          return num;
      },
      // LATITUDE -90 to +90
      generateRandomLat() {
          var num = (Math.random()*90).toFixed(3);
          var posorneg = Math.floor(Math.random());
          if (posorneg == 0) {
              num = num * -1;
          }
          return num;
      }
      


  }
}

</script>

