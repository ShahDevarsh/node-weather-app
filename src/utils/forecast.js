const  request  = require('request')
//we can also use postman-request it is similar search on npmjs.com/package
const forecast = (latitude,longitude,callback)=>{
    url = 'http://api.weatherstack.com/current?access_key=b255826f15c6143eedb8f5f92a0374fa&query='+encodeURIComponent(latitude)+','+encodeURIComponent(longitude)+'&units=m'
    request({url,json:true},(error,{body})=>{
        if(error){
            callback("Unable to connect to the service!!",undefined);
        }
        else if(body.error){
            callback("Unable to find the location",undefined);
        }
        else{
            callback(undefined,
                // temperature: body.current.temperature,
                // feelslike: body.current.feelslike
                'It is '+ body.current.weather_descriptions[0]+
                ' weather having current temperature ' + body.current.temperature + ' degree celsius but it feels like ' + body.current.feelslike + ' degree celsius out and the humidity is ' + body.current.humidity
            );
        }
    })
}

module.exports = forecast