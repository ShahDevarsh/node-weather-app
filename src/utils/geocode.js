const request = require('request')
const geocode = (address,callback)=>{
    
    url = 'http://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiZGV2YXJzaCIsImEiOiJja2R3dzh3d2cwajllMnpud3NndmM4bHp2In0._PSwCHWX6YSheorEgK_Ekg&limit=1'

    request({url,json:true},(error,{body})=>{
        if(error){
            callback("Sorry Bad Gateway unable to open the service!!",undefined);
        }else if(body.features.length === 0){
            callback("Unable to find the location,Modify your search",undefined);
        }else{
            callback(undefined,{
               latitude : body.features[0].center[1],
               longitude : body.features[0].center[0],
               location : body.features[0].place_name
            })
        }
    })
}

module.exports = geocode